"use client";

import type { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { PitchDiagram } from "./PitchDiagram";
import { BrandDiagram } from "./BrandDiagram";
import { JerseyPlacements } from "./JerseyPlacements";
import { WHATSAPP_LINK, PARTNERSHIP_EMAIL, PARTNERSHIP_DOSSIER_URL } from "@/lib/content";

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Band({ diagram, children }: { diagram: "pitch" | "brand"; children: ReactNode }) {
  const Bg = diagram === "pitch" ? PitchDiagram : BrandDiagram;
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <Bg className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <div className="relative mx-auto max-w-content px-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/80">
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}

const CARD = "rounded-2xl bg-white/5 p-5 ring-1 ring-white/10";
const H2 = "font-display text-2xl font-bold text-white";
const EYEBROW = "text-[12px] font-semibold uppercase tracking-wide text-orange";

/** Corporate-partnership page — rewritten Oct 2026 from the club's
 *  "Dossier de Partenariat 2026-2027". Web version: benefits and
 *  placements are shown, FCFA amounts are not ("on request"), and
 *  kit-supplier rights are explicitly NOT offered (reserved to the Tielo
 *  Sport SAS / PUMA supply agreement). See the partners dict in
 *  lib/content.ts. */
export function PartnersSection() {
  const { t } = useLanguage();
  const p = t.partners;
  const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(p.whatsappPrefill)}`;
  const mailtoHref = `mailto:${PARTNERSHIP_EMAIL}?subject=${encodeURIComponent(p.title)}`;
  const ghostBtn =
    "rounded-full border border-orange/30 px-7 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange/10";

  return (
    <>
      {/* Hero + stats */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
        <PitchDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="relative mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <span className={EYEBROW}>{p.eyebrow}</span>
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
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                {p.ctaWhatsapp}
              </a>
              <a href={PARTNERSHIP_DOSSIER_URL} download className={ghostBtn}>
                {p.ctaDossier}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-12 text-[12px] font-semibold uppercase tracking-wide text-white/50">{p.statsTitle}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {p.stats.map((s) => (
                <div key={s.label} className={`${CARD} p-4`}>
                  <p className="font-display text-lg font-bold text-orange sm:text-xl">{s.value}</p>
                  <p className="mt-1 text-[12px] text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-white/50">{p.statsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Sporting performance */}
      <Band diagram="brand">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.sportTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.sportIntro}</p>
        </Reveal>
        <Reveal delay={80} className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {p.sportRecord.map((r) => (
            <div key={r.label} className={CARD}>
              <p className="font-display text-2xl font-bold text-white">{r.value}</p>
              <p className="mt-1 text-[12px] uppercase tracking-wide text-white/60">{r.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{p.timelineTitle}</h3>
          <ol className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {p.timeline.map((step, i) => (
              <li key={`${step.when}-${step.title}`} className={CARD}>
                <p className={`text-[12px] font-semibold uppercase tracking-wide ${i >= 3 ? "text-orange" : "text-white/60"}`}>{step.when}</p>
                <p className="mt-1 font-display text-[15px] font-semibold text-white">{step.title}</p>
                <p className="mt-1 text-[13px] text-white/70">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[12px] text-white/50">{p.timelineNote}</p>
        </Reveal>

        <Reveal delay={160} className="mt-10 max-w-2xl rounded-2xl bg-orange/10 p-6 ring-1 ring-orange/25 sm:p-8">
          <span className={EYEBROW}>{p.objectiveEyebrow}</span>
          <h3 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">{p.objectiveTitle}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-white/80">{p.objectiveBody}</p>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-white/60">{p.objectivePillars}</p>
        </Reveal>
      </Band>

      {/* Partnership platform */}
      <Band diagram="pitch">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.platformTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.platformIntro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.dimensions.map((d, i) => (
            <Reveal key={d.n} delay={i * 50}>
              <div className={`${CARD} h-full`}>
                <p className="text-[12px] font-bold text-orange">{d.n}</p>
                <h3 className="mt-1 font-display text-[15px] font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-4 rounded-2xl bg-orange px-5 py-4 text-navy-deep">
          <p className="text-[13px] font-bold uppercase tracking-wide">{p.measureTitle}</p>
          <p className="mt-0.5 text-[13px] font-medium">{p.measureBody}</p>
        </Reveal>

        <Reveal delay={240} className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.activateTitle}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.activateItems.map((item) => (
                <span key={item} className="rounded-lg bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/90">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={CARD}>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-white/60">{p.exampleTitle}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/85">{p.exampleBody}</p>
          </div>
        </Reveal>
      </Band>

      {/* Jersey */}
      <Band diagram="brand">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.kitTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.kitIntro}</p>
        </Reveal>

        <Reveal delay={80} className="mt-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-6">
            <JerseyPlacements labels={p.placementLabels} className="h-auto w-full" />
          </div>
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.placementsTitle}</h3>
            <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {p.placements.map((pl) => (
                <li key={pl.n} className="flex items-center gap-3 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange text-[12px] font-bold text-navy-deep">
                    {pl.n}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-semibold text-white">{pl.label}</span>
                    <span className="block text-[12px] text-white/60">{pl.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] leading-relaxed text-white/50">{p.placementsNote}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.thenTitle}</h3>
          <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {p.then.map((x) => (
              <div key={x.title} className={CARD}>
                <h4 className="font-display text-[15px] font-semibold text-white">{x.title}</h4>
                <p className="mt-1.5 text-[13px] text-white/70">{x.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] font-semibold text-white/85">{p.tailoredNote}</p>
        </Reveal>
      </Band>

      {/* Offers */}
      <Band diagram="pitch">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.offersTitle}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">{p.offersIntro}</p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-10">
          {p.offerGroups.map((g, gi) => (
            <Reveal key={g.n} delay={gi * 60}>
              <h3 className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-wide text-white/70">
                <span className="text-orange">{g.n}</span>
                {g.title}
                <span className="h-px flex-1 bg-white/10" />
              </h3>
              <div className={`mt-4 grid gap-4 ${g.items.length === 2 ? "sm:grid-cols-2" : g.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
                {g.items.map((item) => (
                  <div key={item.name} className={`${CARD} flex h-full flex-col`}>
                    <span className="inline-flex w-fit items-center rounded-full bg-orange/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange ring-1 ring-orange/30">
                      {item.tag}
                    </span>
                    <h4 className="mt-3 font-display text-[15px] font-semibold text-white">{item.name}</h4>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/70">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-6 max-w-2xl">
          <p className="text-[12px] leading-relaxed text-white/50">{p.offersLegalNote}</p>
        </Reveal>
      </Band>

      {/* Use of contribution + founding partner */}
      <Band diagram="brand">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.useTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {p.useColumns.map((c, i) => (
            <Reveal key={c.n} delay={i * 60}>
              <div className={`${CARD} h-full`}>
                <h3 className="font-display text-[15px] font-semibold text-white">
                  <span className="mr-2 text-[12px] font-bold text-orange">{c.n}</span>
                  {c.title}
                </h3>
                <Bullets items={c.items} />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-6 max-w-2xl">
          <p className="text-[13px] font-semibold text-orange">{p.useFlow.join("  →  ")}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/75">{p.useBody}</p>
        </Reveal>

        <Reveal delay={240} className="mt-10 max-w-3xl rounded-2xl bg-orange/10 p-6 ring-1 ring-orange/25 sm:p-8">
          <span className={EYEBROW}>{p.founderEyebrow}</span>
          <h3 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">{p.founderTitle}</h3>
          <p className="mt-2 text-[14px] font-semibold text-orange">{p.founderIntro}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/80">{p.founderBody}</p>
          <p className="mt-3 text-[12px] text-white/55">{p.founderNote}</p>
        </Reveal>
      </Band>

      {/* Attinguié project */}
      <Band diagram="pitch">
        <Reveal className="max-w-2xl">
          <span className={EYEBROW}>{p.projectEyebrow}</span>
          <p className="mt-2 text-[15px] text-white/70">{p.projectLead}</p>
          <h2 className={`${H2} mt-1`}>{p.projectTitle}</h2>
          <div className="mt-4 space-y-4">
            {p.projectBody.map((para, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-white/75">
                {para}
              </p>
            ))}
          </div>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-orange">{p.projectChain}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-white/85">
            <span className="font-semibold text-white">{p.projectQuote}</span> {p.projectQuoteBody}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {p.projectFacts.map((f) => (
            <div key={f.label} className={CARD}>
              <p className="font-display text-xl font-bold text-orange">{f.value}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/65">{f.label}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-3 text-[12px] text-white/50">{p.projectFactsNote}</p>

        <Reveal delay={140} className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className={CARD}>
            <h3 className="font-display text-[15px] font-semibold text-white">{p.doneTitle}</h3>
            <Bullets items={p.done} />
          </div>
          <div className={CARD}>
            <h3 className="font-display text-[15px] font-semibold text-white">{p.nextTitle}</h3>
            <Bullets items={p.next} />
          </div>
          <div className={CARD}>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.financialTitle}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/75">{p.financialBody}</p>
          </div>
          <div className={CARD}>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.inKindTitle}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/75">{p.inKindBody}</p>
          </div>
        </Reveal>
      </Band>

      {/* Digital audience */}
      <Band diagram="brand">
        <Reveal className="max-w-2xl">
          <h2 className={H2}>{p.audienceTitle}</h2>
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

        <Reveal delay={190} className="mt-8">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-white/50">{p.communityTitle}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.communityTags.map((tag) => (
              <span key={tag} className="rounded-lg bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/85 ring-1 ring-white/15">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-white/65">{p.detectionNote}</p>
        </Reveal>
      </Band>

      {/* Why Bright + already with us */}
      <Band diagram="pitch">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <Reveal>
            <h2 className={H2}>{p.whyTitle}</h2>
            <p className="mt-2 text-[14px] font-semibold text-orange">{p.whySubtitle}</p>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {p.whyItems.map((w, i) => (
                <li key={w.title} className="flex gap-4 py-3.5">
                  <span className="pt-0.5 text-[12px] font-bold text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[14px] font-semibold text-white">{w.title}</span>
                    <span className="mt-0.5 block text-[13px] text-white/65">{w.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{p.alreadyTitle}</h3>
            <div className={`${CARD} mt-3`}>
              <p className="font-display text-lg font-semibold text-white">{p.alreadyName}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">{p.alreadyBody}</p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* Process + CTA */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <BrandDiagram className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]" />
        <Reveal className="relative mx-auto flex max-w-content flex-col items-center px-5 text-center">
          <p className="max-w-xl font-display text-[15px] font-bold uppercase leading-relaxed tracking-wide text-white/90 md:text-base">
            {p.closing.map((line, i) => (
              <span key={line} className={`block ${i === p.closing.length - 1 ? "text-orange" : ""}`}>
                {line}
              </span>
            ))}
          </p>
          <h2 className="mt-10 max-w-xl font-display text-2xl font-bold md:text-3xl">{p.ctaTitle}</h2>
          <p className="mt-3 max-w-lg text-[14px] text-white/75">{p.ctaSubtitle}</p>

          <ol className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-wide text-white/65">
            <li className="sr-only">{p.processTitle}</li>
            {p.process.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span>
                  <span className="mr-1.5 text-orange">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </span>
                {i < p.process.length - 1 && <span aria-hidden className="text-white/30">→</span>}
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={mailtoHref}
              className="rounded-full bg-orange px-8 py-3.5 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-lg"
            >
              {p.ctaPrimary}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={ghostBtn.replace("px-7 py-3", "px-8 py-3.5")}>
              {p.ctaWhatsapp}
            </a>
            <a href={PARTNERSHIP_DOSSIER_URL} download className={ghostBtn.replace("px-7 py-3", "px-8 py-3.5")}>
              {p.ctaDossier}
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
