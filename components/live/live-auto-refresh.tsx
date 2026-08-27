"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Mirror of bright-academy-os's components/live/live-auto-refresh.tsx.
 * Polls app/live/[id]/page.tsx by re-running its server component on an
 * interval — the simplest correct way to keep this public page's
 * clock/score/event feed moving for anonymous visitors without a
 * websocket/Realtime channel. Rendered only while the match is actually
 * live (see that page's own `clock.isLive` check).
 */
export function LiveAutoRefresh({ intervalMs }: { intervalMs: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);
  return null;
}
