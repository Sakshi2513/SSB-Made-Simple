import { Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminConfigured, adminDb } from "@/lib/firebaseAdmin";
import { razorpayConfigured, refundRazorpayPayment, revokeByPayment } from "@/lib/payments";

// Admin-only: refunds a paid order in full through Razorpay and removes the access it granted.
export async function POST(req: Request) {
  if (!adminConfigured() || !razorpayConfigured()) return Response.json({ error: "Payments are not configured." }, { status: 503 });
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Please log in." }, { status: 401 });

  let uid: string;
  try {
    uid = (await adminAuth().verifyIdToken(token)).uid;
  } catch {
    return Response.json({ error: "Session expired." }, { status: 401 });
  }
  const me = await adminDb().collection("users").doc(uid).get();
  if (me.data()?.role !== "admin") return Response.json({ error: "Admins only." }, { status: 403 });

  const { orderId } = (await req.json().catch(() => ({}))) as { orderId?: string };
  if (!orderId) return Response.json({ error: "Missing order." }, { status: 400 });
  const ref = adminDb().collection("payments").doc(orderId);
  const snap = await ref.get();
  const p = snap.data();
  if (!snap.exists || !p) return Response.json({ error: "Order not found." }, { status: 404 });
  if (p.status === "refunded") return Response.json({ error: "Already refunded." }, { status: 409 });
  if (p.status !== "paid" || !p.paymentId) return Response.json({ error: "Only paid orders can be refunded." }, { status: 400 });

  const r = await refundRazorpayPayment(String(p.paymentId));
  if (!r.ok) return Response.json({ error: r.data.error?.description || "Razorpay could not process the refund." }, { status: 502 });

  const revoked = await revokeByPayment(String(p.paymentId));
  await ref.set({ status: "refunded", refundedAt: Timestamp.now(), refundId: r.data.id ?? "", refundedBy: uid }, { merge: true });
  return Response.json({ ok: true, revoked });
}
