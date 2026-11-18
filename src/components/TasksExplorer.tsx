"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Fingerprint, Image as ImageIcon, ListChecks, MessageSquare, Mic, Users, Zap } from "lucide-react";
import { ssbStages } from "@/content/ssbStages";

const icons: Record<string, typeof BookOpen> = {
  oir: ListChecks,
  ppdt: ImageIcon,
  tat: BookOpen,
  wat: MessageSquare,
  srt: Zap,
  sdt: Fingerprint,
  gto: Users,
  "personal-interview": Mic,
};

const dayMeta: Record<string, { c: string; fg: string }> = {
  "Day 1": { c: "#3b9cff", fg: "#fff" },
  "Day 2": { c: "#ffd21f", fg: "#0c2556" },
  "Day 3-4": { c: "#4a7a2e", fg: "#fff" },
  "Day 5": { c: "#ff8f1f", fg: "#fff" },
};

const filters = ["All", "Day 1", "Day 2", "Day 3-4", "Day 5"];

export default function TasksExplorer() {
  const [filter, setFilter] = useState("All");
  const list = ssbStages.filter((s) => filter === "All" || s.day === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter tasks by day" className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => {
          const on = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                on ? "border-[#0c2556] bg-[#0c2556] text-white shadow-lg" : "border-[#dfe2e8] bg-white text-[#0c2556] hover:border-gold"
              }`}
            >
              {f === "All" ? "All Tasks" : f.replace("-", "–")}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => {
          const Icon = icons[s.slug] ?? BookOpen;
          const m = dayMeta[s.day] ?? dayMeta["Day 1"];
          return (
            <li key={s.slug} className="intro" style={{ "--d": "0ms" } as React.CSSProperties}>
              <Link
                href={`/ssb-tasks/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe2e8] bg-gradient-to-br from-[#f8f9fb] to-[#eceff3] p-6 shadow-[0_18px_40px_-28px_rgba(30,35,50,0.5)] transition duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_28px_50px_-26px_rgba(30,35,50,0.6)]"
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: m.c }} />
                <span className="pointer-events-none absolute -right-3 -top-6 select-none text-8xl font-black leading-none text-[#0c2556]/[0.05]" aria-hidden="true">
                  {s.short}
                </span>
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl transition duration-300 group-hover:rotate-3 group-hover:scale-110"
                    style={{ background: m.c, color: m.fg, boxShadow: `0 14px 26px -12px ${m.c}` }}
                  >
                    <Icon size={26} />
                  </span>
                  <span className="rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider" style={{ background: m.c, color: m.fg }}>
                    {s.day.replace("-", "–")}
                  </span>
                </div>
                <h3 className="relative mt-6 text-4xl font-black tracking-tight text-[#0c2556]">{s.short}</h3>
                <p className="relative mt-1 text-sm font-bold text-[#0c2556]">{s.title.split(": ")[1] ?? s.title}</p>
                <p className="relative mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#4d5b76]">{s.summary}</p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {s.olqs.slice(0, 2).map((o) => (
                    <span key={o} className="rounded-md border border-[#dfe2e8] bg-white px-2 py-0.5 text-[0.7rem] font-semibold text-[#0c2556]">
                      {o}
                    </span>
                  ))}
                </div>
                <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-extrabold uppercase tracking-wider text-[#1c4cb0]">
                  Read Guide <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
