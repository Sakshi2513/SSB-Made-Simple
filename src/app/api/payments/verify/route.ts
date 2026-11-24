import { adminAuth, adminConfigured, adminDb } from "@/lib/firebaseAdmin";
import { razorpayConfigured, settlePayment, verifyCheckoutSignature } from "@/lib/payments";

// Called by the browser after Razorpay Checkout succeeds. Checks the signature, then unlocks the purchase.
export async function POST(req: Request) {
  if (!razorpayConfigured()) return Response.json({ error: "Payments are not configured." }, { status: 503 });
  if (!adminConfigured()) {
    return Response.json({ error: "Payment went through, but access cannot unlock yet because the Firebase server key is not added on the server." }, { status: 503 });
  }
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Please log in." }, { status: 401 });
  let uid: string;
  try {
    uid = (await adminAuth().verifyIdToken(token)).uid;
  } catch {
    return Response.json({ error: "Session expired." }, { status: 401 });
  }

  const b = (await req.json().catch(() => ({}))) as { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string };
  if (!b.razorpay_order_id || !b.razorpay_payment_id || !b.razorpay_signature) return Response.json({ error: "Missing payment details." }, { status: 400 });
  if (!verifyCheckoutSignature(b.razorpay_order_id, b.razorpay_payment_id, b.razorpay_signature)) {
    return Response.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  // The order must belong to the logged-in user.
  const order = await adminDb().collection("payments").doc(b.razorpay_order_id).get();
  if (!order.exists || order.data()?.uid !== uid) return Response.json({ error: "Order not found." }, { status: 404 });

  const r = await settlePayment(b.razorpay_order_id, b.razorpay_payment_id);
  if (!r.ok) return Response.json({ error: "Could not unlock this purchase. Contact support with your payment ID." }, { status: 500 });
  return Response.json({ ok: true });
}
