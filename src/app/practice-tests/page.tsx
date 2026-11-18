import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, Lock, MessageSquare, Timer, Zap, ListChecks } from "lucide-react";
import PageHero from "@/components/PageHero";
import { testMeta, type TestType } from "@/content/tests";

export const metadata: Metadata = { title: "Practice Tests", description: "Timed WAT, SRT, TAT and OIR practice for the SSB." };

const info: Record<TestType, { Icon: typeof Timer; c: string; fg: string; time: string; mode: string }> = {
  oir: { Icon: ListChecks, c: "#3b9cff", fg: "#fff", time: "10 minutes", mode: "Scored with explanations" },
  tat: { Icon: BookOpen, c: "#ffd21f", fg: "#0c2556", time: "30 sec + 4 min each", mode: "Self-review" },
  wat: { Icon: MessageSquare, c: "#4a7a2e", fg: "#fff", time: "15 seconds per word", mode: "Self-review" },
  srt: { Icon: Zap, c: "#ff8f1f", fg: "#fff", time: "30 seconds each", mode: "Self-review" },
};

const steps = [
  { n: "1", title: "Log In", text: "A free account saves every result." },
  { n: "2", title: "Take A Timed Test", text: "The timer runs like the real Board." },
  { n: "3", title: "Review And Improve", text: "See your answers, score and explanations." },
];

export default function PracticeTestsPage() {
  const types = ["oir", "wat", "srt", "tat"] as TestType[];
  return (
    <>
      <PageHero image="oir" eyebrow="Practice" title="Timed SSB Practice Tests" subtitle="Train under the clock, the way the Board runs it. Log in to take tests and keep your results." />

      <section className="bg-dots relative bg-white">
        <div className="container-x py-14">
          <ol className="mx-auto grid max-w-4xl gap-3 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="flex items-start gap-3 rounded-2xl border border-[#dfe2e8] bg-[#f6f7f9] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0c2556] font-black text-gold">{s.n}</span>
                <span>
                  <span className="block font-extrabold text-[#0c2556]">{s.title}</span>
                  <span className="text-sm text-[#4d5b76]">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {types.map((t) => {
              const { Icon, c, fg, time, mode } = info[t];
              return (
                <li key={t}>
                  <Link
                    href={`/practice-tests/${t}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe2e8] bg-gradient-to-br from-[#f8f9fb] to-[#eceff3] p-7 shadow-[0_18px_40px_-28px_rgba(30,35,50,0.5)] transition duration-300 hover:-translate-y-2 hover:border-gold"
                  >
                    <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
                    <span className="pointer-events-none absolute -right-2 -top-6 select-none text-9xl font-black leading-none text-[#0c2556]/[0.05]" aria-hidden="true">
                      {t.toUpperCase()}
                    </span>
                    <div className="relative flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: c, color: fg, boxShadow: `0 14px 26px -12px ${c}` }}>
                        <Icon size={26} />
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#dfe2e8] bg-white px-3 py-1 text-xs font-bold text-[#4d5b76]">
                        <Lock size={12} /> Login To Save
                      </span>
                    </div>
                    <h2 className="relative mt-6 text-2xl font-black text-[#0c2556]">{testMeta[t].title}</h2>
                    <p className="relative mt-2 flex-1 text-[#4d5b76]">{testMeta[t].blurb}</p>
                    <div className="relative mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0c2556] px-3 py-1.5 text-xs font-bold text-white">
                        <Timer size={13} /> {time}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#dfe2e8] bg-white px-3 py-1.5 text-xs font-bold text-[#0c2556]">
                        <Check size={13} /> {mode}
                      </span>
                    </div>
                    <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-extrabold uppercase tracking-wider text-[#1c4cb0]">
                      Start Test <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
