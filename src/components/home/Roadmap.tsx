import { ArrowRight, Brain, Check, FileCheck, Flag, ListChecks, MessagesSquare, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import PlanExplorer from "./PlanExplorer";
import { siteConfig, program } from "@/config/site";
import { programContents } from "@/content/home";

const enrollHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi, I want to enroll in the 30-Day SSB Action Plan.")}`;

const included = ["All 8 SSB tasks, decoded", "40+ hands-on drills", "220+ interview questions", "Day-0 document checklist"];

const features = [
  { Icon: Brain, title: "TAT framework" },
  { Icon: ListChecks, title: "SRT structure" },
  { Icon: Flag, title: "Command drills" },
  { Icon: MessagesSquare, title: "Story bank" },
  { Icon: FileCheck, title: "Day-0 checklist" },
];

export default function Roadmap() {
  return (
    <section id="plan" className="relative overflow-hidden bg-white text-[#0c2556]">
      {/* check pattern + soft glows */}
      <div
        className="absolute inset-0 opacity-80 [mask-image:radial-gradient(85%_75%_at_50%_45%,#000_30%,transparent)]"
        style={{
          backgroundImage: "conic-gradient(#eff1f4 25%, transparent 0 50%, #eff1f4 0 75%, transparent 0)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(40% 35% at 90% 0%, rgba(255,210,31,.18), transparent 70%), radial-gradient(40% 35% at 5% 100%, rgba(120,130,150,.14), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-10 md:py-12">
        {/* Header */}
        <Reveal className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0c2556]/15 bg-white px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0c2556] shadow-sm">
            <Sparkles size={15} className="text-[#e0a800]" /> Your path to the uniform
          </span>
          <h2 className="mt-4 text-[clamp(1.6rem,6.4vw,2.2rem)] font-black uppercase leading-[1.08] tracking-tight md:text-[clamp(1.6rem,2.6vw,2.4rem)] md:whitespace-nowrap">
            30 DAYS. ONE PLAN.{" "}
            <span className="inline-block rounded-md bg-gold px-3 py-0.5">ZERO GUESSWORK.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-none text-base leading-relaxed text-[#3d4b66] md:whitespace-nowrap">
            A structured, day-by-day preparation plan to build the mindset, skills and personality the SSB looks for.
          </p>
        </Reveal>

        {/* Three compact boxes: roadmap | enroll | what is inside */}
        <div className="mt-7 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-[1.7fr_1fr_1.15fr]">
          <Reveal className="h-full md:col-span-2 xl:col-span-1">
            <PlanExplorer />
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-3xl bg-gradient-to-b from-gold via-white/25 to-white/5 p-px shadow-[0_30px_80px_-30px_rgba(255,210,31,0.45)]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-b from-[#2b3140] to-[#171b24] p-5 text-white">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">Full program</p>
                    <p className="mt-1.5 text-base font-black uppercase leading-tight tracking-tight text-white">{program.name}</p>
                  </div>
                  <svg viewBox="0 0 48 52" className="h-11 w-11 shrink-0" aria-hidden="true">
                    <path d="M24 3 L43 10 V26 C43 38 34 46 24 50 C14 46 5 38 5 26 V10 Z" fill="none" stroke="#ffd21f" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M24 15 l3.2 6.6 7.3 1 -5.3 5.1 1.3 7.2 -6.5 -3.5 -6.5 3.5 1.3 -7.2 -5.3 -5.1 7.3 -1 z" fill="#ffd21f" />
                  </svg>
                </div>

                <p className="relative mt-4 text-5xl font-black leading-none tracking-tight text-gold-gradient" aria-label={`Price ${program.price}`}>
                  {program.price}
                </p>
                
                <ul className="relative my-4 flex flex-1 flex-col justify-center gap-3">
                  {included.map((x) => (
                    <li key={x} className="flex items-center gap-2.5 text-[0.9rem] font-semibold capitalize text-white/95">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-[#0c2556]">
                        <Check size={14} strokeWidth={3.4} />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>

                <a href={enrollHref} target="_blank" rel="noopener noreferrer" className="btn-gold btn-shine relative mt-5 w-full !py-3 !text-sm">
                  Enroll now <ArrowRight size={20} />
                </a>
                <p className="relative mt-2 text-center text-[0.7rem] text-white/50">Opens WhatsApp to confirm your enrollment.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-[#dfe2e8] bg-[#f1f3f6] p-4 shadow-[0_20px_44px_-28px_rgba(30,35,50,0.5)]">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#0c2556]">Everything Inside The Plan</p>
              <ul className="mt-3 flex flex-1 flex-col divide-y divide-[#dfe2e8]">
                {features.map(({ Icon, title }, i) => (
                  <li key={title} className="flex flex-1 items-center gap-3 py-2 first:pt-0 last:pb-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#ffe985] to-[#ffc800] text-[#0c2556]">
                      <Icon size={18} strokeWidth={2.3} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.8rem] font-extrabold uppercase tracking-tight text-[#0c2556]">{title}</p>
                      <p className="mt-0.5 text-[0.72rem] leading-snug text-[#4d5b76]">{programContents[i]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
