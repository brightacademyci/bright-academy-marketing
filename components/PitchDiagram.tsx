/**
 * Line-art football pitch/tactics-board graphic — the same signature mark
 * used throughout the Bright Academy OS app (auth pages, Parent Portal
 * hero, app-wide background texture, added there 2026-08-03 at Patrick's
 * own request for a SportEasy/TeamSnap-style drawn-pitch look rather than
 * decorative photography). Ported verbatim (identical viewBox/paths) so the
 * marketing site and the OS app share one recognizable graphic — the
 * closest thing this brand has to a repeating kit pattern or badge motif,
 * something Bright Academy's competitors (see the 2026-08-12 review of
 * cocodyfootballacademy.com) have nothing equivalent to.
 *
 * Touchlines, halfway line, center circle, both penalty boxes + six-yard
 * boxes + spots + arcs, corner arcs, two dashed tactical "run" arrows with
 * arrowheads, and two player-position dots. Inherits stroke/fill from
 * `currentColor` and opacity/tint from the caller's own `className` — one
 * component serves a bold treatment on navy sections and a barely-there
 * texture on light ones, same graduated-strength convention the OS app
 * established (bold on its navy auth pages, ~5% opacity on its app shell).
 */
export function PitchDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 640"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* touchlines */}
      <rect x="30" y="30" width="940" height="580" rx="6" />
      {/* halfway line + center circle/spot */}
      <line x1="500" y1="30" x2="500" y2="610" />
      <circle cx="500" cy="320" r="80" />
      <circle cx="500" cy="320" r="4" fill="currentColor" stroke="none" />
      {/* left penalty box + six-yard box + spot + arc */}
      <rect x="30" y="160" width="150" height="320" />
      <rect x="30" y="240" width="55" height="160" />
      <circle cx="150" cy="320" r="4" fill="currentColor" stroke="none" />
      <path d="M180 245 A 80 80 0 0 1 180 395" />
      {/* right penalty box + six-yard box + spot + arc (mirrored) */}
      <rect x="820" y="160" width="150" height="320" />
      <rect x="915" y="240" width="55" height="160" />
      <circle cx="850" cy="320" r="4" fill="currentColor" stroke="none" />
      <path d="M820 245 A 80 80 0 0 0 820 395" />
      {/* corner arcs */}
      <path d="M30 54 A 24 24 0 0 0 54 30" />
      <path d="M946 30 A 24 24 0 0 0 970 54" />
      <path d="M970 586 A 24 24 0 0 0 946 610" />
      <path d="M54 610 A 24 24 0 0 0 30 586" />
      {/* dashed tactical run arrows */}
      <path
        d="M230 490 C 310 430, 390 380, 470 345"
        strokeDasharray="2 14"
        markerEnd="url(#pitch-diagram-arrowhead)"
      />
      <path
        d="M770 170 C 690 230, 610 275, 535 300"
        strokeDasharray="2 14"
        markerEnd="url(#pitch-diagram-arrowhead)"
      />
      {/* player-position dots at the arrows' starting ends */}
      <circle cx="230" cy="490" r="9" fill="currentColor" stroke="none" />
      <circle cx="770" cy="170" r="9" fill="currentColor" stroke="none" />
      <defs>
        <marker id="pitch-diagram-arrowhead" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </svg>
  );
}
