import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Article from "@/components/Article";
import ArticleMeta from "@/components/ArticleMeta";
import ReportError from "@/components/ReportError";
import { posts } from "@/content/posts";
import { getPost } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { type: "article", title: p.title, description: p.excerpt } } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <>
      <PageHero image="page-blog|tat" title={post.title} subtitle={`${post.category} · ${post.author} · ${post.date} · ${post.readMins} min read`} />
      <article className="container-x max-w-3xl py-12">
        <ArticleMeta updatedAt={post.updatedAt} tags={post.tags} />
        <Article body={post.body} />
        <ReportError page={`/blog/${post.slug}`} title={post.title} />
        <Link href="/blog" className="btn-outline mt-10">
          Back to Blog
        </Link>
      </article>
    </>
  );
}
