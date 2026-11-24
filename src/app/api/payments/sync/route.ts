import { adminAuth, adminConfigured, adminDb } from "@/lib/firebaseAdmin";
import { getOrderPayments, razorpayConfigured, settlePayment } from "@/lib/payments";

// Safety net for "I paid but nothing unlocked": for the logged-in student's unpaid orders, ask Razorpay
// whether a payment actually succeeded, and unlock it. Called when My Library opens.
export async function POST(req: Request) {
  if (!adminConfigured() || !razorpayConfigured()) return Response.json({ unlocked: 0 });
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Please log in." }, { status: 401 });
  let uid: string;
  try {
    uid = (await adminAuth().verifyIdToken(token)).uid;
  } catch {
    return Response.json({ error: "Session expired." }, { status: 401 });
  }

  const snap = await adminDb().collection("payments").where("uid", "==", uid).get();
  const weekAgo = Date.now() - 7 * 86_400_000;
  const open = snap.docs.filter((d) => ["created", "failed"].includes(String(d.data().status)) && (d.data().createdAt?.toMillis?.() ?? 0) > weekAgo).slice(0, 5);

  let unlocked = 0;
  for (const d of open) {
    const list = await getOrderPayments(d.id);
    const good = list.data.items?.find((p) => p.status === "captured" || p.status === "authorized");
    if (good) {
      const r = await settlePayment(d.id, good.id);
      if (r.ok && !("already" in r && r.already)) unlocked++;
    }
  }
  return Response.json({ unlocked });
}
