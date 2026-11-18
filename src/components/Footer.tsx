import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { siteConfig } from "@/config/site";

const cols = [
  {
    title: "Prepare",
    links: [
      { href: "/ssb-tasks", label: "SSB Tasks" },
      { href: "/study-material", label: "Study Material" },
      { href: "/practice-tests", label: "Practice Tests" },
      { href: "/downloads", label: "Downloads" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/book", label: "Our Book" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

export default function Footer() {
  const c = siteConfig.contact;
  return (
    <footer className="relative overflow-hidden border-t border-[#dfe6f2] bg-white text-[#4d5b76]">
      <div className="tristripe" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm">{siteConfig.tagline}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1c4cb0]">Seva · Sam · Nabha</p>
          <p className="mt-4 flex items-center gap-2 text-sm"><Mail size={14} className="text-[#1c4cb0]" /> {c.email}</p>
          <p className="mt-1 flex items-center gap-2 text-sm"><Phone size={14} className="text-[#1c4cb0]" /> {c.phone}</p>
          <p className="mt-4 flex gap-4 text-sm font-semibold">
            {[["YouTube", c.youtube], ["Telegram", c.telegram], ["Instagram", c.instagram]].map(([n, h]) => (
              <a key={n} href={h} className="hover:text-[#1c4cb0]" target="_blank" rel="noopener noreferrer">{n}</a>
            ))}
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-base font-black uppercase tracking-wider text-[#0c2556]">{col.title}</h3>
            <span className="mt-1 block h-1 w-8 rounded bg-gold" />
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-[#1c4cb0]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-[#dfe6f2] bg-[#f3f6fc] py-5 text-center text-xs text-[#6b7589]">
        © 2026 {siteConfig.name}. All rights reserved. Not affiliated with the Indian Armed Forces or any government body.
      </div>
    </footer>
  );
}
