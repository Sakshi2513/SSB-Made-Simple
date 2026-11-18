"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { SearchItem } from "@/content/searchIndex";

export default function SearchBox({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return items.filter((i) => {
      const hay = `${i.title} ${i.text}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, items]);

  return (
    <div>
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search TAT, PIQ, GTO, fitness..."
          aria-label="Search"
          className="w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-3"
        />
      </div>
      <div className="mt-6 space-y-3" aria-live="polite">
        {q && results.length === 0 && <p className="text-muted">No results for “{q}”.</p>}
        {results.map((r) => (
          <Link key={r.href} href={r.href} className="card block hover:border-navy">
            <span className="text-xs font-semibold uppercase tracking-wide text-olive">{r.type}</span>
            <span className="block font-display text-xl font-semibold">{r.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
