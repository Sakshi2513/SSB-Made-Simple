// Original, simplified illustrations of each GTO task (not photographs).

const NAVY = "#0c2556";
const GOLD = "#ffd21f";
const SKY = "#3b9cff";
const GREEN = "#4a7a2e";
const ORANGE = "#ff8f1f";

function P({ x, y, s = 1, c = NAVY }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
      <circle cx="0" cy="-26" r="7" />
      <path d="M-9 -16 h18 v24 h-5 v22 h-8 v-22 h-5z" />
    </g>
  );
}

function Frame({ x, y, w = 50, h = 46, c = GREEN }: { x: number; y: number; w?: number; h?: number; c?: string }) {
  return (
    <g stroke={c} strokeWidth="5" strokeLinecap="round" fill="none">
      <path d={`M${x} ${y} v${-h} M${x + w} ${y} v${-h} M${x - 6} ${y - h} h${w + 12}`} />
    </g>
  );
}

export default function TaskIllustration({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" role="img" aria-label="Illustration of the task">
      <defs>
        <linearGradient id="ti-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef3fb" />
          <stop offset="1" stopColor="#dfe6f2" />
        </linearGradient>
        <linearGradient id="ti-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9c7a3" />
          <stop offset="1" stopColor="#97aa7c" />
        </linearGradient>
      </defs>
      <rect width="480" height="300" rx="24" fill="url(#ti-bg)" />

      {slug === "group-discussion" && (
        <g>
          <ellipse cx="240" cy="165" rx="110" ry="46" fill={NAVY} opacity="0.12" />
          <ellipse cx="240" cy="160" rx="92" ry="36" fill="#fff" stroke={NAVY} strokeWidth="4" />
          {[[130, 130], [185, 100], [240, 90], [295, 100], [350, 130], [350, 205], [295, 230], [240, 238], [185, 230], [130, 205]].map(([x, y], i) => (
            <P key={i} x={x} y={y + 28} s={0.9} c={i % 3 === 0 ? GOLD : NAVY} />
          ))}
          <g fill={SKY}>
            <rect x="60" y="40" width="70" height="38" rx="12" />
            <path d="M92 78 l8 14 l8 -14z" />
            <rect x="350" y="52" width="70" height="38" rx="12" fill={ORANGE} />
          </g>
        </g>
      )}

      {slug === "group-planning-exercise" && (
        <g>
          <rect x="60" y="40" width="360" height="220" rx="14" fill="#fff" stroke={NAVY} strokeWidth="4" />
          <g stroke="#c9d3e6" strokeWidth="2">
            {[100, 140, 180, 220].map((y) => <path key={y} d={`M60 ${y} H420`} />)}
            {[120, 180, 240, 300, 360].map((x) => <path key={x} d={`M${x} 40 V260`} />)}
          </g>
          <path d="M110 220 C170 120, 250 210, 320 90" fill="none" stroke={ORANGE} strokeWidth="5" strokeDasharray="10 8" strokeLinecap="round" />
          {[[110, 220, GREEN], [250, 175, SKY], [320, 90, "#d8362f"]].map(([x, y, c], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 0 c-14 -22 -14 -36 0 -36 s14 14 0 36z" fill={c as string} />
              <circle cy="-24" r="5" fill="#fff" />
            </g>
          ))}
          <g transform="translate(380 70)">
            <circle r="22" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <path d="M0 -16 l6 16 h-12z" fill={NAVY} />
            <path d="M0 16 l6 -16 h-12z" fill="#c9d3e6" />
          </g>
        </g>
      )}

      {(slug === "progressive-group-task" || slug === "half-group-task" || slug === "final-group-task") && (
        <g>
          <rect y="200" width="480" height="100" fill="url(#ti-ground)" />
          <path d="M40 200 v-50" stroke={NAVY} strokeWidth="4" />
          <path d="M440 200 v-50" stroke={NAVY} strokeWidth="4" />
          <path d="M40 152 l34 -8 v18 l-34 -2z" fill={GOLD} />
          <path d="M440 152 l-34 -8 v18 l34 -2z" fill={ORANGE} />
          <Frame x={170} y={200} />
          <Frame x={300} y={200} w={44} h={64} c={ORANGE} />
          <path d="M150 160 H355" stroke="#8a6a3a" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
          <path d="M225 154 q22 30 44 0" stroke="#fff" strokeWidth="3" fill="none" />
          {(slug === "half-group-task" ? [[70, 230], [100, 238], [128, 230]] : slug === "final-group-task" ? [[70, 230], [94, 238], [118, 230], [142, 238], [388, 238], [414, 230]] : [[70, 230], [96, 238], [122, 230], [148, 238], [388, 238]]).map(([x, y], i) => (
            <P key={i} x={x} y={y + 24} s={0.85} c={i % 2 ? GOLD : NAVY} />
          ))}
          <rect x="60" y="245" width="38" height="22" rx="4" fill={SKY} />
        </g>
      )}

      {slug === "snake-race" && (
        <g>
          <rect y="190" width="480" height="110" fill="url(#ti-ground)" />
          <g stroke="#fff" strokeWidth="3" strokeDasharray="14 12" opacity="0.7">
            <path d="M0 220 H480" />
            <path d="M0 255 H480" />
          </g>
          <Frame x={290} y={205} w={46} h={34} />
          <rect x="60" y="150" width="240" height="22" rx="11" fill={ORANGE} stroke={NAVY} strokeWidth="3" />
          <path d="M80 150 v22 M120 150 v22 M160 150 v22 M200 150 v22 M240 150 v22" stroke={NAVY} strokeWidth="2" opacity="0.4" />
          {[75, 115, 155, 195, 235, 275].map((x, i) => (
            <P key={x} x={x} y={218} s={0.78} c={i % 2 ? GOLD : NAVY} />
          ))}
          <path d="M370 230 l30 -10 M390 252 l30 -10" stroke={SKY} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {slug === "lecturette" && (
        <g>
          <rect y="215" width="480" height="85" fill="#cfd8e8" />
          <rect x="200" y="140" width="80" height="80" rx="6" fill={NAVY} />
          <rect x="190" y="130" width="100" height="14" rx="5" fill={GOLD} />
          <P x={240} y={118} s={1.2} c={ORANGE} />
          <g fill={NAVY} opacity="0.75">
            {[60, 105, 150, 330, 375, 420].map((x) => <circle key={x} cx={x} cy="250" r="14" />)}
            {[82, 128, 352, 398].map((x) => <circle key={x} cx={x} cy="272" r="14" opacity="0.6" />)}
          </g>
          <g transform="translate(380 60)">
            <circle r="34" fill="#fff" stroke={NAVY} strokeWidth="4" />
            <text y="7" textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">3:00</text>
          </g>
        </g>
      )}

      {slug === "individual-obstacles" && (
        <g>
          <rect y="215" width="480" height="85" fill="url(#ti-ground)" />
          {Array.from({ length: 10 }, (_, i) => {
            const h = 20 + i * 5;
            const x = 40 + i * 41;
            return (
              <g key={i}>
                <rect x={x} y={215 - h} width="24" height={h} rx="3" fill={i % 2 ? GREEN : NAVY} />
                <circle cx={x + 12} cy={215 - h - 14} r="11" fill={GOLD} />
                <text x={x + 12} y={215 - h - 10} textAnchor="middle" fontSize="11" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">{i + 1}</text>
              </g>
            );
          })}
          <P x={30} y={258} s={0.8} c={ORANGE} />
          <path d="M60 270 H430" stroke="#fff" strokeWidth="3" strokeDasharray="10 8" />
        </g>
      )}

      {slug === "command-task" && (
        <g>
          <rect y="200" width="480" height="100" fill="url(#ti-ground)" />
          <Frame x={290} y={200} w={60} h={70} c={ORANGE} />
          <path d="M270 150 H380" stroke="#8a6a3a" strokeWidth="8" strokeLinecap="round" />
          <P x={110} y={236} s={1.15} c={GOLD} />
          <path d="M104 175 l6 -12 l6 12 l-12 -8 h12z" fill={ORANGE} transform="translate(0 -6)" />
          <P x={170} y={244} s={0.9} />
          <P x={215} y={244} s={0.9} />
          <path d="M122 222 q40 -30 90 -4" fill="none" stroke={SKY} strokeWidth="3" strokeDasharray="6 6" />
          <rect x="226" y="262" width="34" height="20" rx="4" fill={SKY} />
        </g>
      )}


      {slug === "oir" && (
        <g>
          <rect x="120" y="36" width="240" height="230" rx="14" fill="#fff" stroke={NAVY} strokeWidth="4" />
          <text x="150" y="86" fontSize="30" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">?</text>
          {[0, 1, 2, 3].map((i) => (<rect key={i} x="190" y={64 + i * 38} width={130 - i * 14} height="12" rx="6" fill="#c9d3e6" />))}
          {[0, 1, 2, 3].map((i) => (<circle key={i} cx="160" cy={110 + i * 38} r="9" fill={i === 1 ? GOLD : "#c9d3e6"} />))}
          <g transform="translate(350 70)"><circle r="30" fill={GOLD} stroke={NAVY} strokeWidth="4" /><path d="M0 -16 V0 L12 8" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round" /></g>
        </g>
      )}

      {slug === "ppdt" && (
        <g>
          <rect x="90" y="40" width="300" height="190" rx="12" fill="#fff" stroke={NAVY} strokeWidth="5" />
          <rect x="104" y="54" width="272" height="162" rx="6" fill="#b8c4d6" />
          <circle cx="330" cy="92" r="22" fill="#f2d98a" opacity="0.8" />
          <P x={190} y={196} s={1.3} c="#5d6b85" />
          <P x={250} y={200} s={1.1} c="#6f7e99" />
          <P x={300} y={198} s={1} c="#5d6b85" />
          <g transform="translate(405 245)"><circle r="26" fill={GOLD} stroke={NAVY} strokeWidth="4" /><text y="7" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">30s</text></g>
        </g>
      )}

      {slug === "tat" && (
        <g>
          {[0, 1, 2].map((i) => (<rect key={i} x={110 + i * 22} y={50 + i * 14} width="220" height="150" rx="10" fill={i === 2 ? "#fff" : "#e3e9f4"} stroke={NAVY} strokeWidth="4" />))}
          <P x={215} y={176} s={1.1} c="#6f7e99" />
          <rect x="300" y="190" width="120" height="70" rx="10" fill="#fff" stroke={NAVY} strokeWidth="4" />
          {[0, 1, 2].map((i) => (<rect key={i} x="314" y={204 + i * 17} width={92 - i * 18} height="7" rx="3.5" fill="#c9d3e6" />))}
          <g transform="translate(395 70) rotate(35)"><rect width="14" height="70" rx="4" fill={GOLD} stroke={NAVY} strokeWidth="3" /></g>
        </g>
      )}

      {slug === "wat" && (
        <g>
          {[["Duty", 80, 60, GOLD], ["Friend", 250, 80, SKY], ["Courage", 120, 150, ORANGE], ["Team", 290, 170, GREEN]].map(([t, x, y, c]) => (
            <g key={t as string}>
              <rect x={x as number} y={y as number} width="130" height="56" rx="14" fill={c as string} stroke={NAVY} strokeWidth="3" />
              <text x={(x as number) + 65} y={(y as number) + 35} textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">{t as string}</text>
            </g>
          ))}
          <g transform="translate(410 60)"><circle r="28" fill="#fff" stroke={NAVY} strokeWidth="4" /><text y="7" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">15s</text></g>
        </g>
      )}

      {slug === "srt" && (
        <g>
          <rect x="70" y="50" width="200" height="190" rx="14" fill="#fff" stroke={NAVY} strokeWidth="4" />
          {[0, 1, 2, 3, 4].map((i) => (<rect key={i} x="92" y={78 + i * 28} width={156 - (i % 2) * 30} height="10" rx="5" fill="#c9d3e6" />))}
          <path d="M290 150 h70" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
          <path d="M350 134 l22 16 l-22 16z" fill={ORANGE} />
          <rect x="378" y="110" width="76" height="80" rx="12" fill={GOLD} stroke={NAVY} strokeWidth="4" />
          <path d="M396 150 l14 14 l26 -30" stroke={NAVY} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {slug === "sdt" && (
        <g>
          <rect x="130" y="34" width="230" height="236" rx="14" fill="#fff" stroke={NAVY} strokeWidth="4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx="162" cy={72 + i * 42} r="11" fill={[GOLD, SKY, GREEN, ORANGE, NAVY][i]} />
              <rect x="184" y={64 + i * 42} width="150" height="9" rx="4.5" fill="#c9d3e6" />
              <rect x="184" y={80 + i * 42} width="104" height="9" rx="4.5" fill="#dfe6f2" />
            </g>
          ))}
          <g transform="translate(95 60)"><circle r="20" fill={GOLD} stroke={NAVY} strokeWidth="3" /><text y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY} fontFamily="Arial, sans-serif">15m</text></g>
        </g>
      )}

      {slug === "personal-interview" && (
        <g>
          <rect y="225" width="480" height="75" fill="#cfd8e8" />
          <rect x="170" y="185" width="140" height="14" rx="5" fill={NAVY} />
          <path d="M190 199 v34 M290 199 v34" stroke={NAVY} strokeWidth="6" />
          <P x={110} y={206} s={1.3} c={GOLD} />
          <P x={370} y={206} s={1.3} c={NAVY} />
          <g fill={SKY}><rect x="60" y="48" width="100" height="44" rx="14" /><path d="M96 92 l8 14 l8 -14z" /></g>
          <g fill={ORANGE}><rect x="320" y="60" width="100" height="44" rx="14" /><path d="M370 104 l8 14 l-18 -4z" /></g>
        </g>
      )}

      <rect width="480" height="300" rx="24" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}
