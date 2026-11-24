import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Article from "@/components/Article";
import ArticleMeta from "@/components/ArticleMeta";
import ReportError from "@/components/ReportError";
import { materials } from "@/content/materials";
import { getMaterial } from "@/lib/content";

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMaterial(slug);
  return m ? { title: m.title, description: m.summary } : {};
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = await getMaterial(slug);
  if (!m) notFound();
  return (
    <>
      <PageHero image="page-study|wat" title={m.title} subtitle={m.summary} />
      <article className="container-x max-w-3xl py-12">
        <ArticleMeta updatedAt={m.updatedAt} tags={m.tags} />
        <Article body={m.body} />
        <ReportError page={`/study-material/${m.slug}`} title={m.title} />
        <Link href="/study-material" className="btn-outline mt-10">
          All study material
        </Link>
      </article>
    </>
  );
}
