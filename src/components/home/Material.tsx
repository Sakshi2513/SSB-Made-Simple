import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Download, FileText, Flag, Image as ImageIcon, Lock, MessagesSquare, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getDownloads } from "@/lib/content";

// Colour per free PDF, in the same order as freeMaterial
const tones = [
  { c: "#3b9cff", fg: "#fff" },
  { c: "#ffd21f", fg: "#0c2556" },
  { c: "#4a7a2e", fg: "#fff" },
  { c: "#ff8f1f", fg: "#fff" },
  { c: "#8a63d2", fg: "#fff" },
  { c: "#2f6b3a", fg: "#fff" },
  { c: "#0c2556", fg: "#ffd21f" },
  { c: "#8b93a7", fg: "#fff" },
];

const premium = [
  { Icon: Brain, n: "1,000", t: "OIR questions", c: "#3b9cff" },
  { Icon: ImageIcon, n: "60", t: "TAT images", c: "#ffd21f" },
  { Icon: Flag, n: "GTO", t: "Task drills", c: "#6aa84a" },
  { Icon: MessagesSquare, n: "Interview", t: "Framework", c: "#ff8f1f" },
];

export default async function Material() {
  const freeMaterial = (await getDownloads()).slice(0, 8);
  return (
    <section id="material" className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(40% 40% at 0% 0%, rgba(59,156,255,.12), transparent 70%), radial-gradient(40% 45% at 100% 100%, rgba(255,210,31,.16), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="container-x relative py-14 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-army">
              <span className="h-px w-8 bg-army" /> Study material
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#0c2556] md:text-5xl">
              Free material. <span className="text-[#1c4cb0]">Premium depth.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#4d5b76]">
            Start with the free PDF library, no signup, no card. Move to the premium packs when you want the volume, the timing
            drills and the answer frameworks.
          </p>
        </Reveal>

        <div className="mt-9 grid items-stretch gap-6 lg:grid-cols-[1.45fr_1fr]">
          {/* Free library */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe6f2] bg-gradient-to-br from-white to-[#eef3fb] p-5 shadow-[0_24px_50px_-30px_rgba(12,37,86,0.45)] md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0c2556] text-gold shadow-lg"><BookOpen size={22} /></span>
                  <div>
                    <p className="text-lg font-black text-[#0c2556]">Free PDF library</p>
                    <p className="text-xs font-semibold text-[#6b7589]">Download and study offline</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#e4f1dc] px-3.5 py-1.5 text-xs font-extrabold text-[#3d6b24]">8 PDFs · ₹0 · No signup</span>
              </div>

              <ul className="mt-6 grid flex-1 gap-3 sm:grid-cols-2">
                {freeMaterial.map((f, i) => {
                  const tone = tones[i % tones.length];
                  const inner = (
                    <>
                      <span className="absolute inset-y-3 left-0 w-1 rounded-r" style={{ background: tone.c }} />
                      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl shadow-md transition duration-300 group-hover:scale-110 group-hover:-rotate-3" style={{ background: tone.c, color: tone.fg, boxShadow: `0 10px 20px -10px ${tone.c}` }}>
                        <FileText size={22} />
                        <span className="absolute -bottom-1 -right-1 rounded-md bg-white px-1 text-[0.55rem] font-black text-[#0c2556] ring-1 ring-[#dfe2e8]">PDF</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-extrabold text-[#0c2556]">{f.title}</span>
                        <span className="text-xs font-medium text-[#6b7589]">{f.file ? "Free download" : "Coming soon"}</span>
                      </span>
                      {f.file && (
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef3fb] text-[#1c4cb0] transition group-hover:bg-gold group-hover:text-[#0c2556]">
                          <Download size={17} />
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li key={f.title}>
                      {f.file ? (
                        <a href={f.file} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[#dfe6f2] bg-white p-3 pl-4 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg">
                          {inner}
                        </a>
                      ) : (
                        <div className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-dashed border-[#c9d3e6] bg-white/50 p-3 opacity-70">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Link href="/downloads" className="group mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#0c2556] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#143a82]">
                Browse all free downloads <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Premium */}
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-3xl bg-gradient-to-b from-gold via-[#ff8f1f]/50 to-white/5 p-px shadow-[0_30px_70px_-30px_rgba(255,160,0,0.6)]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-[#0a1a3d] via-[#0c2556] to-[#12306b] p-6 text-white md:p-7">
                <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-gold/30 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
                <span className="pointer-events-none absolute -bottom-6 right-2 select-none text-[8rem] font-black leading-none text-white/[0.05]" aria-hidden="true">PRO</span>

                <p className="relative inline-flex w-fit items-center gap-2 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#0c2556]">
                  <Sparkles size={13} /> Premium packs
                </p>
                <h3 className="relative mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight">Go beyond the surface</h3>
                <p className="relative mt-2 flex items-center gap-2 text-sm text-white/70">
                  <Lock size={14} /> Pay per pack · lifetime access · instant download
                </p>

                <div className="relative mt-5 border-t-2 border-dashed border-white/25" />
                <ul className="relative mt-5 grid flex-1 grid-cols-2 gap-3">
                  {premium.map(({ Icon, n, t, c }) => (
                    <li key={t} className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]">
                      <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff", boxShadow: `0 10px 20px -10px ${c}` }}>
                        <Icon size={20} />
                      </span>
                      <span className="mt-4 block">
                        <span className="block text-xl font-black leading-none text-gold">{n}</span>
                        <span className="text-xs font-semibold text-white/75">{t}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/subscription" className="btn-gold btn-shine relative mt-6 w-full !py-3.5">
                  View premium packs <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
