import { MessageCircle, Send } from "lucide-react";

function Youtube({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}
import { siteConfig } from "@/config/site";

const { whatsapp, telegram, youtube } = siteConfig.contact;

const items = [
  { label: "Chat on WhatsApp", href: `https://wa.me/${whatsapp}`, Icon: MessageCircle, color: "bg-[#25D366]" },
  { label: "Join our Telegram", href: telegram, Icon: Send, color: "bg-[#229ED9]" },
  { label: "Watch on YouTube", href: youtube, Icon: Youtube, color: "bg-[#FF0000]" },
];

export default function FloatingContacts() {
  return (
    <div className="fixed bottom-20 right-3 z-30 flex flex-col gap-2 md:bottom-6 md:right-5">
      {items.map(({ label, href, Icon, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`grid h-11 w-11 place-items-center rounded-full text-white shadow-lg transition hover:scale-105 ${color}`}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
