import type { Metadata } from "next";
import { Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getDownloads } from "@/lib/content";

export const metadata: Metadata = { title: "Downloads", description: "Free SSB preparation PDFs and resources." };

export default async function DownloadsPage() {
  const downloads = await getDownloads();
  return (
    <>
      <PageHero image="page-downloads|oir" title="Downloads" subtitle="Free PDFs and resources to study offline." />
      <section className="bg-[#f3f6fc]"><div className="container-x grid gap-5 py-12 sm:grid-cols-2">
        {downloads.map((d) => (
          <div key={d.title} className="flex items-center justify-between gap-4 rounded-3xl border border-[#dfe6f2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] transition hover:-translate-y-1 hover:border-gold">
            <div>
              <h2 className="text-lg font-extrabold text-[#0c2556]">{d.title}</h2>
              <p className="mt-1 text-sm text-[#4d5b76]">{d.description}</p>
            </div>
            {d.file ? (
              <a href={d.file} download className="btn-primary shrink-0">
                <Download size={16} /> Download
              </a>
            ) : (
              <span className="shrink-0 rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-bold text-[#6b7589]">Coming soon</span>
            )}
          </div>
        ))}
      </div></section>
    </>
  );
}
