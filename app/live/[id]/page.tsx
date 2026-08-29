import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PitchDiagram } from "@/components/PitchDiagram";
import { LiveAutoRefresh } from "@/components/live/live-auto-refresh";
import { FanVoteWidget } from "@/components/live/fan-vote-widget";
import { computeLiveClock } from "@/lib/live-match-clock";
import { getLiveMatch, type LiveMatchTeamStats } from "@/lib/api";
import { classifyPosition } from "@/lib/position-groups";
import { APP_URL, SITE_URL } from "@/lib/content";

// Public, branded live-match page — added 2026-08-27 directly in response
// to Patrick's ask: "I should be allowed to click on it and then see...
// everything" and "we can see that there is a game today", on the actual
// public site (not just a raw link into the OS app). Same data shape and
// clock math as bright-academy-os's own app/live/[id]/page.tsx (that one
// stays as the fallback/shareable link the OS app's match-day console
// prints), but themed with this site's navy/orange tokens, Header/Footer,
// and PitchDiagram motif so it reads as part of brightacademyci.com rather
// than a jump to a different app.
//
// Restyled 2026-08-29 to follow Sofascore's match page layout (Patrick's
// explicit ask, screenshot attached: crest header card, goal-scorer
// ticker, Match Momentum chart, Player of the Match with a fan vote) —
// again mirroring the OS app's own /live/[id] page exactly, just themed.
//
// force-dynamic + a 15s ISR window on the underlying fetch (see
// lib/api.ts's getLiveMatch) is the same "always check, cache briefly"
// balance used everywhere else live data crosses from the OS app to this
// site.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}

const STRINGS = {
  en: {
    title: "Match — Bright Academy",
    notFound: "This match isn't available right now.",
    backHome: "Back to homepage",
    live: "LIVE",
    upcoming: "Kick-off not yet started",
    finished: "Full-Time",
    startingXi: "Starting XI",
    substitutes: "Substitutes",
    events: "Match Events",
    noEvents: "No events yet — check back once the match kicks off.",
    home: "Home",
    away: "Away",
    namesWithheld: "Player names withheld for this squad.",
    highlights: "Highlights",
    opponentLabel: "Opponent",
    opponentLineup: "Opponent Lineup",
    goals: "Goals",
    momentum: "Match Momentum",
    momentumCaption: "An indicator built from logged match events (goals, corners, free kicks) — not shot or possession data.",
    playerOfMatch: "Player of the Match",
    coachPick: "Coach's Pick",
    fanChoice: "Fan Vote",
    noPotmYet: "Not picked yet",
    noVotesYet: "No votes yet",
    votePrompt: "Choose a player…",
    voteButton: "Vote",
    voted: "Thanks for voting for",
    voteError: "Couldn't record your vote — please try again.",
    matchTypeFriendly: "Friendly",
    matchTypeInternal: "Internal",
    matchTypeExternal: "vs. another club",
    matchTypeTournament: "Tournament",
    matchStats: "Match Stats",
    statPossession: "Possession",
    statShots: "Shots",
    statTotalAttempts: "Total attempts",
    statCorners: "Corners",
    statFreeKicks: "Free kicks",
    statThrowIns: "Throw-ins",
    statFouls: "Fouls",
    statPenalties: "Penalties",
    statTackles: "Tackles",
    statPassesCompleted: "Passes completed",
    statPossessionMinutes: "Possession (min)",
    statPossessionWon: "Possession won",
  },
  fr: {
    title: "Match — Bright Academy",
    notFound: "Ce match n'est pas disponible pour le moment.",
    backHome: "Retour à l'accueil",
    live: "EN DIRECT",
    upcoming: "Le coup d'envoi n'a pas encore été donné",
    finished: "Fin du match",
    startingXi: "Titulaires",
    substitutes: "Remplaçants",
    events: "Événements du match",
    noEvents: "Aucun événement pour le moment — revenez au coup d'envoi.",
    home: "Domicile",
    away: "Extérieur",
    namesWithheld: "Noms des joueurs masqués pour cette équipe.",
    highlights: "Temps forts",
    opponentLabel: "Adversaire",
    opponentLineup: "Composition adverse",
    goals: "Buts",
    momentum: "Momentum du match",
    momentumCaption: "Un indicateur basé sur les événements enregistrés (buts, corners, coups francs) — pas des données de tirs ou de possession.",
    playerOfMatch: "Joueur du match",
    coachPick: "Choix du coach",
    fanChoice: "Vote des fans",
    noPotmYet: "Pas encore désigné",
    noVotesYet: "Aucun vote pour le moment",
    votePrompt: "Choisissez un joueur…",
    voteButton: "Voter",
    voted: "Merci d'avoir voté pour",
    voteError: "Impossible d'enregistrer votre vote — réessayez.",
    matchTypeFriendly: "Amical",
    matchTypeInternal: "Interne",
    matchTypeExternal: "contre un autre club",
    matchTypeTournament: "Tournoi",
    matchStats: "Statistiques du match",
    statPossession: "Possession",
    statShots: "Tirs",
    statTotalAttempts: "Tentatives totales",
    statCorners: "Corners",
    statFreeKicks: "Coups francs",
    statThrowIns: "Touches",
    statFouls: "Fautes",
    statPenalties: "Penaltys",
    statTackles: "Tacles",
    statPassesCompleted: "Passes réussies",
    statPossessionMinutes: "Possession (min)",
    statPossessionWon: "Possession gagnée",
  },
};

const EVENT_ICON: Record<string, string> = {
  goal: "⚽",
  assist: "🎯",
  yellow_card: "🟨",
  red_card: "🟥",
  substitution_in: "🔄",
  substitution_out: "🔄",
  corner: "🚩",
  free_kick: "🦵",
  throw_in: "🤾",
  penalty: "🥅",
  injury: "🚑",
  alert: "⚠️",
  kickoff: "🏁",
  second_half_kickoff: "🏁",
  half_time: "⏸️",
  full_time: "🏁",
  stoppage_time: "➕",
};

function eventLabel(type: string, lang: "en" | "fr"): string {
  const labels: Record<string, { en: string; fr: string }> = {
    goal: { en: "Goal", fr: "But" },
    assist: { en: "Assist", fr: "Passe décisive" },
    yellow_card: { en: "Yellow Card", fr: "Carton jaune" },
    red_card: { en: "Red Card", fr: "Carton rouge" },
    substitution_in: { en: "Substitution", fr: "Remplacement" },
    substitution_out: { en: "Substitution", fr: "Remplacement" },
    corner: { en: "Corner", fr: "Corner" },
    free_kick: { en: "Free Kick", fr: "Coup franc" },
    throw_in: { en: "Throw-In", fr: "Touche" },
    penalty: { en: "Penalty", fr: "Penalty" },
    injury: { en: "Injury", fr: "Blessure" },
    alert: { en: "Alert", fr: "Alerte" },
    kickoff: { en: "Kick-off", fr: "Coup d'envoi" },
    second_half_kickoff: { en: "2nd Half Kick-off", fr: "Coup d'envoi 2e mi-temps" },
    half_time: { en: "Half-Time", fr: "Mi-temps" },
    full_time: { en: "Full-Time", fr: "Fin du match" },
    stoppage_time: { en: "Stoppage Time Added", fr: "Temps additionnel" },
  };
  return labels[type]?.[lang] ?? type;
}

function competitionLine(matchType: string | null, tournamentName: string | null, t: (typeof STRINGS)["en"]): string | null {
  if (tournamentName) return tournamentName;
  switch (matchType) {
    case "friendly":
      return t.matchTypeFriendly;
    case "internal":
      return t.matchTypeInternal;
    case "external":
      return t.matchTypeExternal;
    case "tournament":
      return t.matchTypeTournament;
    default:
      return null;
  }
}

function Crest({ url, name }: { url: string | null; name: string }) {
  if (url) {
    // External/signed Storage URLs — next/image's static optimizer doesn't help here.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={name}
        className="h-12 w-12 shrink-0 rounded-full bg-white/10 object-contain shadow-md ring-1 ring-white/10 sm:h-16 sm:w-16"
      />
    );
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-bold shadow-md ring-1 ring-white/10 sm:h-16 sm:w-16">
      {name.charAt(0)}
    </span>
  );
}

/** Row (top-to-bottom on the pitch) each classifyPosition() group renders
 *  in — mirrors the OS app's own PITCH_ROWS exactly. "other" folds into
 *  the midfield row rather than getting a 5th row or being dropped. */
const PITCH_ROWS: { group: "fwd" | "mid" | "def" | "gk"; yPct: number }[] = [
  { group: "fwd", yPct: 34 },
  { group: "mid", yPct: 54 },
  { group: "def", yPct: 74 },
  { group: "gk", yPct: 92 },
];

/** Starting XI drawn on a pitch — mirrors the OS app's own LineupPitch
 *  exactly, just themed orange instead of green. See that component's
 *  doc comment for why only our own XI is drawn (opponent_lineups has no
 *  position data, so a formation shape for them would be invented). */
function LineupPitch({
  starters,
  t,
}: {
  starters: { displayName: string; jerseyNumber: number | null; position: string | null }[];
  t: (typeof STRINGS)["en"];
}) {
  if (starters.length === 0) return null;

  const rows: Record<"gk" | "def" | "mid" | "fwd", typeof starters> = { gk: [], def: [], mid: [], fwd: [] };
  for (const p of starters) {
    const group = classifyPosition(p.position);
    rows[group === "other" ? "mid" : group].push(p);
  }

  return (
    <section className="mb-10">
      <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.startingXi}</h2>
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10"
        style={{
          aspectRatio: "300 / 400",
          // Alternating mowed-grass bands instead of a flat fill — mirrors
          // the OS app's own polish pass on this component.
          background: "repeating-linear-gradient(180deg, #1a6b47 0px, #1a6b47 34px, #175c3c 34px, #175c3c 68px)",
        }}
      >
        <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <rect x="6" y="6" width="288" height="388" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <line x1="6" y1="200" x2="294" y2="200" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <circle cx="150" cy="200" r="38" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <circle cx="150" cy="200" r="2.5" fill="rgba(255,255,255,0.35)" />
          <rect x="72" y="316" width="156" height="78" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <rect x="112" y="366" width="76" height="28" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <circle cx="150" cy="354" r="2" fill="rgba(255,255,255,0.35)" />
          <rect x="72" y="6" width="156" height="78" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <rect x="112" y="6" width="76" height="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <path d="M 6 20 A 14 14 0 0 1 20 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <path d="M 280 6 A 14 14 0 0 1 294 20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <path d="M 6 380 A 14 14 0 0 0 20 394" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <path d="M 280 394 A 14 14 0 0 1 294 380" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        </svg>

        {PITCH_ROWS.map(({ group, yPct }) =>
          rows[group].map((p, i, arr) => {
            const xPct = arr.length === 1 ? 50 : 14 + ((i + 0.5) / arr.length) * 72;
            return (
              <div
                key={`${group}-${i}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-navy-deep shadow-md ring-2 ring-white/40 sm:h-7 sm:w-7 sm:text-[11px]">
                  {p.jerseyNumber ?? "–"}
                </span>
                <span
                  className="max-w-[52px] truncate rounded text-center text-[8px] font-medium text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] sm:max-w-[68px] sm:text-[9px]"
                  title={p.displayName}
                >
                  {p.displayName}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

/** Two-column goal ticker, most-recent-first per side — mirrors the OS
 *  app's own GoalTicker exactly, just themed. Only rendered once at least
 *  one goal has been logged. */
function GoalTicker({
  events,
  teamName,
  opponentName,
}: {
  events: { eventType: string; minute: number | null; playerName: string | null; isOpponent: boolean }[];
  teamName: string;
  opponentName: string;
}) {
  const goals = events.filter((e) => e.eventType === "goal");
  if (goals.length === 0) return null;
  const ours = goals.filter((g) => !g.isOpponent).sort((a, b) => (b.minute ?? 0) - (a.minute ?? 0));
  const theirs = goals.filter((g) => g.isOpponent).sort((a, b) => (b.minute ?? 0) - (a.minute ?? 0));

  const Row = ({ g, align }: { g: (typeof goals)[number]; align: "left" | "right" }) => {
    const name = g.playerName ?? (align === "left" ? teamName : opponentName);
    const icon = <span className="shrink-0">⚽</span>;
    const text = (
      <span className="truncate">
        {name} {g.minute !== null ? `${g.minute}'` : ""}
      </span>
    );
    return (
      <div className={"flex items-center gap-1.5 text-[12px] " + (align === "left" ? "justify-end text-right" : "justify-start text-left")}>
        {align === "left" ? (
          <>
            {text}
            {icon}
          </>
        ) : (
          <>
            {icon}
            {text}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="mb-10 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-5">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {Array.from({ length: Math.max(ours.length, theirs.length) }).map((_, i) => (
          <Fragment key={i}>
            <div>{ours[i] && <Row g={ours[i]} align="left" />}</div>
            <div>{theirs[i] && <Row g={theirs[i]} align="right" />}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** Real team match stats (shots, corners, possession, etc.) — mirrors the
 *  OS app's own MatchStatsPanel exactly, just themed orange/blue instead
 *  of green/blue (same swap MomentumChart already makes on this site).
 *  Bar is split proportional to the two raw values, not out of a fixed
 *  max — Possession is the one row where that's also literally "the"
 *  percentage since the two sides sum to 100. */
function MatchStatsPanel({
  stats,
  teamName,
  opponentName,
  t,
}: {
  stats: LiveMatchTeamStats;
  teamName: string;
  opponentName: string;
  t: (typeof STRINGS)["en"];
}) {
  const rows: { label: string; us: number | null; opponent: number | null; suffix?: string }[] = [
    { label: t.statPossession, us: stats.usPossessionPct, opponent: stats.opponentPossessionPct, suffix: "%" },
    { label: t.statShots, us: stats.usShots, opponent: stats.opponentShots },
    { label: t.statTotalAttempts, us: stats.usTotalAttempts, opponent: stats.opponentTotalAttempts },
    { label: t.statCorners, us: stats.usCorners, opponent: stats.opponentCorners },
    { label: t.statFreeKicks, us: stats.usFreeKicks, opponent: stats.opponentFreeKicks },
    { label: t.statThrowIns, us: stats.usThrowIns, opponent: stats.opponentThrowIns },
    { label: t.statFouls, us: stats.usFouls, opponent: stats.opponentFouls },
    { label: t.statPenalties, us: stats.usPenalties, opponent: stats.opponentPenalties },
    { label: t.statTackles, us: stats.usTackles, opponent: stats.opponentTackles },
    { label: t.statPassesCompleted, us: stats.usPassesCompleted, opponent: stats.opponentPassesCompleted },
    { label: t.statPossessionMinutes, us: stats.usPossessionMinutes, opponent: stats.opponentPossessionMinutes },
    { label: t.statPossessionWon, us: stats.usPossessionWon, opponent: stats.opponentPossessionWon },
  ].filter((r) => r.us !== null && r.opponent !== null);

  if (rows.length === 0) return null;

  return (
    <section className="mb-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-7">
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-wide text-orange">{t.matchStats}</h2>
      {/* Color legend — mirrors the OS app's own addition so the
       *  orange/blue split still reads correctly on its own. */}
      <div className="mb-5 flex items-center justify-between text-[11px] font-semibold text-white/70">
        <span className="flex items-center gap-1.5 truncate">
          <span className="h-2 w-2 shrink-0 rounded-full bg-orange" />
          <span className="truncate">{teamName}</span>
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <span className="truncate">{opponentName}</span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
        </span>
      </div>
      <div className="space-y-3.5">
        {rows.map((r) => {
          const us = r.us as number;
          const opponent = r.opponent as number;
          const total = us + opponent || 1;
          const usPct = (us / total) * 100;
          const usLeads = us > opponent;
          const opponentLeads = opponent > us;
          return (
            <div key={r.label}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className={"w-10 tabular-nums " + (usLeads ? "font-bold text-white" : "font-semibold text-white/70")}>
                  {us}
                  {r.suffix ?? ""}
                </span>
                <span className="text-white/50">{r.label}</span>
                <span className={"w-10 text-right tabular-nums " + (opponentLeads ? "font-bold text-white" : "font-semibold text-white/70")}>
                  {opponent}
                  {r.suffix ?? ""}
                </span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
                <div className="bg-orange" style={{ width: `${usPct}%` }} />
                <div className="bg-blue-400" style={{ width: `${100 - usPct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const MOMENTUM_BUCKET_SIZE = 5;

/** Mirrored bar chart, drawn server-side as plain SVG — mirrors the OS
 *  app's own MomentumChart exactly. See LiveMatchMomentumBucket's doc
 *  comment in lib/api.ts for exactly what this is/isn't measuring. */
function MomentumChart({ momentum, t }: { momentum: { bucketStart: number; us: number; opponent: number }[]; t: (typeof STRINGS)["en"] }) {
  if (momentum.length === 0) return null;
  const maxMinute = Math.max(90, ...momentum.map((b) => b.bucketStart + MOMENTUM_BUCKET_SIZE));
  const bucketCount = Math.ceil(maxMinute / MOMENTUM_BUCKET_SIZE);
  const maxVal = Math.max(1, ...momentum.map((b) => Math.max(b.us, b.opponent)));
  const width = 100;
  const height = 48;
  const half = height / 2;
  const barWidth = width / bucketCount;

  return (
    <section className="mb-10">
      <h2 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-orange">{t.momentum}</h2>
      <p className="mb-2.5 text-[11px] italic text-white/40">{t.momentumCaption}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full sm:h-28" preserveAspectRatio="none">
        <line x1={0} y1={half} x2={width} y2={half} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
        <line
          x1={(45 / maxMinute) * width}
          y1={0}
          x2={(45 / maxMinute) * width}
          y2={height}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={0.5}
          strokeDasharray="2,2"
        />
        {Array.from({ length: bucketCount }).map((_, i) => {
          const bucketStart = i * MOMENTUM_BUCKET_SIZE;
          const b = momentum.find((m) => m.bucketStart === bucketStart);
          if (!b) return null;
          const usH = (b.us / maxVal) * half;
          const oppH = (b.opponent / maxVal) * half;
          const x = i * barWidth;
          return (
            <g key={bucketStart}>
              {usH > 0 && <rect x={x + barWidth * 0.15} y={half - usH} width={barWidth * 0.7} height={usH} fill="#f97316" opacity={0.9} />}
              {oppH > 0 && <rect x={x + barWidth * 0.15} y={half} width={barWidth * 0.7} height={oppH} fill="#60a5fa" opacity={0.85} />}
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const sp = await searchParams;
  const lang = sp.lang === "en" ? "en" : "fr";
  const t = STRINGS[lang];
  return {
    title: t.title,
    robots: { index: false, follow: false }, // ephemeral match-day content, nothing to rank
    alternates: { canonical: `/live/${id}` },
    openGraph: {
      title: t.title,
      url: `${SITE_URL}/live/${id}`,
      type: "website",
    },
  };
}

export default async function PublicLiveMatchPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const lang = sp.lang === "en" ? "en" : "fr";
  const t = STRINGS[lang];

  const match = await getLiveMatch(id);

  return (
    <main>
      <Header />
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          {!match ? (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-[14px] text-white/70">{t.notFound}</p>
              <Link href="/" className="mt-6 inline-block text-[13px] font-semibold text-orange hover:underline">
                {t.backHome}
              </Link>
            </div>
          ) : (
            <LiveMatchBody match={match} t={t} lang={lang} fixtureId={id} />
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

function LiveMatchBody({
  match,
  t,
  lang,
  fixtureId,
}: {
  match: NonNullable<Awaited<ReturnType<typeof getLiveMatch>>>;
  t: (typeof STRINGS)["en"];
  lang: "en" | "fr";
  fixtureId: string;
}) {
  const clock = computeLiveClock(match.livePhase, match.halfStartedAt, match.firstHalfStoppage, match.secondHalfStoppage);
  /** Defensive fallbacks — added 2026-08-29 after a runtime error
   *  ("Cannot read properties of undefined (reading 'length')") showed up
   *  on this route right at deploy time: this page fetches match JSON
   *  cross-origin from portal.brightacademyci.com (see lib/api.ts), and a
   *  request that lands mid-rollout (or any future API response missing a
   *  field) shouldn't be able to crash the whole page. Every array field
   *  gets a `?? []` fallback here so the rest of the component can keep
   *  assuming arrays, same as before. */
  const lineup = match.lineup ?? [];
  const opponentLineup = match.opponentLineup ?? [];
  const videos = match.videos ?? [];
  const events = match.events ?? [];
  const momentum = match.momentum ?? [];
  const fanVotes = match.fanVotes ?? [];
  const starters = lineup.filter((p) => p.isStarter);
  const subs = lineup.filter((p) => !p.isStarter);
  const competition = competitionLine(match.matchType, match.tournamentName, t);
  const votablePlayers = lineup.filter((p) => p.playerId).map((p) => ({ id: p.playerId as string, name: p.displayName }));

  return (
    <>
      {clock.isLive && <LiveAutoRefresh intervalMs={20000} />}

      <div className="mx-auto max-w-2xl">
        {/* Header card — restyled 2026-08-29 to follow Sofascore's match
         *  page layout, per Patrick's ask: crests, competition line, big
         *  score, status pill, all in one card. */}
        <div className="mb-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-8">
          {competition && <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-wide text-white/40">🏆 {competition}</p>}

          <div className="flex items-center justify-center gap-4 sm:gap-10">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              {/* Falls back to this site's own static academy badge (same
               *  one Header.tsx uses) rather than the plain "B" initial —
               *  first_team_info.crest_image_url is still empty (nobody's
               *  uploaded a dedicated First Team crest yet), and the real
               *  Bright Academy badge should show here regardless. Note
               *  this is a *different* local path than the OS app's own
               *  fallback ("/logo.png") — the two apps keep this static
               *  asset at different paths in their own /public, and
               *  match.ourCrestUrl (when it IS set) already comes through
               *  as an absolute/full URL from first_team_info, so it's
               *  never one of these app-local paths itself. */}
              <Crest url={match.ourCrestUrl ?? "/logo/crest.png"} name={match.teamName} />
              <p className="font-display text-sm font-bold sm:text-xl">{match.teamName}</p>
              <p className="text-[10px] text-white/40">{match.isHome ? t.home : t.away}</p>
            </div>
            <div className="shrink-0 text-center">
              <div className="font-display text-3xl font-bold tabular-nums sm:text-5xl">
                {match.ourScore ?? 0}–{match.opponentScore ?? 0}
              </div>
              {clock.label && (
                <span
                  className={
                    "mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide " +
                    (clock.isLive ? "bg-orange/20 text-orange ring-1 ring-orange/40" : "bg-white/10 text-white/60")
                  }
                >
                  {clock.isLive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />}
                  {clock.isFinished ? t.finished : clock.isLive ? `${t.live} · ${clock.label}` : clock.label}
                </span>
              )}
              {!match.livePhase && <p className="mt-2 text-[11px] text-white/40">{t.upcoming}</p>}
            </div>
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <Crest url={match.opponentLogoUrl} name={match.opponentName} />
              <p className="font-display text-sm font-bold sm:text-xl">{match.opponentName}</p>
              <p className="text-[10px] text-white/40">{match.isHome ? t.away : t.home}</p>
            </div>
          </div>
        </div>

        <GoalTicker events={events} teamName={match.teamName} opponentName={match.opponentName} />

        {lineup.length > 0 && (
          <>
            <LineupPitch starters={starters} t={t} />
            {subs.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.substitutes}</h2>
                <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {subs.map((p, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-[11px] font-semibold text-white/60">
                        {p.jerseyNumber ?? "–"}
                      </span>
                      <span className="text-white/60">{p.displayName}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {!match.namesShown && <p className="mb-10 text-[11px] italic text-white/30">{t.namesWithheld}</p>}
          </>
        )}

        {opponentLineup.length > 0 && (
          <div className="mb-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-7">
            <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">
              {t.opponentLineup} — {match.opponentName}
            </h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {opponentLineup.map((p, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px]">
                  <span
                    className={
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold " +
                      (p.isStarter ? "bg-white/10" : "bg-white/5 text-white/60")
                    }
                  >
                    {p.jerseyNumber ?? "–"}
                  </span>
                  <span className={p.isStarter ? "text-white/90" : "text-white/60"}>{p.fullName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {videos.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.highlights}</h2>
            <div className="space-y-5">
              {videos.map((v) => (
                <div key={v.id} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <div className="aspect-video">
                    <iframe
                      src={v.videoUrl}
                      title={v.title || t.highlights}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {(v.title || v.caption) && (
                    <div className="bg-white/5 px-4 py-3">
                      {v.title && <p className="font-display text-[14px] font-semibold text-white">{v.title}</p>}
                      {v.caption && <p className="text-[12px] text-white/60">{v.caption}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {match.teamStats && <MatchStatsPanel stats={match.teamStats} teamName={match.teamName} opponentName={match.opponentName} t={t} />}

        <MomentumChart momentum={momentum} t={t} />

        {votablePlayers.length > 0 && (
          <section className="mb-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-7">
            <h2 className="mb-3.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.playerOfMatch}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="text-center">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">{t.coachPick}</p>
                {match.playerOfMatch ? (
                  <>
                    <div className="mx-auto w-fit">
                      <Crest url={match.playerOfMatch.photoUrl} name={match.playerOfMatch.name} />
                    </div>
                    <p className="mt-2 font-display text-sm font-semibold">{match.playerOfMatch.name}</p>
                  </>
                ) : (
                  <p className="text-[12px] text-white/40">{t.noPotmYet}</p>
                )}
              </div>
              <div className="text-center">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">{t.fanChoice}</p>
                {fanVotes[0] ? (
                  <>
                    <div className="mx-auto w-fit">
                      <Crest url={fanVotes[0].photoUrl} name={fanVotes[0].name} />
                    </div>
                    <p className="mt-2 font-display text-sm font-semibold">{fanVotes[0].name}</p>
                    <p className="text-[11px] text-white/40">
                      {fanVotes[0].pct}% · {match.totalFanVotes}
                    </p>
                  </>
                ) : (
                  <p className="text-[12px] text-white/40">{t.noVotesYet}</p>
                )}
              </div>
            </div>

            {fanVotes.length > 1 && (
              <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                {fanVotes.slice(1).map((v) => (
                  <li key={v.playerId} className="flex items-center justify-between text-[12px] text-white/60">
                    <span>{v.name}</span>
                    <span>{v.pct}%</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 border-t border-white/10 pt-4">
              <FanVoteWidget fixtureId={fixtureId} apiBase={APP_URL} players={votablePlayers} t={t} />
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.events}</h2>
          {events.length === 0 ? (
            <p className="text-[13px] text-white/40">{t.noEvents}</p>
          ) : (
            <ul className="space-y-2">
              {events.map((e, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-white/5 pb-2 text-[13px]">
                  <span className="w-9 shrink-0 text-right tabular-nums text-white/40">{e.minute !== null ? `${e.minute}'` : ""}</span>
                  <span className="shrink-0">{EVENT_ICON[e.eventType] ?? "•"}</span>
                  <span className="text-white/90">{eventLabel(e.eventType, lang)}</span>
                  {e.playerName ? (
                    <span className="text-white/50">— {e.playerName}</span>
                  ) : (
                    e.isOpponent && <span className="text-white/50">— {match.opponentName}</span>
                  )}
                  {e.notes && e.eventType === "stoppage_time" && <span className="text-white/50">{e.notes}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
