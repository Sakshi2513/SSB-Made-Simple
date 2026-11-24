import Link from "next/link";
import { Megaphone } from "lucide-react";
import { getSettings } from "@/lib/content";

// Strip at the top of every page, controlled from /admin > Settings.
export default async function AnnouncementBar() {
  const s = await getSettings();
  if (!s.announceEnabled || !s.announceText) return null;
  const inner = (
    <span className="inline-flex items-center justify-center gap-2">
      <Megaphone size={15} className="shrink-0" /> {s.announceText}
    </span>
  );
  const cls = "print:hidden block bg-gold px-4 py-2 text-center text-[0.8rem] font-extrabold text-[#0c2556]";
  return s.announceLink ? (
    <Link href={s.announceLink} className={`${cls} hover:brightness-105`}>{inner}</Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
