import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, ClipboardCheck, Download, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import BuyButton from "@/components/BuyButton";

const steps = [
  { Icon: CalendarCheck, t: "30-day plan", c: "#3b9cff" },
  { Icon: ClipboardCheck, t: "8 tasks decoded", c: "#ffd21f" },
  { Icon: Users, t: "Expert mentoring", c: "#6aa84a" },
];

export default function FinalCta() {
  return (
    <section className="relative flex min-h-[44rem] items-end overflow-hidden bg-[#07122e] text-white md:min-h-[48rem]">
      <Image src="/brand/cta-parade.webp" alt="Newly commissioned officers celebrating" fill sizes="100vw" quality={90} className="object-cover object-[50%_18%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07122e] via-[#07122e]/85 via-35% to-transparent to-65%" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07122e]/70 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "radial-gradient(60% 80% at 15% 100%, rgba(255,190,30,.30), transparent 70%)" }} aria-hidden="true" />

      <div className="container-x relative pb-16 pt-72 md:pb-20 md:pt-96">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> Your journey to uniform starts here
          </p>
          <h2 className="mt-5 text-[clamp(2.4rem,5.6vw,4.8rem)] font-black uppercase leading-[0.98] tracking-tight [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
            The uniform is earned.
            <br />
            <span className="text-gold-gradient">Start today.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Thirty days. Eight tasks. One plan. Download the free material today, and when you want the depth behind it, enroll in the full action plan.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {steps.map(({ Icon, t, c }) => (
              <li key={t} className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-bold backdrop-blur">
                <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff" }}><Icon size={14} /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton productId="plan-30day" label="Start your SSB journey" className="btn-gold btn-shine !px-8 !py-4" />
            <Link href="/downloads" className="btn-ghost !px-8 !py-4"><Download size={18} /> Explore free material</Link>
          </div>
        </Reveal>
      </div>
      <div className="tristripe" />
    </section>
  );
}
