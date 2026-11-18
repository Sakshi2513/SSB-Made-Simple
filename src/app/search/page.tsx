import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SearchBox from "@/components/SearchBox";
import { searchIndex } from "@/content/searchIndex";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <>
      <PageHero image="page-search|group-discussion" title="Search" subtitle="Find SSB stages, study material and blog posts." />
      <section className="container-x max-w-3xl py-12">
        <SearchBox items={searchIndex} />
      </section>
    </>
  );
}
