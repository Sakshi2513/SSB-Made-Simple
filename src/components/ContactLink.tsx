"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";

type Props = { kind: "email" | "phone"; value: string; whatsapp?: string; card?: { label: string; bg: string; fg: string } };

// Click the email or phone and a small menu opens with real actions (Gmail, mail app, call, WhatsApp, copy).
export default function ContactLink({ kind, value, whatsapp, card }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  async function copy() {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => { setCopied(false); setOpen(false); }, 1200); } catch {}
  }

  const Icon = kind === "email" ? Mail : Phone;
  const item = "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#0c2556] hover:bg-[#eef3fb]";
  const digits = value.replace(/\D/g, "");

  return (
    <div ref={box} className={card ? "relative" : "relative mt-1.5"}>
      {card ? (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="group flex w-full items-center gap-4 rounded-2xl border border-[#dfe6f2] bg-white p-4 text-left shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)] transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_36px_-22px_rgba(12,37,86,0.7)]">
          <span style={{ background: card.bg, color: card.fg, "--glow": "rgba(12,37,86,.35)" } as React.CSSProperties} className="social-pulse social-wiggle grid h-12 w-12 shrink-0 place-items-center rounded-2xl"><Icon size={22} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#6b7589]">{card.label}</span>
            <span className="block truncate font-extrabold text-[#0c2556]">{value}</span>
          </span>
          <ChevronDown size={18} className={`shrink-0 text-[#6b7589] transition ${open ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex items-center gap-2 text-sm hover:text-[#1c4cb0] hover:underline">
          <Icon size={14} className="text-[#1c4cb0]" /> {value}
        </button>
      )}
      {open && (
        <div role="menu" className={`absolute left-0 z-30 w-60 ${card ? "top-full mt-2" : "bottom-full mb-2"} rounded-2xl border border-[#dfe6f2] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(12,37,86,0.45)]`}>
          {kind === "email" ? (
            <>
              <a role="menuitem" className={item} target="_blank" rel="noopener noreferrer" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(value)}`}><ExternalLink size={15} /> Write in Gmail</a>
              <a role="menuitem" className={item} href={`mailto:${value}`}><Mail size={15} /> Open mail app</a>
            </>
          ) : (
            <>
              <a role="menuitem" className={item} href={`tel:+${digits}`}><Phone size={15} /> Call now</a>
              <a role="menuitem" className={item} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${whatsapp || digits}`}><MessageCircle size={15} /> Chat on WhatsApp</a>
            </>
          )}
          <button type="button" role="menuitem" className={item} onClick={copy}>{copied ? <Check size={15} className="text-[#3d6b24]" /> : <Copy size={15} />} {copied ? "Copied" : kind === "email" ? "Copy email" : "Copy number"}</button>
        </div>
      )}
    </div>
  );
}
