"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { APP_URL } from "@/lib/content";
import { HONEYPOT_FIELD_NAME, HONEYPOT_WRAPPER_CLASS, isHoneypotFilled } from "@/lib/honeypot";
import {
  CHEZ_NOUS_EMAIL,
  CHEZ_NOUS_PHONE_DISPLAY,
  CHEZ_NOUS_PHONE_TEL,
  IN_KIND_TYPES,
  OFFERS,
  readEstimatedValue,
  copy,
} from "@/lib/chez-nous";

// The three public forms of the "Prenez votre place" page. Same trust posture
// as TrialRequestForm / CareersForm: this site holds no database credentials,
// the form posts JSON to the OS app's public endpoint, which validates and
// persists it (partner_inquiries). Honesty rule: the success message appears
// only when that endpoint answered ok:true, i.e. the request was recorded.
// Nothing here claims a notification was sent to anyone.

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/50";
const labelClass = "mb-1.5 block text-[12px] font-medium text-white/70";

type Status = "idle" | "submitting" | "success" | "error";
type Kind = "meeting" | "in_kind" | "referral";

const ENDPOINT = `${APP_URL}/api/public/partner-inquiry`;

function useSubmit(kind: Kind) {
  const { lang } = useLanguage();
  const f = copy[lang].form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>, extra?: (form: FormData) => Record<string, unknown>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (isHoneypotFilled(form.get(HONEYPOT_FIELD_NAME))) return;

    if (form.get("consent") !== "on") {
      setError(f.required);
      setStatus("error");
      return;
    }

    // Form-specific fields are read before anything is sent, so a value we
    // cannot read blocks the submit instead of being guessed.
    const added = extra ? extra(form) : {};
    if (typeof added.__error === "string") {
      setError(added.__error);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);
    const text = (name: string) => String(form.get(name) ?? "").trim() || undefined;
    const payload = {
      kind,
      lang,
      consent: true,
      contactName: text("contactName"),
      companyName: text("companyName"),
      jobTitle: text("jobTitle"),
      email: text("email"),
      phone: text("phone"),
      message: text("message"),
      ...added,
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        // Server messages are English-only and technical: show our own
        // localized wording, chosen by what the status tells us.
        setError(res.status === 400 ? f.invalid : res.status === 429 ? f.busy : f.error);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError(f.error);
      setStatus("error");
    }
  }

  return { status, error, onSubmit, f, lang };
}

function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className={HONEYPOT_WRAPPER_CLASS}>
      <label htmlFor={id}>Website</label>
      <input id={id} name={HONEYPOT_FIELD_NAME} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function Feedback({ status, error, success }: { status: Status; error: string | null; success: string }) {
  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-white/5 p-4 text-[14px] text-white/90 ring-1 ring-orange/40 sm:col-span-2">
        {success}
      </p>
    );
  }
  if (error) {
    return (
      <p role="alert" className="text-[13px] text-orange sm:col-span-2">
        {error}
      </p>
    );
  }
  return null;
}

function Fallback() {
  const { lang } = useLanguage();
  const f = copy[lang].form;
  return (
    <p className="text-[12px] text-white/55 sm:col-span-2">
      <a className="font-medium text-orange underline underline-offset-2" href={`mailto:${CHEZ_NOUS_EMAIL}`}>
        {f.writeUs}
      </a>{" "}
      · {f.call}{" "}
      <a className="font-medium text-orange underline underline-offset-2" href={`tel:${CHEZ_NOUS_PHONE_TEL}`}>
        {CHEZ_NOUS_PHONE_DISPLAY}
      </a>
    </p>
  );
}

function Consent({ id, text }: { id: string; text: string }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 text-[12px] leading-relaxed text-white/70 sm:col-span-2">
      <input id={id} name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-orange" />
      <span>{text}</span>
    </label>
  );
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  const { lang } = useLanguage();
  return (
    <div className="sm:col-span-2">
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-orange px-6 py-3 text-[13px] font-semibold text-navy-deep transition hover:bg-orange/90 disabled:opacity-60"
      >
        {status === "submitting" ? copy[lang].form.sending : label}
      </button>
    </div>
  );
}

/** Meeting request. `preselected` is the offer id set by an offer card's button. */
export function MeetingForm({ preselected }: { preselected?: string }) {
  const { status, error, onSubmit, lang } = useSubmit("meeting");
  const m = copy[lang].meeting;
  if (status === "success") return <Feedback status={status} error={null} success={copy[lang].form.success} />;
  return (
    <form
      onSubmit={(e) => onSubmit(e, (form) => ({ offers: form.getAll("offers").map(String) }))}
      className="grid gap-4 sm:grid-cols-2"
      aria-label={m.title}
    >
      <Honeypot id="cn-meeting-website" />
      <div>
        <label htmlFor="cn-m-name" className={labelClass}>{m.contactName}</label>
        <input id="cn-m-name" name="contactName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-m-company" className={labelClass}>{m.companyName}</label>
        <input id="cn-m-company" name="companyName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-m-job" className={labelClass}>{m.jobTitle}</label>
        <input id="cn-m-job" name="jobTitle" maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-m-email" className={labelClass}>{m.email}</label>
        <input id="cn-m-email" name="email" type="email" required maxLength={200} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-m-phone" className={labelClass}>{m.phone}</label>
        <input id="cn-m-phone" name="phone" type="tel" required maxLength={50} className={inputClass} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>{m.offers}</legend>
        <div className="mt-1 grid gap-2 sm:grid-cols-3">
          {OFFERS.map((o) => (
            <label key={`${o.id}-${preselected === o.id}`} className="flex items-center gap-2 text-[12px] text-white/80">
              <input
                type="checkbox"
                name="offers"
                value={o.id}
                defaultChecked={preselected === o.id}
                className="h-4 w-4 accent-orange"
              />
              {o.name[lang]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="cn-m-message" className={labelClass}>{m.message}</label>
        <textarea id="cn-m-message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>
      <Consent id="cn-m-consent" text={m.consent} />
      <Feedback status={status} error={error} success={copy[lang].form.success} />
      <SubmitButton status={status} label={m.submit} />
      <Fallback />
    </form>
  );
}

export function InKindForm() {
  const { status, error, onSubmit, lang } = useSubmit("in_kind");
  const k = copy[lang].inKind;
  if (status === "success") return <Feedback status={status} error={null} success={copy[lang].form.success} />;
  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, (form) => {
          const value = readEstimatedValue(String(form.get("estimatedValueXof") ?? ""));
          if (value.kind === "unreadable") return { __error: copy[lang].form.valueUnreadable };
          return {
            inKindType: String(form.get("inKindType") ?? "").trim() || undefined,
            estimatedValueXof: value.kind === "ok" ? value.xof : undefined,
            deadline: String(form.get("deadline") ?? "").trim() || undefined,
          };
        })
      }
      className="grid gap-4 sm:grid-cols-2"
      aria-label={k.title}
    >
      <Honeypot id="cn-inkind-website" />
      <div>
        <label htmlFor="cn-k-type" className={labelClass}>{k.type}</label>
        <select id="cn-k-type" name="inKindType" required defaultValue="" className={inputClass}>
          <option value="" className="text-navy-deep">{k.typePlaceholder}</option>
          {IN_KIND_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="text-navy-deep">{t[lang]}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cn-k-value" className={labelClass}>{k.value}</label>
        <input id="cn-k-value" name="estimatedValueXof" inputMode="numeric" maxLength={15} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-k-deadline" className={labelClass}>{k.deadline}</label>
        <input id="cn-k-deadline" name="deadline" maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-k-name" className={labelClass}>{k.contactName}</label>
        <input id="cn-k-name" name="contactName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-k-company" className={labelClass}>{k.companyName}</label>
        <input id="cn-k-company" name="companyName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-k-email" className={labelClass}>{k.email}</label>
        <input id="cn-k-email" name="email" type="email" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-k-phone" className={labelClass}>{k.phone}</label>
        <input id="cn-k-phone" name="phone" type="tel" required maxLength={50} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-k-message" className={labelClass}>{k.message}</label>
        <textarea id="cn-k-message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>
      <Consent id="cn-k-consent" text={k.consent} />
      <Feedback status={status} error={error} success={copy[lang].form.success} />
      <SubmitButton status={status} label={k.submit} />
      <Fallback />
    </form>
  );
}

export function ReferralForm() {
  const { status, error, onSubmit, lang } = useSubmit("referral");
  const r = copy[lang].referral;
  if (status === "success") return <Feedback status={status} error={null} success={copy[lang].form.success} />;
  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, (form) => ({
          sector: String(form.get("sector") ?? "").trim() || undefined,
          relationship: String(form.get("relationship") ?? "").trim() || undefined,
          referredContactConsent: form.get("referredConsent") === "on",
        }))
      }
      className="grid gap-4 sm:grid-cols-2"
      aria-label={r.title}
    >
      <Honeypot id="cn-referral-website" />
      <div>
        <label htmlFor="cn-r-name" className={labelClass}>{r.contactName}</label>
        <input id="cn-r-name" name="contactName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-r-phone" className={labelClass}>{r.phone}</label>
        <input id="cn-r-phone" name="phone" type="tel" maxLength={50} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-r-email" className={labelClass}>{r.email}</label>
        <input id="cn-r-email" name="email" type="email" maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-r-company" className={labelClass}>{r.companyName}</label>
        <input id="cn-r-company" name="companyName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cn-r-sector" className={labelClass}>{r.sector}</label>
        <input id="cn-r-sector" name="sector" maxLength={200} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-r-rel" className={labelClass}>{r.relationship}</label>
        <input id="cn-r-rel" name="relationship" maxLength={300} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cn-r-message" className={labelClass}>{r.message}</label>
        <textarea id="cn-r-message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>
      <label htmlFor="cn-r-referred" className="flex items-start gap-3 text-[12px] leading-relaxed text-white/70 sm:col-span-2">
        <input id="cn-r-referred" name="referredConsent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-orange" />
        <span>{r.referredConsent}</span>
      </label>
      <Consent id="cn-r-consent" text={r.consent} />
      <Feedback status={status} error={error} success={copy[lang].form.success} />
      <SubmitButton status={status} label={r.submit} />
      <Fallback />
    </form>
  );
}
