"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { APP_URL, content } from "@/lib/content";
import { buildTrialWhatsAppUrl } from "@/lib/whatsapp";
import { getProgramPricing } from "@/lib/pricing";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/50";
const labelClass = "mb-1.5 block text-[12px] font-medium text-white/70";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Posts directly to the OS app's public, no-session trial-request endpoint
 * (app/api/public/trial-request on bright-academy-os — same CORS-open, no
 * Supabase-credentials-involved posture as CareersForm.tsx). Replaces the
 * old direct-to-WhatsApp trial jump (see lib/whatsapp.ts's own history) as
 * the primary path, per Patrick's explicit ask that a request land on the
 * platform, addressed to the chosen site's receptionist, rather than only
 * ever reaching WhatsApp. A WhatsApp link stays underneath as a secondary
 * option for anyone who'd rather chat immediately.
 *
 * `?site=` / `?program=` query params (set by TrialButton when a visitor
 * clicked a site- or programme-specific trial link) prefill those two
 * fields — still fully editable, never silently locked.
 */
export function TrialRequestForm() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const sites = content.en.sites.list; // site names are language-independent proper nouns
  const initialSite = searchParams.get("site") ?? "";
  const initialProgram = searchParams.get("program") ?? "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      guardianName: String(form.get("guardianName") ?? "").trim(),
      guardianPhone: String(form.get("guardianPhone") ?? "").trim(),
      guardianEmail: String(form.get("guardianEmail") ?? "").trim() || undefined,
      childFirstName: String(form.get("childFirstName") ?? "").trim() || undefined,
      childLastName: String(form.get("childLastName") ?? "").trim() || undefined,
      childDateOfBirth: String(form.get("childDateOfBirth") ?? "").trim() || undefined,
      siteName: String(form.get("siteName") ?? "").trim() || undefined,
      programInterest: String(form.get("programInterest") ?? "").trim() || undefined,
      message: String(form.get("message") ?? "").trim() || undefined,
    };

    try {
      const res = await fetch(`${APP_URL}/api/public/trial-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || t.trialRequest.form.errorGeneric);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError(t.trialRequest.form.errorGeneric);
      setStatus("error");
    }
  }

  const pricing = initialProgram ? getProgramPricing(initialProgram) : undefined;
  const whatsappHref = buildTrialWhatsAppUrl({ lang, programName: initialProgram || undefined, priceXOF: pricing?.singleSessionXOF });

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white/5 p-6 text-[14px] text-white/85 ring-1 ring-orange/30">
        {t.trialRequest.form.success}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <h3 className="font-display text-[16px] font-semibold text-white sm:col-span-2">{t.trialRequest.form.title}</h3>

        <div>
          <label htmlFor="trial-guardianName" className={labelClass}>{t.trialRequest.form.guardianName}</label>
          <input id="trial-guardianName" name="guardianName" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor="trial-guardianPhone" className={labelClass}>{t.trialRequest.form.guardianPhone}</label>
          <input id="trial-guardianPhone" name="guardianPhone" type="tel" required maxLength={50} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="trial-guardianEmail" className={labelClass}>{t.trialRequest.form.guardianEmail}</label>
          <input id="trial-guardianEmail" name="guardianEmail" type="email" maxLength={200} className={inputClass} />
        </div>

        <div>
          <label htmlFor="trial-childFirstName" className={labelClass}>{t.trialRequest.form.childFirstName}</label>
          <input id="trial-childFirstName" name="childFirstName" maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="trial-childLastName" className={labelClass}>{t.trialRequest.form.childLastName}</label>
          <input id="trial-childLastName" name="childLastName" maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="trial-childDateOfBirth" className={labelClass}>{t.trialRequest.form.childDateOfBirth}</label>
          <input id="trial-childDateOfBirth" name="childDateOfBirth" type="date" className={inputClass} />
        </div>
        <div>
          <label htmlFor="trial-site" className={labelClass}>{t.trialRequest.form.site}</label>
          <select id="trial-site" name="siteName" defaultValue={initialSite} className={inputClass}>
            <option value="" className="text-navy-deep">{t.trialRequest.form.sitePlaceholder}</option>
            {sites.map((s) => (
              <option key={s.name} value={s.name} className="text-navy-deep">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="trial-programInterest" className={labelClass}>{t.trialRequest.form.programInterest}</label>
          <input
            id="trial-programInterest"
            name="programInterest"
            defaultValue={initialProgram}
            maxLength={200}
            placeholder={t.trialRequest.form.programPlaceholder}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="trial-message" className={labelClass}>{t.trialRequest.form.message}</label>
          <textarea id="trial-message" name="message" rows={4} maxLength={2000} className={inputClass} />
        </div>

        {error && (
          <p role="alert" className="text-[13px] text-orange sm:col-span-2">
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-orange px-6 py-3 text-[13px] font-semibold text-navy-deep transition hover:bg-orange/90 disabled:opacity-60"
          >
            {status === "submitting" ? t.trialRequest.form.submitting : t.trialRequest.form.submit}
          </button>
        </div>
      </form>

      <p className="mt-4 text-[12px] text-white/50">
        {t.trialRequest.whatsappAlt}{" "}
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-orange underline decoration-orange/40 underline-offset-2 hover:text-orange/80">
          {t.trialRequest.whatsappAltLink}
        </a>
      </p>
    </div>
  );
}
