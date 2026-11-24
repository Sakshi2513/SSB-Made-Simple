import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Sparkles, Timer } from "lucide-react";
import { ssbStages, getStage } from "@/content/ssbStages";
import { gtoTasks } from "@/content/gtoTasks";
import TaskVisual from "@/components/TaskVisual";
import TaskBackdrop from "@/components/TaskBackdrop";

export function generateStaticParams() {
  return ssbStages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStage(slug);
  return stage ? { title: stage.title, description: stage.summary } : {};
}

const dayMeta: Record<string, { c: string; fg: string }> = {
  "Day 1": { c: "#3b9cff", fg: "#fff" },
  "Day 2": { c: "#ffd21f", fg: "#0c2556" },
  "Day 3-4": { c: "#4a7a2e", fg: "#fff" },
};

const practiceType: Record<string, string> = { oir: "oir", wat: "wat", srt: "srt", tat: "tat" };

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getStage(slug);
  if (!stage) notFound();

  const m = dayMeta[stage.day] ?? dayMeta["Day 1"];
  const idx = ssbStages.findIndex((s) => s.slug === slug);
  const prev = ssbStages[(idx - 1 + ssbStages.length) % ssbStages.length];
  const next = ssbStages[(idx + 1) % ssbStages.length];
  const practiceHref = practiceType[slug] ? `/practice-tests/${practiceType[slug]}` : "/practice-tests";
  const name = stage.title.split(": ")[1] ?? stage.title;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1020] text-white">
        <TaskBackdrop slug={stage.slug} />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: `${m.c}55` }} aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-12 right-2 select-none text-[11rem] font-black leading-none text-white/[0.07] md:text-[19rem]" aria-hidden="true">
          {stage.short}
        </span>
        <div className="container-x relative py-14 md:py-24">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="inline-block py-1.5 hover:text-gold">Home</Link> / <Link href="/ssb-tasks" className="inline-block py-1.5 hover:text-gold">SSB Tasks</Link> /{" "}
            <span className="text-white">{stage.short}</span>
          </nav>
          <span className="mt-6 inline-block rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-lg" style={{ background: m.c, color: m.fg }}>
            {stage.day.replace("-", "–")}
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <span style={{ color: m.c }}>{stage.short}</span> <span className="text-white/40">/</span> {name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{stage.summary}</p>
          <ul className="mt-6 flex max-w-3xl flex-wrap gap-2.5">
            {stage.facts.slice(0, 4).map((f) => (
              <li key={f.label} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs backdrop-blur-md">
                <span className="text-white/60">{f.label}: </span>
                <span className="font-bold">{f.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={practiceHref} className="btn-gold btn-shine !px-7 !py-3.5">
              <Timer size={18} /> Practice This Task
            </Link>
            <Link href="/ssb-tasks" className="btn-ghost !px-7 !py-3.5">
              <ArrowLeft size={18} /> All Tasks
            </Link>
          </div>
        </div>
        <div className="tristripe" />
      </section>

      {/* Section tabs */}
      <nav aria-label="On this page" className="sticky top-[70px] z-30 border-b border-[#dfe2e8] bg-white/95 backdrop-blur">
        <ul className="container-x flex gap-2 overflow-x-auto py-3 text-sm font-bold">
          {[["how", "How It Works"], ...(slug === "gto" ? [["gto-tasks", "GTO Tasks"]] : []), ["tips", "Tips & Mistakes"], ["olqs", "Qualities"]].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block whitespace-nowrap rounded-full border border-[#dfe2e8] bg-[#f6f7f9] px-4 py-1.5 text-[#0c2556] transition hover:border-gold">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-dots relative bg-white">
        <div className="container-x space-y-14 py-12">
          {/* How it works */}
          <div id="how" className="scroll-mt-32">
            <h2 className="flex items-center gap-3 text-2xl font-black text-[#0c2556]">
              <span className="h-7 w-1.5 rounded" style={{ background: m.c }} /> How It Works
            </h2>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {stage.what.map((w, i) => (
                <li key={w} className="flex gap-4 rounded-2xl border border-[#dfe2e8] bg-[#f6f7f9] p-5 md:last:odd:col-span-2">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg font-black" style={{ background: m.c, color: m.fg }}>
                    {i + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-[#0c2556]">{w}</p>
                </li>
              ))}
            </ol>
          </div>

          {slug === "gto" && (
            <div id="gto-tasks" className="scroll-mt-32">
              <h2 className="flex items-center gap-3 text-2xl font-black text-[#0c2556]">
                <span className="h-7 w-1.5 rounded bg-[#4a7a2e]" /> The Nine GTO Tasks
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gtoTasks.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/ssb-tasks/gto/${t.slug}`} className="group block overflow-hidden rounded-2xl border border-[#dfe2e8] bg-[#f6f7f9] transition hover:-translate-y-1 hover:border-gold">
                      <div className="bg-[#eef3fb] p-2"><TaskVisual slug={t.slug} alt={t.name} /></div>
                      <div className="p-4">
                        <p className="font-extrabold text-[#0c2556]">{t.name}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[#4d5b76]">{t.intro}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1c4cb0]">
                          Read Full Page <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips and mistakes side by side */}
          <div id="tips" className="grid scroll-mt-32 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#cfe3c3] bg-[#f1f8ec] p-6 md:p-7">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#1f3a14]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#4a7a2e] text-white"><Check size={20} strokeWidth={3} /></span> Preparation Tips
              </h2>
              <ul className="mt-5 space-y-3">
                {stage.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#1f3a14]">
                    <Check size={18} className="mt-1 shrink-0 text-[#4a7a2e]" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#f3d9b5] bg-[#fff6e8] p-6 md:p-7">
              <h2 className="flex items-center gap-3 text-xl font-black text-[#5a3410]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff8f1f] text-white"><AlertTriangle size={19} /></span> Common Mistakes
              </h2>
              <ul className="mt-5 space-y-3">
                {stage.mistakes.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#5a3410]">
                    <AlertTriangle size={17} className="mt-1 shrink-0 text-[#ff8f1f]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Qualities */}
          <div id="olqs" className="scroll-mt-32 rounded-3xl border border-[#dfe2e8] bg-[#f6f7f9] p-6 md:p-8">
            <h2 className="flex items-center gap-3 text-xl font-black text-[#0c2556]">
              <Sparkles size={22} className="text-[#e0a800]" /> Officer Like Qualities Assessed
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {stage.olqs.map((o) => (
                <span key={o} className="rounded-xl bg-[#0c2556] px-4 py-2 text-sm font-bold text-white">{o}</span>
              ))}
            </div>
          </div>

          {/* Practice band */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-[#171b24] to-[#2b3140] p-7 text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Practice</p>
              <p className="mt-1 text-xl font-black">Try {stage.short} Under A Timer</p>
            </div>
            <Link href={practiceHref} className="btn-gold btn-shine !px-7 !py-3.5">Start Practice</Link>
          </div>

          {/* Previous / next */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ s: prev, dir: "Previous" }, { s: next, dir: "Next" }].map(({ s, dir }) => (
              <Link
                key={dir}
                href={`/ssb-tasks/${s.slug}`}
                className={`group flex items-center gap-4 rounded-3xl border border-[#dfe2e8] bg-[#f6f7f9] p-6 transition hover:-translate-y-1 hover:border-gold ${dir === "Next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
              >
                {dir === "Next" ? (
                  <ArrowRight className="shrink-0 text-[#1c4cb0] transition group-hover:translate-x-1" />
                ) : (
                  <ArrowLeft className="shrink-0 text-[#1c4cb0] transition group-hover:-translate-x-1" />
                )}
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#6b7589]">{dir} Task</span>
                  <span className="block text-xl font-black text-[#0c2556]">{s.short}</span>
                  <span className="block text-sm text-[#4d5b76]">{s.title.split(": ")[1] ?? s.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
