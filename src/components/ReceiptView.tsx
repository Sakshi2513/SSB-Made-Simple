"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { BadgeCheck, Printer, RotateCcw } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import { getBuiltinProduct } from "@/content/products";

type Pay = { orderId: string; productId: string; productName: string; amount: number; status: string; paymentId?: string; email?: string; name?: string; at: number; paidAt: number };
const ms = (v: unknown) => (v as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;
const fmtDate = (t: number) => (t ? new Date(t).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "-");
const fmtTime = (t: number) => (t ? new Date(t).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "");

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const t = r < 20 ? ones[r] : `${tens[Math.floor(r / 10)]}${r % 10 ? " " + ones[r % 10] : ""}`;
  return [h ? `${ones[h]} Hundred` : "", t].filter(Boolean).join(" ");
}
function rupeesInWords(n: number): string {
  if (n === 0) return "Zero Rupees Only";
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  if (crore) parts.push(`${below1000(crore)} Crore`);
  if (lakh) parts.push(`${below1000(lakh)} Lakh`);
  if (thousand) parts.push(`${below1000(thousand)} Thousand`);
  if (rest) parts.push(below1000(rest));
  return `${parts.join(" ")} Rupees Only`;
}

const DEMO: Pay = { orderId: "order_Nxxxxxxxxxxxx1", productId: "plan-30day", productName: "30-Day SSB Action Plan", amount: 999, status: "paid", paymentId: "pay_Nxxxxxxxxxxxx2", email: "student@example.com", name: "Sample Student", at: Date.now(), paidAt: Date.now() };

// Single-page A4 payment receipt. Prints cleanly (browser Print, then Save as PDF). This is a receipt, not a GST tax invoice.
export default function ReceiptView() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const order = useSearchParams().get("order") ?? "";
  const demo = order.startsWith("demo") && process.env.NODE_ENV !== "production"; // sample receipt for design preview, development only
  const [pay, setPay] = useState<Pay | null | undefined>(demo ? { ...DEMO, status: order === "demo-refunded" ? "refunded" : "paid" } : undefined);

  useEffect(() => {
    if (!demo && !loading && !user) router.replace("/login");
  }, [demo, loading, user, router]);

  useEffect(() => {
    if (demo || !user || !db || !order) return;
    getDoc(doc(db, "payments", order))
      .then((s) => {
        const d = s.data();
        setPay(
          d
            ? { orderId: s.id, productId: String(d.productId), productName: String(d.productName ?? d.productId), amount: Number(d.amount), status: String(d.status), paymentId: d.paymentId, email: d.email, name: user.displayName ?? "", at: ms(d.createdAt), paidAt: ms(d.paidAt) }
            : null,
        );
      })
      .catch(() => setPay(null));
  }, [demo, user, order]);

  if (!demo && (loading || pay === undefined)) return <p className="py-16 text-center text-[#6b7589]">Loading receipt...</p>;
  if (!pay) return <p className="py-16 text-center text-[#4d5b76]">Receipt not found. <Link href="/library" className="font-bold text-[#1c4cb0]">Back to My Library</Link></p>;

  const product = getBuiltinProduct(pay.productId);
  const access = product ? (product.durationDays > 0 ? `${product.durationDays} days access` : "Lifetime access") : "Access in My Library";
  const refunded = pay.status === "refunded";
  const receiptNo = `SMS-${pay.orderId.replace(/^order_/, "").slice(-8).toUpperCase()}`;
  const when = pay.paidAt || pay.at;
  const money = `₹${pay.amount.toLocaleString("en-IN")}.00`;

  // Green for paid, blue for refunded
  const tone = refunded
    ? { solid: "#1c4cb0", soft: "#eaf0fb", border: "#bcd0f3", text: "#1c4cb0", word: "REFUNDED", line: "Payment refunded" }
    : { solid: "#2f8f3a", soft: "#e8f6e6", border: "#b7e0b2", text: "#1f6e2a", word: "PAID", line: "Payment received" };

  return (
    <div className="mx-auto max-w-[820px]">
      {demo && <p className="mb-3 rounded-lg bg-[#fff3d6] px-3 py-2 text-center text-xs font-bold text-[#8a5a00] print:hidden">Sample receipt (development preview)</p>}

      {/* A4 sheet */}
      <article className="receipt-sheet relative overflow-hidden rounded-2xl border border-[#dfe6f2] bg-white shadow-[0_24px_60px_-34px_rgba(12,37,86,0.6)] print:rounded-none print:border-0 print:shadow-none">
        <div className="h-2" style={{ background: tone.solid }} />

        {/* white header */}
        <header className="flex items-center justify-between gap-4 bg-white px-8 pb-4 pt-5">
          <div className="flex items-center gap-3">
            <Image src="/brand/emblem.webp" alt="" width={52} height={52} className="h-[52px] w-[52px] object-contain" />
            <div className="leading-none">
              <p className="text-[1.7rem] font-black tracking-tight text-[#0c2556]">SSB</p>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#1c4cb0]">Made Simple</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[1.65rem] font-black uppercase leading-none tracking-wide text-[#0c2556]">Receipt</p>
            <p className="mt-1.5 font-mono text-xs font-bold text-[#6b7589]">No. {receiptNo}</p>
          </div>
        </header>
        <div className="mx-8 h-px bg-[#e3e8f1]" />

        <div className="px-8 pb-6 pt-5">
          {/* status banner */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border px-5 py-4" style={{ background: tone.soft, borderColor: tone.border }}>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ background: tone.solid }}>
                {refunded ? <RotateCcw size={22} /> : <BadgeCheck size={25} />}
              </span>
              <div>
                <p className="text-lg font-black leading-tight" style={{ color: tone.text }}>{tone.line}</p>
                <p className="text-xs font-semibold text-[#4d5b76]">{fmtDate(when)}{fmtTime(when) ? ` at ${fmtTime(when)}` : ""}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black leading-none" style={{ color: tone.text }}>{money}</p>
              <span className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-[0.7rem] font-black tracking-[0.2em] text-white" style={{ background: tone.solid }}>{tone.word}</span>
            </div>
          </div>

          {/* parties */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <section>
              <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#6b7589]">Billed to</h2>
              <p className="mt-1 text-base font-black text-[#0c2556]">{pay.name || "Student"}</p>
              <p className="text-sm text-[#4d5b76]">{pay.email || user?.email}</p>
            </section>
            <section className="sm:text-right">
              <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#6b7589]">Issued by</h2>
              <p className="mt-1 text-base font-black text-[#0c2556]">{siteConfig.name}</p>
              <p className="text-sm text-[#4d5b76]">{siteConfig.contact.email}</p>
              <p className="text-sm text-[#4d5b76]">{siteConfig.contact.phone}</p>
            </section>
          </div>

          {/* line items */}
          <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm">
            <thead>
              <tr className="bg-[#f1f4f9] text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#4d5b76]">
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Access</th>
                <th className="px-4 py-2.5 text-center">Qty</th>
                <th className="px-4 py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#eef1f6]">
                <td className="px-4 py-3.5">
                  <p className="font-extrabold text-[#0c2556]">{pay.productName}</p>
                  <p className="text-xs text-[#6b7589]">Digital study content</p>
                </td>
                <td className="px-4 py-3.5 text-[#4d5b76]">{access}</td>
                <td className="px-4 py-3.5 text-center text-[#4d5b76]">1</td>
                <td className="px-4 py-3.5 text-right font-bold text-[#0c2556]">{money}</td>
              </tr>
            </tbody>
          </table>

          {/* totals */}
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <p className="max-w-[16rem] pt-2 text-xs italic text-[#6b7589]">{rupeesInWords(Math.round(pay.amount))}</p>
            <div className="w-full max-w-xs">
              <div className="flex justify-between px-1 py-1.5 text-sm text-[#4d5b76]"><span>Subtotal</span><span>{money}</span></div>
              <div className="flex items-center justify-between rounded-xl px-4 py-3 text-white" style={{ background: tone.solid }}>
                <span className="text-xs font-bold uppercase tracking-[0.18em]">{refunded ? "Amount refunded" : "Total paid"}</span>
                <span className="text-xl font-black">{money}</span>
              </div>
            </div>
          </div>

          {/* payment reference */}
          <section className="mt-5 rounded-xl border border-[#e3e8f1] bg-[#f8fafc] p-4">
            <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#6b7589]">Payment details</h2>
            <dl className="mt-2 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
              <div><dt className="inline font-bold text-[#4d5b76]">Paid through: </dt><dd className="inline text-[#0c2556]">Razorpay (UPI / card / netbanking)</dd></div>
              <div><dt className="inline font-bold text-[#4d5b76]">Currency: </dt><dd className="inline text-[#0c2556]">INR (₹)</dd></div>
              <div className="sm:col-span-2"><dt className="inline font-bold text-[#4d5b76]">Order ID: </dt><dd className="inline break-all font-mono text-[#0c2556]">{pay.orderId}</dd></div>
              <div className="sm:col-span-2"><dt className="inline font-bold text-[#4d5b76]">Payment ID: </dt><dd className="inline break-all font-mono text-[#0c2556]">{pay.paymentId || "-"}</dd></div>
            </dl>
          </section>

          {/* footer */}
          <footer className="mt-6 border-t border-[#eef1f6] pt-4 text-center">
            <p className="text-sm font-extrabold text-[#0c2556]">Thank you for choosing {siteConfig.name}. Best wishes for your SSB.</p>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-[#6b7589]">
              This is a computer-generated payment receipt and needs no signature. It is not a GST tax invoice. For help with this payment, write to {siteConfig.contact.email} or message us on WhatsApp at {siteConfig.contact.phone}, quoting receipt {receiptNo}.
            </p>
            <p className="mt-1.5 text-[0.7rem] font-bold text-[#1c4cb0]">{siteConfig.url.replace(/^https?:\/\//, "")}</p>
          </footer>
        </div>
        <div className="h-1.5 bg-gradient-to-r from-[#4a7a2e] via-[#1c4cb0] to-[#3b9cff]" />
      </article>

      <div className="mt-5 flex flex-wrap gap-3 print:hidden">
        <button onClick={() => window.print()} className="btn-gold btn-shine"><Printer size={16} /> Download PDF / Print</button>
        <Link href="/library" className="btn-outline">Back to My Library</Link>
        <p className="w-full text-xs text-[#6b7589]">In the print window, choose <b>Save as PDF</b> as the destination. Turn off &quot;Headers and footers&quot; for the cleanest page.</p>
      </div>
    </div>
  );
}
