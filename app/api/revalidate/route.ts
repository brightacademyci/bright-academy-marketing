import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Added 2026-08-29 alongside the paths cap below — a generous ceiling for
// any real caller (a single publish action never touches more than a
// handful of routes) while ruling out a single call revalidating hundreds
// of paths at once.
const MAX_REVALIDATE_PATHS = 50;

/**
 * On-demand ISR revalidation, called by the OS app right after a Content
 * Manager publishes a photo to the gallery (lib/actions/gallery.ts's
 * publishPhotoToGallery(), best-effort, guarded by optional env vars) so a
 * newly-published photo shows up on the live site immediately rather than
 * waiting out Gallery's own 60s revalidate window (lib/api.ts). Bearer-token
 * protected — REVALIDATE_SECRET must match on both sides, same shared-secret
 * pattern the OS app's own cron routes use (CRON_SECRET).
 *
 * If REVALIDATE_SECRET isn't set here, this always no-ops with a clear
 * "not_configured" acknowledgment rather than either silently accepting
 * unauthenticated revalidation requests or 500ing — same graceful-
 * degradation contract every optional integration in this project follows.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: true, skipped: "not_configured" });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] = ["/"];
  try {
    const body = (await request.json()) as unknown;
    const requested = (body as { paths?: unknown } | null)?.paths;
    if (Array.isArray(requested) && requested.every((p) => typeof p === "string") && requested.length > 0) {
      // Capped 2026-08-29 — this route is bearer-token protected, but the
      // token is shared with the OS app's server, not scoped per-call, so
      // nothing previously stopped one authenticated call from requesting
      // an unbounded `paths` array and forcing excessive revalidation load.
      // Truncating (not rejecting outright) keeps a legitimate multi-path
      // call working while capping the blast radius of a misbehaving or
      // malicious one.
      paths = (requested as string[]).slice(0, MAX_REVALIDATE_PATHS);
    }
  } catch {
    // No body, or not JSON — fall back to revalidating "/" (the gallery's
    // home).
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
