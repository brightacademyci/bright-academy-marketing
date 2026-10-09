import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { secretsMatch, selectPaths } from "@/lib/revalidate-paths";


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

  // Constant-time comparison, so response time says nothing about the secret.
  const authHeader = request.headers.get("authorization") ?? "";
  const provided = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!secretsMatch(provided, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requested: unknown;
  try {
    requested = ((await request.json()) as { paths?: unknown } | null)?.paths;
  } catch {
    // No body, or not JSON: refresh the home page, as before.
  }

  // Only this site's real pages, de-duplicated and capped (see lib/revalidate-paths.ts).
  const { accepted, rejected } = selectPaths(requested);
  if (accepted.length === 0) {
    return NextResponse.json({ error: "No valid path to revalidate" }, { status: 400 });
  }

  for (const path of accepted) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: accepted, ignored: rejected });
}
