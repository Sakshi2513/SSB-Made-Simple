import { Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminConfigured, adminDb } from "@/lib/firebaseAdmin";
import { getBuiltinProduct } from "@/content/products";
import { loadProduct, razorpayConfigured } from "@/lib/payments";

// Identify the logged-in user without the admin SDK (used only for Razorpay TEST keys, before the server key is added).
async function lookupUser(idToken: string): Promise<{ uid: string; email: string } | null> {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) return null;
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) return null;
  const u = ((await res.json()) as { users?: { localId: string; email?: string }[] }).users?.[0];
  return u ? { uid: u.localId, email: u.email ?? "" } : null;
}

// Creates a Razorpay order for a product. The amount always comes from the server-side product, never the browser.
export async function POST(req: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
  if (!razorpayConfigured()) {
    return Response.json({ error: "Payments are not set up yet: the Razorpay keys are missing. Please enrol on WhatsApp for now." }, { status: 503 });
  }
  const full = adminConfigured();
  // Without the Firebase server key, purchases cannot be unlocked, so only allow Razorpay TEST keys (no real money).
  if (!full && !keyId.startsWith("rzp_test_")) {
    return Response.json({ error: "Payments are not live yet: the Firebase server key is missing on the server." }, { status: 503 });
  }

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Please log in to continue." }, { status: 401 });

  let uid = "";
  let email = "";
  try {
    if (full) {
      const d = await adminAuth().verifyIdToken(token);
      uid = d.uid;
      email = d.email ?? "";
    } else {
      const u = await lookupUser(token);
      if (!u) throw new Error("bad token");
      uid = u.uid;
      email = u.email;
    }
  } catch {
    return Response.json({ error: "Your session expired. Please log in again." }, { status: 401 });
  }

  const { productId } = (await req.json().catch(() => ({}))) as { productId?: string };
  const product = productId ? (full ? await loadProduct(productId) : getBuiltinProduct(productId) ?? null) : null;
  if (!product || !product.active) return Response.json({ error: "This product is not available." }, { status: 404 });

  const amount = Math.round(product.price * 100); // paise
  const auth = Buffer.from(`${keyId}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR", receipt: `r_${Date.now()}`, notes: { uid, productId: product.id } }),
  });
  if (!res.ok) {
    const detail = ((await res.json().catch(() => ({}))) as { error?: { description?: string } }).error?.description;
    return Response.json({ error: detail ? `Razorpay: ${detail}` : "Could not start the payment. Please try again." }, { status: 502 });
  }
  const order = (await res.json()) as { id: string };

  if (full) {
    await adminDb().collection("payments").doc(order.id).set({
      orderId: order.id,
      uid,
      email,
      productId: product.id,
      productName: product.name,
      amount: product.price,
      currency: "INR",
      status: "created",
      createdAt: Timestamp.now(),
    });
  }

  return Response.json({ orderId: order.id, amount, currency: "INR", keyId, name: product.name });
}
