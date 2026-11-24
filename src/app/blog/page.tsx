import type { Metadata } from "next";
import ArticleFilter from "@/components/ArticleFilter";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Articles and tips for SSB preparation." };

export default async function BlogPage() {
  const sorted = await getPosts();
  return (
    <>
      <PageHero image="page-blog|srt" title="Blog" subtitle="Articles and tips to help you prepare smarter." />
      <section className="bg-[#f3f6fc]"><div className="container-x py-12">
        <ArticleFilter items={sorted.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, summary: p.excerpt, category: p.category, tags: p.tags ?? [], meta: `${p.readMins} min read · ${p.date}` }))} />
      </div></section>
    </>
  );
}
