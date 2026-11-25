import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactLink from "@/components/ContactLink";
import MentorCard from "@/components/MentorCard";
import { socials } from "@/components/SocialIcons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const c = siteConfig.contact;
  const plain = [
    { Icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}`, bg: "#0c2556", fg: "#ffd21f" },
    { Icon: Phone, label: "Call us", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}`, bg: "#4a7a2e", fg: "#fff" },
  ];
  return (
    <>
      <PageHero title="Contact Us" subtitle="Questions about SSB, the book or courses? We'd love to hear from you." />
      <section className="bg-[#f3f6fc]">
        <div className="container-x grid gap-8 py-12 md:grid-cols-2">
          <MentorCard className="md:col-span-2" />
          <div className="space-y-3.5">
            {[...socials.slice(0, 1), ...plain, ...socials.slice(1)].map((it) => {
              const Icon = it.Icon;
              const label = it.label;
              if (label === "Email" || label === "Call us") {
                const isMail = label === "Email";
                return <ContactLink key={label} kind={isMail ? "email" : "phone"} value={isMail ? c.email : c.phone} whatsapp={c.whatsapp} card={{ label, bg: it.bg, fg: it.fg }} />;
              }
              const value = "handle" in it ? it.handle : it.value;
              const bg = it.bg;
              const fg = it.fg;
              const glow = "glow" in it ? it.glow : "rgba(12,37,86,.35)";
              return (
                <a
                  key={label}
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#dfe6f2] bg-white p-4 shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)] transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_36px_-22px_rgba(12,37,86,0.7)]"
                >
                  <span style={{ background: bg, color: fg, "--glow": glow } as React.CSSProperties} className="social-pulse social-wiggle grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6b7589]">{label}</span>
                    <span className="block truncate font-extrabold text-[#0c2556]">{value}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-[#6b7589] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0c2556]" />
                </a>
              );
            })}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
