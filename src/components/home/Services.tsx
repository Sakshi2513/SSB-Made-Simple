import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "@/components/Reveal";

// Photos live at public/services/army.webp, navy.webp and air-force.webp (.jpg/.png also work).
function findPhoto(slug: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "services", `${slug}.${ext}`))) return `/services/${slug}.${ext}`;
  }
  return null;
}

const services = [
  {
    slug: "army",
    en: "Indian Army",
    mottoHi: "सेवा परमो धर्मः",
    motto: "Seva Paramo Dharma",
    meaning: "Service before self",
    trait: ["Courage", "Resolve", "Team spirit"],
    tint: "from-[#10260a]/90 via-[#1c3a12]/35 to-transparent",
    accent: "#9bd45a",
  },
  {
    slug: "navy",
    en: "Indian Navy",
    mottoHi: "शं नो वरुणः",
    motto: "Sam No Varunah",
    meaning: "May the Lord of Waters be auspicious to us",
    trait: ["Discipline", "Seamanship", "Endurance"],
    tint: "from-[#07163a]/90 via-[#123161]/35 to-transparent",
    accent: "#6db4ff",
  },
  {
    slug: "air-force",
    en: "Indian Air Force",
    mottoHi: "नभः स्पृशं दीप्तम्",
    motto: "Nabha Sparsham Deeptam",
    meaning: "Touch the sky with glory",
    trait: ["Precision", "Alertness", "Daring"],
    tint: "from-[#0a2a5c]/90 via-[#1d5fb5]/35 to-transparent",
    accent: "#ffd21f",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#070b1a] text-white">
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-x relative py-14 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-3 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Choose your calling
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight md:text-5xl">
              Three services. <span className="text-gold-gradient">One standard.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/70">
            Whichever uniform you are aiming for, the board looks for the same Officer Like Qualities. Prepare once, prepare right.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map(({ slug, en, mottoHi, motto, meaning, trait, tint, accent }, i) => {
            const photo = findPhoto(slug);
            return (
              <Reveal key={slug} delay={i * 110} className="h-full">
                <article className="group relative flex h-[30rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/15 bg-[#0b1020] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition duration-500 hover:-translate-y-2">
                  {photo && (
                    <Image
                      src={photo}
                      alt={`${en} officer`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="scale-105 object-cover object-top blur-[1.5px] transition duration-700 group-hover:scale-100 group-hover:blur-0"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${tint}`} aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden="true" />

                  <div className="relative p-6">
                    <h3 className="text-3xl font-black uppercase leading-none tracking-tight">{en}</h3>
                    <span className="mt-4 block h-1 w-12 rounded" style={{ background: accent }} />
                    <p className="font-deva mt-4 text-2xl font-extrabold leading-tight" style={{ color: accent }}>{mottoHi}</p>
                    <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-white/90">{motto}</p>
                    <p className="mt-1 text-sm text-white/75">{meaning}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {trait.map((t) => (
                        <li key={t} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-md">{t}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
