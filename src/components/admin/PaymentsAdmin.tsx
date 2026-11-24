"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { auth } from "@/lib/firebase";
import { Panel, Status, useCollection } from "./ui";

const ms = (v: unknown) => (v as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;

const badge: Record<string, string> = {
  paid: "bg-[#e4f1dc] text-[#3d6b24]",
  refunded: "bg-[#eef3fb] text-[#1c4cb0]",
  partially_refunded: "bg-[#eef3fb] text-[#1c4cb0]",
  failed: "bg-red-50 text-red-600",
  created: "bg-[#fff3d6] text-[#8a5a00]",
};
const label: Record<string, string> = { paid: "Paid", refunded: "Refunded", partially_refunded: "Part refunded", failed: "Failed", created: "Not completed" };

export default function PaymentsAdmin() {
  const { rows, error } = useCollection("payments");
  const users = useCollection("users");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");
  const names = useMemo(() => Object.fromEntries((users.rows ?? []).map((u) => [u.id, String(u.name || u.email || "Unknown")])), [users.rows]);
  const list = useMemo(() => [...(rows ?? [])].sort((a, b) => ms(b.createdAt) - ms(a.createdAt)), [rows]);
  const paid = list.filter((r) => r.status === "paid");
  const refunded = list.filter((r) => r.status === "refunded");
  const revenue = paid.reduce((s, r) => s + Number(r.amount ?? 0), 0);

  async function refund(orderId: string, who: string, amount: number) {
    if (!confirm(`Refund ₹${amount} to ${who}? The money goes back to the student and their access is removed. This cannot be undone.`)) return;
    setBusy(orderId);
    setMsg("");
    try {
      const res = await fetch("/api/admin/refund", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}` }, body: JSON.stringify({ orderId }) });
      const j = await res.json();
      setMsg(res.ok ? `Refund started. Access removed (${j.revoked} item${j.revoked === 1 ? "" : "s"}).` : `Could not refund: ${j.error}`);
    } catch {
      setMsg("Could not refund: network error.");
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-gradient-to-br from-[#0c2556] to-[#12306b] p-4 text-white"><p className="text-xs font-bold uppercase tracking-wider text-white/70">Revenue</p><p className="mt-1 text-3xl font-black text-gold">₹{revenue.toLocaleString("en-IN")}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">Paid orders</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{paid.length}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">Refunded</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{refunded.length}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">Not completed</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{list.filter((r) => r.status === "created" || r.status === "failed").length}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">Average order</p><p className="mt-1 text-3xl font-black text-[#0c2556]">₹{paid.length ? Math.round(revenue / paid.length) : 0}</p></div>
      </div>
      <Panel title={`Payments (${list.length})`}>
        {error && <Status msg={`Could not load: ${error}`} />}
        <Status msg={msg} />
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eef1f6] text-xs font-bold uppercase tracking-wider text-[#6b7589]"><th className="py-2 pr-3">Student</th><th className="py-2 pr-3">Product</th><th className="py-2 pr-3">Amount</th><th className="py-2 pr-3">Status</th><th className="py-2 pr-3">When</th><th className="py-2 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-[#eef1f6]">
              {list.map((r) => {
                const who = names[String(r.uid)] ?? String(r.email || r.uid);
                const st = String(r.status);
                return (
                  <tr key={r.id}>
                    <td className="py-2.5 pr-3"><p className="font-bold text-[#0c2556]">{who}</p><p className="text-xs text-[#6b7589]">{String(r.email ?? "")}</p></td>
                    <td className="py-2.5 pr-3 text-[#4d5b76]"><p>{String(r.productName ?? r.productId)}</p><p className="font-mono text-[0.65rem] text-[#6b7589]">{String(r.paymentId ?? r.id)}</p></td>
                    <td className="py-2.5 pr-3 font-bold text-[#0c2556]">₹{String(r.amount)}</td>
                    <td className="py-2.5 pr-3"><span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${badge[st] ?? badge.created}`}>{label[st] ?? st}</span>{st === "failed" && r.failureReason ? <p className="mt-1 max-w-[12rem] text-[0.65rem] text-red-600">{String(r.failureReason)}</p> : null}</td>
                    <td className="py-2.5 pr-3 text-[#6b7589]">{ms(r.createdAt) ? new Date(ms(r.createdAt)).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-"}</td>
                    <td className="py-2.5 text-right">
                      {st === "paid" && (
                        <button disabled={busy === r.id} onClick={() => refund(r.id, who, Number(r.amount))} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"><RotateCcw size={13} /> {busy === r.id ? "Refunding..." : "Refund"}</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {list.length === 0 && !error && <p className="py-6 text-center text-sm text-[#6b7589]">No payments yet.</p>}
        </div>
      </Panel>
    </div>
  );
}
