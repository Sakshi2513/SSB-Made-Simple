import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Bell, CalendarCheck, ClipboardCheck, ShieldCheck } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import Particles from "@/components/home/Particles";

export const metadata: Metadata = { title: "Login / Sign up" };

const perks = [
  { Icon: ClipboardCheck, t: "Timed practice tests", d: "Saved results every time", c: "#3b9cff" },
  { Icon: CalendarCheck, t: "30-day plan", d: "Track your progress", c: "#ffd21f" },
  { Icon: Bell, t: "Notifications", d: "New material and updates", c: "#6aa84a" },
  { Icon: BarChart3, t: "Free to join", d: "No card needed", c: "#ff8f1f" },
];

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-[#0b1020] text-white">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Particles />
      <div className="container-x relative grid min-h-[calc(100vh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[1.1fr_30rem] lg:gap-20">
        <div className="max-w-xl">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/" className="inline-block py-1.5 hover:text-gold">Home</Link> / <span className="text-white">Login</span>
          </nav>
          <h1 className="mt-5 text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
            Your SSB journey,
            <br />
            <span className="text-gold-gradient">One login away.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75">Log in or create a free account to take practice tests and keep your preparation in one place.</p>
          <ul className="mt-8 hidden max-w-lg gap-3 sm:grid sm:grid-cols-2">
            {perks.map(({ Icon, t, d, c }) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-3.5 backdrop-blur">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff" }}>
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{t}</span>
                  <span className="block text-xs text-white/65">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 hidden items-center gap-2 text-sm text-white/60 sm:flex"><ShieldCheck size={16} className="text-gold" /> Your data is protected and never shared.</p>
        </div>
        <AuthForm />
      </div>
      <div className="tristripe" />
    </section>
  );
}
