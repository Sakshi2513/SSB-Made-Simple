"use client";

import { useEffect, useRef } from "react";

// Original tri-service landscape: Army (mountains), Navy (warship at sea), Air Force (jet + tricolour contrail).
const stars = Array.from({ length: 34 }, (_, i) => ({
  x: 300 + ((i * 137.5) % 900),
  y: (i * 53.7) % 250,
  r: 0.8 + ((i * 7) % 5) * 0.35,
  d: (i % 9) * 0.45,
}));

function Scene({ k, viewBox, className }: { k: string; viewBox: string; className: string }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${k}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffb347" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#ff9933" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ff9933" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${k}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d5cb0" />
          <stop offset="1" stopColor="#0a2250" />
        </linearGradient>
        <linearGradient id={`${k}-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a4f86" />
          <stop offset="1" stopColor="#0f2a52" />
        </linearGradient>
        <linearGradient id={`${k}-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f6a2c" />
          <stop offset="1" stopColor="#1b3320" />
        </linearGradient>
      </defs>

      <g data-depth="0.02">
        <circle cx="720" cy="430" r="330" fill={`url(#${k}-sun)`} />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" className="animate-twinkle" style={{ animationDelay: `${s.d}s` }} />
        ))}
      </g>

      {/* Air Force */}
      <g data-depth="0.07">
        <g fill="none" strokeWidth="7" strokeLinecap="round">
          <path className="contrail" pathLength="1" d="M430 290 C 650 286, 850 220, 1010 132" stroke="#ff9933" />
          <path className="contrail" pathLength="1" d="M430 300 C 650 296, 850 232, 1010 142" stroke="#ffffff" opacity="0.95" />
          <path className="contrail" pathLength="1" d="M430 310 C 650 306, 850 244, 1010 152" stroke="#1c9140" />
        </g>
        <g transform="translate(1034 138) rotate(-14) scale(1.05)">
          <g className="jet">
            <path
              d="M60 0 L30 -6 L14 -30 L4 -30 L12 -6 L-18 -5 L-28 -14 L-34 -14 L-30 0 L-34 14 L-28 14 L-18 5 L12 6 L4 30 L14 30 L30 6 Z"
              fill="#e6eefb"
            />
            <path d="M60 0 L30 -6 L12 -6 L12 6 L30 6 Z" fill="#9fb8dc" />
          </g>
        </g>
      </g>

      {/* Army */}
      <g data-depth="0.12">
        <path d="M-200 430 L-80 340 L20 400 L120 330 L210 385 L330 255 L440 365 L550 285 L670 400 L780 345 L900 430 L900 530 L-200 530Z" fill={`url(#${k}-far)`} opacity="0.9" />
        <path d="M330 255 L304 290 L322 283 L335 298 L348 284 L362 292Z" fill="#fff" opacity="0.85" />
        <path d="M550 285 L530 312 L545 306 L556 318 L568 306 L580 312Z" fill="#fff" opacity="0.8" />
      </g>
      <g data-depth="0.2">
        <path d="M-200 478 L-100 410 L0 450 L100 405 L195 448 L305 365 L425 458 L525 415 L645 478 L765 435 L900 488 L900 530 L-200 530Z" fill={`url(#${k}-mid)`} />
      </g>

      {/* Navy */}
      <g data-depth="0.14">
        <path
          d="M700 440 Q 740 432 780 440 T 860 440 T 940 440 T 1020 440 T 1100 440 T 1180 440 T 1260 440 T 1340 440 T 1420 440 T 1500 440 L1500 530 L700 530Z"
          fill={`url(#${k}-sea)`}
        />
        <g stroke="#6fb0ff" strokeOpacity="0.35" strokeWidth="2" fill="none">
          <path d="M840 462 q 20 -6 40 0 t 40 0" />
          <path d="M1060 474 q 25 -7 50 0 t 50 0" />
          <path d="M1190 456 q 18 -5 36 0 t 36 0" />
        </g>
        <g transform="translate(935 408)" fill="#0a1a3a">
          <path d="M0 18 L200 18 L184 34 L20 34Z" />
          <rect x="52" y="4" width="78" height="14" />
          <rect x="78" y="-12" width="34" height="16" />
          <rect x="92" y="-30" width="6" height="18" />
          <path d="M95 -30 L95 -52" stroke="#0a1a3a" strokeWidth="3" />
          <rect x="140" y="10" width="34" height="5" />
          <rect x="28" y="10" width="20" height="5" />
          <circle cx="95" cy="-34" r="4" />
        </g>
        <path d="M941 446 h192" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
      </g>

      <g data-depth="0.3">
        <path d="M-200 530 L-200 498 Q 240 478 480 502 T 960 496 T 1500 504 L1500 530Z" fill="#08142e" />
      </g>
    </svg>
  );
}

export default function HeroScene() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(el.querySelectorAll<SVGGElement>("[data-depth]"));
    let raf = 0;
    let mx = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      for (const g of layers) {
        const d = Number(g.dataset.depth);
        g.style.transform = `translate3d(${mx * d * 40}px, ${y * d}px, 0)`;
      }
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      queue();
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={box} className="pointer-events-none absolute inset-0">
      <Scene k="m" viewBox="330 0 820 520" className="absolute inset-0 h-full w-full md:hidden" />
      <Scene k="d" viewBox="0 0 1440 520" className="absolute inset-0 hidden h-full w-full md:block" />
    </div>
  );
}
