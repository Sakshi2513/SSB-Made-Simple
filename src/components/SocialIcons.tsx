import { siteConfig } from "@/config/site";

type P = { size?: number; className?: string };

export function WhatsAppIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.5A9.93 9.93 0 1 0 12.04 2zm0 1.8a8.13 8.13 0 1 1-4.2 15.1l-.3-.18-3 .88.9-2.93-.2-.31A8.13 8.13 0 0 1 12.04 3.8zm-3.1 3.7c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57z" />
    </svg>
  );
}

export function TelegramIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.9 4.3a1.2 1.2 0 0 0-1.25-.2L2.9 11a1.1 1.1 0 0 0 .05 2.06l4.3 1.5 1.67 5.3a1.1 1.1 0 0 0 1.88.42l2.4-2.5 4.4 3.24a1.2 1.2 0 0 0 1.9-.7l3-14.3a1.2 1.2 0 0 0-.6-1.72zM9.6 14.1l8-5-6.2 6.1-.25 2.6-1.55-3.7z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const c = siteConfig.contact;

// Single source for every social / contact button on the site.
export const socials = [
  { key: "whatsapp", label: "WhatsApp", handle: c.phone, href: `https://wa.me/${c.whatsapp}`, Icon: WhatsAppIcon, bg: "#25D366", fg: "#fff", glow: "rgba(37,211,102,.55)" },
  { key: "telegram", label: "Telegram", handle: c.telegramName, href: c.telegram, Icon: TelegramIcon, bg: "#229ED9", fg: "#fff", glow: "rgba(34,158,217,.55)" },
  { key: "instagram", label: "Instagram", handle: c.instagramHandle, href: c.instagram, Icon: InstagramIcon, bg: "linear-gradient(135deg,#feda75,#fa7e1e 30%,#d62976 60%,#962fbf 85%,#4f5bd5)", fg: "#fff", glow: "rgba(214,41,118,.5)" },
  { key: "youtube", label: "YouTube", handle: "SSB Made Simple", href: c.youtube, Icon: YouTubeIcon, bg: "#FF0000", fg: "#fff", glow: "rgba(255,0,0,.5)" },
] as const;
