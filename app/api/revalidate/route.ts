import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
      paths = requested as string[];
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
