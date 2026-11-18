import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Send, Camera } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const c = siteConfig.contact;
  const items = [
    { Icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { Icon: Phone, label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${c.whatsapp}` },
    { Icon: Send, label: "Telegram", value: "Join our channel", href: c.telegram },
    { Icon: Camera, label: "Instagram", value: "@ssb.made.simple", href: c.instagram },
  ];
  return (
    <>
      <PageHero image="page-contact|personal-interview" title="Contact Us" subtitle="Questions about SSB, the book or courses? We'd love to hear from you." />
      <section className="bg-[#f3f6fc]"><div className="container-x grid gap-8 py-12 md:grid-cols-2">
        <div className="space-y-4">
          {items.map(({ Icon, label, value, href }) => (
            <a key={label} href={href} className="group flex items-center gap-4 rounded-2xl border border-[#dfe6f2] bg-white p-4 shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)] transition hover:-translate-y-0.5 hover:border-gold" target="_blank" rel="noopener noreferrer">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0c2556] text-gold">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase text-[#6b7589]">{label}</span>
                <span className="font-bold text-[#0c2556]">{value}</span>
              </span>
            </a>
          ))}
        </div>
        <ContactForm />
      </div></section>
    </>
  );
}
