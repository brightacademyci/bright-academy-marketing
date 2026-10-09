"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { InKindForm, MeetingForm, ReferralForm } from "./ChezNousForms";
import {
  CHEZ_NOUS_EMAIL,
  CHEZ_NOUS_PHONE_DISPLAY,
  CHEZ_NOUS_PHONE_TEL,
  OFFERS,
  copy,
  formatXof,
} from "@/lib/chez-nous";

const EYEBROW = "text-[12px] font-semibold uppercase tracking-[0.18em] text-orange";
const H2 = "mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-4xl";
const CARD = "rounded-2xl bg-white/5 p-6 ring-1 ring-white/10";

const STAGE_STYLE: Record<string, string> = {
  done: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/30",
  next: "bg-orange/15 text-orange ring-orange/40",
  later: "bg-white/10 text-white/70 ring-white/20",
};

/** The page: hero, project, companies (offers + forms), community. Everything
 *  shown is either sourced from the campaign document or an explicit empty
 *  state; there are no counters, donors or testimonials. */
export function ChezNousPage() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [selectedOffer, setSelectedOffer] = useState<string | undefined>(undefined);

  function chooseOffer(id: string) {
    setSelectedOffer(id);
    // Let React remount the form with the offer ticked, then scroll to it.
    requestAnimationFrame(() => document.getElementById("rendez-vous")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      {/* Hero — a real photograph of the Attinguié site, supplied by the club. */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Image
          src="/images/chez-nous/hero-attinguie.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/25 to-navy-deep" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-5 pb-16 pt-20 md:pb-24 md:pt-32">
          <p className={EYEBROW}>{c.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
            {c.hero.title}
            <span className="text-orange">.</span>
          </h1>
          <p className="mt-5 max-w-xl font-serif text-[17px] text-white/85">{c.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#entreprises"
              className="rounded-full bg-orange px-7 py-3 text-[14px] font-semibold text-navy-deep transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:transition-none hover:bg-orange/90"
            >
              {c.hero.ctaCompanies}
            </a>
            <a
              href="#communaute"
              className="rounded-full border border-white/30 px-7 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:transition-none hover:bg-white/10"
            >
              {c.hero.ctaCommunity}
            </a>
          </div>
        </div>
      </section>

      {/* The project */}
      <section id="projet" className="bg-navy-deep py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-content gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <p className={EYEBROW}>{c.project.eyebrow}</p>
            <h2 className={H2}>{c.project.title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">{c.project.intro}</p>
            <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-white/85">
              <li>{c.project.sport.achieved}</li>
              <li>{c.project.sport.goal}</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={CARD}>
              <h3 className="font-display text-lg font-bold text-white">{c.project.siteTitle}</h3>
              <p className="mt-1 text-[13px] text-white/65">{c.project.siteFacts}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {c.project.stages.map((s) => (
                  <div key={s.status}>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${STAGE_STYLE[s.status]}`}
                    >
                      {s.label}
                    </span>
                    <ul className="mt-3 space-y-1.5 text-[13px] text-white/80">
                      {s.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-4 text-[13px] leading-relaxed text-white/85">{c.project.money}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-white/55">{c.project.moneyNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Companies */}
      <section id="entreprises" className="bg-[#F5F2EC] py-16 text-navy-deep md:py-20">
        <div className="mx-auto max-w-content px-5">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-orange-text">{c.companies.eyebrow}</p>
            <h2 className={H2}>{c.companies.title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-deep/75">{c.companies.intro}</p>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((o) => (
              <li key={o.id} className="flex flex-col overflow-hidden rounded-2xl bg-navy-deep text-white">
                <div className="relative aspect-[720/673] w-full">
                  <Image
                    src={o.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className={EYEBROW}>{o.name[lang]}</p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight">{o.headline[lang]}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/75">{o.idea[lang]}</p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">{c.companies.from}</p>
                    <p className="font-display text-3xl font-bold tabular-nums text-orange">{formatXof(o.amountXof, lang)}</p>
                    <p className="text-[12px] text-white/70">
                      {c.companies.currency} {o.id === "technique" ? "" : `${c.companies.ht} · `}
                      {o.unit[lang]}
                    </p>
                  </div>
                  <p className="mt-4 text-[12px] leading-relaxed text-white/60">
                    <span className="font-semibold text-white/75">{c.companies.perksLabel} : </span>
                    {o.perks[lang]}
                  </p>
                  <button
                    type="button"
                    onClick={() => chooseOffer(o.id)}
                    className="mt-5 self-start rounded-full bg-orange px-5 py-2.5 text-[13px] font-semibold text-navy-deep transition hover:bg-orange/90"
                  >
                    {c.companies.cta}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-3xl space-y-2 text-[12px] leading-relaxed text-navy-deep/70">
            <p className="font-semibold">{c.companies.mandatory}</p>
            <p>{c.companies.kit}</p>
            <p>{c.companies.notPartner}</p>
          </div>
        </div>
      </section>

      {/* Meeting + in-kind forms */}
      <section className="bg-navy-deep py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-content gap-8 px-5 lg:grid-cols-2">
          <div id="rendez-vous" className={CARD}>
            <h2 className="font-display text-xl font-bold uppercase">{c.meeting.title}</h2>
            <p className="mb-5 mt-2 text-[13px] text-white/70">{c.meeting.lead}</p>
            <MeetingForm preselected={selectedOffer} />
          </div>
          <div id="en-nature" className={CARD}>
            <h2 className="font-display text-xl font-bold uppercase">{c.inKind.title}</h2>
            <p className="mb-5 mt-2 text-[13px] text-white/70">{c.inKind.lead}</p>
            <InKindForm />
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="communaute" className="bg-navy-deep py-16 text-white md:py-20">
        <div className="mx-auto max-w-content px-5">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <p className={EYEBROW}>{c.community.eyebrow}</p>
              <h2 className={H2}>
                {c.community.title}
                <span className="text-orange">.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">{c.community.intro}</p>
            </Reveal>
            <div className="relative aspect-[1080/760] overflow-hidden rounded-2xl">
              <Image
                src="/images/chez-nous/community-sans-maillot.jpg"
                alt=""
                fill
                sizes="(min-width:768px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.community.gestures.map((g) => (
              <li key={g.title} className={CARD}>
                <h3 className="font-display text-[15px] font-bold text-white">{g.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{g.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className={CARD}>
              <h2 className="font-display text-xl font-bold uppercase">{c.referral.title}</h2>
              <p className="mb-5 mt-2 text-[13px] text-white/70">{c.referral.lead}</p>
              <ReferralForm />
            </div>
            <div className="flex flex-col gap-8">
              <div className={CARD}>
                <h2 className="font-display text-xl font-bold uppercase">{c.actions.title}</h2>
                <p className="mt-3 text-[13px] leading-relaxed text-white/70">{c.actions.empty}</p>
              </div>
              <div className={CARD}>
                <h2 className="font-display text-xl font-bold uppercase">{c.contribute.title}</h2>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="mt-3 cursor-not-allowed rounded-full bg-white/10 px-6 py-3 text-[13px] font-semibold text-white/50"
                >
                  {c.contribute.button}
                </button>
                <p className="mt-3 text-[12px] leading-relaxed text-white/60">{c.contribute.body}</p>
              </div>
              <div className={CARD}>
                <h2 className="font-display text-xl font-bold uppercase">{c.transparency.title}</h2>
                <p className="mt-3 text-[13px] leading-relaxed text-white/70">{c.transparency.body}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 text-[14px] text-white/75">
            <h2 className="font-display text-lg font-bold uppercase text-white">{c.contact.title}</h2>
            <p className="mt-2">{c.contact.body}</p>
            <p className="mt-2">
              <a className="font-semibold text-orange underline underline-offset-2" href={`tel:${CHEZ_NOUS_PHONE_TEL}`}>
                {CHEZ_NOUS_PHONE_DISPLAY}
              </a>{" "}
              ·{" "}
              <a className="font-semibold text-orange underline underline-offset-2" href={`mailto:${CHEZ_NOUS_EMAIL}`}>
                {CHEZ_NOUS_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
