/**
 * Mirror of bright-academy-os's lib/live-match-clock.ts — kept identical on
 * purpose so the minute/score label shown here matches exactly what staff
 * see in the OS app's match-day console. This site never writes live-match
 * state (that only ever happens in the OS app); it only re-derives the same
 * display string from the same fields returned by getLiveMatch() in
 * lib/api.ts, which come straight from the OS app's public API.
 */

export type LivePhase = "first_half" | "half_time" | "second_half" | "full_time" | null;

export interface LiveClock {
  /** Display string: "34'", "45+2'", "HT", "90+1'", "FT", or "" pre-kickoff. */
  label: string;
  /** True from kickoff through full-time (inclusive of half-time) — the
   *  window in which this site should show a "LIVE" badge. */
  isLive: boolean;
  /** True only once live_phase is "full_time". */
  isFinished: boolean;
}

export function computeLiveClock(
  livePhase: LivePhase,
  halfStartedAt: string | null,
  firstHalfStoppage: number,
  secondHalfStoppage: number
): LiveClock {
  if (!livePhase) return { label: "", isLive: false, isFinished: false };

  if (livePhase === "half_time") {
    return { label: `HT${firstHalfStoppage ? ` (45+${firstHalfStoppage}')` : ""}`, isLive: true, isFinished: false };
  }
  if (livePhase === "full_time") {
    return { label: `FT${secondHalfStoppage ? ` (90+${secondHalfStoppage}')` : ""}`, isLive: false, isFinished: true };
  }

  const startedMs = halfStartedAt ? new Date(halfStartedAt).getTime() : Date.now();
  const elapsedMin = Math.max(1, Math.floor((Date.now() - startedMs) / 60000) + 1);

  if (livePhase === "first_half") {
    const label = elapsedMin <= 45 ? `${elapsedMin}'` : `45+${elapsedMin - 45}'`;
    return { label, isLive: true, isFinished: false };
  }

  // second_half — the clock continues from 45, so minute 1 of this phase
  // displays as 46.
  const displayMin = 45 + elapsedMin;
  const label = displayMin <= 90 ? `${displayMin}'` : `90+${displayMin - 90}'`;
  return { label, isLive: true, isFinished: false };
}
