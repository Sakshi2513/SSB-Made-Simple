import Image from "next/image";
import { ArrowRight, CalendarCheck, ClipboardCheck, FileCheck, Target, ShoppingBag } from "lucide-react";
import Reveal from "@/components/Reveal";
import TestimonialSlider from "./TestimonialSlider";
import { bookConfig } from "@/config/site";
import { getSettings } from "@/lib/content";

const features = [
  { Icon: CalendarCheck, t: "30-day plan", c: "#3b9cff" },
  { Icon: ClipboardCheck, t: "Practice material", c: "#ffd21f" },
  { Icon: FileCheck, t: "Real SSB examples", c: "#6aa84a" },
  { Icon: Target, t: "Exam focused", c: "#ff8f1f" },
];

export default async function BookSection() {
  const cfg = await getSettings();
  const price = cfg.bookPrice || bookConfig.price;
  const buyUrl = cfg.bookUrl || bookConfig.amazonUrl;
  return (
    <section id="book" className="relative overflow-hidden bg-[#0d2a22] text-white">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(40% 50% at 95% 10%, rgba(255,210,31,.16), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="bg-grid absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="container-x relative grid items-stretch gap-6 py-14 md:py-20 lg:grid-cols-2">
        {/* Book */}
        <Reveal className="h-full">
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 md:p-8">
            <p className="relative flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> The book
            </p>

            <div className="relative mt-5 grid items-center gap-6 sm:grid-cols-[11rem_1fr]">
              <div className="relative mx-auto w-44 sm:w-full">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/25 transition duration-500 hover:scale-[1.03]">
                  <Image src={bookConfig.cover} alt={`${bookConfig.title} book cover`} fill sizes="176px" className="object-cover" />
                  <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/45 to-transparent" />
                </div>
                <span className="absolute -right-2 -top-2 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-black uppercase tracking-wider text-[#0c2556] shadow-xl">Paperback</span>
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase leading-[1.02] tracking-tight md:text-4xl">
                  SSB Made <span className="text-gold-gradient">Simple</span>
                </h2>
                <p className="mt-1 text-base font-extrabold uppercase tracking-wide text-white/90">A 30-Day Action Plan</p>
                <p className="mt-2 text-sm font-semibold text-white/70">by <span className="text-gold">{bookConfig.author}</span></p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Task breakdowns, real SSB examples and a day-by-day plan you can carry into the centre. One plan, one notebook, no screen fatigue.
                </p>
              </div>
            </div>

            <ul className="relative mt-6 grid grid-cols-2 gap-3">
              {features.map(({ Icon, t, c }) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff" }}>
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-bold">{t}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-black/20 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/60">Price</p>
                <p className="text-3xl font-black leading-none text-gold">{price}</p>
              </div>
              <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="btn-gold btn-shine ml-auto !px-6 !py-3">
                <ShoppingBag size={18} /> Buy now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Reviews slideshow */}
        <Reveal delay={120} className="h-full">
          <TestimonialSlider />
        </Reveal>
      </div>
    </section>
  );
}
