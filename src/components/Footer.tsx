import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { socials } from "./SocialIcons";
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
    <footer className="print:hidden relative overflow-hidden border-t border-[#dfe6f2] bg-white text-[#4d5b76]">
      <div className="tristripe" />
      <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm">{siteConfig.tagline}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1c4cb0]">Seva · Sam · Nabha</p>
          <a href={`mailto:${c.email}`} className="mt-4 flex w-fit items-center gap-2 text-sm hover:text-[#1c4cb0] hover:underline"><Mail size={14} className="text-[#1c4cb0]" /> {c.email}</a>
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-1 flex w-fit items-center gap-2 text-sm hover:text-[#1c4cb0] hover:underline"><Phone size={14} className="text-[#1c4cb0]" /> {c.phone}</a>
          <div className="mt-4 flex gap-2.5">
            {socials.map(({ key, label, href, Icon, bg, fg }) => (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} style={{ background: bg, color: fg }} className="social-wiggle grid h-10 w-10 place-items-center rounded-full shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-base font-black uppercase tracking-wider text-[#0c2556]">{col.title}</h3>
            <span className="mt-1 block h-1 w-8 rounded bg-gold" />
            <ul className="mt-4 space-y-1 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 transition hover:text-[#1c4cb0]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-[#dfe6f2] bg-[#f3f6fc] px-4 pb-24 pt-5 text-center md:pb-5 text-xs text-[#6b7589]">
        © 2026 {siteConfig.name}. All rights reserved. Not affiliated with the Indian Armed Forces or any government body.
      </div>
    </footer>
  );
}
