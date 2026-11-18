import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { posts } from "@/content/posts";

export const metadata: Metadata = { title: "Blog", description: "Articles and tips for SSB preparation." };

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero image="page-blog|srt" title="Blog" subtitle="Articles and tips to help you prepare smarter." />
      <section className="bg-[#f3f6fc]"><div className="container-x grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-[#dfe6f2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] transition duration-300 hover:-translate-y-1 hover:border-gold">
            <p className="w-fit rounded-full bg-[#e4f1dc] px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#3d6b24]">
              {p.category} · {p.readMins} min read
            </p>
            <h2 className="mt-4 text-xl font-extrabold leading-snug text-[#0c2556]">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4d5b76]">{p.excerpt}</p>
            <p className="mt-4 text-xs font-semibold text-[#6b7589]">{p.date}</p>
          </Link>
        ))}
      </div></section>
    </>
  );
}
