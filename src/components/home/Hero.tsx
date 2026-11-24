import Link from "next/link";
import Image from "next/image";
import { BookOpen, CalendarDays, Dumbbell, ListChecks, MessagesSquare, Users } from "lucide-react";
import Counter from "@/components/Counter";
import HeroScene from "./HeroScene";
import Particles from "./Particles";
import { brandImage } from "@/lib/brandImage";

const proof = [
  { Icon: Users, to: 1200, suffix: "+", label: "Candidates mentored" },
  { Icon: ListChecks, to: 8, suffix: "", label: "SSB tasks decoded" },
  { Icon: Dumbbell, to: 40, suffix: "+", label: "Hands-on drills" },
  { Icon: MessagesSquare, to: 220, suffix: "+", label: "Interview questions" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Drop your hero image at public/brand/hero.webp (or .jpg / .png). It is used automatically.
export default function Hero() {
  const hero = brandImage("hero");

  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-[#070b24] text-white">
      {hero ? (
        <>
          {/* desktop: indigo wash only behind the text column, warm sunrise glow on the right */}
          <div
            className="absolute inset-0 -z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,11,36,.96) 0%, rgba(8,13,44,.72) 30%, rgba(10,16,52,.12) 50%, rgba(10,16,52,0) 62%), linear-gradient(180deg, rgba(7,11,36,.5) 0%, transparent 22%, transparent 70%, #070b24 100%), radial-gradient(40% 45% at 78% 50%, rgba(255,128,48,.18), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="rays absolute -inset-x-1/4 inset-y-0 -z-10 hidden lg:block" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(120% 90% at 62% 50%, transparent 55%, rgba(3,5,20,.6) 100%)" }}
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 50% at 12% 18%, rgba(74,122,46,.5), transparent 70%), radial-gradient(55% 55% at 92% 10%, rgba(255,128,48,.3), transparent 70%), linear-gradient(180deg,#070b24 0%,#0c1546 62%,#0a1030 100%)",
            }}
            aria-hidden="true"
          />
          <div className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(180deg,#000,transparent_75%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-[270px] lg:h-[540px]">
            <HeroScene />
          </div>
        </>
      )}

      <Particles />

      <div className="container-x relative pb-8 pt-8 lg:flex lg:min-h-[calc(100svh-70px)] lg:items-center lg:py-4">
        {/* Text column: never wider than the left half, so no text touches the officers' faces */}
        <div className="max-w-3xl lg:max-w-[calc(50vw_-_max(0px,(100vw_-_1560px)/2)_-_3rem)]">
          {/* Badge: gradient-bordered glass pill */}
          <p className="intro inline-block rounded-full bg-gradient-to-r from-gold/70 via-white/25 to-transparent p-px" style={delay(100)}>
            <span className="stencil hero-eyebrow inline-flex items-center gap-2 rounded-full bg-[#0b1240]/85 px-4 py-2 text-gold backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Your journey to uniform begins here
            </span>
          </p>

          <h1 className="mt-4 font-black uppercase leading-[0.9] tracking-tighter [text-shadow:0_8px_40px_rgba(0,0,0,0.55)] [@media(min-height:800px)]:lg:mt-5">
            <span className="intro block text-white text-[clamp(4.2rem,22vw,6.5rem)] lg:text-[min(10vw,15vh,8.6rem)]" style={delay(250)}>
              SSB
            </span>
            <span className="intro text-shimmer block whitespace-nowrap text-[clamp(2.1rem,9.4vw,3.4rem)] lg:text-[min(5.2vw,7.6vh,5.2rem)]" style={delay(380)}>
              Made Simple
            </span>
          </h1>

          <p className="intro mt-4 [@media(min-height:800px)]:lg:mt-5" style={delay(520)}>
            <span className="hero-label inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2 font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              <CalendarDays size={20} className="text-gold" /> A 30-day action plan
            </span>
          </p>

          {/* Message: lead (what it is), body (how), closing (why) */}
          <div className="mt-4 max-w-[46rem] lg:max-w-[min(46rem,calc(41vw_-_max(0px,(100vw_-_1560px)/2)_-_3rem))] border-l-2 border-gold/50 pl-5 [@media(min-height:800px)]:lg:mt-5">
            <p className="intro hero-lead" style={delay(640)}>
              SSB isn&apos;t about what you know. It&apos;s about the fire within you, the mindset you carry and the officer you
              are destined to become.
            </p>
            <p className="intro hero-body mt-2 [@media(min-height:800px)]:lg:mt-3" style={delay(700)}>
              No shortcuts. No guesswork. Just a powerful day-by-day preparation roadmap, backed by mentors who have guided{" "}
              <strong className="text-white">1,200+ recommended candidates</strong>. Challenge your limits, conquer your
              weaknesses, own your personality and walk into that SSB hall ready to give it everything you&apos;ve got.
            </p>
            <p className="intro hero-close mt-2 [@media(min-height:800px)]:lg:mt-3" style={delay(760)}>
              Because the uniform isn&apos;t just a dream. It&apos;s a mission.
            </p>
          </div>

          <div className="intro mt-5 flex flex-wrap gap-3 [@media(min-height:800px)]:lg:mt-6 [@media(min-height:800px)]:lg:gap-4" style={delay(860)}>
            <Link
              href="/ssb-tasks"
              className="group btn-gold btn-shine hero-btn !rounded-xl !px-8 !py-4 shadow-[0_18px_40px_-14px_rgba(255,210,31,0.9)]"
            >
              Start your SSB journey
            </Link>
            <Link href="/book" className="btn-ghost hero-btn !rounded-xl !px-7 !py-4 !border-white/30 !bg-white/[0.08]">
              <BookOpen size={20} /> Get the book
            </Link>
          </div>

          {/* Proof: four glass tiles */}
          <dl className="intro mt-5 grid max-w-[46rem] grid-cols-2 gap-3 sm:grid-cols-4 [@media(min-height:800px)]:lg:mt-6" style={delay(940)}>
            {proof.map(({ Icon, to, suffix, label }) => (
              <div
                key={label}
                className="group relative flex flex-col rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.12]"
              >
                <Icon size={20} className="absolute right-4 top-3.5 text-white/40 transition group-hover:text-gold" />
                <dt className="hero-stat-label order-2 mt-2 font-bold uppercase leading-tight tracking-wider text-white/80">{label}</dt>
                <dd className="hero-stat-num order-1 font-black leading-none text-gold">
                  <Counter to={to} suffix={suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {hero && (
        <div className="relative -z-20 aspect-[16/10] w-full overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_24%,#000_82%,transparent)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:aspect-[1877/838] lg:[mask-image:linear-gradient(180deg,transparent,#000_26%)]">
          <Image
            src={hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover object-[100%_center] lg:object-center"
          />
        </div>
      )}
    </section>
  );
}
