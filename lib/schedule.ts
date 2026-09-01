// Weekly training-schedule data, by physical site — added 2026-08-30.
//
// Before this file, lib/pricing.ts deliberately left the comparison
// table's "Schedule" column as "Contact us" (see that file's closing
// comment) because the OS app's recurring_session_templates rows are
// keyed to a *site* and a broad multi-hour window shared by several age
// groups, not one row per programme — publishing that as if it were a
// single programme's own session time would misrepresent it.
//
// This file doesn't try to solve that per-programme ambiguity. It
// captures something narrower and fully confirmed: the four official
// "Programme d'Entraînement / Programme des Séances" graphics Patrick
// sent on 2026-08-30 for the new 2026-2027 season, effective
// September 1, 2026. Each graphic is headed by a physical site and lists
// exactly which day, time window, session type, and age group(s) train
// there — including the two days a Treichville graphic's own "Lieu" tag
// says actually run at the *other* Treichville site (see the Biafra
// entry's Wed/Sat blocks below, tagged "Palais des Sports" on the
// original graphic). Grouped here by the site where the session
// physically happens, not by which graphic it was printed on.
//
// "Elite Club" (Marcory) closed 2026-08-30, the same day these graphics
// were confirmed, and was removed from lib/content.ts's sites list
// entirely — so it was never added here either. UI consuming this file
// should still fall back to "Contact us" for any site with no entry,
// exactly like the pricing table already does for anything unconfirmed
// (e.g. a future new site before its own schedule is published).
//
// Group names match lib/pricing.ts's ProgramPricing.name exactly (both
// languages share the same string) so callers can cross-reference pricing
// for any group named in a schedule block.
//
// Added 2026-09-01: a fifth site, "Sporting Club Abidjan" (Biétry), from
// Patrick's "PROGRAMME D'ENTRAÎNEMENT — NOUVELLE SAISON 2026–2027" graphic
// for "Sporting Club Biétry" (Petite Enfance, 14 mois → U5). Same sourcing
// standard as the four graphics above — read directly off the graphic, not
// estimated.

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type SessionType = "training" | "futsal";

export interface ScheduleBlock {
  day: Weekday;
  /** 24h "HH:MM" */
  start: string;
  /** 24h "HH:MM" */
  end: string;
  type: SessionType;
  /** Program names, matching lib/pricing.ts PROGRAM_PRICING[].name. */
  groups: string[];
}

export interface SiteSchedule {
  /** Matches lib/content.ts sites.list[].name exactly. */
  siteName: string;
  blocks: ScheduleBlock[];
}

export const SCHEDULE_EFFECTIVE_DATE = "2026-09-01";

export const SITE_SCHEDULES: SiteSchedule[] = [
  {
    siteName: "Complexe Sportif de Biafra",
    blocks: [
      { day: "mon", start: "15:30", end: "17:30", type: "training", groups: ["Bright Kids", "Bright Youth"] },
      { day: "fri", start: "15:00", end: "17:00", type: "training", groups: ["Bright Kids", "Bright Youth"] },
    ],
  },
  {
    siteName: "Palais des Sports de Treichville",
    blocks: [
      // U6-U11 futsal — printed on the "Complexe Biafra" graphic but
      // tagged Lieu: Palais des Sports there.
      { day: "wed", start: "16:00", end: "18:00", type: "futsal", groups: ["Bright Kids", "Bright Youth"] },
      { day: "sat", start: "10:00", end: "12:00", type: "futsal", groups: ["Bright Kids", "Bright Youth"] },
      // U12-U17 Elite/Pro program, all four days at this site.
      { day: "tue", start: "18:00", end: "20:00", type: "futsal", groups: ["Bright Elite", "Bright Pro"] },
      { day: "wed", start: "16:00", end: "18:00", type: "training", groups: ["Bright Elite", "Bright Pro"] },
      { day: "sat", start: "08:00", end: "10:00", type: "training", groups: ["Bright Elite", "Bright Pro"] },
      { day: "sun", start: "08:00", end: "10:00", type: "training", groups: ["Bright Elite", "Bright Pro"] },
    ],
  },
  {
    siteName: "Angré Château",
    blocks: [
      { day: "wed", start: "14:00", end: "15:30", type: "training", groups: ["Bright Pro", "Bright Elite"] },
      { day: "wed", start: "15:30", end: "17:00", type: "training", groups: ["Bright Kids", "Bright Youth"] },
      { day: "sat", start: "10:00", end: "11:30", type: "training", groups: ["Bright Kids", "Bright Youth"] },
      { day: "sat", start: "13:00", end: "14:30", type: "training", groups: ["Bright Pro"] },
      { day: "sat", start: "14:30", end: "16:00", type: "training", groups: ["Bright Elite"] },
      { day: "sat", start: "16:00", end: "17:00", type: "training", groups: ["Bright Junior", "Bright Kicks", "Bright Babies"] },
      { day: "sun", start: "14:00", end: "15:30", type: "training", groups: ["Bright Elite"] },
      { day: "sun", start: "15:30", end: "17:00", type: "training", groups: ["Bright Pro"] },
    ],
  },
  {
    siteName: "Arena Bassam",
    blocks: [
      { day: "wed", start: "14:00", end: "16:30", type: "training", groups: ["Bright Elite", "Bright Pro"] },
      { day: "wed", start: "16:30", end: "18:30", type: "training", groups: ["Bright Kids", "Bright Youth"] },
      { day: "sat", start: "10:30", end: "11:30", type: "training", groups: ["Bright Kids"] },
      { day: "sat", start: "11:30", end: "12:30", type: "training", groups: ["Bright Youth"] },
      { day: "sat", start: "13:00", end: "15:00", type: "training", groups: ["Bright Elite", "Bright Pro"] },
    ],
  },
  {
    // Bright Babies is a 30-min free session at this site (see "★ SÉANCE
    // GRATUITE" legend on the graphic, tagged specifically to Bright
    // Babies) — flagged to Patrick separately since the pricing model
    // doesn't yet represent a site-specific free programme.
    siteName: "Sporting Club Abidjan",
    blocks: [
      { day: "tue", start: "16:00", end: "16:30", type: "training", groups: ["Bright Babies"] },
      { day: "tue", start: "16:00", end: "17:00", type: "training", groups: ["Bright Junior"] },
      { day: "tue", start: "16:30", end: "17:10", type: "training", groups: ["Bright Kicks"] },
      { day: "thu", start: "16:00", end: "16:30", type: "training", groups: ["Bright Babies"] },
      { day: "thu", start: "16:00", end: "17:00", type: "training", groups: ["Bright Junior"] },
      { day: "thu", start: "16:30", end: "17:10", type: "training", groups: ["Bright Kicks"] },
    ],
  },
];

export function getSiteSchedule(siteName: string): SiteSchedule | undefined {
  return SITE_SCHEDULES.find((s) => s.siteName === siteName);
}
