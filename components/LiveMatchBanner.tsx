"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import type { FirstTeamNextFixture } from "@/lib/api";

// Homepage live-match banner — added 2026-08-27, direct answer to Patrick's
// "we can see that there is a game today... I should be allowed to click on
// it and then see... everything". Sits right below the Header, above the
// Hero, so a live match is the very first thing a visitor sees — not
// something buried on the First Team page. Renders nothing at all when
// there's no live fixture, so it costs nothing on an ordinary day.
export function LiveMatchBanner({ fixture }: { fixture: FirstTeamNextFixture | null }) {
  const { t } = useLanguage();

  if (!fixture || !fixture.isLive) return null;

  return (
    <Link
      href={`/live/${fixture.id}`}
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 bg-orange px-4 py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-orange/90"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold tracking-wide">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        {t.liveBanner.badge}
      </span>
      <span>
        {t.liveBanner.heading}
        {" — "}
        {fixture.opponentShortName}
      </span>
      <span className="underline underline-offset-2">{t.liveBanner.cta} →</span>
    </Link>
  );
}
