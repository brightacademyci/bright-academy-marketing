"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import type { PublicJobOpening } from "@/lib/api";

/**
 * Master CTO Instruction, Recruitment/Careers Production Launch, Phase 3:
 * the public listing at /careers must show only published, non-expired
 * openings, each linking to its own /careers/[slug] detail+apply page.
 * The list itself is already filtered server-side by
 * bright-academy-os's GET /api/public/openings (published status AND
 * application_deadline >= today) -- this component only ever renders
 * what that endpoint returns, it never re-filters or second-guesses it.
 *
 * Fetched server-side in app/careers/page.tsx and passed down as a plain
 * prop so this stays a simple client component picking the right
 * language fields, same split as NewsPostSection/NewsListSection.
 */
export function OpeningsList({ openings }: { openings: PublicJobOpening[] }) {
  const { lang, t } = useLanguage();
  const dict = t.careers.openings;

  return (
    <div>
      <h2 className="font-display text-[15px] font-semibold text-white">{dict.title}</h2>

      {openings.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-[13px] text-white/75">{dict.none}</p>
          <p className="mt-1.5 text-[12.5px] text-white/50">{dict.noneHint}</p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {openings.map((opening) => {
            const title = lang === "fr" ? opening.titleFr : opening.titleEn;
            const meta = [
              opening.siteName,
              opening.employmentType ? dict.employmentTypeLabels[opening.employmentType as keyof typeof dict.employmentTypeLabels] : null,
              opening.ageGroup,
            ].filter(Boolean);
            return (
              <li key={opening.id}>
                <Link
                  href={`/careers/${opening.slug}`}
                  className="flex flex-col gap-1 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08] hover:ring-orange/40"
                >
                  <span className="font-display text-[14.5px] font-semibold text-white">{title}</span>
                  {meta.length > 0 && <span className="text-[12.5px] text-white/60">{meta.join(" · ")}</span>}
                  <span className="mt-1 text-[12.5px] font-medium text-orange">{dict.viewOpening} →</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
