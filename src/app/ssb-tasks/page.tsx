import type { Metadata } from "next";
import Link from "next/link";
import TaskBackdrop from "@/components/TaskBackdrop";
import { ArrowRight } from "lucide-react";
import TasksExplorer from "@/components/TasksExplorer";

export const metadata: Metadata = {
  title: "SSB Tasks",
  description: "Understand every SSB task: OIR, PPDT, TAT, WAT, SRT, SDT, GTO tasks and the Personal Interview, with tips and common mistakes.",
};

export default function SSBTasksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1020] text-white">
        <TaskBackdrop slug="gto" strength={0.4} />
        <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-12 md:py-14">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-gold">Home</Link> / <span className="text-white">SSB Tasks</span>
            </nav>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Every SSB Task,
              <br />
              <span className="text-gold-gradient">Decoded.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Pick a task to see what it measures, how it works, and where candidates most often lose marks.
            </p>

            <ul className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {[
                { n: "8", l: "Tasks" },
                { n: "5", l: "Days" },
                { n: "15", l: "Officer Like Qualities" },
              ].map((x) => (
                <li key={x.l} className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur">
                  <p className="text-3xl font-black text-gold">{x.n}</p>
                  <p className="text-xs font-semibold leading-tight text-white/75">{x.l}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/practice-tests" className="btn-gold btn-shine !px-7 !py-3.5">Take A Practice Test</Link>
              <Link href="/ssb-process" className="btn-ghost !px-7 !py-3.5">How The Board Works</Link>
            </div>
          </div>

        </div>
        <div className="tristripe" />
      </section>

      {/* Tasks */}
      <section className="bg-dots relative bg-white">
        <div className="container-x py-12 md:py-14">
          <TasksExplorer />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Link
              href="/ssb-process"
              className="group flex items-center justify-between gap-4 rounded-3xl border border-[#3a4153] bg-gradient-to-br from-[#171b24] via-[#2b3140] to-[#171b24] p-7 text-white transition hover:-translate-y-1 hover:border-gold/60"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gold">The Big Picture</span>
                <span className="mt-1 block text-2xl font-black">See How The 5 Days Fit Together</span>
              </span>
              <ArrowRight className="shrink-0 text-gold transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/practice-tests"
              className="group flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-[#ffe985] to-[#ffc800] p-7 text-[#0c2556] transition hover:-translate-y-1"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.2em]">Put It Into Practice</span>
                <span className="mt-1 block text-2xl font-black">Try A Timed Practice Test</span>
              </span>
              <ArrowRight className="shrink-0 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
