import { BadgeCheck } from "lucide-react";
import Counter from "@/components/Counter";
import { socials } from "@/components/SocialIcons";

// Compact mentor introduction, shared by the About and Contact pages.
export default function MentorCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#dfe6f2] bg-white p-4 shadow-[0_14px_34px_-26px_rgba(12,37,86,0.6)] md:p-5 ${className}`}>
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold to-[#ff8f1f]" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 pl-2 md:flex-nowrap">
        {/* monogram */}
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0c2556] to-[#1c4cb0] text-lg font-black text-gold shadow-md ring-4 ring-gold/30 md:h-16 md:w-16 md:text-xl">HR</span>

        {/* identity */}
        <div className="min-w-0 flex-1 basis-56">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#3d6b24]">Meet your mentor</p>
          <h2 className="text-lg font-black leading-tight text-[#0c2556] md:text-xl">Hitender Rohilla</h2>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#4d5b76]"><BadgeCheck size={15} className="shrink-0 text-[#1c4cb0]" /> Founder &amp; Author | SSB Made Simple</p>
          <p className="mt-1 text-[0.8rem] font-bold text-[#0c2556]/80">Guiding Aspirants. Building Confidence. Inspiring Future Officers.</p>
        </div>

        {/* stat + socials */}
        <div className="flex w-full items-center justify-between gap-4 border-t border-[#eef1f6] pt-3 md:w-auto md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div className="text-center md:text-left">
            <p className="text-2xl font-black leading-none text-[#0c2556]"><Counter to={10} suffix="+" /></p>
            <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#6b7589]">Years of SSB<br />experience</p>
          </div>
          <div className="flex gap-2">
            {socials.map(({ key, label, href, Icon, bg, fg }) => (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} style={{ background: bg, color: fg }} className="social-wiggle grid h-9 w-9 place-items-center rounded-full shadow transition hover:-translate-y-0.5">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
