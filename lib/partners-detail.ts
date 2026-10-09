/**
 * Detail content for the interactive /partners page.
 *
 * Every clickable element on the page (key figures, training sites, programs,
 * sponsorship offers, activation ideas, jersey placements) opens one detail
 * view. A view is BUILT from the same sources the rest of the site already
 * uses — the `partners`, `sites` and `programs` blocks of lib/content.ts,
 * lib/schedule.ts and lib/pricing.ts — so nothing is typed twice. The only
 * copy written here is connective wording (labels, "not published" notices).
 *
 * Content rules agreed with the club owner (Oct 2026):
 *  - sponsorship prices are never shown: "Prices on request";
 *  - anything the club has not published is shown as "Not published", never
 *    guessed (players per age group, event dates, sponsorship availability,
 *    the sleeve side and size of a placement, engagement/demographic data);
 *  - where two internal sources disagree about which program trains at which
 *    site, the pairing is shown as "To be confirmed" and no source is picked;
 *  - parent-facing training fees (lib/pricing.ts) are never read here.
 *
 * This module has no runtime imports on purpose (type-only imports are
 * erased), so `npm test` can exercise it under plain Node.
 */
import type { ContentShape, Lang } from "./content";
import type { ProgramPricing } from "./pricing";
import type { SiteSchedule } from "./schedule";

/* ------------------------------------------------------------------ ids */

export const STAT_KEYS = ["players", "sites", "programs", "followers", "founded", "champions"] as const;
export const OFFER_KEYS = ["main", "jersey", "official", "infrastructure", "technical", "performance", "csr", "match", "mvp"] as const;
export const ACTIVATION_KEYS = [
  "challenges",
  "partner-days",
  "competitions",
  "youth-operations",
  "branded-content",
  "company-events",
  "trophy-presentations",
] as const;
export const PLACEMENT_KEYS = ["1", "2", "3", "4", "5"] as const;
export const PROGRAM_KEYS = ["babies", "kicks", "junior", "kids", "youth", "elite", "pro"] as const;
/** Site slug by the site's name in lib/content.ts (identical in EN and FR). */
export const SITE_SLUGS: Record<string, string> = {
  "Angré Château": "angre-chateau",
  "Arena Bassam": "arena-bassam",
  "Complexe Sportif de Biafra": "biafra",
  "Palais des Sports de Treichville": "palais-des-sports",
  "Sporting Club Abidjan": "sporting-club-abidjan",
};

export type DetailKind = "stat" | "site" | "program" | "offer" | "activation" | "placement";
export type DetailId = `${DetailKind}-${string}`;

const ID_LIST: string[] = [
  ...STAT_KEYS.map((k) => `stat-${k}`),
  ...Object.values(SITE_SLUGS).map((k) => `site-${k}`),
  ...PROGRAM_KEYS.map((k) => `program-${k}`),
  ...OFFER_KEYS.map((k) => `offer-${k}`),
  ...ACTIVATION_KEYS.map((k) => `activation-${k}`),
  ...PLACEMENT_KEYS.map((k) => `placement-${k}`),
];
const ID_SET = new Set<string>(ID_LIST);

export const ALL_DETAIL_IDS = ID_LIST as DetailId[];

/** Allowlist check for anything coming from the URL (`?detail=`). */
export function parseDetailId(raw: unknown): DetailId | null {
  return typeof raw === "string" && ID_SET.has(raw) ? (raw as DetailId) : null;
}

export const DETAIL_PARAM = "detail";

/* ---------------------------------------------------------------- types */

export type Status = "np" | "tbc" | "por";
export interface Fact {
  label: string;
  value: string;
  status?: Status;
}
export interface LinkItem {
  id: DetailId;
  label: string;
  note?: string;
  status?: Status;
}
export type Section =
  | { kind: "facts"; title?: string; rows: Fact[] }
  | { kind: "text"; title?: string; paragraphs: string[] }
  | { kind: "list"; title?: string; items: string[] }
  | { kind: "links"; title?: string; items: LinkItem[] }
  | { kind: "table"; title?: string; headers: string[]; rows: string[][]; footer?: string[] }
  | { kind: "external"; items: { label: string; href: string }[] }
  | { kind: "note"; text: string };

export interface DetailView {
  id: DetailId;
  kind: DetailKind;
  eyebrow: string;
  title: string;
  lead?: string;
  sections: Section[];
  /** Pre-filled proposal request (the component turns this into mailto / WhatsApp links). */
  proposal: { subject: string; body: string; whatsapp: string };
}

export interface DetailSources {
  lang: Lang;
  /** content[lang] */
  t: ContentShape;
  schedules: SiteSchedule[];
  pricing: ProgramPricing[];
}

/* ------------------------------------------------------------ UI strings */

const UI = {
  en: {
    close: "Close",
    back: "Back",
    viewDetails: "view details",
    details: "Details",
    requestProposal: "Request a proposal",
    askWhatsapp: "Ask on WhatsApp",
    statusLabel: { np: "Not published", tbc: "To be confirmed", por: "Prices on request" } as Record<Status, string>,
    kinds: {
      stat: "Key figure",
      site: "Training site",
      program: "Program",
      offer: "Sponsorship offer",
      activation: "Activation",
      placement: "Jersey placement",
    } as Record<DetailKind, string>,
    openedFrom: "Opened from",
    dialogHint: "Press Escape to close.",
  },
  fr: {
    close: "Fermer",
    back: "Retour",
    viewDetails: "voir le détail",
    details: "Détails",
    requestProposal: "Demander une proposition",
    askWhatsapp: "Écrire sur WhatsApp",
    statusLabel: { np: "Non publié", tbc: "À confirmer", por: "Tarifs sur demande" } as Record<Status, string>,
    kinds: {
      stat: "Chiffre clé",
      site: "Site d'entraînement",
      program: "Programme",
      offer: "Offre de partenariat",
      activation: "Activation",
      placement: "Emplacement maillot",
    } as Record<DetailKind, string>,
    openedFrom: "Ouvert depuis",
    dialogHint: "Appuyez sur Échap pour fermer.",
  },
} as const;

export function detailUi(lang: Lang) {
  return UI[lang];
}

/* --------------------------------------------------------------- helpers */

const WEEK: string[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/** Split a published sentence group ("A, b. C d.") into one bullet per sentence. */
export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

interface SiteProgramRow {
  program: ProgramPricing;
  status: "confirmed" | "tbc";
  days: string[];
}

/**
 * Programs at a site, from BOTH internal sources. A pairing present in only
 * one source is "tbc" (neither source is preferred). Days are only reported
 * for confirmed pairings.
 */
export function programsAtSite(siteName: string, src: Pick<DetailSources, "schedules" | "pricing">): SiteProgramRow[] {
  const sched = src.schedules.find((s) => s.siteName === siteName);
  const rows: SiteProgramRow[] = [];
  for (const program of src.pricing) {
    const inPricing = program.sites.includes(siteName);
    const blocks = (sched?.blocks ?? []).filter((b) => b.groups.includes(program.name));
    const inSchedule = blocks.length > 0;
    if (!inPricing && !inSchedule) continue;
    const confirmed = inPricing && inSchedule;
    const days = confirmed ? WEEK.filter((d) => blocks.some((b) => b.day === d)) : [];
    rows.push({ program, status: confirmed ? "confirmed" : "tbc", days });
  }
  return rows;
}

/** Sites for a program, same two-source rule. */
export function sitesOfProgram(
  program: ProgramPricing,
  siteNames: string[],
  src: Pick<DetailSources, "schedules" | "pricing">,
): { siteName: string; status: "confirmed" | "tbc"; days: string[] }[] {
  const out: { siteName: string; status: "confirmed" | "tbc"; days: string[] }[] = [];
  for (const siteName of siteNames) {
    const row = programsAtSite(siteName, src).find((r) => r.program.key === program.key);
    if (row) out.push({ siteName, status: row.status, days: row.days });
  }
  return out;
}

/* --------------------------------------------------------------- builder */

export function buildDetail(id: DetailId, src: DetailSources): DetailView | null {
  if (!ID_SET.has(id)) return null;
  const { lang, t } = src;
  const p = t.partners;
  const ui = UI[lang];
  const T = (en: string, fr: string) => (lang === "fr" ? fr : en);
  const dayName = (d: string) => (t.sites.schedule.days as Record<string, string>)[d] ?? d;
  const siteList = t.sites.list;
  const siteNames = siteList.map((s) => s.name);
  const seasonValue = "2026–2027";
  const np = (label: string): Fact => ({ label, value: ui.statusLabel.np, status: "np" });
  const por = (label: string = T("Price", "Tarifs")): Fact => ({ label, value: ui.statusLabel.por, status: "por" });

  const [kind, ...restParts] = id.split("-") as [DetailKind, ...string[]];
  const key = restParts.join("-");

  const offers = p.offerGroups.flatMap((g) => g.items.map((item) => ({ group: g, item })));
  const offerLink = (k: (typeof OFFER_KEYS)[number]): LinkItem => {
    const o = offers[OFFER_KEYS.indexOf(k)];
    return { id: `offer-${k}`, label: o.item.name, note: o.item.tag };
  };
  const placementLink = (n: number): LinkItem => {
    const pl = p.placements[n - 1];
    return { id: `placement-${n}`, label: `${pl.n}. ${pl.label}`, note: pl.role };
  };
  const siteLink = (name: string): LinkItem => {
    const s = siteList.find((x) => x.name === name)!;
    return { id: `site-${SITE_SLUGS[name]}`, label: s.name, note: s.area };
  };
  const programCats = t.programs.groups.flatMap((g) => g.categories);
  const programLink = (pr: ProgramPricing): LinkItem => {
    const c = programCats.find((x) => x.name === pr.name)!;
    return { id: `program-${pr.key}`, label: c.name, note: c.range };
  };
  const activationLink = (k: (typeof ACTIVATION_KEYS)[number]): LinkItem => ({
    id: `activation-${k}`,
    label: p.activateItems[ACTIVATION_KEYS.indexOf(k)],
  });

  const proposalFor = (title: string): DetailView["proposal"] => ({
    subject: `${T("Partnership proposal", "Proposition de partenariat")} — ${title}`,
    body: T(
      `Hello,\n\nI would like to receive a partnership proposal from Bright Academy Football Club.\n\nTopic: ${title}\nSeason: ${seasonValue}\n\nCompany:\nContact name:\nPhone / WhatsApp:\nPreferred contribution (cash / in kind):\nMessage:\n`,
      `Bonjour,\n\nJe souhaite recevoir une proposition de partenariat de Bright Academy Football Club.\n\nSujet : ${title}\nSaison : ${seasonValue}\n\nEntreprise :\nNom du contact :\nTéléphone / WhatsApp :\nContribution souhaitée (numéraire / en nature) :\nMessage :\n`,
    ),
    whatsapp: T(
      `Hi! I'd like a partnership proposal about: ${title} (season ${seasonValue}).`,
      `Bonjour ! J'aimerais recevoir une proposition de partenariat concernant : ${title} (saison ${seasonValue}).`,
    ),
  });

  const make = (title: string, lead: string | undefined, sections: Section[], proposalTitle = title): DetailView => ({
    id,
    kind,
    eyebrow: ui.kinds[kind],
    title,
    lead,
    sections,
    proposal: proposalFor(proposalTitle),
  });

  /* ---- key figures ---- */
  if (kind === "stat") {
    const idx = STAT_KEYS.indexOf(key as (typeof STAT_KEYS)[number]);
    const stat = p.stats[idx];
    const headline = `${stat.value} — ${stat.label}`;

    if (key === "players") {
      return make(headline, p.statsNote, [
        {
          kind: "facts",
          rows: [
            { label: stat.label, value: stat.value },
            np(T("Players per age group", "Joueurs par catégorie d'âge")),
            np(T("Players per site", "Joueurs par site")),
          ],
        },
        { kind: "note", text: T("The figure is shown as published; it is not broken down by age group or by site.", "Le chiffre est présenté tel que publié ; il n'est pas ventilé par catégorie d'âge ni par site.") },
        { kind: "links", title: t.programs.title, items: src.pricing.map(programLink) },
        { kind: "links", title: t.sites.title, items: siteNames.map(siteLink) },
      ]);
    }
    if (key === "sites") {
      return make(headline, t.sites.subtitle, [
        { kind: "links", title: t.sites.eyebrow, items: siteNames.map(siteLink) },
        { kind: "facts", rows: [np(T("Players per site", "Joueurs par site"))] },
      ]);
    }
    if (key === "programs") {
      return make(headline, t.programs.subtitle, [
        { kind: "links", title: t.programs.eyebrow, items: src.pricing.map(programLink) },
        { kind: "facts", rows: [np(T("Players per program", "Joueurs par programme"))] },
      ]);
    }
    if (key === "followers") {
      return make(headline, p.audienceIntro, [
        {
          kind: "facts",
          rows: [
            { label: T("Reporting period", "Période de référence"), value: T("October 2026", "Octobre 2026") },
            { label: T("Basis", "Base de calcul"), value: T("Follower counts published on this site", "Nombres d'abonnés publiés sur ce site") },
          ],
        },
        {
          kind: "table",
          headers: [p.audienceHeaders.account, p.audienceHeaders.platform, p.audienceHeaders.audience],
          rows: p.audienceRows.map((r) => [r.account, r.platform, r.audience]),
          footer: [p.audienceTotal, "", p.audienceGrandTotal],
        },
        { kind: "note", text: p.audienceNote },
        {
          kind: "facts",
          title: T("Not published", "Non publié"),
          rows: [np(T("Engagement", "Engagement")), np(T("Impressions", "Impressions")), np(T("Audience demographics", "Données démographiques de l'audience"))],
        },
      ]);
    }
    if (key === "founded") {
      return make(headline, undefined, [
        {
          kind: "facts",
          title: T("Published milestones", "Étapes publiées"),
          rows: p.timeline.slice(0, 3).map((s) => ({ label: `${s.when} · ${s.title}`, value: s.detail })),
        },
        { kind: "note", text: p.timelineNote },
      ]);
    }
    // champions
    return make(headline, p.sportIntro, [
      { kind: "facts", title: p.sportTitle, rows: p.sportRecord.map((r) => ({ label: r.label, value: r.value })) },
      {
        kind: "facts",
        title: p.timelineTitle,
        rows: [2, 3, 5].map((i) => ({ label: `${p.timeline[i].when} · ${p.timeline[i].title}`, value: p.timeline[i].detail })),
      },
    ]);
  }

  /* ---- training sites ---- */
  if (kind === "site") {
    const siteName = Object.keys(SITE_SLUGS).find((n) => SITE_SLUGS[n] === key)!;
    const site = siteList.find((s) => s.name === siteName);
    if (!site) return null;
    const rows = programsAtSite(siteName, src);
    const hasTbc = rows.some((r) => r.status === "tbc");
    const sections: Section[] = [
      {
        kind: "facts",
        rows: [
          { label: T("Area", "Quartier"), value: site.area },
          np(T("Players at this site", "Joueurs sur ce site")),
        ],
      },
      {
        kind: "links",
        title: t.programs.title,
        items: rows.map((r) => {
          const base = programLink(r.program);
          return r.status === "confirmed"
            ? { ...base, note: [base.note, r.days.map(dayName).join(" · ")].filter(Boolean).join(" — ") }
            : { ...base, status: "tbc" as Status };
        }),
      },
    ];
    if (hasTbc) {
      sections.push({
        kind: "note",
        text: T(
          "Pairings marked “To be confirmed” are not final.",
          "Les associations marquées « À confirmer » ne sont pas définitives.",
        ),
      });
    }
    sections.push({
      kind: "text",
      paragraphs: [
        T(
          "No site-specific partnership is published. Contact the club to discuss a proposal.",
          "Aucun partenariat propre à un site n'est publié. Contactez le club pour en discuter.",
        ),
      ],
    });
    sections.push({ kind: "external", items: [{ label: t.sites.directions, href: site.mapsUrl }] });
    return make(site.name, site.area, sections, `${T("Site", "Site")}: ${site.name}`);
  }

  /* ---- programs ---- */
  if (kind === "program") {
    const pr = src.pricing.find((x) => x.key === key);
    const cat = pr && programCats.find((c) => c.name === pr.name);
    if (!pr || !cat) return null;
    const sitesRows = sitesOfProgram(pr, siteNames, src);
    const hasTbc = sitesRows.some((r) => r.status === "tbc");
    const sections: Section[] = [
      {
        kind: "facts",
        rows: [
          { label: T("Age range", "Tranche d'âge"), value: cat.range },
          { label: T("Focus", "Objectif"), value: cat.note },
          np(T("Players in this program", "Joueurs dans ce programme")),
        ],
      },
      {
        kind: "links",
        title: t.sites.eyebrow,
        items: sitesRows.map((r) => {
          const base = siteLink(r.siteName);
          return r.status === "confirmed"
            ? { ...base, note: [base.note, r.days.map(dayName).join(" · ")].filter(Boolean).join(" — ") }
            : { ...base, status: "tbc" as Status };
        }),
      },
    ];
    if (hasTbc) {
      sections.push({
        kind: "note",
        text: T(
          "Sites marked “To be confirmed” are not final.",
          "Les sites marqués « À confirmer » ne sont pas définitifs.",
        ),
      });
    }
    sections.push({
      kind: "text",
      paragraphs: [
        T(
          `The ${offers[OFFER_KEYS.indexOf("csr")].item.name} offer covers “an identified youth program”. Which program is not published.`,
          `L'offre ${offers[OFFER_KEYS.indexOf("csr")].item.name} porte sur « un programme jeunesse identifié ». Le programme concerné n'est pas publié.`,
        ),
      ],
    });
    return make(cat.name, `${cat.range} · ${cat.note}`, sections, `${T("Program", "Programme")}: ${cat.name}`);
  }

  /* ---- sponsorship offers ---- */
  if (kind === "offer") {
    const ok = key as (typeof OFFER_KEYS)[number];
    const o = offers[OFFER_KEYS.indexOf(ok)];
    if (!o) return null;
    const placementsOf: Partial<Record<(typeof OFFER_KEYS)[number], number[]>> = { main: [1], jersey: [2, 3], official: [4, 5] };
    const activationsOf: Partial<Record<(typeof OFFER_KEYS)[number], (typeof ACTIVATION_KEYS)[number][]>> = {
      main: ["partner-days", "branded-content"],
      jersey: ["challenges"],
      mvp: ["trophy-presentations"],
    };
    const sections: Section[] = [
      { kind: "list", title: T("What the offer includes (as published)", "Ce que comprend l'offre (tel que publié)"), items: sentences(o.item.body) },
      {
        kind: "facts",
        rows: [
          { label: T("Format", "Format"), value: o.item.tag },
          { label: T("Season", "Saison"), value: seasonValue },
          { label: T("Contribution", "Contribution"), value: ok === "technical" ? T("In kind", "En nature") : T("Cash or in kind", "Numéraire ou en nature") },
          por(),
          np(T("Availability", "Disponibilité")),
        ],
      },
    ];
    if (ok === "infrastructure") {
      sections.push({ kind: "list", title: p.doneTitle, items: p.done }, { kind: "list", title: p.nextTitle, items: p.next });
    }
    if (placementsOf[ok]) sections.push({ kind: "links", title: p.placementsTitle, items: placementsOf[ok]!.map(placementLink) });
    if (activationsOf[ok]) sections.push({ kind: "links", title: p.activateTitle, items: activationsOf[ok]!.map(activationLink) });
    sections.push({ kind: "note", text: p.offersLegalNote });
    if (placementsOf[ok]) sections.push({ kind: "note", text: p.placementsNote });
    return make(o.item.name, `${o.group.n} · ${o.group.title}`, sections, `${T("Offer", "Offre")}: ${o.item.name}`);
  }

  /* ---- activations ---- */
  if (kind === "activation") {
    const ak = key as (typeof ACTIVATION_KEYS)[number];
    const i = ACTIVATION_KEYS.indexOf(ak);
    const name = p.activateItems[i];
    const offerByName = (k: (typeof OFFER_KEYS)[number]) => offers[OFFER_KEYS.indexOf(k)].item;
    const paragraphs: string[] = (() => {
      switch (ak) {
        case "challenges":
          return [T(`Challenges are listed in the ${offerByName("jersey").name} offer.`, `Les challenges figurent dans l'offre ${offerByName("jersey").name}.`)];
        case "partner-days":
          return [p.exampleBody];
        case "competitions":
          return [T("Competitions are listed among the activations. No format or date is published.", "Les concours figurent parmi les activations. Aucun format ni aucune date n'est publié.")];
        case "youth-operations":
          return [T("Operations with young people are listed among the activations. No format or date is published.", "Les opérations avec les jeunes figurent parmi les activations. Aucun format ni aucune date n'est publié.")];
        case "branded-content":
          return [p.dimensions[2].body];
        case "company-events":
          return [T("Company events are listed among the activations. No format or date is published.", "Les événements d'entreprise figurent parmi les activations. Aucun format ni aucune date n'est publié.")];
        case "trophy-presentations":
          return [offerByName("mvp").body, p.exampleBody];
      }
    })();
    const offersFor: Record<(typeof ACTIVATION_KEYS)[number], (typeof OFFER_KEYS)[number][]> = {
      challenges: ["jersey"],
      "partner-days": ["main"],
      competitions: [],
      "youth-operations": [],
      "branded-content": ["main"],
      "company-events": [],
      "trophy-presentations": ["mvp"],
    };
    const sections: Section[] = [
      { kind: "text", title: ak === "partner-days" ? p.exampleTitle : undefined, paragraphs },
      {
        kind: "facts",
        rows: [
          np(T("Dates", "Dates")),
          por(),
          np(T("Availability", "Disponibilité")),
        ],
      },
    ];
    if (offersFor[ak].length) sections.push({ kind: "links", title: T("Related offers", "Offres associées"), items: offersFor[ak].map(offerLink) });
    sections.push({ kind: "note", text: p.tailoredNote });
    return make(name, p.activateTitle, sections, `${T("Activation", "Activation")}: ${name}`);
  }

  /* ---- jersey placements ---- */
  if (kind === "placement") {
    const n = Number(key);
    const pl = p.placements[n - 1];
    if (!pl) return null;
    const offerKeyOf: Record<number, (typeof OFFER_KEYS)[number]> = { 1: "main", 2: "jersey", 3: "jersey", 4: "official", 5: "official" };
    const rows: Fact[] = [
      { label: T("Placement", "Emplacement"), value: `${pl.n} — ${pl.label}` },
      { label: T("Partner level", "Niveau de partenaire"), value: pl.role },
      np(T("Zone size", "Taille de la zone")),
    ];
    if (n === 2) rows.push(np(T("Sleeve side (left / right)", "Côté de la manche (gauche / droite)")));
    rows.push(por(), np(T("Availability", "Disponibilité")));
    return make(
      `${pl.n}. ${pl.label}`,
      `${p.placementsTitle} · ${pl.role}`,
      [
        { kind: "facts", rows },
        { kind: "links", title: T("Related offer", "Offre associée"), items: [offerLink(offerKeyOf[n])] },
        {
          kind: "note",
          text: T(
            "The jersey diagram is a schematic, not a render of the real kit: exact positions and sizes are not published here.",
            "Le schéma du maillot est une illustration, pas un rendu du vrai maillot : les positions et tailles exactes ne sont pas publiées ici.",
          ),
        },
        { kind: "text", paragraphs: [p.kitIntro] },
        { kind: "note", text: p.placementsNote },
      ],
      `${T("Jersey placement", "Emplacement maillot")}: ${pl.label}`,
    );
  }
  return null;
}
