import type { Metadata } from "next";
import Link from "next/link";
import { Award, Brain, GraduationCap, Handshake, PenLine } from "lucide-react";
import PageHero from "@/components/PageHero";
import MentorCard from "@/components/MentorCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "About" };

const roles = [
  { Icon: Award, t: "Founder & Author", d: "SSB Made Simple", c: "#ffd21f" },
  { Icon: Handshake, t: "Co-Founder", d: "SSB Game of OLQ", c: "#3b9cff" },
  { Icon: GraduationCap, t: "SSB Mentor | Defence Educator", d: "Guiding aspirants", c: "#6aa84a" },
  { Icon: PenLine, t: "Certified Graphologist", d: "Personality development enthusiast", c: "#ff8f1f" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" subtitle={siteConfig.tagline} />
      <section className="bg-[#f3f6fc]">
        <div className="container-x grid gap-6 py-12 lg:grid-cols-1">
          <MentorCard className="lg:col-span-2" />

          {/* Roles */}
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {roles.map(({ Icon, t, d, c }) => (
              <li key={t} className="flex items-center gap-4 rounded-2xl border border-[#dfe6f2] bg-white p-4 shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff" }}><Icon size={22} /></span>
                <span>
                  <span className="block font-extrabold text-[#0c2556]">{t}</span>
                  <span className="text-sm text-[#4d5b76]">{d}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Story */}
          <div className="rounded-3xl border border-[#dfe6f2] bg-white p-7 text-[1.05rem] leading-relaxed text-[#33415c] shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] md:p-9 lg:col-span-2">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#3d6b24]"><Brain size={16} /> Our approach</p>
            <p className="mt-3">
              {siteConfig.name} helps aspirants of the Army, Navy and Air Force understand and prepare for the Services Selection Board (SSB) interview in a clear, honest and structured way.
            </p>
            <p className="mt-3">
              The focus is on Officer Like Qualities, not tricks. Every stage is explained, practice material is provided, and you are guided towards becoming the best version of yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/subscription" className="btn-gold btn-shine">Start the 30-day plan</Link>
              <Link href="/contact" className="btn-outline">Talk to us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
