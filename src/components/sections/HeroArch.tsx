// Same arch as the logo, drawn large: each stone is a service, the keystone is the client's business.
// The entrance is CSS (.arch-stone / .arch-key in globals.css) so it starts on first paint, with no JavaScript.
// Like a real arch, the side stones land first and the keystone goes in last.
const CX = 300;
const CY = 330;
const R_IN = 150;
const R_OUT = 270;
const R_KEY = 305;

const STONES = [
  { from: 180, to: 145, label: ['Websites'], order: 0 },
  { from: 143, to: 109, label: ['SaaS'], order: 1 },
  { from: 107, to: 73, label: ['Your', 'business'], order: 2, key: true },
  { from: 71, to: 37, label: ['AI'], order: 1 },
  { from: 35, to: 0, label: ['E-commerce'], order: 0 },
];

function point(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)] as const;
}

function polygon(from: number, to: number, rOut: number) {
  return [point(rOut, from), point(rOut, to), point(R_IN, to), point(R_IN, from)]
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
}

export function HeroArch() {
  return (
    <svg
      viewBox="0 0 600 345"
      className="h-auto w-full"
      role="img"
      aria-label="An arch of stones labelled Websites, SaaS, AI and E-commerce, held together by a keystone labelled Your business"
    >
      <path
        d={`M ${CX - 330} ${CY} A 330 330 0 0 1 ${CX + 330} ${CY}`}
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
      />
      <line x1="10" x2="590" y1={CY + 1} y2={CY + 1} stroke="var(--line)" strokeWidth="1.5" />

      {STONES.map((s) => {
        const rOut = s.key ? R_KEY : R_OUT;
        const mid = (s.from + s.to) / 2;
        const [lx, ly] = point((R_IN + rOut) / 2, mid);
        const lineHeight = 22;
        const startY = ly - ((s.label.length - 1) * lineHeight) / 2;

        return (
          <g
            key={s.label.join(' ')}
            className={s.key ? 'arch-key' : 'arch-stone'}
            style={{ animationDelay: s.key ? '750ms' : `${150 + s.order * 180}ms` }}
          >
            <polygon
              points={polygon(s.from, s.to, rOut)}
              fill={s.key ? 'var(--ember-strong)' : 'var(--stone)'}
              stroke={s.key ? 'var(--ember-strong)' : 'var(--stone)'}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x={lx}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fill={s.key ? 'var(--on-ember)' : 'var(--ink)'}
              fontSize={s.key ? 20 : 18}
              fontWeight={600}
            >
              {s.label.map((line, i) => (
                <tspan key={line} x={lx} y={startY + i * lineHeight}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      <text
        x={CX}
        y={CY - 34}
        textAnchor="middle"
        fill="var(--muted)"
        fontSize="13"
        letterSpacing="2.5"
        className="arch-label"
        style={{ animationDelay: '1150ms' }}
      >
        EST. 2026 · PUNE
      </text>
    </svg>
  );
}
