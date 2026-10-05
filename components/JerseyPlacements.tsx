/**
 * Schematic of the five jersey placements in the 2026–2027 partnership
 * dossier (front, sleeve, back, lower back, shorts). Purely illustrative —
 * a flat kit outline with numbered dashed zones, not a render of the real
 * kit. The numbers match the placement list next to it on /partners.
 */
const SHIRT =
  "M44 0 L66 0 Q82 16 98 0 L120 0 L164 30 L142 58 L124 46 L124 176 L40 176 L40 46 L22 58 L0 30 Z";

function Badge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill="#f2790c" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#071426">
        {n}
      </text>
    </g>
  );
}

function Zone({ x, y, w, h, rotate }: { x: number; y: number; w: number; h: number; rotate?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="3"
      fill="rgba(242,121,12,0.12)"
      stroke="#f2790c"
      strokeWidth="1.5"
      strokeDasharray="4 3"
      transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}
    />
  );
}

export function JerseyPlacements({ labels, className }: { labels: { front: string; back: string; shorts: string }; className?: string }) {
  const kit = { fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.45)", strokeWidth: 1.5 };
  return (
    <svg viewBox="0 0 560 270" className={className} role="img" aria-label={`${labels.front} / ${labels.back} / ${labels.shorts}`}>
      {/* Front */}
      <g transform="translate(20 20)">
        <path d={SHIRT} {...kit} />
        <Zone x={52} y={78} w={64} h={26} />
        <Badge n={1} x={52} y={78} />
        <Zone x={140} y={26} w={22} h={16} rotate={38} />
        <Badge n={2} x={158} y={52} />
        <text x="82" y="204" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)">
          {labels.front.toUpperCase()}
        </text>
      </g>
      {/* Back */}
      <g transform="translate(220 20)">
        <path d={SHIRT} {...kit} />
        <Zone x={52} y={22} w={64} h={14} />
        <Badge n={3} x={116} y={22} />
        <text x="82" y="92" textAnchor="middle" fontSize="34" fontWeight="700" fill="rgba(255,255,255,0.35)">
          10
        </text>
        <Zone x={52} y={138} w={64} h={14} />
        <Badge n={4} x={52} y={152} />
        <text x="82" y="204" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)">
          {labels.back.toUpperCase()}
        </text>
      </g>
      {/* Shorts */}
      <g transform="translate(430 70)">
        <path d="M0 0 L100 0 L104 90 L58 90 L50 40 L42 90 L-4 90 Z" {...kit} />
        <Zone x={8} y={14} w={26} h={16} />
        <Badge n={5} x={12} y={14} />
        <text x="50" y="134" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)">
          {labels.shorts.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
