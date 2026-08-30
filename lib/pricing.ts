// Single source of truth for programme pricing, session counts, and site
// availability — added 2026-08-13 as part of the site improvement pass
// (Priority 2C / 4 / 5). Before this file, the same figures were typed out
// by hand in lib/content.ts's FAQ answers (as prose ranges: "22,000 XOF/month
// ... scaling with age") with no machine-usable per-programme breakdown, so
// nothing else on the site (a trial-price button, a comparison table) could
// reference a single confirmed number per programme without re-typing it.
//
// Every figure below was read directly from the live Bright Academy OS
// database (Supabase project zutonntnlroxiftvusnl, tables `fee_plans`,
// `age_categories`, `teams`, `sites`) on 2026-08-13 — not copied from prior
// site copy, not estimated. This is a dated snapshot, not a live query: the
// marketing site has no server-side session to call an authenticated OS
// endpoint from at request time, and the public API this site already uses
// for coaches/news/gallery (see lib/api.ts) doesn't yet expose pricing. If
// Patrick changes a fee plan in the OS app, this file needs a manual update
// to match — see the "remaining recommendations" note in the delivery
// summary about eventually exposing a public /api/public/pricing endpoint
// instead, the same pattern lib/api.ts already uses for everything else.
//
// One naming collision worth flagging explicitly: "Bright Elite" is the
// name of the U12–U14 age-category programme (like "Bright Pro" or "Bright
// Kids"). "Formule Élite" (Elite formula, below) is an unrelated *billing
// frequency* upsell — 4 sessions/week instead of the default 1–2 — that a
// parent can choose for several different age programmes, Bright Elite
// among them. The two are not the same thing; UI copy should say "Elite
// formula" / "Formule Élite" for the billing option and never just "Elite"
// on its own where it could be misread as the Bright Elite programme.

export type ProgramKey = "babies" | "kicks" | "junior" | "kids" | "youth" | "elite" | "pro";

export interface ProgramPricing {
  key: ProgramKey;
  /** Matches lib/content.ts programs.groups[].categories[].name exactly (both languages share the same name string). */
  name: string;
  /** Internal fee-plan age-band label used in the OS app's plan names, e.g. "U6-U8". Not shown to parents. */
  ageBand: string;
  /** Single-session ("à la carte") price — this is also the confirmed trial-session price (trialSessionPrice = singleSessionXOF, per Patrick's explicit pricing rule). */
  singleSessionXOF: number;
  classique: {
    monthly1x: number;
    monthly2x: number;
    quarterly1x: number;
    quarterly2x: number;
  };
  /** Elite formula (4 sessions/week) — null where the OS app has no such plan for this age band (Babies, Kicks, Junior: none). */
  eliteFormula: { monthly: number; quarterly: number } | null;
  /** Site names (must match lib/content.ts sites.list[].name) currently linked to this programme's team(s) in the OS app, confirmed 2026-08-13. */
  sites: string[];
}

export const CURRENCY = "XOF";

// Elite formula is confirmed (existing FAQ copy, unchanged by this pass) to
// only run at these two sites regardless of which age programme it's
// attached to — this is a scheduling/staffing constraint, not something
// visible in the fee_plans/sites tables themselves.
export const ELITE_FORMULA_SITES = ["Complexe Sportif de Biafra", "Palais des Sports de Treichville"];

// Elite Club (Marcory) closed 2026-08-30 — removed from every programme's
// `sites` below. Its Babies/Kicks/Junior players had no other site listed
// here; Angré Château is added for those three now, since Patrick's own
// 2026-08-30 "Site d'Angré" schedule graphic already shows Bright Babies,
// Bright Kicks, and Bright Juniors training there (Saturday 16:00–17:00).
// Kids/Youth/Elite/Pro already listed Complexe Sportif de Biafra and/or
// Palais des Sports de Treichville, matching where Patrick said those
// closed-club players are moving — no further change needed for them
// beyond dropping Elite Club itself.
export const PROGRAM_PRICING: ProgramPricing[] = [
  {
    key: "babies",
    name: "Bright Babies",
    ageBand: "U1-U3",
    singleSessionXOF: 6000,
    classique: { monthly1x: 22000, monthly2x: 44000, quarterly1x: 60000, quarterly2x: 120000 },
    eliteFormula: null,
    sites: ["Angré Château"],
  },
  {
    key: "kicks",
    name: "Bright Kicks",
    ageBand: "U1-U3",
    singleSessionXOF: 6000,
    classique: { monthly1x: 22000, monthly2x: 44000, quarterly1x: 60000, quarterly2x: 120000 },
    eliteFormula: null,
    sites: ["Angré Château"],
  },
  {
    key: "junior",
    name: "Bright Junior",
    ageBand: "U4-U5",
    singleSessionXOF: 6500,
    classique: { monthly1x: 26000, monthly2x: 52000, quarterly1x: 72000, quarterly2x: 144000 },
    eliteFormula: null,
    sites: ["Arena Bassam", "Angré Château"],
  },
  {
    key: "kids",
    name: "Bright Kids",
    ageBand: "U6-U8",
    singleSessionXOF: 7000,
    classique: { monthly1x: 28000, monthly2x: 56000, quarterly1x: 72000, quarterly2x: 144000 },
    eliteFormula: { monthly: 75000, quarterly: 202000 },
    sites: ["Angré Château", "Complexe Sportif de Biafra", "Arena Bassam"],
  },
  {
    key: "youth",
    name: "Bright Youth",
    ageBand: "U9-U11",
    singleSessionXOF: 8000,
    classique: { monthly1x: 32000, monthly2x: 62000, quarterly1x: 84000, quarterly2x: 168000 },
    eliteFormula: { monthly: 85000, quarterly: 230000 },
    sites: ["Arena Bassam", "Angré Château", "Complexe Sportif de Biafra", "Palais des Sports de Treichville"],
  },
  {
    key: "elite",
    name: "Bright Elite",
    ageBand: "U12-U14",
    singleSessionXOF: 8000,
    classique: { monthly1x: 32000, monthly2x: 62000, quarterly1x: 84000, quarterly2x: 168000 },
    eliteFormula: { monthly: 85000, quarterly: 230000 },
    sites: ["Angré Château", "Palais des Sports de Treichville", "Arena Bassam", "Complexe Sportif de Biafra"],
  },
  {
    key: "pro",
    name: "Bright Pro",
    ageBand: "U15-U17",
    singleSessionXOF: 9000,
    classique: { monthly1x: 36000, monthly2x: 72000, quarterly1x: 96000, quarterly2x: 192000 },
    eliteFormula: { monthly: 97000, quarterly: 262000 },
    sites: ["Complexe Sportif de Biafra", "Arena Bassam", "Angré Château", "Palais des Sports de Treichville"],
  },
];

// Private 1:1 coaching — a flat per-session rate, not tied to any one
// age-category fee plan. Confirmed via fee_plans ("Séance privée", 20000
// XOF, per_session).
export const PRIVATE_SESSION_XOF = 20000;

// Annual per-season enrollment fee (separate from monthly/quarterly
// training fees) — confirmed via fee_plans ("Frais inscription nouveau
// membre" / "Réinscription anciens membres", both per_season).
export const ANNUAL_ENROLLMENT_XOF = { newPlayer: 30000, returningPlayer: 25000 };

// Two training kits, required every season, billed separately — confirmed
// via fee_plans ("Deux jeux de maillots obligatoires", 40000 XOF,
// per_season). Same figure used in lib/content.ts's kit section and FAQ.
export const KIT_FEE_XOF = 40000;

export function getProgramPricing(name: string): ProgramPricing | undefined {
  return PROGRAM_PRICING.find((p) => p.name === name);
}

// No exact schedule (day/time) is centralized here on purpose: the OS
// app's recurring_session_templates rows are keyed to a *site* and a broad
// multi-hour window (e.g. "Angré Château, Mon/Wed/Fri, 14:00–17:00"),
// covering several different age groups back-to-back — not one row per
// programme. Publishing that window as if it were "Bright Kids trains
// Mon/Wed/Fri 2–5pm" would misrepresent a 3-hour multi-group block as one
// programme's own session length. Until the OS app models per-programme
// time slots, the comparison table shows "Nous contacter" / "Contact us"
// for the exact schedule column rather than guessing — see the delivery
// summary's confirmation list.
