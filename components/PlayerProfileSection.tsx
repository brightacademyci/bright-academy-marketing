"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import type { PlayerProfile, PlayerProfileAppearance } from "@/lib/api";

// Same try/catch-wrapped toLocaleDateString pattern as
// FirstTeamSection.tsx's own formatFixtureDateTime — duplicated locally
// rather than exported/imported, matching this codebase's existing
// per-component-copy convention for this exact helper (NewsPostSection has
// its own formatDate() too).
function formatMatchDate(iso: string, lang: "en" | "fr") {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

function matchOutcome(fx: PlayerProfileAppearance): "win" | "draw" | "loss" | null {
  if (fx.ourScore === null || fx.opponentScore === null) return null;
  if (fx.ourScore > fx.opponentScore) return "win";
  if (fx.ourScore < fx.opponentScore) return "loss";
  return "draw";
}

interface AppearanceRowDict {
  starterLabel: string;
  subLabel: string;
  minutesSuffix: string;
}

function AppearanceRow({ fx, lang, t }: { fx: PlayerProfileAppearance; lang: "en" | "fr"; t: AppearanceRowDict }) {
  const outcome = matchOutcome(fx);
  const outcomeStyles: Record<string, string> = {
    win: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30",
    draw: "bg-white/10 text-white/70 ring-1 ring-white/15",
    loss: "bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/25",
  };

  return (
    <Link
      href={`/live/${fx.fixtureId}`}
      className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-orange/30 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-2 ring-orange/30">
          {fx.opponentLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fx.opponentLogoUrl} alt={fx.opponentName} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-[12px] font-bold text-white/70">{fx.opponentName.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-[14px] font-semibold text-white">{fx.opponentShortName}</h3>
          <p className="mt-0.5 text-[12px] text-white/60">
            {formatMatchDate(fx.matchDate, lang)}
            {" · "}
            {fx.isStarter ? t.starterLabel : t.subLabel}
            {fx.minutesPlayed !== null && ` · ${fx.minutesPlayed}${t.minutesSuffix}`}
            {fx.goals > 0 && ` · ⚽ ${fx.goals}`}
          </p>
        </div>
      </div>
      {outcome && (
        <span className={`shrink-0 self-start rounded-full px-3.5 py-1.5 text-[12px] font-bold sm:self-center ${outcomeStyles[outcome]}`}>
          {fx.ourScore} – {fx.opponentScore}
        </span>
      )}
    </Link>
  );
}

/** Clickable player-profile page — added 2026-08-30, Patrick's ask off the
 *  back of the Google "sports card" reference (each player on that card
 *  links to their own page). Unlike NewsPostSection, this doesn't fetch
 *  both language variants server-side: nothing on PlayerProfile itself is
 *  translated (names, numbers, dates), only the surrounding labels are, and
 *  those come from the language dict like every other component here. */
export function PlayerProfileSection({ profile }: { profile: PlayerProfile }) {
  const { lang, t } = useLanguage();
  const pt = t.playerProfile;

  if (!profile.found) {
    return (
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <div className="mx-auto max-w-md py-16 text-center">
            <p className="text-[14px] text-white/70">{pt.notFound}</p>
            <Link href="/first-team" className="mt-6 inline-block text-[13px] font-semibold text-orange hover:underline">
              {pt.backToSquad}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const meta = [profile.position, profile.age !== null ? `${profile.age} ${t.firstTeam.ageSuffix}` : null].filter(Boolean).join(" · ");

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal>
          <Link href="/first-team" className="text-[13px] font-medium text-white/70 hover:text-orange">
            {pt.backToSquad}
          </Link>
        </Reveal>

        <Reveal className="mt-6" delay={60}>
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-orange/40">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoUrl} alt={profile.fullName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/10 font-display text-2xl font-bold text-white/70">
                  {profile.jerseyNumber ?? "?"}
                </div>
              )}
              {profile.jerseyNumber !== null && (
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange text-[13px] font-bold text-navy-deep ring-4 ring-navy-deep">
                  {profile.jerseyNumber}
                </span>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-2xl font-bold text-white md:text-3xl">{profile.fullName}</h1>
              {meta && <p className="mt-2 text-[14px] text-white/60">{meta}</p>}
              {profile.heightCm !== null && (
                <p className="mt-1 text-[13px] text-white/50">
                  {pt.heightLabel}: <span className="text-white/80">{profile.heightCm} cm</span>
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-5 grid grid-cols-2 gap-3.5 sm:max-w-xs" delay={100}>
          <div className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10">
            <p className="font-display text-2xl font-bold text-orange">{profile.appearances}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">{pt.appearancesLabel}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10">
            <p className="font-display text-2xl font-bold text-orange">{profile.goals}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">{pt.goalsLabel}</p>
          </div>
        </Reveal>

        <Reveal className="mt-9 max-w-2xl" delay={140}>
          <h2 className="mb-3.5 text-[12px] font-semibold uppercase tracking-wide text-white/50">{pt.recentFormLabel}</h2>
          {profile.recentAppearances.length === 0 ? (
            <p className="text-[13px] text-white/50">{pt.noAppearances}</p>
          ) : (
            <div className="space-y-3">
              {profile.recentAppearances.map((fx) => (
                <AppearanceRow key={fx.fixtureId} fx={fx} lang={lang} t={pt} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
