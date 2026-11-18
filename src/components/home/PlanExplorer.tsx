"use client";

import { useState } from "react";
import { BookOpen, Brain, Plus, Users } from "lucide-react";
import { weeks } from "@/content/home";

const phases = [
  { Icon: BookOpen, days: "Days 1–7", from: 1, to: 7, title: weeks[0].title, text: weeks[0].text, outcome: "You understand the Board, and your speed and accuracy are climbing." },
  { Icon: Brain, days: "Days 8–14", from: 8, to: 14, title: weeks[1].title, text: weeks[1].text, outcome: "Your stories and answers read as one honest, consistent person." },
  { Icon: Users, days: "Days 15–21", from: 15, to: 21, title: weeks[2].title, text: weeks[2].text, outcome: "You lead, speak and stay composed inside a group under pressure." },
  { Icon: Plus, days: "Days 22–30", from: 22, to: 30, title: weeks[3].title, text: weeks[3].text, outcome: "You walk into Centre Day calm, organised and ready." },
];

export default function PlanExplorer() {
  const [active, setActive] = useState(0);
  const p = phases[active];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid h-full overflow-hidden rounded-3xl border border-[#3a4153] bg-gradient-to-br from-[#171b24] via-[#2b3140] to-[#171b24] shadow-[0_30px_60px_-30px_rgba(12,37,86,0.8)] lg:grid-cols-[12.5rem_1fr]">
      {/* tabs */}
      <div role="tablist" aria-label="Plan phases" className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
        {phases.map(({ Icon, days: d, title }, i) => {
          const on = i === active;
          return (
            <button
              key={title}
              role="tab"
              id={`phase-tab-${i}`}
              aria-selected={on}
              aria-controls="phase-panel"
              onClick={() => setActive(i)}
              className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-2.5 py-2.5 text-left transition duration-200 lg:flex-1 lg:shrink ${
                on
                  ? "border-gold/60 bg-gradient-to-r from-gold/20 to-gold/5 shadow-[0_10px_30px_-14px_rgba(255,210,31,0.7)]"
                  : "border-transparent hover:border-white/15 hover:bg-white/5"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                  on ? "bg-gold text-[#0c2556]" : "bg-white/10 text-white/70 group-hover:text-gold"
                }`}
              >
                <Icon size={18} strokeWidth={Icon === Plus ? 3 : 2.2} />
              </span>
              <span className="min-w-0">
                <span className={`block text-[0.7rem] font-bold uppercase tracking-[0.18em] ${on ? "text-gold" : "text-white/50"}`}>{d}</span>
                <span className={`block text-[0.88rem] font-extrabold capitalize leading-tight ${on ? "text-white" : "text-white/75"}`}>{title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div role="tabpanel" id="phase-panel" aria-labelledby={`phase-tab-${active}`} className="flex flex-col p-4 md:p-5">
        <div key={active} className="intro flex flex-1 flex-col" style={{ "--d": "0ms" } as React.CSSProperties}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold">
              Phase {active + 1} · {p.days}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-tight text-white md:text-2xl">{p.title}</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.text.split(", ").map((c) => (
              <span key={c} className="rounded-md border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[0.82rem] font-semibold capitalize text-white/90">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-3.5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">By the end of this phase</p>
            <p className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-white">{p.outcome}</p>
          </div>

          {/* 30-day timeline widget */}
          <div className="mt-auto pt-4">
            <div className="flex gap-[3px]" aria-hidden="true">
              {days.map((d) => {
                const idx = phases.findIndex((x) => d >= x.from && d <= x.to);
                const cls = idx === active ? "bg-gold shadow-[0_0_12px_rgba(255,210,31,0.7)]" : idx < active ? "bg-[#3b9cff]/70" : "bg-white/15";
                return <span key={d} className={`h-5 flex-1 rounded-[3px] transition-colors duration-300 ${cls}`} />;
              })}
            </div>
            <div className="mt-2 flex justify-between text-xs font-bold uppercase tracking-wider text-white/50">
              <span>Day 1</span>
              <span>Day 30 · Centre Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
