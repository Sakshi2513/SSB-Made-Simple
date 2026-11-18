import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
      <Image
        src="/brand/emblem.webp"
        alt=""
        width={46}
        height={46}
        priority
        className={`h-[46px] w-[46px] object-contain transition duration-300 group-hover:scale-105 ${onDark ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" : "drop-shadow-[0_2px_6px_rgba(10,23,51,0.25)]"}`}
      />
      <span className="leading-none">
        <span className={`block text-[1.6rem] font-black tracking-tight ${onDark ? "text-white" : "text-[#0c2556]"}`}>SSB</span>
        <span className={`mt-0.5 block text-[0.56rem] font-bold uppercase tracking-[0.3em] ${onDark ? "text-gold" : "text-[#1c4cb0]"}`}>Made Simple</span>
      </span>
    </Link>
  );
}
