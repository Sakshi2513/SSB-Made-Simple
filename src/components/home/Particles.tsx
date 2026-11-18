// Floating gold embers. Pure CSS, deterministic positions (no JS, no hydration mismatch).
const particles = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37.7) % 100,
  size: 3 + ((i * 5) % 6),
  dur: 12 + ((i * 3) % 11),
  delay: -((i * 1.9) % 16),
  dx: ((i % 2 === 0 ? 1 : -1) * (14 + ((i * 7) % 40))),
}));

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--t": `${p.dur}s`,
              "--d": `${p.delay}s`,
              "--dx": `${p.dx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
