"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/content/home";

export default function TestimonialSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % n), 1000);
    return () => clearTimeout(id);
  }, [paused, n, i]);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 md:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote size={120} className="pointer-events-none absolute -right-4 -top-4 text-white/[0.05]" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> Testimonials
          </p>
          <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">What students say</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-gold hover:text-[#0c2556]"><ChevronLeft size={18} /></button>
          <button onClick={() => go(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-gold hover:text-[#0c2556]"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="relative mt-6 grid flex-1">
        {testimonials.map((t, k) => (
          <figure
            key={t.name}
            aria-hidden={k !== i}
            className={`col-start-1 row-start-1 flex flex-col rounded-2xl border border-white/10 bg-[#081f19]/70 p-5 transition-all duration-500 ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-[#0c2556]"><Quote size={20} fill="currentColor" /></span>
              <div className="flex gap-0.5 text-gold" aria-label="5 out of 5">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={16} fill="currentColor" />)}
              </div>
            </div>
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/90">{t.text}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-white/20 pt-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#ffe985] to-[#ff8f1f] text-base font-black text-[#0c2556] ring-4 ring-white/10">{t.name[0]}</span>
              <span>
                <span className="block font-extrabold">{t.name}</span>
                <span className="block text-xs text-white/65">{t.role} · {t.place}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="relative mt-5 flex items-center gap-2" role="tablist" aria-label="Choose review">
        {testimonials.map((t, k) => (
          <button key={t.name} onClick={() => setI(k)} role="tab" aria-selected={k === i} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/60"}`} />
        ))}
      </div>
    </div>
  );
}
