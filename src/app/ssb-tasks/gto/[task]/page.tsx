import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Eye, ListOrdered, ShieldCheck, Sparkles } from "lucide-react";
import TaskBackdrop from "@/components/TaskBackdrop";
import { gtoTasks, getGTOTask } from "@/content/gtoTasks";

export function generateStaticParams() {
  return gtoTasks.map((t) => ({ task: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ task: string }> }): Promise<Metadata> {
  const { task } = await params;
  const t = getGTOTask(task);
  return t ? { title: `${t.name} (GTO Task)`, description: t.intro } : {};
}

export default async function GTOTaskPage({ params }: { params: Promise<{ task: string }> }) {
  const { task } = await params;
  const t = getGTOTask(task);
  if (!t) notFound();

  const idx = gtoTasks.findIndex((x) => x.slug === task);
  const prev = gtoTasks[(idx - 1 + gtoTasks.length) % gtoTasks.length];
  const next = gtoTasks[(idx + 1) % gtoTasks.length];

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b1020] text-white">
        <TaskBackdrop slug={t.slug} />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#4a7a2e]/50 blur-3xl" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-12 right-2 select-none text-[9rem] font-black leading-none text-white/[0.07] md:text-[14rem]" aria-hidden="true">
          {t.short}
        </span>
        <div className="container-x relative py-14 md:py-24">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-gold">Home</Link> / <Link href="/ssb-tasks" className="hover:text-gold">SSB Tasks</Link> /{" "}
            <Link href="/ssb-tasks/gto" className="hover:text-gold">GTO</Link> / <span className="text-white">{t.short}</span>
          </nav>
          <span className="mt-6 inline-block rounded-full bg-[#4a7a2e] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-lg">GTO Task</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">{t.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{t.intro}</p>
          <ul className="mt-6 flex max-w-3xl flex-wrap gap-2.5">
            {t.facts.map((f) => (
              <li key={f.label} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs backdrop-blur-md">
                <span className="text-white/60">{f.label}: </span>
                <span className="font-bold">{f.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ssb-tasks/gto" className="btn-ghost !px-7 !py-3.5">
              <ArrowLeft size={18} /> All GTO Tasks
            </Link>
            <Link href="/practice-tests" className="btn-gold btn-shine !px-7 !py-3.5">Practice Tests</Link>
          </div>
        </div>
        <div className="tristripe" />
      </section>

      <section className="bg-dots relative bg-white">
        <div className="container-x space-y-12 py-12">
          {/* Steps + rules */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-[#dfe2e8] bg-[#f6f7f9] p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#0c2556]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0c2556] text-gold"><ListOrdered size={19} /></span> How It Works
              </h2>
              <ol className="mt-5 space-y-4">
                {t.steps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#4a7a2e] text-sm font-black text-white">{i + 1}</span>
                    <p className="pt-0.5 leading-relaxed text-[#0c2556]">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-[#f0e2b0] bg-[#fffaf0] p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#0c2556]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-[#0c2556]"><ShieldCheck size={19} /></span> Key Rules
              </h2>
              <ul className="mt-5 space-y-3">
                {t.rules.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#0c2556]">
                    <Check size={18} className="mt-1 shrink-0 text-[#e0a800]" strokeWidth={3} /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What the GTO looks for */}
          <div className="rounded-3xl bg-gradient-to-br from-[#171b24] to-[#2b3140] p-6 text-white md:p-8">
            <h2 className="flex items-center gap-3 text-xl font-black">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-[#0c2556]"><Eye size={19} /></span> What The GTO Looks For
            </h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {t.lookFor.map((l) => (
                <li key={l} className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-sm leading-relaxed text-white/90">{l}</li>
              ))}
            </ul>
          </div>

          {/* Tips + mistakes */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#cfe3c3] bg-[#f1f8ec] p-6 md:p-7">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#1f3a14]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#4a7a2e] text-white"><Check size={20} strokeWidth={3} /></span> Preparation Tips
              </h2>
              <ul className="mt-5 space-y-3">
                {t.tips.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#1f3a14]">
                    <Check size={18} className="mt-1 shrink-0 text-[#4a7a2e]" strokeWidth={3} /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#f3d9b5] bg-[#fff6e8] p-6 md:p-7">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#5a3410]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff8f1f] text-white"><AlertTriangle size={19} /></span> Common Mistakes
              </h2>
              <ul className="mt-5 space-y-3">
                {t.mistakes.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#5a3410]">
                    <AlertTriangle size={17} className="mt-1 shrink-0 text-[#ff8f1f]" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* OLQs */}
          <div className="rounded-3xl border border-[#dfe2e8] bg-[#f6f7f9] p-6 md:p-8">
            <h2 className="flex items-center gap-3 text-xl font-black text-[#0c2556]">
              <Sparkles size={22} className="text-[#e0a800]" /> Officer Like Qualities Assessed
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {t.olqs.map((o) => (
                <span key={o} className="rounded-xl bg-[#0c2556] px-4 py-2 text-sm font-bold text-white">{o}</span>
              ))}
            </div>
            <p className="mt-5 text-xs text-[#6b7589]">Timings and layouts can vary slightly between selection boards. Always follow your board&apos;s instructions.</p>
          </div>

          {/* Prev / next */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ s: prev, dir: "Previous" }, { s: next, dir: "Next" }].map(({ s, dir }) => (
              <Link
                key={dir}
                href={`/ssb-tasks/gto/${s.slug}`}
                className={`group flex items-center gap-4 rounded-3xl border border-[#dfe2e8] bg-[#f6f7f9] p-6 transition hover:-translate-y-1 hover:border-gold ${dir === "Next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
              >
                {dir === "Next" ? <ArrowRight className="shrink-0 text-[#1c4cb0] transition group-hover:translate-x-1" /> : <ArrowLeft className="shrink-0 text-[#1c4cb0] transition group-hover:-translate-x-1" />}
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#6b7589]">{dir} GTO Task</span>
                  <span className="block text-xl font-black text-[#0c2556]">{s.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
