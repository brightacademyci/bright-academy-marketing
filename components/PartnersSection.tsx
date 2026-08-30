"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { BrandDiagram } from "./BrandDiagram";
import { WHATSAPP_LINK, PARTNERSHIP_EMAIL } from "@/lib/content";

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const TIER_BADGE_STYLES: Record<string, string> = {
  founding: "bg-orange/15 text-orange ring-1 ring-orange/30",
  official: "bg-white/10 text-white/80 ring-1 ring-white/15",
  community: "bg-white/5 text-white/60 ring-1 ring-white/10",
};

/** Corporate-partnership / sponsorship page — added 2026-08-30, adapted
 *  from the club's "Dossier de Partenariat Corporate 2026-2027" (Patrick
 *  sent the .docx and asked whether it belonged on the site). See this
 *  page's own dict block in lib/content.ts for the full provenance note
 *  and Patrick's explicit calls on pricing/contact. */
export function PartnersSection() {
  const { t } = useLanguage();
  const p = t.partners;
  const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(p.whatsappPrefill)}`;
  const mailtoHref = `mailto:${PARTNERSHIP_EMAIL}?subject=${encodeURIComponent(p.title)}`;

  return (
    <>
      {/* Hero + stats */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.eyebrow}</span>
            <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{p.title}</h1>
            <p className="mt-3 text-[15px] font-semibold text-orange">{p.subtitle}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={mailtoHref}
                className="rounded-full bg-orange px-7 py-3 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
              >
                {p.ctaPrimary}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-orange/30 px-7 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10"
              >
                {p.ctaWhatsapp}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-12 text-[12px] font-semibold uppercase tracking-wide text-white/50">{p.statsTitle}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {p.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="font-display text-lg font-bold text-orange sm:text-xl">{s.value}</p>
                  <p className="mt-1 text-[12px] text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Attinguié project */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-white">{p.projectTitle}</h2>
            <div className="mt-4 space-y-4">
              {p.projectBody.map((para, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-white/75">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h3 className="font-display text-[15px] font-semibold text-white">{p.dailyLifeTitle}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {p.dailyLife.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h3 className="font-display text-[15px] font-semibold text-white">{p.supportTitle}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {p.support.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-6 max-w-2xl">
            <p className="text-[13px] leading-relaxed text-white/60">{p.investmentNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Why now */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl rounded-2xl bg-orange/10 p-6 ring-1 ring-orange/25 sm:p-8">
            <h2 className="font-display text-xl font-bold text-white md:text-2xl">{p.whyNowTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/80">{p.whyNowBody}</p>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-white">{p.whatYouGetTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 60}>
                <div className="h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <h3 className="font-display text-[13px] font-bold uppercase tracking-wide text-orange">{cat.title}</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital audience */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-white">{p.audienceTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.audienceIntro}</p>
          </Reveal>

          <Reveal delay={100} className="mt-6 overflow-x-auto rounded-2xl bg-white/5 ring-1 ring-white/10">
            <table className="w-full min-w-[480px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="px-4 py-3 font-semibold">{p.audienceHeaders.account}</th>
                  <th className="px-4 py-3 font-semibold">{p.audienceHeaders.platform}</th>
                  <th className="px-4 py-3 text-right font-semibold">{p.audienceHeaders.audience}</th>
                </tr>
              </thead>
              <tbody>
                {p.audienceRows.map((row) => (
                  <tr key={`${row.account}-${row.platform}`} className="border-b border-white/5 text-white/85 last:border-none">
                    <td className="px-4 py-2.5">{row.account}</td>
                    <td className="px-4 py-2.5 text-white/60">{row.platform}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">{row.audience}</td>
                  </tr>
                ))}
                <tr className="bg-orange/10 font-semibold text-orange">
                  <td className="px-4 py-3" colSpan={2}>
                    {p.audienceTotal}
                  </td>
                  <td className="px-4 py-3 text-right">{p.audienceGrandTotal}</td>
                </tr>
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={150} className="mt-4 max-w-2xl">
            <p className="text-[13px] italic leading-relaxed text-white/60">{p.audienceNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Partnership tiers */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-white">{p.tiersTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.tiersIntro}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 50}>
                <div className="flex h-full flex-col rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      TIER_BADGE_STYLES[tier.tierKey] ?? TIER_BADGE_STYLES.community
                    }`}
                  >
                    {tier.circle}
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-semibold text-white">{tier.name}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/70">{tier.benefits}</p>
                  <p className="mt-3 text-[12px] font-semibold text-orange">{p.tiersAmountNote}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-6 max-w-2xl">
            <p className="text-[12px] leading-relaxed text-white/50">{p.tiersLegalNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Transparency + community impact */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content grid gap-10 px-5 md:grid-cols-2 md:gap-14">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-white md:text-2xl">{p.transparencyTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {p.transparencyItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-orange/10 p-4 text-[13px] font-semibold text-orange ring-1 ring-orange/25">{p.transparencyHighlight}</p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-xl font-bold text-white md:text-2xl">{p.communityTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {p.communityItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" />
        <Reveal className="relative mx-auto flex max-w-content flex-col items-center px-5 text-center">
          <h2 className="max-w-xl font-display text-2xl font-bold md:text-3xl">{p.ctaTitle}</h2>
          <p className="mt-3 max-w-lg text-[14px] text-white/75">{p.ctaSubtitle}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={mailtoHref}
              className="rounded-full bg-orange px-8 py-3.5 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
            >
              {p.ctaPrimary}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-orange/30 px-8 py-3.5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10"
            >
              {p.ctaWhatsapp}
            </a>
          </div>
          <div className="mt-6 text-[13px] text-white/60">
            <p className="font-semibold text-white/80">{p.contactName}</p>
            <p>{p.contactOrg}</p>
            <p className="mt-1">
              {p.emailLabel}: <a href={mailtoHref} className="text-orange hover:underline">{PARTNERSHIP_EMAIL}</a>
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
