"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { Lightbox } from "./Lightbox";
import { FIRST_TEAM_SOCIAL } from "@/lib/content";
import { classifyPosition, POSITION_GROUP_ORDER, type PositionGroup } from "@/lib/position-groups";
import type { FirstTeam, FirstTeamPlayer } from "@/lib/api";

// Same server-fetch-both-languages, pick-on-the-client pattern as
// OurCoachesSection/NewsListSection — see that component's own comment for
// the full rationale (this site's language toggle has no URL/cookie signal
// a server component could key off).
//
// Redesigned 2026-08-13, referencing psg.fr/en/mens-football/squad per the
// director's own request: a top sub-nav (Squad/Staff/Gallery/Standings,
// PSG's own tabs are Squad/Staff/Fixtures/Standings/Honours — narrowed to
// the four sections this site actually has content for) instead of one
// long vertical scroll, plus a position-based filter (All/Goalkeepers/
// Defenders/Midfielders/Forwards) on the Squad tab itself. Position
// grouping reuses the OS app's own classifyPosition() heuristic
// (lib/position-groups.ts, mirrored here) since `position` is free text
// staff type into the roster, never a fixed enum.
type TabKey = "squad" | "staff" | "fixtures" | "gallery" | "videos" | "standings";

function groupPlayers(players: FirstTeamPlayer[]): Record<PositionGroup, FirstTeamPlayer[]> {
  const groups: Record<PositionGroup, FirstTeamPlayer[]> = { gk: [], def: [], mid: [], fwd: [], other: [] };
  for (const p of players) groups[classifyPosition(p.position)].push(p);
  return groups;
}

// Same try/catch-wrapped toLocaleDateString pattern as
// NewsListSection/LatestNewsSection/NewsPostSection's own formatDate() —
// plus a time, since a fixture (unlike a news post) is meaningless without
// kickoff time.
function formatFixtureDateTime(iso: string, lang: "en" | "fr") {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function PlayerCard({ player }: { player: FirstTeamPlayer }) {
  return (
    <div className="flex h-full items-center gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-orange/40">
        {player.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={player.photoUrl} alt={player.fullName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/10 font-display text-[15px] font-bold text-white/70">
            {player.jerseyNumber ?? "?"}
          </div>
        )}
        {player.jerseyNumber !== null && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-navy-deep ring-2 ring-navy-deep">
            {player.jerseyNumber}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-display text-[14px] font-semibold text-white">{player.fullName}</h3>
        {player.position && <p className="text-[12px] text-white/60">{player.position}</p>}
      </div>
    </div>
  );
}

export function FirstTeamSection({ teamEn, teamFr }: { teamEn: FirstTeam; teamFr: FirstTeam }) {
  const { lang, t } = useLanguage();
  const team = useMemo(() => (lang === "fr" ? teamFr : teamEn), [lang, teamEn, teamFr]);
  const headers = t.firstTeam.standingsHeaders;
  const tabs = t.firstTeam.tabs;
  const posLabels = t.firstTeam.positionFilters;
  const [openPhotoIndex, setOpenPhotoIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("squad");
  const [positionFilter, setPositionFilter] = useState<PositionGroup | "all">("all");

  const grouped = useMemo(() => groupPlayers(team.players), [team.players]);
  const availableGroups = POSITION_GROUP_ORDER.filter((g) => grouped[g].length > 0);
  const visibleGroups = positionFilter === "all" ? availableGroups : availableGroups.filter((g) => g === positionFilter);

  const TABS: { key: TabKey; label: string; count: number }[] = [
    { key: "squad", label: tabs.squad, count: team.players.length },
    { key: "staff", label: tabs.staff, count: team.staff.length },
    { key: "fixtures", label: tabs.fixtures, count: team.fixtures.length },
    { key: "gallery", label: tabs.gallery, count: team.gallery.length },
    { key: "videos", label: tabs.videos, count: team.videos.length },
    { key: "standings", label: tabs.standings, count: team.standings.length },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.firstTeam.eyebrow}</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{team.teamName || t.firstTeam.title}</h1>
          <p className="mt-3 text-[14px] text-white/70">{t.firstTeam.subtitle}</p>
          {team.division && (
            <p className="mt-3 text-[12px] font-semibold text-white/80">
              {t.firstTeam.divisionLabel}: <span className="text-orange">{team.division}</span>
              {team.seasonLabel && <span className="text-white/50"> · {team.seasonLabel}</span>}
            </p>
          )}
        </Reveal>

        {/* Next Fixture — added 2026-08-24, Patrick's ask after scheduling a
         *  first-team match with no way to show it (or the opponent's logo)
         *  on the public site. Always visible regardless of the active tab,
         *  same reasoning as the "Follow the club" footer below: this is
         *  time-sensitive info, not squad/staff/gallery/standings content
         *  that belongs behind a tab click. */}
        {team.nextFixture && (
          <Reveal className="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-orange/30 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-orange">
                {t.firstTeam.nextFixture.label}
              </span>
              <span
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
                  team.nextFixture.isHome
                    ? "bg-orange/15 text-orange ring-1 ring-orange/30"
                    : "bg-white/10 text-white/70 ring-1 ring-white/15"
                }`}
              >
                {team.nextFixture.isHome ? t.firstTeam.nextFixture.home : t.firstTeam.nextFixture.away}
              </span>
            </div>

            {/* Crest-vs-crest match card — redesigned 2026-08-25 on
             *  Patrick's explicit ask ("take an example on Manchester,
             *  Chelsea, or PSG... we need to have both logos") — a single
             *  opponent-only badge with a "vs Name" heading read as half a
             *  fixture. Bright Football Club's own crest is the same
             *  static /logo/crest.png every other part of the site already
             *  uses (Header/Footer), not a Storage-backed field — nothing
             *  to sign, unlike the opponent's. */}
            {/* Fixed-width w-full on the name spans (2026-08-25, Patrick's
             *  report: on a real phone the two names ran together into
             *  unreadable overlapping text). Root cause: `items-center` on
             *  a flex-col column stops children from stretching to the
             *  column's own w-28/w-32 — a bare <span> then sizes to its
             *  own text content instead, so a long club name silently
             *  spilled out past its crest into the neighboring column
             *  instead of truncating. w-full pins the span to the column
             *  width so truncate actually has something to truncate
             *  against. Paired with opponentShortName/shortName (same
             *  fix's other half) so it rarely even needs to. */}
            <div className="mt-5 flex items-center justify-center gap-4 sm:gap-10">
              <div className="flex w-28 flex-col items-center gap-2 text-center sm:w-36">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2 ring-2 ring-orange/40 sm:h-20 sm:w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/crest.png" alt={team.teamName || "Bright Football Club"} className="h-full w-full object-contain" />
                </div>
                <span className="w-full truncate text-[12px] font-semibold leading-tight text-white/90">
                  {team.shortName}
                </span>
              </div>

              <span className="shrink-0 font-display text-[13px] font-bold text-white/40 sm:text-[15px]">
                {t.firstTeam.nextFixture.vsBadge}
              </span>

              <div className="flex w-28 flex-col items-center gap-2 text-center sm:w-36">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-2 ring-white/20 sm:h-20 sm:w-20">
                  {team.nextFixture.opponentLogoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={team.nextFixture.opponentLogoUrl} alt={team.nextFixture.opponentName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-display text-[15px] font-bold text-white/70">
                      {team.nextFixture.opponentName.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="w-full truncate text-[12px] font-semibold leading-tight text-white/90">
                  {team.nextFixture.opponentShortName}
                </span>
              </div>
            </div>

            <p className="mt-5 text-center text-[12px] text-white/60">
              {formatFixtureDateTime(team.nextFixture.matchDate, lang)}
              {" · "}
              {team.nextFixture.venue || t.firstTeam.nextFixture.venueTbc}
            </p>
          </Reveal>
        )}

        {(team.coverImageUrl || team.about) && (
          <Reveal className="mt-8 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
            {team.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={team.coverImageUrl} alt={team.teamName} className="h-[260px] w-full object-cover md:h-[380px]" />
            )}
            {team.about && <p className="p-5 text-[14px] leading-relaxed text-white/80 md:p-7">{team.about}</p>}
          </Reveal>
        )}

        {/* Sub-nav — PSG-style Squad/Staff/Gallery/Standings tab bar */}
        <Reveal className="mt-10 sticky top-[64px] z-10 -mx-5 border-y border-white/10 bg-navy-deep/95 px-5 backdrop-blur-md">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 border-b-2 px-4 py-3.5 text-[13px] font-semibold uppercase tracking-wide transition ${
                  activeTab === tab.key
                    ? "border-orange text-orange"
                    : "border-transparent text-white/60 hover:text-white/90"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Squad */}
        {activeTab === "squad" && (
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.squadTitle}</h2>
              <span className="rounded-full bg-orange/15 px-3 py-1 text-[11px] font-semibold text-orange ring-1 ring-orange/30">
                {t.firstTeam.provisionalBadge}
              </span>
            </div>
            {team.players.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noSquad}</p>
            ) : (
              <>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => setPositionFilter("all")}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                      positionFilter === "all" ? "bg-orange text-navy-deep" : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {posLabels.all} ({team.players.length})
                  </button>
                  {availableGroups.map((g) => (
                    <button
                      key={g}
                      onClick={() => setPositionFilter(g)}
                      className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                        positionFilter === g ? "bg-orange text-navy-deep" : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {posLabels[g]} ({grouped[g].length})
                    </button>
                  ))}
                </div>

                <div className="mt-7 space-y-9">
                  {visibleGroups.map((g) => (
                    <div key={g}>
                      {positionFilter === "all" && (
                        <h3 className="mb-3.5 text-[12px] font-semibold uppercase tracking-wide text-white/50">
                          {posLabels[g]}
                        </h3>
                      )}
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {grouped[g].map((player, i) => (
                          <Reveal key={player.id} delay={i * 40}>
                            <PlayerCard player={player} />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Reveal>
        )}

        {/* Coaching staff */}
        {activeTab === "staff" && (
          <Reveal className="mt-8">
            <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.staffTitle}</h2>
            {team.staff.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noStaff}</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {team.staff.map((member, i) => (
                  <Reveal key={member.id} delay={i * 40}>
                    <div className="flex h-full items-center gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-orange/40">
                        {member.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.photoUrl} alt={member.fullName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/10 font-display text-[15px] font-bold text-white/70">
                            {member.fullName
                              .split(" ")
                              .map((p) => p[0])
                              .filter(Boolean)
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-[14px] font-semibold text-white">{member.fullName}</h3>
                        <p className="text-[12px] font-semibold text-orange">{member.roleLabel}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Reveal>
        )}

        {/* Fixtures — added 2026-08-24, Patrick's follow-up ask after the
         *  Next Fixture banner above: a full list of everything currently
         *  on the calendar, not just the very next match. Same data
         *  (team.fixtures) the banner uses, just every row instead of the
         *  first one. */}
        {activeTab === "fixtures" && (
          <Reveal className="mt-8">
            <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.fixturesTitle}</h2>
            {team.fixtures.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noFixtures}</p>
            ) : (
              <div className="mt-6 space-y-3">
                {team.fixtures.map((fx, i) => (
                  <Reveal key={`${fx.matchDate}-${fx.opponentName}-${i}`} delay={i * 40}>
                    <div className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex shrink-0 items-center gap-1.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-2 ring-orange/30">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/logo/crest.png" alt={team.teamName || "Bright Football Club"} className="h-full w-full object-contain" />
                          </div>
                          <span className="text-[10px] font-bold text-white/40">{t.firstTeam.nextFixture.vsBadge}</span>
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-2 ring-orange/30">
                            {fx.opponentLogoUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={fx.opponentLogoUrl} alt={fx.opponentName} className="h-full w-full object-cover" />
                            ) : (
                              <span className="font-display text-[12px] font-bold text-white/70">
                                {fx.opponentName.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-[14px] font-semibold text-white">{fx.opponentShortName}</h3>
                          <p className="mt-0.5 text-[12px] text-white/60">
                            {formatFixtureDateTime(fx.matchDate, lang)}
                            {" · "}
                            {fx.venue || t.firstTeam.nextFixture.venueTbc}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 self-start rounded-full px-3.5 py-1.5 text-[11px] font-semibold sm:self-center ${
                          fx.isHome
                            ? "bg-orange/15 text-orange ring-1 ring-orange/30"
                            : "bg-white/10 text-white/70 ring-1 ring-white/15"
                        }`}
                      >
                        {fx.isHome ? t.firstTeam.nextFixture.home : t.firstTeam.nextFixture.away}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Reveal>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <Reveal className="mt-8">
            <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.galleryTitle}</h2>
            {team.gallery.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noGallery}</p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {team.gallery.map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => setOpenPhotoIndex(i)}
                    className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
                    aria-label={`Open photo${photo.caption ? `: ${photo.caption}` : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.photoUrl}
                      alt={photo.caption ?? team.teamName}
                      loading={i < 4 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-navy-deep/0 transition group-hover:bg-navy-deep/20" />
                  </button>
                ))}
              </div>
            )}

            {openPhotoIndex !== null && (
              <Lightbox
                images={team.gallery.map((p) => p.photoUrl)}
                alts={team.gallery.map((p) => p.caption ?? team.teamName)}
                index={openPhotoIndex}
                onClose={() => setOpenPhotoIndex(null)}
                onNavigate={setOpenPhotoIndex}
              />
            )}
          </Reveal>
        )}

        {/* Videos — added 2026-08-25, mirrors the Gallery tab above exactly,
            minus the Lightbox (each card is already a playable embed, no
            need for a click-to-enlarge step). */}
        {activeTab === "videos" && (
          <Reveal className="mt-8">
            <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.videosTitle}</h2>
            {team.videos.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noVideos}</p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {team.videos.map((video) => (
                  <div key={video.id} className="overflow-hidden rounded-xl ring-1 ring-white/10">
                    <div className="aspect-video">
                      <iframe
                        src={video.videoUrl}
                        title={video.title || team.teamName}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {(video.title || video.caption) && (
                      <div className="bg-white/5 px-4 py-3">
                        {video.title && <p className="font-display text-[14px] font-semibold text-white">{video.title}</p>}
                        {video.caption && <p className="text-[12px] text-white/60">{video.caption}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        )}

        {/* Standings */}
        {activeTab === "standings" && (
          <Reveal className="mt-8">
            <h2 className="font-display text-xl font-bold text-white">{t.firstTeam.standingsTitle}</h2>
            {team.standings.length === 0 ? (
              <p className="mt-4 text-[13px] text-white/60">{t.firstTeam.noStandings}</p>
            ) : (
              <div className="mt-6 overflow-x-auto rounded-2xl bg-white/5 ring-1 ring-white/10">
                <table className="w-full min-w-[560px] text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/60">
                      <th className="px-3 py-3 font-semibold">{headers.pos}</th>
                      <th className="px-3 py-3 font-semibold">{headers.team}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.played}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.won}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.drawn}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.lost}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.gf}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.ga}</th>
                      <th className="px-3 py-3 text-center font-semibold">{headers.gd}</th>
                      <th className="px-3 py-3 text-center font-semibold text-orange">{headers.pts}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.standings.map((row) => (
                      <tr
                        key={`${row.position}-${row.teamName}`}
                        className={`border-b border-white/5 last:border-none ${
                          row.isOwnTeam ? "bg-orange/10 font-semibold text-orange" : "text-white/85"
                        }`}
                      >
                        <td className="px-3 py-2.5">{row.position}</td>
                        <td className="px-3 py-2.5">{row.teamName}</td>
                        <td className="px-3 py-2.5 text-center">{row.played}</td>
                        <td className="px-3 py-2.5 text-center">{row.won}</td>
                        <td className="px-3 py-2.5 text-center">{row.drawn}</td>
                        <td className="px-3 py-2.5 text-center">{row.lost}</td>
                        <td className="px-3 py-2.5 text-center">{row.goalsFor}</td>
                        <td className="px-3 py-2.5 text-center">{row.goalsAgainst}</td>
                        <td className="px-3 py-2.5 text-center">{row.goalsFor - row.goalsAgainst}</td>
                        <td className="px-3 py-2.5 text-center">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Reveal>
        )}

        {/* Follow the club */}
        <Reveal className="mt-12 flex flex-col items-start gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-[15px] font-semibold text-white">{t.firstTeam.followTitle}</h2>
          <div className="flex items-center gap-3">
            <a
              href={FIRST_TEAM_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold text-white ring-1 ring-white/15 hover:bg-white/20"
            >
              Facebook
            </a>
            <a
              href={FIRST_TEAM_SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold text-white ring-1 ring-white/15 hover:bg-white/20"
            >
              TikTok
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
