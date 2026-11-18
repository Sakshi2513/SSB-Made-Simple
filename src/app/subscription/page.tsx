import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Download, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { siteConfig, program } from "@/config/site";

export const metadata: Metadata = {
  title: "Subscription & Premium Packs",
  description: "Choose the free library, a single premium pack, or the full 30-day SSB action plan.",
};

const wa = (text: string) => `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;

const packs = [
  { name: "OIR Practice Pack", price: "₹299", c: "#3b9cff", fg: "#fff", items: ["1,000 OIR questions", "Timed practice sets", "Answer explanations"] },
  { name: "TAT + WAT + SRT Mega Pack", price: "₹499", c: "#ffd21f", fg: "#0c2556", items: ["60 TAT images", "Word and situation banks", "Answer frameworks"] },
  { name: "GTO Preparation Pack", price: "₹699", c: "#4a7a2e", fg: "#fff", items: ["GTO drills", "Task-by-task strategies", "Lecturette topic bank"] },
  { name: "Interview Master Pack", price: "₹599", c: "#ff8f1f", fg: "#fff", items: ["Interview framework", "220+ interview questions", "30-story personal bank"] },
];

const free = ["Free PDF library", "Blog and study guides", "Practice tests with a free login"];
const planItems = ["All 8 SSB tasks, decoded", "40+ hands-on drills", "220+ interview questions", "Day-0 document checklist", "Week-by-week 30-day roadmap"];

export default function SubscriptionPage() {
  return (
    <>
      <PageHero
        image="gto"
        eyebrow="Plans"
        title="Choose Your Plan"
        subtitle="Start free, buy a single pack, or follow the complete 30-day action plan."
      />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0" style={{ background: "radial-gradient(40% 35% at 0% 0%, rgba(59,156,255,.12), transparent 70%), radial-gradient(40% 40% at 100% 30%, rgba(255,210,31,.16), transparent 70%)" }} aria-hidden="true" />
        <div className="container-x relative py-14 md:py-20">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.45fr]">
            {/* Free */}
            <div className="flex flex-col rounded-3xl border border-[#dfe6f2] bg-gradient-to-br from-white to-[#eef3fb] p-7 shadow-[0_24px_50px_-30px_rgba(12,37,86,0.45)]">
              <span className="w-fit rounded-full bg-[#e4f1dc] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#3d6b24]">Free forever</span>
              <p className="mt-4 text-6xl font-black text-[#0c2556]">₹0</p>
              <p className="mt-2 text-[#4d5b76]">Everything you need to start preparing.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {free.map((x) => (
                  <li key={x} className="flex items-center gap-3 font-semibold text-[#0c2556]">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e4f1dc] text-[#3d6b24]"><Check size={15} strokeWidth={3.4} /></span> {x}
                  </li>
                ))}
              </ul>
              <Link href="/downloads" className="btn-outline mt-7 w-full !py-3.5"><Download size={18} /> Get Free Material</Link>
            </div>

            {/* Full program */}
            <div className="relative rounded-3xl bg-gradient-to-b from-gold via-[#ff8f1f]/50 to-white/5 p-px shadow-[0_30px_70px_-30px_rgba(255,160,0,0.6)]">
              <span className="absolute -top-3 right-6 z-10 rounded-full bg-gold px-4 py-1 text-xs font-black uppercase tracking-wider text-[#0c2556] shadow-lg">Most popular</span>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-[#0a1a3d] via-[#0c2556] to-[#12306b] p-7 text-white md:p-8">
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gold/30 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0c2556]">
                  <Sparkles size={13} /> Full program
                </span>
                <h2 className="relative mt-4 text-3xl font-black uppercase tracking-tight">{program.name}</h2>
                <p className="relative mt-2 text-6xl font-black text-gold-gradient">{program.price}</p>
                <ul className="relative mt-6 grid flex-1 gap-3 sm:grid-cols-2">
                  {planItems.map((x) => (
                    <li key={x} className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.07] p-3 text-[0.95rem] font-semibold backdrop-blur">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[#0c2556]"><Check size={14} strokeWidth={3.4} /></span> {x}
                    </li>
                  ))}
                </ul>
                <a href={wa("Hi, I want to enroll in the 30-Day SSB Action Plan.")} target="_blank" rel="noopener noreferrer" className="btn-gold btn-shine relative mt-7 w-full !py-4">
                  Enroll Now <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Packs */}
          <div className="mt-16">
            <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-army"><span className="h-px w-8 bg-army" /> Single packs</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#0c2556] md:text-4xl">Or buy <span className="text-[#1c4cb0]">one pack</span></h2>
            <p className="mt-2 text-[#4d5b76]">Pay per pack. Instant access after payment.</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {packs.map((p) => (
                <li key={p.name} className="group flex flex-col overflow-hidden rounded-3xl border border-[#dfe6f2] bg-white shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_50px_-28px_rgba(12,37,86,0.6)]">
                  <div className="relative p-6 pb-5" style={{ background: p.c, color: p.fg }}>
                    <span className="absolute -right-3 -top-6 select-none text-8xl font-black opacity-15" aria-hidden="true">₹</span>
                    <p className="relative text-xs font-extrabold uppercase tracking-wider opacity-80">Pack</p>
                    <h3 className="relative mt-1 min-h-[3.2rem] text-lg font-extrabold leading-tight">{p.name}</h3>
                    <p className="relative mt-3 text-4xl font-black">{p.price}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <ul className="flex-1 space-y-2.5">
                      {p.items.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm font-medium text-[#33415c]">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#4a7a2e]" strokeWidth={3} /> {x}
                        </li>
                      ))}
                    </ul>
                    <a href={wa(`Hi, I want to buy the ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c2556] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#143a82]">
                      Buy pack <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[#6b7589]">Online card and UPI payment is coming soon. For now, enrolment is confirmed over WhatsApp.</p>
          </div>
        </div>
      </section>
    </>
  );
}
