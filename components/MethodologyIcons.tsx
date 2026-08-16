import type { SVGProps } from "react";

/**
 * Methodology watermark icons — added 2026-08-16, Patrick's explicit request
 * to make the site's shared background diagram (BrandDiagram.tsx) feel less
 * like a generic "football club" pitch graphic and more like a specific,
 * considered curriculum: something that reads as game intelligence, Funiño
 * small-sided play, and technical ball-mastery — the actual methodology this
 * site already claims (About/Approach sections, Horst Wein's Funiño/Formino
 * principles) rather than illustrated with stock trophy/whistle iconography
 * alone.
 *
 * Drawn in the exact same hand-vector convention ProgramIcons.tsx already
 * established (200×200 viewBox, fill="none", stroke="currentColor",
 * strokeWidth 5, rounded caps/joins) so these nest into BrandDiagram.tsx the
 * same way TrophyDiagram/WhistleDiagram/etc. already do — same stroke
 * inheritance, same graduated-opacity treatment per section.
 *
 * Deliberately illustrative, not a certification claim: FuninoDiagram draws
 * Funiño's own signature format (a small-sided field with four mini-goals,
 * no goalkeepers — the real methodology already named on this site), while
 * TechniqueDiagram represents ball-mastery/quick-footwork training in
 * general (close control + rapid direction changes) without naming or
 * implying a licensed "Coerver Coaching" partnership this academy hasn't
 * confirmed. GameIntelligenceDiagram visualizes reading the game — scanning
 * the field, weighing passing options, choosing one — matching the "game
 * intelligence" pillar named directly in the Founder/Approach copy.
 */

export function FuninoDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* small-sided field */}
      <rect x="34" y="34" width="132" height="132" rx="6" />
      {/* four mini-goals, one per corner — Funiño's signature no-goalkeeper format */}
      <path d="M34 62 V34 H62" />
      <path d="M138 34 H166 V62" />
      <path d="M166 138 V166 H138" />
      <path d="M62 166 H34 V138" />
      {/* three players in a support triangle, dashed passing lines between them */}
      <circle cx="100" cy="72" r="7" fill="currentColor" stroke="none" />
      <circle cx="72" cy="128" r="7" fill="currentColor" stroke="none" />
      <circle cx="128" cy="128" r="7" fill="currentColor" stroke="none" />
      <path d="M100 72 L72 128 L128 128 Z" strokeDasharray="2 10" />
    </svg>
  );
}

export function TechniqueDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* ball with a simple panel line */}
      <circle cx="100" cy="76" r="26" />
      <path d="M100 54 L115 64 L110 82 L90 82 L85 64 Z" />
      {/* close-control turn, drawn as a dashed loop around the ball */}
      <path d="M138 76 A38 38 0 1 1 116 42" strokeDasharray="2 10" markerEnd="url(#technique-diagram-arrowhead)" />
      {/* quick-footwork chevrons underneath */}
      <path d="M68 138 L83 148 L68 158" />
      <path d="M100 138 L115 148 L100 158" />
      <path d="M132 138 L147 148 L132 158" />
      <defs>
        <marker id="technique-diagram-arrowhead" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </svg>
  );
}

export function GameIntelligenceDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* scanning-the-field arc behind the player */}
      <path d="M58 62 A 58 58 0 0 1 142 62" strokeDasharray="1 9" />
      {/* the player on the ball, weighing options */}
      <circle cx="100" cy="122" r="8" fill="currentColor" stroke="none" />
      {/* two unplayed options, faint */}
      <circle cx="52" cy="72" r="5" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="100" cy="40" r="5" fill="currentColor" stroke="none" opacity="0.55" />
      <line x1="100" y1="122" x2="52" y2="72" strokeDasharray="1 8" opacity="0.55" />
      <line x1="100" y1="122" x2="100" y2="40" strokeDasharray="1 8" opacity="0.55" />
      {/* the chosen pass, solid with an arrowhead */}
      <path d="M100 122 L148 72" markerEnd="url(#gameiq-diagram-arrowhead)" />
      <circle cx="148" cy="72" r="5" fill="currentColor" stroke="none" />
      <defs>
        <marker id="gameiq-diagram-arrowhead" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </svg>
  );
}
