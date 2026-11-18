import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { materials } from "@/content/materials";

export const metadata: Metadata = { title: "Study Material", description: "Guides and notes for every SSB stage." };

export default function StudyMaterialPage() {
  return (
    <>
      <PageHero image="page-study|wat" title="Study Material" subtitle="Simple guides and notes for every part of the SSB." />
      <section className="bg-[#f3f6fc]"><div className="container-x grid gap-5 py-12 sm:grid-cols-2">
        {materials.map((m) => (
          <Link key={m.slug} href={`/study-material/${m.slug}`} className="group rounded-3xl border border-[#dfe6f2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] transition duration-300 hover:-translate-y-1 hover:border-gold">
            <p className="w-fit rounded-full bg-[#e4f1dc] px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#3d6b24]">{m.category}</p>
            <h2 className="mt-3 text-xl font-extrabold text-[#0c2556]">{m.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#4d5b76]">{m.summary}</p>
          </Link>
        ))}
      </div></section>
    </>
  );
}
