"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/config/site";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const ctaHref = user ? "/dashboard" : "/login";
  const ctaLabel = user ? "Dashboard" : "Sign in";

  return (
    <header className="print:hidden sticky top-0 z-40 bg-white/95 text-navy shadow-[0_8px_28px_-14px_rgba(12,37,86,0.45)] backdrop-blur-xl">
      <div className="container-x flex h-[66px] items-center justify-between gap-6">
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-[#d5e0f2] bg-gradient-to-b from-white to-[#eef3fb] p-1 shadow-[0_2px_10px_-4px_rgba(12,37,86,0.25)] min-[1320px]:flex"
        >
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[0.8rem] min-[1500px]:text-[0.92rem] font-bold uppercase leading-none tracking-[0.07em] transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-b from-[#ffe985] to-[#ffc800] text-[#0c2556] shadow-[0_6px_16px_-6px_rgba(255,190,0,0.95)]"
                    : "text-[#0c2556] hover:bg-[#0c2556] hover:text-white hover:shadow-[0_6px_16px_-8px_rgba(12,37,86,0.7)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/search"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d5e0f2] bg-gradient-to-b from-white to-[#eef3fb] text-[#0c2556] shadow-[0_2px_10px_-4px_rgba(12,37,86,0.25)] transition hover:border-[#0c2556] hover:bg-[#0c2556] hover:text-white"
          >
            <Search size={18} strokeWidth={2.4} />
          </Link>
          <Link
            href={ctaHref}
            className="group hidden items-center gap-2.5 whitespace-nowrap rounded-full bg-[#0c2556] py-1 pl-5 pr-1 text-[0.8rem] font-bold uppercase tracking-[0.07em] text-white shadow-[0_10px_24px_-10px_rgba(12,37,86,0.9)] transition hover:-translate-y-0.5 hover:bg-[#143a82] sm:inline-flex"
          >
            {ctaLabel}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-[#0c2556] transition group-hover:translate-x-0.5">
              <ArrowRight size={16} strokeWidth={2.8} />
            </span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d5e0f2] bg-gradient-to-b from-white to-[#eef3fb] text-[#0c2556] transition hover:border-[#0c2556] min-[1320px]:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} strokeWidth={2.4} /> : <Menu size={20} strokeWidth={2.4} />}
          </button>
        </div>
      </div>
      <div className="tristripe" />

      {open && (
        <nav className="border-t border-[#d5e0f2] bg-white min-[1320px]:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col gap-1.5 py-4">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[0.95rem] font-bold uppercase tracking-[0.08em] transition ${
                    active ? "bg-gradient-to-b from-[#ffe985] to-[#ffc800] text-[#0c2556]" : "text-[#0c2556] hover:bg-[#eef3fb]"
                  }`}
                >
                  {l.label}
                  <ArrowRight size={18} className={active ? "" : "opacity-40"} />
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c2556] px-5 py-3.5 text-[0.95rem] font-bold uppercase tracking-[0.08em] text-white sm:hidden"
            >
              {ctaLabel} <ArrowRight size={18} className="text-gold" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
