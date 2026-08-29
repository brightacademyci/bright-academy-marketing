// Server-side fetch helpers for the OS app's public, no-session API layer
// (app/api/public/* in bright-academy-os — see that repo's CLAUDE.md entry
// dated 2026-08-12 for the full design). These endpoints are admin-client
// backed and CORS-open specifically for this site to call, so no
// credentials of any kind live here — just plain fetches against a public
// URL.
//
// Every helper degrades gracefully to an empty result (never throws) on any
// failure — a network hiccup, the OS app being briefly down, or a malformed
// response — since none of this content is essential to the page rendering;
// a coaches/news/gallery section that's temporarily empty is far better
// than a 500 on the whole marketing site. This mirrors the OS app's own
// "acknowledge and skip" convention for anything not on the critical path.
import { APP_URL } from "./content";
import type { Lang } from "./content";

const PUBLIC_API_BASE = `${APP_URL}/api/public`;

// ISR intervals, chosen per how often each thing actually changes and how
// stale it's safe to look: coaches (bios rarely change) get a long window,
// the gallery (meant to feel "live" — new session photos) gets a short one,
// news sits in between.
const COACHES_REVALIDATE_SECONDS = 900;
const GALLERY_REVALIDATE_SECONDS = 60;
const NEWS_REVALIDATE_SECONDS = 300;
// Videos change about as often as the photo gallery (a new highlight
// reel/session clip) — same short window.
const VIDEOS_REVALIDATE_SECONDS = 60;
// First Team info/squad/standings change a handful of times a season, not
// daily — a long window like coaches is the right fit.
const FIRST_TEAM_REVALIDATE_SECONDS = 900;

export interface PublicCoach {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  roleLabel: string;
  siteName: string | null;
  bio: string | null;
  yearsExperience: number | null;
}

export interface PublicGalleryItem {
  id: string;
  title: string;
  photoUrl: string;
  siteName: string | null;
  createdAt: string;
}

// Added 2026-08-25 for the Videos section/tab — mirrors PublicGalleryItem's
// own shape closely (see bright-academy-os's lib/data/public-site.ts's
// PublicVideo). videoUrl is already a canonical embeddable YouTube/Vimeo
// URL by the time it reaches here (normalized server-side at write time),
// so components/Videos.tsx and FirstTeamSection.tsx's Videos tab can drop
// it straight into an <iframe>.
export interface PublicVideo {
  id: string;
  title: string | null;
  caption: string | null;
  videoUrl: string;
}

export interface PublicNewsPost {
  id: string;
  title: string;
  body: string;
  coverImageUrl: string | null;
  publishedAt: string;
}

async function safeFetchJson<T>(url: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Network error, OS app briefly unreachable, malformed JSON — treat all
    // the same: no data this render, try again next revalidation window.
    return null;
  }
}

export async function getCoaches(lang: Lang): Promise<PublicCoach[]> {
  const data = await safeFetchJson<{ coaches: PublicCoach[] }>(
    `${PUBLIC_API_BASE}/coaches?lang=${lang}`,
    COACHES_REVALIDATE_SECONDS
  );
  return data?.coaches ?? [];
}

export async function getGalleryItems(limit = 30): Promise<PublicGalleryItem[]> {
  const data = await safeFetchJson<{ items: PublicGalleryItem[] }>(
    `${PUBLIC_API_BASE}/gallery?limit=${limit}`,
    GALLERY_REVALIDATE_SECONDS
  );
  return data?.items ?? [];
}

export async function getVideos(limit = 30): Promise<PublicVideo[]> {
  const data = await safeFetchJson<{ videos: PublicVideo[] }>(`${PUBLIC_API_BASE}/videos?limit=${limit}`, VIDEOS_REVALIDATE_SECONDS);
  return data?.videos ?? [];
}

export async function getNewsPosts(lang: Lang): Promise<PublicNewsPost[]> {
  const data = await safeFetchJson<{ posts: PublicNewsPost[] }>(
    `${PUBLIC_API_BASE}/news?lang=${lang}`,
    NEWS_REVALIDATE_SECONDS
  );
  return data?.posts ?? [];
}

export async function getNewsPost(id: string, lang: Lang): Promise<PublicNewsPost | null> {
  const data = await safeFetchJson<{ post: PublicNewsPost }>(
    `${PUBLIC_API_BASE}/news/${encodeURIComponent(id)}?lang=${lang}`,
    NEWS_REVALIDATE_SECONDS
  );
  return data?.post ?? null;
}

export interface FirstTeamPlayer {
  id: string;
  fullName: string;
  jerseyNumber: number | null;
  position: string | null;
  photoUrl: string | null;
}

export interface FirstTeamStaffMember {
  id: string;
  fullName: string;
  roleLabel: string;
  photoUrl: string | null;
}

export interface FirstTeamGalleryPhoto {
  id: string;
  photoUrl: string;
  caption: string | null;
}

export interface FirstTeamStanding {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  isOwnTeam: boolean;
}

export interface FirstTeamNextFixture {
  /** Added 2026-08-27 alongside the live-match feature — links this card to
   *  /live/[id] on this site, which calls getLiveMatch() below. */
  id: string;
  matchDate: string;
  venue: string | null;
  isHome: boolean;
  opponentName: string;
  /** Short display name/alias — mirrors PublicFirstTeamFixture.opponentShortName
   *  in bright-academy-os (2026-08-25). Always a usable, already-shortened
   *  string (server-side fallback to an auto-derived truncation when no
   *  manual alias is set) — safe to render directly in the compact
   *  crest-vs-crest widgets below. */
  opponentShortName: string;
  opponentLogoUrl: string | null;
  /** True from kickoff through full-time — added 2026-08-27. */
  isLive: boolean;
  /** Added 2026-08-28, mirrors PublicFirstTeamFixture.status/ourScore/
   *  opponentScore in bright-academy-os — see that repo's lib/data/
   *  public-site.ts for the full note on the results gap this fixes.
   *  nextFixture and every row in `fixtures` are always status="upcoming"
   *  (or "live", same moment isLive is true); status="final" only appears
   *  in the new `results` list below. */
  status: "upcoming" | "live" | "final";
  ourScore: number | null;
  opponentScore: number | null;
}

export interface FirstTeam {
  teamName: string;
  /** Short display name/alias for the home crest label — mirrors
   *  PublicFirstTeam.shortName in bright-academy-os (2026-08-25). */
  shortName: string;
  division: string | null;
  about: string | null;
  crestImageUrl: string | null;
  coverImageUrl: string | null;
  seasonLabel: string | null;
  players: FirstTeamPlayer[];
  staff: FirstTeamStaffMember[];
  gallery: FirstTeamGalleryPhoto[];
  /** Mirrors PublicFirstTeam.videos in bright-academy-os (2026-08-25). */
  videos: PublicVideo[];
  standings: FirstTeamStanding[];
  /** Mirrors PublicFirstTeam.nextFixture in bright-academy-os (2026-08-24) —
   *  see that repo's lib/data/public-site.ts for the full note. */
  nextFixture: FirstTeamNextFixture | null;
  /** Mirrors PublicFirstTeam.fixtures — every scheduled fixture, soonest
   *  first, feeds the Fixtures tab in FirstTeamSection.tsx. */
  fixtures: FirstTeamNextFixture[];
  /** Added 2026-08-28, mirrors PublicFirstTeam.results — recently played
   *  matches with a final score, most recent first, capped at 10. Feeds the
   *  Results section of the same Fixtures tab. */
  results: FirstTeamNextFixture[];
}

const EMPTY_FIRST_TEAM: FirstTeam = {
  teamName: "Bright Football Club",
  shortName: "Bright Football Club",
  division: null,
  about: null,
  crestImageUrl: null,
  coverImageUrl: null,
  seasonLabel: null,
  players: [],
  staff: [],
  gallery: [],
  videos: [],
  standings: [],
  nextFixture: null,
  fixtures: [],
  results: [],
};

export async function getFirstTeam(lang: Lang): Promise<FirstTeam> {
  const data = await safeFetchJson<FirstTeam>(`${PUBLIC_API_BASE}/first-team?lang=${lang}`, FIRST_TEAM_REVALIDATE_SECONDS);
  return data ?? EMPTY_FIRST_TEAM;
}

// --- Live match (added 2026-08-27) -----------------------------------------
// Backs app/live/[id]/page.tsx — Patrick's ask for the platform's live
// match-day console (kickoff/goals/half-time/stoppage/full-time, entered by
// staff in the OS app) to actually show up here, on the public site itself,
// not just as a link he has to hand out separately. Mirrors
// bright-academy-os's own getPublicLiveMatch()/PublicLiveMatch shape
// exactly (see that repo's lib/data/public-site.ts) — this is a thin fetch
// wrapper, not a second implementation of the live-clock math.
export interface LiveLineupPlayer {
  displayName: string;
  jerseyNumber: number | null;
  position: string | null;
  isStarter: boolean;
  photoUrl: string | null;
  /** Added 2026-08-29 for the Fan Vote picker — mirrors bright-academy-os's
   *  PublicLiveLineupPlayer.playerId (see that repo's lib/data/
   *  public-site.ts). Null whenever displayName is anonymized, same
   *  namesShown gate. */
  playerId: string | null;
}

export interface LiveMatchEvent {
  eventType: string;
  minute: number | null;
  playerName: string | null;
  notes: string | null;
  /** Added 2026-08-29 — bright-academy-os's public API has returned this
   *  since 2026-08-28 (see that repo's match_events.is_opponent migration)
   *  but this site never picked it up, so an opponent's unattributed goal/
   *  card/injury rendered identically to one of our own here, same bug
   *  already fixed on the OS app's internal live pages. */
  isOpponent: boolean;
}

export interface LiveMatchVideo {
  id: string;
  title: string | null;
  caption: string | null;
  videoUrl: string;
}

/** Added 2026-08-29, mirrors bright-academy-os's PublicOpponentLineupPlayer
 *  (lib/data/public-site.ts) — free-text name + shirt number a coach/
 *  director/content manager typed in from the opponent's own paper match
 *  sheet (e.g. Diambars', which Patrick forwarded). No photo, no
 *  withheld-names handling like our own `lineup` above — an opposing
 *  academy's own squad list, not one of ours. */
export interface LiveMatchOpponentPlayer {
  fullName: string;
  jerseyNumber: number | null;
  isStarter: boolean;
}

/** Added 2026-08-29 — mirrors bright-academy-os's PublicMomentumBucket. See
 *  that repo's lib/data/public-site.ts for exactly what this is and isn't
 *  (an event-based approximation, not real shot/possession data). */
export interface LiveMatchMomentumBucket {
  bucketStart: number;
  us: number;
  opponent: number;
}

/** Added 2026-08-29 — mirrors bright-academy-os's PublicFanVoteTally. */
export interface LiveMatchFanVote {
  playerId: string;
  name: string;
  photoUrl: string | null;
  votes: number;
  pct: number;
}

export interface LiveMatch {
  found: boolean;
  teamName: string;
  opponentName: string;
  opponentLogoUrl: string | null;
  /** Added 2026-08-29 for the Sofascore-style header — mirrors
   *  bright-academy-os's PublicLiveMatch.ourCrestUrl. */
  ourCrestUrl: string | null;
  matchType: string | null;
  tournamentName: string | null;
  isHome: boolean;
  venue: string | null;
  matchDate: string;
  ourScore: number | null;
  opponentScore: number | null;
  status: string;
  livePhase: "first_half" | "half_time" | "second_half" | "full_time" | null;
  halfStartedAt: string | null;
  firstHalfStoppage: number;
  secondHalfStoppage: number;
  lineup: LiveLineupPlayer[];
  events: LiveMatchEvent[];
  playerOfMatch: { name: string; photoUrl: string | null } | null;
  fanVotes: LiveMatchFanVote[];
  totalFanVotes: number;
  momentum: LiveMatchMomentumBucket[];
  namesShown: boolean;
  /** Added 2026-08-29, Patrick's ask right after fixtures became clickable:
   *  "here the link to the youtube video of our first team last game" —
   *  any highlight clip(s) a photographer/director attached to this
   *  specific fixture (bright-academy-os's public_videos.match_id). */
  videos: LiveMatchVideo[];
  /** Added 2026-08-29 — see LiveMatchOpponentPlayer's note above. Empty
   *  until staff enter it for this fixture. */
  opponentLineup: LiveMatchOpponentPlayer[];
}

const LIVE_MATCH_REVALIDATE_SECONDS = 15;

export async function getLiveMatch(id: string): Promise<LiveMatch | null> {
  const data = await safeFetchJson<LiveMatch>(`${PUBLIC_API_BASE}/live-match/${encodeURIComponent(id)}`, LIVE_MATCH_REVALIDATE_SECONDS);
  return data && data.found ? data : null;
}
