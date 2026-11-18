import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { bookConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Book",
  description: "Our SSB preparation book, available on Flipkart.",
};

export default function BookPage() {
  return (
    <>
      <PageHero image="page-book|sdt" title="Our Book" subtitle="Written from real SSB experience, available on Flipkart." />
      <section className="bg-[#f3f6fc]"><div className="container-x grid items-center gap-10 py-12 md:grid-cols-[1fr_2fr]">
        <Image
          src={bookConfig.cover}
          alt={`${bookConfig.title} book cover`}
          width={640}
          height={960}
          className="mx-auto h-auto w-64 rounded-xl shadow-[0_30px_60px_-20px_rgba(12,37,86,0.6)]"
        />
        <div>
          <h2 className="text-4xl font-black text-[#0c2556]">{bookConfig.title}</h2>
          <p className="mt-1 text-sm font-semibold text-[#3d6b24]">by {bookConfig.author} · {bookConfig.format}</p>
          <p className="mt-2 text-[#4d5b76]">{bookConfig.subtitle}</p>
          <ul className="mt-5 space-y-2">
            {bookConfig.points.map((p) => (
              <li key={p} className="flex gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#3d6b24]" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-4xl font-black text-[#0c2556]">{bookConfig.price}</p>
          <a href={bookConfig.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-gold btn-shine mt-4">
            Buy on Flipkart <ExternalLink size={16} />
          </a>
        </div>
      </div></section>
    </>
  );
}
