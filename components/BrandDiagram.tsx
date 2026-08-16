import { TrophyDiagram, WhistleDiagram } from "./ProgramIcons";
import { FuninoDiagram, TechniqueDiagram, GameIntelligenceDiagram } from "./MethodologyIcons";

/**
 * Homepage background diagram — added 2026-08-13, reworked 2026-08-16.
 * Drop-in replacement for PitchDiagram on homepage sections only, per
 * Patrick's explicit follow-up: after the category icons (trophy, whistle,
 * goal net, wreath, corner flag — see ProgramIcons.tsx) shipped as small
 * watermarks on the Programs cards, he asked for them to "be part of" the
 * site's main background diagram (the pitch + tactical arrows used
 * sitewide), not confined to the cards. Scope was clarified with him
 * directly: homepage sections only (Hero, About, Achievements, Programs'
 * siblings, Sites, FAQ, Approach, Gallery, EnrollCta) — Our Coaches, First
 * Team, Careers, and News keep the plain PitchDiagram, since a
 * trophy/whistle/wreath watermark has no connection to those pages.
 *
 * 2026-08-16 rework, Patrick's explicit ask: the diagram should feel like it
 * belongs to THIS academy's methodology specifically, not a generic football
 * club — three of the five corner category icons (corner-flag, wreath, goal
 * net) were swapped for GameIntelligenceDiagram, FuninoDiagram, and
 * TechniqueDiagram (see MethodologyIcons.tsx for the full reasoning per
 * icon); trophy and whistle stayed, still relevant and giving the corners
 * some variety. The two lone tactical "run" arrows were also joined into a
 * closed passing triangle (a dashed line now connects their two starting
 * dots directly) so the main diagram itself reads as support-play/game
 * intelligence, not just two disconnected runs.
 *
 * Same pitch drawing as PitchDiagram (touchlines, halfway line, center
 * circle, both boxes, corner arcs), just moved into a wider canvas
 * (1200×800 instead of 1000×640) via a simple translate, which opens up a
 * margin around all four sides. The five icons sit in that margin — four
 * corners plus top-center — small and outside the pitch lines so they read
 * as part of the same diagram without cluttering it. Inherits stroke/fill
 * from `currentColor`, same graduated-strength convention as PitchDiagram
 * (bold on some sections, ~5% opacity on most).
 */
export function BrandDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 800" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform="translate(100,80)">
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
        <path d="M230 490 C 310 430, 390 380, 470 345" strokeDasharray="2 14" markerEnd="url(#brand-diagram-arrowhead)" />
        <path d="M770 170 C 690 230, 610 275, 535 300" strokeDasharray="2 14" markerEnd="url(#brand-diagram-arrowhead)" />
        {/* closing line joining the two run-arrows' starting dots — turns the
         *  pair into a support-play triangle rather than two lone runs, the
         *  2026-08-16 "game intelligence" pass */}
        <path d="M230 490 L770 170" strokeDasharray="2 14" opacity="0.6" />
        {/* player-position dots at the arrows' starting ends */}
        <circle cx="230" cy="490" r="9" fill="currentColor" stroke="none" />
        <circle cx="770" cy="170" r="9" fill="currentColor" stroke="none" />
      </g>

      {/* five icons in the margin opened up around the pitch — two original
       *  category icons kept for variety, three swapped 2026-08-16 for
       *  methodology-specific motifs (see MethodologyIcons.tsx) */}
      <TrophyDiagram x={28} y={18} width={72} height={72} />
      <WhistleDiagram x={1100} y={18} width={72} height={72} />
      <GameIntelligenceDiagram x={564} y={18} width={72} height={72} />
      <FuninoDiagram x={28} y={710} width={72} height={72} />
      <TechniqueDiagram x={1100} y={710} width={72} height={72} />

      <defs>
        <marker id="brand-diagram-arrowhead" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </svg>
  );
}
// CANARY_TEST_MARKER_998877
