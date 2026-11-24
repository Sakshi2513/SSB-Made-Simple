import "server-only";
import crypto from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./firebaseAdmin";
import { getBuiltinProduct, type Product } from "@/content/products";

export const razorpayConfigured = () => Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

// ---------- Razorpay REST ----------
type RzpPayment = { id: string; order_id: string; status: string; amount: number; captured?: boolean; amount_refunded?: number; error_description?: string };

async function rzp<T>(path: string, init?: { method?: string; body?: unknown }): Promise<{ ok: boolean; status: number; data: T }> {
  const auth = Buffer.from(`${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: init?.method ?? "GET",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  return { ok: res.ok, status: res.status, data: (await res.json().catch(() => ({}))) as T };
}

export const getRazorpayPayment = (id: string) => rzp<RzpPayment>(`/payments/${id}`);
export const getOrderPayments = (orderId: string) => rzp<{ items?: RzpPayment[] }>(`/orders/${orderId}/payments`);
const capturePayment = (id: string, amount: number) => rzp<RzpPayment>(`/payments/${id}/capture`, { method: "POST", body: { amount, currency: "INR" } });
export const refundRazorpayPayment = (id: string, amount?: number) =>
  rzp<{ id?: string; error?: { description?: string } }>(`/payments/${id}/refund`, { method: "POST", body: amount ? { amount, speed: "normal" } : { speed: "normal" } });

// ---------- Products ----------
// The server never trusts a price sent by the browser: it reads the product here.
// A product edited in /admin (Firestore `products`) overrides the built-in default.
export async function loadProduct(id: string): Promise<Product | null> {
  const base = getBuiltinProduct(id);
  const snap = await adminDb().collection("products").doc(id).get();
  if (!snap.exists) return base ?? null;
  const d = snap.data() ?? {};
  const merged: Product = {
    id,
    name: String(d.name ?? base?.name ?? id),
    price: Number(d.price ?? base?.price ?? 0),
    type: (d.type ?? base?.type ?? "pack") as Product["type"],
    durationDays: Number(d.durationDays ?? base?.durationDays ?? 0),
    includes: typeof d.includesText === "string" ? d.includesText.split(",").map((x: string) => x.trim()).filter(Boolean) : base?.includes ?? [],
    features: typeof d.featuresText === "string" ? d.featuresText.split("\n").map((x: string) => x.trim()).filter(Boolean) : base?.features ?? [],
    accent: String(d.accent ?? base?.accent ?? "#3b9cff"),
    order: Number(d.order ?? base?.order ?? 0),
    active: d.active !== false,
  };
  return merged.price > 0 ? merged : null;
}

// ---------- Signatures ----------
export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET ?? "").update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqual(expected, signature);
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET ?? "").update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// ---------- Access ----------
// Creates one enrollment per unlocked product. Included packs expire together with a time-limited plan.
// Never shortens an existing longer or lifetime enrollment.
export async function grantAccess(uid: string, product: Product, paymentId: string) {
  const db = adminDb();
  const now = Date.now();
  const expires = product.durationDays > 0 ? Timestamp.fromMillis(now + product.durationDays * 86_400_000) : null;
  for (const pid of [product.id, ...product.includes]) {
    const ref = db.collection("enrollments").doc(`${uid}_${pid}`);
    const cur = await ref.get();
    let expiresAt = expires;
    if (cur.exists) {
      const old = cur.data()?.expiresAt as Timestamp | null | undefined;
      if (old === null) expiresAt = null; // already lifetime
      else if (old && expires && old.toMillis() > expires.toMillis()) expiresAt = old;
    }
    await ref.set({ uid, productId: pid, startAt: Timestamp.fromMillis(now), expiresAt, paymentId, source: product.id }, { merge: true });
  }
}

// Removes the access that a given payment granted (used for refunds).
export async function revokeByPayment(paymentId: string) {
  const snap = await adminDb().collection("enrollments").where("paymentId", "==", paymentId).get();
  await Promise.all(snap.docs.map((d) => d.ref.delete()));
  return snap.size;
}

// ---------- Settlement ----------
// Confirms the payment with Razorpay itself (status and amount), captures it if needed, then grants access once.
// Safe to call from the browser confirmation, the webhook and the sync route, in any order.
export async function settlePayment(orderId: string, razorpayPaymentId: string) {
  const db = adminDb();
  const ref = db.collection("payments").doc(orderId);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false as const, reason: "unknown-order" };
  const p = snap.data()!;
  if (p.status === "paid") return { ok: true as const, already: true };
  if (p.status === "refunded") return { ok: false as const, reason: "refunded" };

  const paid = await getRazorpayPayment(razorpayPaymentId);
  if (!paid.ok) return { ok: false as const, reason: "razorpay-unreachable" };
  let pay = paid.data;
  if (pay.order_id !== orderId) return { ok: false as const, reason: "order-mismatch" };
  if (pay.amount !== Math.round(Number(p.amount) * 100)) return { ok: false as const, reason: "amount-mismatch" };
  if (pay.status === "authorized") {
    const cap = await capturePayment(razorpayPaymentId, pay.amount);
    if (!cap.ok) return { ok: false as const, reason: "capture-failed" };
    pay = cap.data;
  }
  if (pay.status !== "captured") return { ok: false as const, reason: `payment-${pay.status}` };

  const product = await loadProduct(String(p.productId));
  if (!product) return { ok: false as const, reason: "unknown-product" };
  await grantAccess(String(p.uid), product, razorpayPaymentId);
  await ref.set({ status: "paid", paymentId: razorpayPaymentId, paidAt: Timestamp.now() }, { merge: true });
  return { ok: true as const, already: false };
}

// Finds a payment record by the Razorpay payment id (used by refund webhooks).
export async function findPaymentByRazorpayId(paymentId: string) {
  const q = await adminDb().collection("payments").where("paymentId", "==", paymentId).limit(1).get();
  return q.empty ? null : q.docs[0];
}
