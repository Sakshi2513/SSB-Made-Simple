import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/content";

const tones = ["#3b9cff", "#ffd21f", "#4a7a2e", "#ff8f1f"];

export default async function BlogSection() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;
  return (
    <section id="blog" className="relative overflow-hidden bg-[#f3f6fc]">
      <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative py-14 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-army">
              <span className="h-px w-8 bg-army" /> The blog
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#0c2556] md:text-5xl">
              Preparation guides <span className="text-[#1c4cb0]">&amp; strategies</span>
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-2 rounded-xl bg-[#0c2556] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#143a82]">
            Read all articles <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {lead && (
            <Reveal className="h-full">
              <Link href={`/blog/${lead.slug}`} className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1a3d] via-[#0c2556] to-[#12306b] p-7 text-white shadow-[0_30px_60px_-30px_rgba(12,37,86,0.7)] transition duration-300 hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/30 blur-3xl" aria-hidden="true" />
                <span className="pointer-events-none absolute right-5 top-2 select-none text-[9rem] font-black leading-none text-white/[0.06]" aria-hidden="true">01</span>
                <span className="relative w-fit rounded-full bg-gold px-3 py-1 text-[0.7rem] font-black uppercase tracking-wider text-[#0c2556]">Featured · {lead.category}</span>
                <h3 className="relative mt-4 text-2xl font-black leading-tight md:text-3xl">{lead.title}</h3>
                <p className="relative mt-3 line-clamp-3 max-w-xl text-white/75">{lead.excerpt}</p>
                <span className="relative mt-5 inline-flex items-center gap-3 text-sm font-bold text-gold">
                  Read article <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span className="flex items-center gap-1 font-semibold text-white/60"><Clock size={14} /> {lead.readMins} min</span>
                </span>
              </Link>
            </Reveal>
          )}

          <ul className="grid gap-4">
            {rest.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i + 1) * 90}>
                <Link href={`/blog/${p.slug}`} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#dfe6f2] bg-white p-4 shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)] transition duration-300 hover:-translate-y-1 hover:border-gold">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-black" style={{ background: tones[(i + 1) % 4], color: (i + 1) % 4 === 1 ? "#0c2556" : "#fff" }}>
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-army">{p.category} · {p.readMins} min</span>
                    <span className="mt-0.5 block text-base font-extrabold leading-snug text-[#0c2556]">{p.title}</span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef3fb] text-[#1c4cb0] transition group-hover:bg-gold group-hover:text-[#0c2556]">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
