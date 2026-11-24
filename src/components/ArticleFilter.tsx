"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export type ListItem = { href: string; title: string; summary: string; category: string; tags: string[]; meta?: string };

// Category chips + search for blog and study-material lists.
export default function ArticleFilter({ items }: { items: ListItem[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => (cat === "All" || i.category === cat) && (!t || `${i.title} ${i.summary} ${i.tags.join(" ")}`.toLowerCase().includes(t)));
  }, [items, cat, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${cat === c ? "border-[#0c2556] bg-[#0c2556] text-white" : "border-[#dfe6f2] bg-white text-[#4d5b76] hover:border-[#0c2556]"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7589]" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search" className="w-full rounded-xl border border-[#dfe6f2] bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#1c4cb0] focus:ring-4 focus:ring-[#1c4cb0]/15" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => (
          <Link key={p.href} href={p.href} className="group flex flex-col overflow-hidden rounded-3xl border border-[#dfe6f2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] transition duration-300 hover:-translate-y-1 hover:border-gold">
            <p className="w-fit rounded-full bg-[#e4f1dc] px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#3d6b24]">{p.category}</p>
            <h2 className="mt-4 text-xl font-extrabold leading-snug text-[#0c2556]">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4d5b76]">{p.summary}</p>
            {p.tags.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => <span key={t} className="rounded-md bg-[#eef3fb] px-2 py-0.5 text-[0.7rem] font-bold text-[#1c4cb0]">#{t}</span>)}
              </p>
            )}
            {p.meta && <p className="mt-3 text-xs font-semibold text-[#6b7589]">{p.meta}</p>}
          </Link>
        ))}
        {shown.length === 0 && <p className="col-span-full py-10 text-center text-[#6b7589]">Nothing matches. Try another category or search.</p>}
      </div>
    </div>
  );
}
