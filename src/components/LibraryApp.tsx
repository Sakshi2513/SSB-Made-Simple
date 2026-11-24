"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { CheckCircle2, Download, FileText, Lock, PlayCircle, Receipt, ShoppingBag } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Article from "@/components/Article";
import { builtinProducts } from "@/content/products";

type Item = { id: string; kind: string; title: string; description: string; url: string; body: string; order: number };
type Purchase = { id: string; name: string; amount: number; status: string; at: number };
type Owned = { productId: string; name: string; expires: number | null; items: Item[] };

const ytId = (u: string) => u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];

export default function LibraryApp() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const justPaid = useSearchParams().get("paid") === "1";
  const [owned, setOwned] = useState<Owned[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !db) return;
    const database = db;
    (async () => {
      const names: Record<string, string> = Object.fromEntries(builtinProducts.map((p) => [p.id, p.name]));
      try {
        (await getDocs(collection(database, "products"))).forEach((d) => {
          if (d.data().name) names[d.id] = String(d.data().name);
        });
      } catch {}
      // Safety net: if a payment succeeded but the unlock was missed, the server checks Razorpay and unlocks it.
      try {
        await fetch("/api/payments/sync", { method: "POST", headers: { Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}` } });
      } catch {}
      try {
        const pay = await getDocs(query(collection(database, "payments"), where("uid", "==", user.uid)));
        setPurchases(
          pay.docs
            .map((d) => ({ id: d.id, name: String(d.data().productName ?? d.data().productId), amount: Number(d.data().amount ?? 0), status: String(d.data().status), at: (d.data().createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0 }))
            .sort((a, b) => b.at - a.at),
        );
      } catch {}
      const enr = await getDocs(query(collection(database, "enrollments"), where("uid", "==", user.uid)));
      const now = Date.now();
      const active = enr.docs
        .map((d) => ({ pid: String(d.data().productId), exp: (d.data().expiresAt as { toMillis?: () => number } | null)?.toMillis?.() ?? null }))
        .filter((e) => e.exp === null || e.exp > now);
      const out: Owned[] = [];
      for (const e of active) {
        let items: Item[] = [];
        try {
          const snap = await getDocs(query(collection(database, "premium"), where("productId", "==", e.pid)));
          items = snap.docs
            .map((d) => ({
              id: d.id,
              kind: String(d.data().kind),
              title: String(d.data().title ?? ""),
              description: String(d.data().description ?? ""),
              url: String(d.data().url ?? ""),
              body: String(d.data().body ?? ""),
              order: Number(d.data().order ?? 0),
            }))
            .sort((a, b) => a.order - b.order);
        } catch {}
        out.push({ productId: e.pid, name: names[e.pid] ?? e.pid, expires: e.exp, items });
      }
      setOwned(out);
    })().catch(() => setOwned([]));
  }, [user]);

  if (loading || !user || owned === null) return <p className="py-16 text-center text-[#6b7589]">Loading your library...</p>;

  return (
    <div className="space-y-6">
      {justPaid && (
        <div role="status" className="flex items-center gap-3 rounded-2xl bg-[#e4f1dc] p-4 font-bold text-[#3d6b24]">
          <CheckCircle2 /> Payment successful. Your purchase is unlocked below.
        </div>
      )}
      {owned.length === 0 && (
        <div className="rounded-3xl border border-[#dfe6f2] bg-white p-8 text-center shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)]">
          <Lock className="mx-auto text-[#1c4cb0]" size={32} />
          <h2 className="mt-3 text-xl font-black text-[#0c2556]">Nothing unlocked yet</h2>
          <p className="mt-1 text-[#4d5b76]">Buy a pack or the 30-day plan and it appears here instantly.</p>
          <Link href="/subscription" className="btn-gold btn-shine mt-5"><ShoppingBag size={16} /> View plans</Link>
        </div>
      )}
      {owned.map((o) => (
        <section key={o.productId} className="rounded-3xl border border-[#dfe6f2] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-black text-[#0c2556]">{o.name}</h2>
            <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-extrabold text-[#1c4cb0]">
              {o.expires ? `Access until ${new Date(o.expires).toLocaleDateString("en-IN", { dateStyle: "medium" })}` : "Lifetime access"}
            </span>
          </div>
          {o.items.length === 0 && <p className="mt-3 text-sm text-[#6b7589]">Content for this pack is being added. You will see it here as soon as it is ready.</p>}
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {o.items.map((it) => {
              const yt = it.kind === "video" ? ytId(it.url) : null;
              return (
                <li key={it.id} className={`rounded-2xl border border-[#dfe6f2] bg-[#f6f8fc] p-4 ${yt || it.kind === "article" ? "md:col-span-2" : ""}`}>
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0c2556] text-gold">
                      {it.kind === "video" ? <PlayCircle size={19} /> : it.kind === "article" ? <FileText size={19} /> : <Download size={19} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold text-[#0c2556]">{it.title}</p>
                      {it.description && <p className="text-sm text-[#4d5b76]">{it.description}</p>}
                      {it.kind === "pdf" && it.url && (
                        <a href={it.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-sm font-bold text-[#1c4cb0] hover:underline">Download PDF</a>
                      )}
                      {it.kind === "video" && !yt && it.url && (
                        <a href={it.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-sm font-bold text-[#1c4cb0] hover:underline">Watch video</a>
                      )}
                      {it.kind === "article" && (
                        <button onClick={() => setOpen(open === it.id ? null : it.id)} className="mt-2 text-sm font-bold text-[#1c4cb0] hover:underline">
                          {open === it.id ? "Hide" : "Read"}
                        </button>
                      )}
                    </div>
                  </div>
                  {yt && (
                    <div className="mt-3 aspect-video overflow-hidden rounded-xl">
                      <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${yt}`} title={it.title} allowFullScreen />
                    </div>
                  )}
                  {it.kind === "article" && open === it.id && (
                    <div className="mt-4 border-t border-[#dfe6f2] pt-4 text-[#33415c]">
                      <Article body={it.body.split("\n").map((l) => l.trim()).filter(Boolean)} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {purchases.length > 0 && (
        <section className="rounded-3xl border border-[#dfe6f2] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] md:p-6">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#0c2556]"><Receipt size={19} className="text-[#1c4cb0]" /> My purchases</h2>
          <ul className="mt-3 divide-y divide-[#eef1f6]">
            {purchases.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-extrabold text-[#0c2556]">{p.name}</p>
                  <p className="text-xs text-[#6b7589]">₹{p.amount} · {p.at ? new Date(p.at).toLocaleDateString("en-IN", { dateStyle: "medium" }) : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${p.status === "paid" ? "bg-[#e4f1dc] text-[#3d6b24]" : p.status === "refunded" || p.status === "partially_refunded" ? "bg-[#eef3fb] text-[#1c4cb0]" : "bg-[#fff3d6] text-[#8a5a00]"}`}>
                    {p.status === "paid" ? "Paid" : p.status === "refunded" ? "Refunded" : p.status === "partially_refunded" ? "Part refunded" : p.status === "failed" ? "Failed" : "Not completed"}
                  </span>
                  {(p.status === "paid" || p.status === "refunded") && <Link href={`/library/receipt?order=${p.id}`} className="text-sm font-bold text-[#1c4cb0] hover:underline">Receipt</Link>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
