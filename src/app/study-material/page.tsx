import type { Metadata } from "next";
import ArticleFilter from "@/components/ArticleFilter";
import PageHero from "@/components/PageHero";
import { getMaterials } from "@/lib/content";

export const metadata: Metadata = { title: "Study Material", description: "Guides and notes for every SSB stage." };

export default async function StudyMaterialPage() {
  const materials = await getMaterials();
  return (
    <>
      <PageHero image="page-study|wat" title="Study Material" subtitle="Simple guides and notes for every part of the SSB." />
      <section className="bg-[#f3f6fc]"><div className="container-x py-12">
        <ArticleFilter items={materials.map((m) => ({ href: `/study-material/${m.slug}`, title: m.title, summary: m.summary, category: m.category, tags: m.tags ?? [], meta: m.updatedAt ? `Updated ${m.updatedAt}` : undefined }))} />
      </div></section>
    </>
  );
}
