"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { usePartnerDetail } from "./PartnerDetailProvider";
import { PARTNERSHIP_EMAIL, WHATSAPP_LINK, content } from "@/lib/content";
import { PROGRAM_PRICING } from "@/lib/pricing";
import { SITE_SCHEDULES } from "@/lib/schedule";
import { buildDetail, detailUi, type Fact, type Section, type Status } from "@/lib/partners-detail";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const STATUS_STYLE: Record<Status, string> = {
  np: "bg-white/10 text-white/70 ring-white/15",
  tbc: "bg-orange/15 text-orange ring-orange/30",
  por: "bg-orange/15 text-orange ring-orange/30",
};

function StatusBadge({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ${STATUS_STYLE[status]}`}>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-[12px] font-semibold uppercase tracking-wide text-orange">{children}</h3>;
}

function FactRow({ row, statusLabel }: { row: Fact; statusLabel: Record<Status, string> }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="text-[12px] font-semibold uppercase tracking-wide text-white/55">{row.label}</dt>
      <dd className="text-[14px] text-white/90 sm:text-right">
        {row.status ? <StatusBadge status={row.status}>{statusLabel[row.status]}</StatusBadge> : row.value}
      </dd>
    </div>
  );
}

/**
 * Accessible modal for every clickable element on /partners. Centered dialog
 * from `sm` up, bottom sheet below. Pattern follows components/Lightbox.tsx
 * (role=dialog, aria-modal, focus moved in and restored to the opener, Tab
 * trap, Escape, scroll lock) plus a labelled title/description.
 */
export function PartnerDetailDialog() {
  const { openId } = usePartnerDetail();
  if (!openId) return null;
  return <DialogBody />;
}

function DialogBody() {
  const { lang } = useLanguage();
  const { openId, trail, triggerRef, navigate, back, close } = usePartnerDetail();
  const ui = detailUi(lang);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const view = useMemo(
    () => (openId ? buildDetail(openId, { lang, t: content[lang], schedules: SITE_SCHEDULES, pricing: PROGRAM_PRICING }) : null),
    [openId, lang],
  );

  // Move focus into the dialog on open and whenever the view changes; scroll
  // the body back to the top for the new view.
  useEffect(() => {
    titleRef.current?.focus();
    bodyRef.current?.scrollTo({ top: 0 });
  }, [openId]);

  // Restore focus to whatever opened the dialog when it closes.
  useEffect(() => {
    const opener = triggerRef.current;
    return () => {
      if (opener && opener.isConnected && "focus" in opener) (opener as HTMLElement | SVGElement).focus();
    };
  }, [triggerRef]);

  // Escape, Tab trap, scroll lock.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !active || !panel.contains(active);
      if (e.shiftKey) {
        if (outside || active === first || active === titleRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else if (outside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [close]);

  if (!view) return null;

  const mailto = `mailto:${PARTNERSHIP_EMAIL}?subject=${encodeURIComponent(view.proposal.subject)}&body=${encodeURIComponent(view.proposal.body)}`;
  const whatsapp = `${WHATSAPP_LINK}?text=${encodeURIComponent(view.proposal.whatsapp)}`;
  const canGoBack = trail.length > 0;
  const titleId = "partner-detail-title";
  const leadId = "partner-detail-lead";

  const renderSection = (s: Section, i: number) => {
    switch (s.kind) {
      case "facts":
        return (
          <section key={i}>
            {s.title && <SectionTitle>{s.title}</SectionTitle>}
            <dl className={`divide-y divide-white/10 border-y border-white/10 ${s.title ? "mt-2" : ""}`}>
              {s.rows.map((r) => (
                <FactRow key={r.label} row={r} statusLabel={ui.statusLabel} />
              ))}
            </dl>
          </section>
        );
      case "text":
        return (
          <section key={i} className="space-y-2">
            {s.title && <SectionTitle>{s.title}</SectionTitle>}
            {s.paragraphs.map((para) => (
              <p key={para} className="text-[14px] leading-relaxed text-white/80">
                {para}
              </p>
            ))}
          </section>
        );
      case "list":
        return (
          <section key={i}>
            {s.title && <SectionTitle>{s.title}</SectionTitle>}
            <ul className={`flex flex-col gap-2 ${s.title ? "mt-2" : ""}`}>
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/85">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        );
      case "links":
        return (
          <section key={i}>
            {s.title && <SectionTitle>{s.title}</SectionTitle>}
            <ul className={`flex flex-col gap-2 ${s.title ? "mt-2" : ""}`}>
              {s.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigate(item.id)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-2.5 text-left ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-orange/40"
                  >
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold text-white">{item.label}</span>
                      {item.note && <span className="block text-[12px] text-white/60">{item.note}</span>}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {item.status && <StatusBadge status={item.status}>{ui.statusLabel[item.status]}</StatusBadge>}
                      <span aria-hidden className="text-orange">
                        →
                      </span>
                    </span>
                    <span className="sr-only">, {ui.viewDetails}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      case "table":
        return (
          <section key={i}>
            {s.title && <SectionTitle>{s.title}</SectionTitle>}
            <div tabIndex={0} role="region" aria-label={s.title ?? s.headers[0]} className="overflow-x-auto rounded-xl bg-white/5 ring-1 ring-white/10">
              <table className="w-full min-w-[420px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    {s.headers.map((h, hi) => (
                      <th key={h} scope="col" className={`px-3 py-2.5 font-semibold ${hi === s.headers.length - 1 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.rows.map((r) => (
                    <tr key={r.join("|")} className="border-b border-white/5 text-white/85 last:border-none">
                      {r.map((c, ci) => (
                        <td key={ci} className={`px-3 py-2 ${ci === r.length - 1 ? "text-right font-semibold" : ci === 1 ? "text-white/60" : ""}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {s.footer && (
                    <tr className="bg-orange/10 font-semibold text-orange">
                      <td className="px-3 py-2.5" colSpan={s.footer.length - 1}>
                        {s.footer[0]}
                      </td>
                      <td className="px-3 py-2.5 text-right">{s.footer[s.footer.length - 1]}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "external":
        return (
          <div key={i} className="flex flex-wrap gap-2">
            {s.items.map((x) => (
              <a
                key={x.href}
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-orange/30 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-orange/10"
              >
                {x.label} ↗
              </a>
            ))}
          </div>
        );
      case "note":
        return (
          <p key={i} className="text-[12px] leading-relaxed text-white/55">
            {s.text}
          </p>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy-deep/85 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={view.lead ? leadId : undefined}
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-navy-deep text-white shadow-2xl ring-1 ring-white/15 motion-safe:animate-sheetIn sm:max-h-[86dvh] sm:max-w-2xl sm:rounded-3xl"
      >
        <div aria-hidden className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" />
        <header className="flex shrink-0 items-start gap-3 border-b border-white/10 px-5 pb-4 pt-4 sm:px-7">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {canGoBack && (
                <button
                  type="button"
                  onClick={back}
                  className="-ml-2 inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 text-[13px] font-semibold text-white/80 transition hover:bg-white/10"
                >
                  <span aria-hidden>←</span> {ui.back}
                </button>
              )}
              <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{view.eyebrow}</span>
            </div>
            <h2 id={titleId} ref={titleRef} tabIndex={-1} className="mt-1 font-display text-xl font-bold text-white outline-none md:text-2xl">
              {view.title}
            </h2>
            {view.lead && (
              <p id={leadId} className="mt-1 text-[13px] leading-relaxed text-white/65">
                {view.lead}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={ui.close}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg text-white transition hover:bg-white/20"
          >
            <span aria-hidden>✕</span>
          </button>
        </header>

        {/* Focusable so keyboard users can scroll long views (WCAG 2.1.1). */}
        <div
          ref={bodyRef}
          tabIndex={0}
          role="region"
          aria-labelledby={titleId}
          className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 focus-visible:outline-offset-[-3px] sm:px-7"
        >
          {view.sections.map(renderSection)}
        </div>

        <footer className="flex shrink-0 flex-col gap-2 border-t border-white/10 bg-navy-deep px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-7">
          <a
            href={mailto}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-orange px-6 py-2.5 text-[14px] font-semibold text-navy-deep transition hover:bg-orange/90"
          >
            {ui.requestProposal}
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-orange/30 px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-orange/10"
          >
            {ui.askWhatsapp}
          </a>
        </footer>
      </div>
    </div>
  );
}
