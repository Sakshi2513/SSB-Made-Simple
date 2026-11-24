import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import LibraryApp from "@/components/LibraryApp";

export const metadata: Metadata = { title: "My Library", robots: { index: false, follow: false } };

export default function LibraryPage() {
  return (
    <>
      <PageHero title="My Library" eyebrow="Library" subtitle="Everything you have unlocked: premium PDFs, guides and classes." />
      <section className="bg-[#f3f6fc]">
        <div className="container-x py-10">
          <Suspense fallback={<p className="py-16 text-center text-[#6b7589]">Loading...</p>}>
            <LibraryApp />
          </Suspense>
        </div>
      </section>
    </>
  );
}
