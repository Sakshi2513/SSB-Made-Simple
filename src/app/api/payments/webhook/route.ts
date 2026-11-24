import { Timestamp } from "firebase-admin/firestore";
import { adminConfigured, adminDb } from "@/lib/firebaseAdmin";
import { findPaymentByRazorpayId, revokeByPayment, settlePayment, verifyWebhookSignature } from "@/lib/payments";

// Razorpay -> server. Handles successful, failed and refunded payments, even if the buyer closed the browser.
// In the Razorpay dashboard: Settings > Webhooks, URL = https://YOUR-DOMAIN/api/payments/webhook,
// events payment.captured, order.paid, payment.failed, refund.processed, and the same secret as RAZORPAY_WEBHOOK_SECRET.
export async function POST(req: Request) {
  if (!adminConfigured() || !process.env.RAZORPAY_WEBHOOK_SECRET) return new Response("not configured", { status: 503 });
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, sig)) return new Response("bad signature", { status: 400 });

  type Ent = { id?: string; order_id?: string; payment_id?: string; amount?: number; error_description?: string };
  const evt = JSON.parse(raw) as { event?: string; payload?: { payment?: { entity?: Ent }; order?: { entity?: Ent }; refund?: { entity?: Ent } } };
  const pay = evt.payload?.payment?.entity;

  try {
    if (evt.event === "payment.captured" || evt.event === "order.paid") {
      const orderId = pay?.order_id ?? evt.payload?.order?.entity?.id;
      if (orderId && pay?.id) await settlePayment(orderId, pay.id);
    } else if (evt.event === "payment.failed") {
      // Only mark failed if it was never paid; a later successful attempt on the same order still settles.
      const ref = pay?.order_id ? adminDb().collection("payments").doc(pay.order_id) : null;
      const cur = await ref?.get();
      if (ref && cur?.exists && cur.data()?.status === "created") {
        await ref.set({ status: "failed", failureReason: pay?.error_description ?? "", failedAt: Timestamp.now() }, { merge: true });
      }
    } else if (evt.event === "refund.processed" || evt.event === "refund.created") {
      const refund = evt.payload?.refund?.entity;
      const doc = refund?.payment_id ? await findPaymentByRazorpayId(refund.payment_id) : null;
      if (doc && refund?.payment_id) {
        const full = Math.round(Number(doc.data().amount) * 100) <= Number(refund.amount ?? 0);
        if (full) {
          await revokeByPayment(refund.payment_id);
          await doc.ref.set({ status: "refunded", refundedAt: Timestamp.now() }, { merge: true });
        } else {
          await doc.ref.set({ status: "partially_refunded", refundedAt: Timestamp.now() }, { merge: true });
        }
      }
    }
  } catch {
    return new Response("error", { status: 500 }); // Razorpay retries on non-2xx
  }
  return new Response("ok");
}
