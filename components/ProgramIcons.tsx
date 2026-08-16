import type { SVGProps } from "react";

/**
 * Category watermark icons for the Programs section — added 2026-08-13,
 * Patrick's follow-up after the category badges shipped. He pointed out
 * that his source badge graphics each carry their own decorative line-art
 * icon behind the crest (a trophy on Bright Pro, a whistle on Bright
 * Babies, a goal net on Bright Youth, a laurel/cord swirl on Bright
 * Junior, a pitch corner on Bright Kids) and asked for those to be "added
 * to what we have already" in the background of each card.
 *
 * These are redrawn as clean vector line-art in the site's own PitchDiagram
 * stroke convention (fill="none", stroke="currentColor", rounded caps)
 * rather than lifted directly from his JPEGs — the source graphics are
 * dense composite images (colored background + crest + two lines of text
 * all overlapping in the same region), and a couple of the icons (the
 * Junior wreath especially) visually overlap the badge's own text, so any
 * pixel-diff extraction kept bleeding faint text edges into the result no
 * matter how the crop region was adjusted. Hand-drawn vector versions
 * avoid that entirely and stay crisp at any size, same as PitchDiagram.
 * Bright Kicks and Bright Elite have no icon here — their source graphics
 * didn't include one.
 *
 * Each accepts arbitrary SVG props (not just className) — added 2026-08-13
 * so BrandDiagram.tsx can nest these as positioned <svg x y width height>
 * children inside the site's shared background diagram, per Patrick's
 * follow-up that he wanted the icons "part of" the main pitch+arrows
 * background, not only on the Programs cards.
 */

export function TrophyDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M75 30 H125 V75 C125 100 114 115 100 115 C86 115 75 100 75 75 Z" />
      <path d="M75 42 C53 42 53 72 75 78" />
      <path d="M125 42 C147 42 147 72 125 78" />
      <line x1="100" y1="115" x2="100" y2="140" />
      <line x1="80" y1="140" x2="120" y2="140" />
      <rect x="68" y="150" width="64" height="16" rx="4" />
    </svg>
  );
}

export function WhistleDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M78 58 C78 36 122 36 122 58 C122 80 100 80 100 60" />
      <path d="M100 78 V96" />
      <circle cx="100" cy="132" r="34" />
      <circle cx="100" cy="132" r="9" fill="currentColor" stroke="none" />
      <line x1="66" y1="132" x2="76" y2="132" />
    </svg>
  );
}

export function GoalNetDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M42 46 H158" />
      <path d="M42 46 V150" />
      <path d="M158 46 V150" />
      <path d="M58 46 C58 88 92 108 100 128" />
      <path d="M87 46 C87 92 96 114 100 128" />
      <path d="M113 46 C113 92 104 114 100 128" />
      <path d="M142 46 C142 88 108 108 100 128" />
    </svg>
  );
}

export function WreathDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M62 55 C40 88 40 132 72 155" />
      <path d="M138 55 C160 88 160 132 128 155" />
      <line x1="53" y1="76" x2="68" y2="71" />
      <line x1="45" y1="103" x2="61" y2="100" />
      <line x1="49" y1="130" x2="65" y2="124" />
      <line x1="147" y1="76" x2="132" y2="71" />
      <line x1="155" y1="103" x2="139" y2="100" />
      <line x1="151" y1="130" x2="135" y2="124" />
    </svg>
  );
}

export function CornerFlagDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <line x1="24" y1="150" x2="150" y2="150" />
      <line x1="62" y1="150" x2="62" y2="46" />
      <path d="M62 52 L110 70 L62 88 Z" fill="currentColor" stroke="none" />
      <path d="M30 150 A 50 50 0 0 1 80 100" />
    </svg>
  );
}
