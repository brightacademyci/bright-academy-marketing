import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PitchDiagram } from "@/components/PitchDiagram";
import { LiveAutoRefresh } from "@/components/live/live-auto-refresh";
import { computeLiveClock } from "@/lib/live-match-clock";
import { getLiveMatch } from "@/lib/api";
import { SITE_URL } from "@/lib/content";

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
    // Renamed from "Live Match" (2026-08-29) — this page now doubles as
    // the general match-detail page for every fixture (played or
    // upcoming), not just ones currently in progress. Route path stays
    // /live/[id] (existing links, the OS app's own share link) — only the
    // copy changed.
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
            <LiveMatchBody match={match} t={t} lang={lang} />
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
}: {
  match: NonNullable<Awaited<ReturnType<typeof getLiveMatch>>>;
  t: (typeof STRINGS)["en"];
  lang: "en" | "fr";
}) {
  const clock = computeLiveClock(match.livePhase, match.halfStartedAt, match.firstHalfStoppage, match.secondHalfStoppage);
  const starters = match.lineup.filter((p) => p.isStarter);
  const subs = match.lineup.filter((p) => !p.isStarter);

  return (
    <>
      {clock.isLive && <LiveAutoRefresh intervalMs={20000} />}

      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          {clock.label && (
            <span
              className={
                "mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wide " +
                (clock.isLive ? "bg-orange/20 text-orange ring-1 ring-orange/40" : "bg-white/10 text-white/60")
              }
            >
              {clock.isLive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />}
              {clock.isFinished ? t.finished : clock.isLive ? `${t.live} · ${clock.label}` : clock.label}
            </span>
          )}
          {!match.livePhase && <p className="mb-4 text-[12px] text-white/40">{t.upcoming}</p>}

          <div className="flex items-center justify-center gap-6 sm:gap-12">
            <div className="flex-1 text-right">
              <p className="font-display text-lg font-bold sm:text-2xl">{match.teamName}</p>
              <p className="mt-1 text-[11px] text-white/40">{match.isHome ? t.home : t.away}</p>
            </div>
            <div className="shrink-0 font-display text-4xl font-bold tabular-nums sm:text-5xl">
              {match.ourScore ?? 0}–{match.opponentScore ?? 0}
            </div>
            <div className="flex-1 text-left">
              <p className="font-display text-lg font-bold sm:text-2xl">{match.opponentName}</p>
              <p className="mt-1 text-[11px] text-white/40">{match.isHome ? t.away : t.home}</p>
            </div>
          </div>
        </div>

        {match.lineup.length > 0 && (
          <div className="mb-10 grid grid-cols-1 gap-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:grid-cols-2 sm:p-7">
            <section>
              <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.startingXi}</h2>
              <ul className="space-y-1.5">
                {starters.map((p, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold">
                      {p.jerseyNumber ?? "–"}
                    </span>
                    <span className="text-white/90">{p.displayName}</span>
                    {p.position && <span className="text-[11px] text-white/30">{p.position}</span>}
                  </li>
                ))}
              </ul>
            </section>
            {subs.length > 0 && (
              <section>
                <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.substitutes}</h2>
                <ul className="space-y-1.5">
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
            {!match.namesShown && <p className="text-[11px] italic text-white/30 sm:col-span-2">{t.namesWithheld}</p>}
          </div>
        )}

        {match.videos.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.highlights}</h2>
            <div className="space-y-5">
              {match.videos.map((v) => (
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

        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-orange">{t.events}</h2>
          {match.events.length === 0 ? (
            <p className="text-[13px] text-white/40">{t.noEvents}</p>
          ) : (
            <ul className="space-y-2">
              {match.events.map((e, i) => (
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
