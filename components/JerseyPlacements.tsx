/**
 * Schematic of the five jersey placements in the 2026–2027 partnership
 * dossier (front, sleeve, back, lower back, shorts). Purely illustrative —
 * a flat kit outline with numbered dashed zones, not a render of the real
 * kit. The numbers match the placement list next to it on /partners.
 *
 * Interactive (added Oct 2026): when `onSelect` is given, every zone is a
 * keyboard-focusable button (Tab to reach, Enter/Space to open) with a
 * spoken name, and has an invisible touch target of about 44 user units so
 * it stays comfortably tappable when the diagram is scaled down on a phone.
 * The visible dashed zone is unchanged. The same five placements are also
 * listed as ordinary buttons beside the diagram.
 */
const SHIRT =
  "M44 0 L66 0 Q82 16 98 0 L120 0 L164 30 L142 58 L124 46 L124 176 L40 176 L40 46 L22 58 L0 30 Z";

const SHIRT_ZONE_FILL = "rgba(242,121,12,0.12)";

interface SpotProps {
  n: number;
  /** Badge centre. */
  bx: number;
  by: number;
  zone: { x: number; y: number; w: number; h: number; rotate?: number };
  name?: string;
  onSelect?: (n: number, el: Element) => void;
}

/** One numbered placement: dashed zone + badge (+ button behaviour when `onSelect` is set). */
function Spot({ n, bx, by, zone, name, onSelect }: SpotProps) {
  const { x, y, w, h, rotate } = zone;
  const interactive = Boolean(onSelect);
  return (
    <g
      className={interactive ? "group cursor-pointer outline-none" : undefined}
      {...(interactive
        ? {
            role: "button" as const,
            tabIndex: 0,
            "aria-label": name,
            "aria-haspopup": "dialog" as const,
            onClick: (e: React.MouseEvent<SVGGElement>) => onSelect!(n, e.currentTarget),
            onKeyDown: (e: React.KeyboardEvent<SVGGElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect!(n, e.currentTarget);
              }
            },
          }
        : {})}
    >
      {/* Invisible touch target (>= 24 CSS px when the diagram is scaled to a phone). */}
      {interactive && <circle cx={bx} cy={by} r="22" fill="transparent" />}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill={SHIRT_ZONE_FILL}
        stroke="#f2790c"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}
        className={interactive ? "transition group-hover:fill-[rgba(242,121,12,0.3)] group-focus-visible:fill-[rgba(242,121,12,0.3)]" : undefined}
      />
      <circle cx={bx} cy={by} r="10" fill="#f2790c" />
      <text x={bx} y={by + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#071426" aria-hidden>
        {n}
      </text>
      {interactive && (
        <circle
          cx={bx}
          cy={by}
          r="15"
          fill="none"
          strokeWidth="2.5"
          className="stroke-transparent transition group-hover:stroke-white/70 group-focus-visible:stroke-white"
        />
      )}
    </g>
  );
}

export function JerseyPlacements({
  labels,
  className,
  zoneNames,
  onSelect,
}: {
  labels: { front: string; back: string; shorts: string };
  className?: string;
  /** Spoken name per placement number (1–5), e.g. "1. Front of jersey, Main partner, view details". */
  zoneNames?: Record<number, string>;
  /** Called with the placement number and the element to return focus to. */
  onSelect?: (n: number, el: Element) => void;
}) {
  const spot = (n: number) => ({ n, name: zoneNames?.[n], onSelect });
  const kit = { fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.45)", strokeWidth: 1.5 };
  return (
    <svg viewBox="0 0 560 270" className={className} role="group" aria-label={`${labels.front} / ${labels.back} / ${labels.shorts}`}>
      {/* Front */}
      <g transform="translate(20 20)">
        <path d={SHIRT} {...kit} />
        <Spot {...spot(1)} bx={52} by={78} zone={{ x: 52, y: 78, w: 64, h: 26 }} />
        <Spot {...spot(2)} bx={158} by={52} zone={{ x: 140, y: 26, w: 22, h: 16, rotate: 38 }} />
        <text x="82" y="204" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)" aria-hidden>
          {labels.front.toUpperCase()}
        </text>
      </g>
      {/* Back */}
      <g transform="translate(220 20)">
        <path d={SHIRT} {...kit} />
        <Spot {...spot(3)} bx={116} by={22} zone={{ x: 52, y: 22, w: 64, h: 14 }} />
        <text x="82" y="92" textAnchor="middle" fontSize="34" fontWeight="700" fill="rgba(255,255,255,0.35)" aria-hidden>
          10
        </text>
        <Spot {...spot(4)} bx={52} by={152} zone={{ x: 52, y: 138, w: 64, h: 14 }} />
        <text x="82" y="204" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)" aria-hidden>
          {labels.back.toUpperCase()}
        </text>
      </g>
      {/* Shorts */}
      <g transform="translate(430 70)">
        <path d="M0 0 L100 0 L104 90 L58 90 L50 40 L42 90 L-4 90 Z" {...kit} />
        <Spot {...spot(5)} bx={12} by={14} zone={{ x: 8, y: 14, w: 26, h: 16 }} />
        <text x="50" y="134" textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.6)" aria-hidden>
          {labels.shorts.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
