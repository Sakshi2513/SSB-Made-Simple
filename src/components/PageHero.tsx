import Link from "next/link";
import Particles from "./home/Particles";

export default function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#0b1020] text-white">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Particles />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="container-x relative py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="inline-block py-1.5 hover:text-gold">Home</Link> / <span className="text-white">{eyebrow ?? title}</span>
        </nav>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{subtitle}</p>}
        <div className="mt-6 h-1 w-20 rounded bg-gold" />
      </div>
      <div className="tristripe" />
    </section>
  );
}
