/**
 * Groups a player's free-text `position` field (as entered by staff in the
 * OS app — never a fixed enum there either, see that repo's own
 * lib/position-groups.ts, which this mirrors line-for-line) into one of
 * four squad sections for the public First Team page's PSG-style
 * Goalkeepers/Defenders/Midfielders/Forwards filter. Best-effort, not a
 * data migration — falls back to a 5th "other" bucket rather than guessing
 * wrong, since this only affects how the roster is *displayed*.
 */

export type PositionGroup = "gk" | "def" | "mid" | "fwd" | "other";

export const POSITION_GROUP_ORDER: PositionGroup[] = ["gk", "def", "mid", "fwd", "other"];

const GK_TOKENS = new Set(["gk", "goalkeeper", "keeper", "gardien", "gb"]);
const DEF_TOKENS = new Set([
  "cb", "fb", "rb", "lb", "sw", "def", "defender", "back",
  "defenseur", "défenseur", "arriere", "arrière", "libero",
  // "latéral" (fullback) was missing on both sides — found 2026-08-29 in
  // the OS app's own lib/position-groups.ts building the lineup pitch
  // diagram; real lineup data uses "Latéral gauche"/"Latéral droit" for
  // fullbacks, and neither token nor the substring fallback below matched
  // it, so both fell into "other" instead of "def". Mirrored here too.
  "lateral", "latéral",
]);
const MID_TOKENS = new Set([
  "dm", "cm", "am", "mf", "mid", "midfielder", "milieu", "mc",
]);
const FWD_TOKENS = new Set([
  "w", "st", "fw", "cf", "forward", "striker", "winger",
  "attaquant", "ailier", "buteur", "avant", "bu",
]);

/** Splits "CM/AM", "ST, CF" or "Milieu - Défenseur" into individual tokens
 *  so a multi-position entry still matches on any one of them. */
function tokenize(position: string): string[] {
  return position
    .toLowerCase()
    .split(/[\s,/&\-–()]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export function classifyPosition(position: string | null | undefined): PositionGroup {
  if (!position) return "other";
  const tokens = tokenize(position);
  if (tokens.length === 0) return "other";

  if (tokens.some((t) => GK_TOKENS.has(t))) return "gk";
  if (tokens.some((t) => DEF_TOKENS.has(t))) return "def";
  if (tokens.some((t) => MID_TOKENS.has(t))) return "mid";
  if (tokens.some((t) => FWD_TOKENS.has(t))) return "fwd";

  // Fallback for longer free-text entries ("Central Defender", "Milieu
  // offensif") that won't match a short-token exact lookup above.
  const full = position.toLowerCase();
  if (full.includes("keeper") || full.includes("gardien")) return "gk";
  if (full.includes("defen") || full.includes("arrière") || full.includes("arriere")) return "def";
  if (full.includes("milieu") || full.includes("midfield")) return "mid";
  if (full.includes("attaqu") || full.includes("forward") || full.includes("striker") || full.includes("winger") || full.includes("ailier")) return "fwd";

  return "other";
}
