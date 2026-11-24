import Link from "next/link";
import { ArrowRight, Brain, Compass, Fingerprint, Flag, ListChecks, MessagesSquare, Users } from "lucide-react";
import Reveal from "@/components/Reveal";

const measures = [
  { Icon: Brain, label: "Mind", c: "#3b9cff", fg: "#fff" },
  { Icon: Fingerprint, label: "Personality", c: "#ffd21f", fg: "#0c2556" },
  { Icon: Flag, label: "Leadership", c: "#4a7a2e", fg: "#fff" },
  { Icon: Compass, label: "Decisions", c: "#ff8f1f", fg: "#fff" },
];

const days = [
  { sub: "Day 1", label: "Screening", c: "#3b9cff", fg: "#fff", Icon: ListChecks },
  { sub: "Day 2", label: "Psychology", c: "#ffd21f", fg: "#0c2556", Icon: Brain },
  { sub: "Day 3–4", label: "GTO", c: "#4a7a2e", fg: "#fff", Icon: Users },
  { sub: "Day 5", label: "Conference", c: "#ff8f1f", fg: "#fff", Icon: MessagesSquare },
];

type TileProps = { Icon: typeof Brain; sub?: string; label: string; c: string; fg: string; dark?: boolean };

function Tile({ Icon, sub, label, c, fg, dark }: TileProps) {
  return (
    <li
      className={`group/tile relative flex h-[9.25rem] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 text-center transition duration-300 hover:-translate-y-1.5 ${
        dark ? "border-white/15 bg-white/[0.07] hover:bg-white/[0.12]" : "border-[#dfe2e8] bg-white hover:shadow-lg"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
      <span
        className="grid h-12 w-12 place-items-center rounded-xl transition duration-300 group-hover/tile:scale-110 group-hover/tile:rotate-3"
        style={{ background: c, color: fg, boxShadow: `0 12px 24px -10px ${c}` }}
      >
        <Icon size={24} />
      </span>
      <span className={`text-[0.78rem] font-extrabold uppercase leading-tight tracking-wide ${dark ? "text-white" : "text-[#0c2556]"}`}>
        {<span className={`block min-h-[1rem] text-[0.65rem] ${dark ? "text-white/60" : "text-[#6b7589]"}`}>{sub}</span>}
        {label}
      </span>
    </li>
  );
}

export default function AboutProcess() {
  return (
    <section id="about" className="bg-dots relative bg-white">
      <div className="container-x grid items-stretch gap-6 py-12 lg:grid-cols-2 md:py-14">
        {/* Box 1: What is SSB */}
        <Reveal className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe2e8] bg-gradient-to-br from-[#f6f7f9] to-[#e9ecf1] p-6 shadow-[0_20px_44px_-28px_rgba(30,35,50,0.5)] md:p-8">
            <span className="pointer-events-none absolute -right-2 -top-8 select-none text-[11rem] font-black leading-none text-[#0c2556]/[0.05]" aria-hidden="true">?</span>
            <p className="relative flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-army">
              <span className="h-px w-8 bg-army" /> Know the board
            </p>
            <h2 className="relative mt-2 text-3xl font-black uppercase tracking-tight text-[#0c2556] md:text-4xl">
              What is <span className="bg-gradient-to-r from-[#1c4cb0] to-[#3b9cff] bg-clip-text text-transparent">SSB?</span>
            </h2>
            <p className="relative mt-4 text-[0.95rem] leading-relaxed text-[#4d5b76] md:min-h-[5.6rem]">
              The Services Selection Board is a five-day assessment conducted by the Indian Armed Forces to decide who walks into
              Officer Training Academy. It is not an exam you can pass with a syllabus. It tests your mind, personality, leadership
              and decision-making under pressure.
            </p>
            <ul className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {measures.map((m) => (
                <Tile key={m.label} {...m} />
              ))}
            </ul>
            <p className="relative mt-6 mb-6 border-l-4 border-gold pl-3 text-base font-black uppercase text-[#0c2556]">
              The uniform is earned in the weeks no one sees.
            </p>
            <Link href="/ssb-tasks" className="btn-primary relative mt-auto w-fit !px-6 !py-3 !text-sm">
              Explore the eight tasks <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        {/* Box 2: Selection process (clickable) */}
        <Reveal delay={120} className="h-full">
          <Link
            href="/ssb-process"
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#3a4153] bg-gradient-to-br from-[#171b24] via-[#2b3140] to-[#171b24] p-6 text-white shadow-[0_26px_50px_-28px_rgba(23,27,36,0.9)] transition duration-300 hover:-translate-y-1 hover:border-gold/60 md:p-8"
          >
            <span className="pointer-events-none absolute -right-2 -top-8 select-none text-[11rem] font-black leading-none text-white/[0.05]" aria-hidden="true">5</span>
            <div className="absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
            <p className="relative flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> The five day plan
            </p>
            <h2 className="relative mt-2 text-3xl font-black uppercase tracking-tight md:text-4xl">The SSB selection process</h2>
            <p className="relative mt-4 text-[0.95rem] leading-relaxed text-white/75 md:min-h-[5.6rem]">
              Two stages. Five days. See exactly what happens each day, every test, and what the assessors look for.
            </p>
            <ul className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {days.map((d) => (
                <Tile key={d.sub} Icon={d.Icon} sub={d.sub} label={d.label} c={d.c} fg={d.fg} dark />
              ))}
            </ul>
            <p className="relative mt-6 mb-6 border-l-4 border-gold pl-3 text-base font-black uppercase">
              Every day is scored separately. Consistency wins.
            </p>
            <span className="btn-gold btn-shine relative mt-auto w-fit !px-6 !py-3 !text-sm">
              View full details <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
