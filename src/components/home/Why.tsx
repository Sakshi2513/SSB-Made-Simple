import { BookOpen, CalendarCheck, ClipboardCheck, FileCheck, Brain, Users } from "lucide-react";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { whyPoints } from "@/content/home";

const icons = [CalendarCheck, BookOpen, ClipboardCheck, Brain, Users, FileCheck];

export default function Why() {
  return (
    <section className="relative overflow-hidden bg-[#0a1210] text-white">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(45% 50% at 8% 10%, rgba(74,122,46,.45), transparent 70%), radial-gradient(40% 45% at 95% 95%, rgba(255,210,31,.14), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="bg-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gold" /> Small steps, big dreams
          </span>
          <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl">
            The SSB Made Simple <span className="text-gold-gradient">Way</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            No unverified shortcuts. No borrowed strategies. Everything here has been tested across hundreds of boards: what gets
            recommended, what gets screened out, and exactly why.
          </p>
          <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-4xl font-black text-gold"><Counter to={1200} suffix="+" /></p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/70">Candidates mentored</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-4xl font-black text-gold"><Counter to={10} suffix="+" /></p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/70">Years SSB experience</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-khaki">Why SSB Made Simple?</p>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyPoints.map((w, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal as="li" key={w} delay={i * 70} className="h-full">
                  <div className="group flex h-full items-start gap-3.5 rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.09]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ffe985] to-[#ffc800] text-[#0c2556] shadow-[0_10px_22px_-10px_rgba(255,210,31,0.8)] transition group-hover:scale-110">
                      <Icon size={22} strokeWidth={2.2} />
                    </span>
                    <p className="pt-0.5 text-[0.95rem] font-semibold leading-snug text-white/95">{w}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
