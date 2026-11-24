"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { socials } from "./SocialIcons";

export default function FloatingContacts() {
  const [open, setOpen] = useState(false);
  const list = socials.filter((s) => s.key !== "instagram");
  return (
    <div className="print:hidden fixed bottom-[5.25rem] right-3 z-30 flex flex-col items-end gap-2.5 md:bottom-6 md:right-5">
      <div className={`flex flex-col gap-2.5 ${open ? "flex" : "hidden md:flex"}`}>
        {list.map(({ key, label, href, Icon, bg, fg, glow }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            style={{ background: bg, color: fg, "--glow": glow } as React.CSSProperties}
            className="social-pulse social-wiggle grid h-11 w-11 place-items-center rounded-full shadow-lg transition hover:scale-110"
          >
            <Icon size={21} />
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-full bg-[#0c2556] text-gold shadow-lg ring-2 ring-white/70 transition active:scale-95 md:hidden"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
