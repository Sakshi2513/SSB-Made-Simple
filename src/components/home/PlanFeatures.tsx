"use client";

import { useEffect, useState } from "react";
import { Brain, FileCheck, Flag, ListChecks, MessagesSquare } from "lucide-react";
import { programContents } from "@/content/home";

const features = [
  { Icon: Brain, title: "TAT framework" },
  { Icon: ListChecks, title: "SRT structure" },
  { Icon: Flag, title: "Command drills" },
  { Icon: MessagesSquare, title: "Story bank" },
  { Icon: FileCheck, title: "Day-0 checklist" },
];

// Highlights each feature in turn; hover or tap pins one.
export default function PlanFeatures() {
  const [on, setOn] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold) return;
    const id = setTimeout(() => setOn((v) => (v + 1) % features.length), 2600);
    return () => clearTimeout(id);
  }, [on, hold]);

  return (
    <ul className="mt-3 flex flex-1 flex-col gap-1.5" onMouseLeave={() => setHold(false)}>
      {features.map(({ Icon, title }, i) => {
        const active = i === on;
        return (
          <li
            key={title}
            onMouseEnter={() => { setOn(i); setHold(true); }}
            onClick={() => setOn(i)}
            className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-2.5 py-2 transition-all duration-300 ${
              active ? "translate-x-1 border-[#ffd21f] bg-white shadow-[0_12px_26px_-16px_rgba(224,168,0,0.9)]" : "border-transparent hover:bg-white/60"
            }`}
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#ffe985] to-[#ffc800] text-[#0c2556]"
              style={active ? { animation: "feat-pop 0.7s ease" } : undefined}
              key={active ? "a" + on : "i" + i}
            >
              <Icon size={18} strokeWidth={2.3} />
            </span>
            <div className="min-w-0">
              <p className="text-[0.8rem] font-extrabold uppercase tracking-tight text-[#0c2556]">{title}</p>
              <p className={`text-[0.72rem] leading-snug text-[#4d5b76] transition-all duration-300 ${active ? "mt-0.5 max-h-16 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:max-h-16 lg:opacity-70"}`}>{programContents[i]}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
