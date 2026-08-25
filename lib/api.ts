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
  standings: FirstTeamStanding[];
  /** Mirrors PublicFirstTeam.nextFixture in bright-academy-os (2026-08-24) —
   *  see that repo's lib/data/public-site.ts for the full note. */
  nextFixture: FirstTeamNextFixture | null;
  /** Mirrors PublicFirstTeam.fixtures — every scheduled fixture, soonest
   *  first, feeds the Fixtures tab in FirstTeamSection.tsx. */
  fixtures: FirstTeamNextFixture[];
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
  standings: [],
  nextFixture: null,
  fixtures: [],
};

export async function getFirstTeam(lang: Lang): Promise<FirstTeam> {
  const data = await safeFetchJson<FirstTeam>(`${PUBLIC_API_BASE}/first-team?lang=${lang}`, FIRST_TEAM_REVALIDATE_SECONDS);
  return data ?? EMPTY_FIRST_TEAM;
}
