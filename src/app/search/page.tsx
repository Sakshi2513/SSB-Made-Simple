import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SearchBox from "@/components/SearchBox";
import { ssbStages } from "@/content/ssbStages";
import { getDownloads, getMaterials, getPosts } from "@/lib/content";
import type { SearchItem } from "@/content/searchIndex";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage() {
  // Tasks are fixed pages; blog posts, study guides and downloads include whatever was added in /admin.
  const [posts, materials, downloads] = await Promise.all([getPosts(), getMaterials(), getDownloads()]);
  const items: SearchItem[] = [
    ...ssbStages.map((s) => ({ title: s.title, text: `${s.summary} ${s.what.join(" ")}`, href: `/ssb-tasks/${s.slug}`, type: "SSB Task" })),
    ...materials.map((m) => ({ title: m.title, text: `${m.summary} ${m.tags?.join(" ") ?? ""} ${m.body.join(" ")}`, href: `/study-material/${m.slug}`, type: "Study Material" })),
    ...posts.map((p) => ({ title: p.title, text: `${p.excerpt} ${p.tags?.join(" ") ?? ""} ${p.body.join(" ")}`, href: `/blog/${p.slug}`, type: "Blog" })),
    ...downloads.map((d) => ({ title: d.title, text: d.description, href: "/downloads", type: "Download" })),
  ];
  return (
    <>
      <PageHero image="page-search|group-discussion" title="Search" subtitle="Find SSB stages, study material and blog posts." />
      <section className="container-x max-w-3xl py-12">
        <SearchBox items={items} />
      </section>
    </>
  );
}
