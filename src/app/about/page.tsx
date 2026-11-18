import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero image="page-about|gto" title="About Us" subtitle={siteConfig.tagline} />
      <section className="bg-[#f3f6fc]"><div className="container-x py-12"><div className="max-w-3xl space-y-4 rounded-3xl border border-[#dfe6f2] bg-white p-7 text-[1.05rem] leading-relaxed text-[#33415c] shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] md:p-10">
        <p>
          {siteConfig.name} helps aspirants of the Army, Navy and Air Force understand and prepare for the Services Selection
          Board (SSB) interview in a clear, honest and structured way.
        </p>
        <p>
          Our approach focuses on Officer Like Qualities, not tricks. We explain each stage, provide practice material, and
          guide you towards becoming the best version of yourself.
        </p>
        <p className="text-sm">
          {/* PLACEHOLDER: add your own story, background and credentials here. */}
          Add your personal story and credentials here.
        </p>
      </div></div></section>
    </>
  );
}
