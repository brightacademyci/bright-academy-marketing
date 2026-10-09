// Which pages the OS app may ask this site to refresh, and how the shared
// secret is compared. Pure, no Next imports, so it can be tested with the
// plain Node test runner (npm test).
//
// The route used to accept ANY string as a path. The caller is trusted (it
// holds the shared secret), but a leaked or misused secret should not be able
// to flush arbitrary or malformed paths, so only this site's real pages are
// accepted.
import { createHash, timingSafeEqual } from "node:crypto";

export const MAX_REVALIDATE_PATHS = 50;

/** Static pages of this site (see the app/ folder). */
const STATIC_PATHS = new Set([
  "/",
  "/careers",
  "/faq",
  "/first-team",
  "/founder",
  "/gallery",
  "/news",
  "/our-coaches",
  "/partners",
  "/trial",
  "/videos",
]);

/** Dynamic pages: a fixed prefix followed by exactly one safe segment. */
const DYNAMIC_PREFIXES = ["/careers/", "/first-team/players/", "/legal/", "/live/", "/news/"];
const SEGMENT = /^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/;

export function isRevalidatablePath(p: unknown): p is string {
  if (typeof p !== "string" || p.length === 0 || p.length > 200) return false;
  if (STATIC_PATHS.has(p)) return true;
  const prefix = DYNAMIC_PREFIXES.find((x) => p.startsWith(x));
  if (!prefix) return false;
  return SEGMENT.test(p.slice(prefix.length));
}

/**
 * Keeps the valid, de-duplicated paths (first MAX), and counts the rest.
 * No body or no `paths` array means "the home page", as before.
 */
export function selectPaths(requested: unknown): { accepted: string[]; rejected: number } {
  if (!Array.isArray(requested) || requested.length === 0) return { accepted: ["/"], rejected: 0 };
  const accepted: string[] = [];
  let rejected = 0;
  for (const p of requested) {
    if (isRevalidatablePath(p)) {
      if (!accepted.includes(p) && accepted.length < MAX_REVALIDATE_PATHS) accepted.push(p);
    } else {
      rejected += 1;
    }
  }
  return { accepted, rejected };
}

/** Constant-time comparison of two secrets of any length. */
export function secretsMatch(provided: string | null | undefined, expected: string): boolean {
  if (typeof provided !== "string" || expected.length === 0) return false;
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
