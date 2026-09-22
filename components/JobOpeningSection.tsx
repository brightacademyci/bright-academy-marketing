"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { CareersForm } from "./CareersForm";
import type { PublicJobOpeningDetail } from "@/lib/api";

function formatDate(iso: string, lang: "en" | "fr") {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

/**
 * Single opening detail + apply page (/careers/[slug]). Fetched
 * server-side in app/careers/[slug]/page.tsx from bright-academy-os's
 * GET /api/public/openings/[slug] -- that endpoint already returns null
 * for anything not published/not-yet-expired (closed, archived, draft,
 * or past its deadline), so `opening === null` here covers all of those
 * cases the same way, plus a slug that never existed. Renders a friendly
 * not-found state inside the normal site chrome rather than a hard 404,
 * same convention as NewsPostSection's missing-post case.
 */
export function JobOpeningSection({ opening }: { opening: PublicJobOpeningDetail | null }) {
  const { lang, t } = useLanguage();
  const dict = t.careers.openings;

  const view = useMemo(() => {
    if (!opening) return null;
    return {
      title: lang === "fr" ? opening.titleFr : opening.titleEn,
      description: lang === "fr" ? opening.descriptionFr : opening.descriptionEn,
      responsibilities: lang === "fr" ? opening.responsibilitiesFr : opening.responsibilitiesEn,
      requiredQualifications: lang === "fr" ? opening.requiredQualificationsFr : opening.requiredQualificationsEn,
      preferredQualifications: lang === "fr" ? opening.preferredQualificationsFr : opening.preferredQualificationsEn,
      requiredExperience: lang === "fr" ? opening.requiredExperienceFr : opening.requiredExperienceEn,
      coachingDetails: (lang === "fr" ? opening.coachingDetails?.fr : opening.coachingDetails?.en) ?? {},
    };
  }, [opening, lang]);

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal>
          <Link href="/careers" className="text-[13px] font-medium text-white/70 hover:text-orange">
            {dict.backToOpenings}
          </Link>
        </Reveal>

        {!opening || !view ? (
          <Reveal className="mt-8 max-w-2xl" delay={80}>
            <h1 className="font-display text-xl font-bold text-white md:text-2xl">{dict.notFoundTitle}</h1>
            <p className="mt-3 text-[14px] text-white/70">{dict.notFoundBody}</p>
          </Reveal>
        ) : (
          <Reveal className="mt-6 max-w-3xl" delay={80}>
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">{view.title}</h1>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:grid-cols-3">
              {opening.siteName && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.siteLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">{opening.siteName}</dd>
                </div>
              )}
              {opening.employmentType && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.employmentTypeLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">
                    {dict.employmentTypeLabels[opening.employmentType as keyof typeof dict.employmentTypeLabels] ?? opening.employmentType}
                  </dd>
                </div>
              )}
              {opening.ageGroup && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.ageGroupLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">{opening.ageGroup}</dd>
                </div>
              )}
              {opening.footballFormat && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.footballFormatLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">{opening.footballFormat}</dd>
                </div>
              )}
              {opening.coachingLevel && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.coachingLevelLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">{opening.coachingLevel}</dd>
                </div>
              )}
              {opening.applicationDeadline && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-white/45">{dict.deadlineLabel}</dt>
                  <dd className="mt-0.5 text-[13px] text-white/85">{formatDate(opening.applicationDeadline, lang)}</dd>
                </div>
              )}
            </dl>

            {view.description && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.descriptionTitle}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/80">
                  {view.description.split("\n").map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                </div>
              </div>
            )}

            {view.responsibilities && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.responsibilitiesTitle}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/80">
                  {view.responsibilities.split("\n").map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                </div>
              </div>
            )}

            {view.requiredQualifications && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.requiredQualificationsTitle}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/80">
                  {view.requiredQualifications.split("\n").map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                </div>
              </div>
            )}

            {view.preferredQualifications && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.preferredQualificationsTitle}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/80">
                  {view.preferredQualifications.split("\n").map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                </div>
              </div>
            )}

            {view.requiredExperience && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.requiredExperienceTitle}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/80">
                  {view.requiredExperience.split("\n").map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                </div>
              </div>
            )}

            {Object.keys(view.coachingDetails).length > 0 && (
              <div className="mt-8 space-y-4">
                {Object.entries(view.coachingDetails).map(([key, value]) =>
                  value ? (
                    <div key={key}>
                      <h2 className="font-display text-[15px] font-semibold text-white capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h2>
                      <p className="mt-2 text-[14px] leading-relaxed text-white/80">{value}</p>
                    </div>
                  ) : null
                )}
              </div>
            )}

            {opening.requiredSkills.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.skillsTitle}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {opening.requiredSkills.map((skill) => (
                    <li key={skill} className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/85">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {opening.languages.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-[15px] font-semibold text-white">{dict.languagesTitle}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {opening.languages.map((l) => (
                    <li key={l} className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/85">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div id="apply" className="mt-10 scroll-mt-8">
              <h2 className="font-display text-[15px] font-semibold text-white">{dict.applyTitle}</h2>
              <div className="mt-4">
                <CareersForm jobPositionId={opening.id} presetPositionTitle={view.title} />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
