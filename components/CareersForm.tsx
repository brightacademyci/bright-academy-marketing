"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { APP_URL } from "@/lib/content";

// Accessibility pass 2026-08-13 (Priority 11): focus:outline-none used to
// remove the browser's focus ring with only a subtle border-color change
// as a replacement — combined with focus:ring-2 now instead, so keyboard
// focus stays clearly visible field-to-field.
const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/50";
const labelClass = "mb-1.5 block text-[12px] font-medium text-white/70";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Posts directly to the OS app's public, no-session careers endpoint
 * (app/api/public/careers on bright-academy-os — CORS-open specifically
 * for this site, no Supabase credentials of any kind involved). Every
 * field is re-validated server-side there too; this form's own validation
 * is just for a faster, friendlier failure before the request goes out.
 */
export function CareersForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim() || undefined,
      positionInterest: String(form.get("positionInterest") ?? "").trim() || undefined,
      message: String(form.get("message") ?? "").trim() || undefined,
      resumeUrl: String(form.get("resumeUrl") ?? "").trim() || undefined,
    };

    try {
      const res = await fetch(`${APP_URL}/api/public/careers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || t.careers.form.errorGeneric);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError(t.careers.form.errorGeneric);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white/5 p-6 text-[14px] text-white/85 ring-1 ring-orange/30">
        {t.careers.form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-2">
      <h3 className="font-display text-[16px] font-semibold text-white sm:col-span-2">{t.careers.form.title}</h3>

      {/* Priority 11: every <label> here was visually adjacent to its
       *  field but not programmatically associated (no htmlFor/id pair) —
       *  a screen reader focusing the input announced nothing but "edit
       *  text". Each pair now shares a stable id. */}
      <div>
        <label htmlFor="careers-fullName" className={labelClass}>{t.careers.form.fullName}</label>
        <input id="careers-fullName" name="fullName" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="careers-email" className={labelClass}>{t.careers.form.email}</label>
        <input id="careers-email" name="email" type="email" required maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="careers-phone" className={labelClass}>{t.careers.form.phone}</label>
        <input id="careers-phone" name="phone" maxLength={50} className={inputClass} />
      </div>
      <div>
        <label htmlFor="careers-position" className={labelClass}>{t.careers.form.positionInterest}</label>
        <input id="careers-position" name="positionInterest" maxLength={200} placeholder={t.careers.form.positionPlaceholder} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="careers-message" className={labelClass}>{t.careers.form.message}</label>
        <textarea id="careers-message" name="message" rows={4} maxLength={4000} placeholder={t.careers.form.messagePlaceholder} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="careers-resumeUrl" className={labelClass}>{t.careers.form.resumeUrl}</label>
        <input id="careers-resumeUrl" name="resumeUrl" maxLength={1000} placeholder={t.careers.form.resumeUrlPlaceholder} className={inputClass} />
      </div>

      {/* role="alert" — Priority 11's "announce validation errors
       *  accessibly": this error only used to appear visually; a screen
       *  reader user who'd already moved focus to the submit button (the
       *  next element after this one in the form) had no way to know
       *  submission had failed. */}
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
          {status === "submitting" ? t.careers.form.submitting : t.careers.form.submit}
        </button>
      </div>
    </form>
  );
}
