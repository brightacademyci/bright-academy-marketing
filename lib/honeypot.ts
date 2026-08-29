// Shared "honeypot" anti-abuse field for this site's three public,
// unauthenticated submission points — the trial-request form
// (TrialRequestForm.tsx), the careers/job-application form
// (CareersForm.tsx), and the live-match fan-vote widget
// (components/live/fan-vote-widget.tsx). Added 2026-08-29, audit fix.
//
// None of these three has a route handler in *this* repo to enforce a
// check server-side — each POSTs straight cross-origin to the OS app's own
// public API (see lib/api.ts's top comment for the same cross-origin
// pattern on the read side), so the OS app's endpoint is the actual
// persistence boundary, not anything here. The enforcement point available
// within this repo is the client handler itself, immediately before that
// network call goes out: a bot that fills every field it can find (this
// one included) never reaches the network at all, while a real visitor
// never sees or fills it, so nothing about the normal flow changes. This
// is a client-side backstop, not a replacement for validating the same
// field server-side in the OS app too — flagged separately since that
// repo isn't part of this change.
//
// Kept deliberately simple per the audit brief: no CAPTCHA (needs a
// third-party key/config this project doesn't have) and no real
// distributed rate-limiter (needs infra this project doesn't have) — just
// this, consistently, on all three.

/** Field name used across all three forms — kept generic/plausible
 *  ("website") rather than obviously honeypot-named, so a bot's
 *  autofill/heuristics are more likely to fill it. */
export const HONEYPOT_FIELD_NAME = "website";

/** Off-screen-but-not-display:none positioning — deliberately not the
 *  "sr-only" clip-based pattern this project would otherwise reach for
 *  (that's for real content a screen-reader user should still hear; a
 *  screen-reader user should never land on this field either), and
 *  deliberately not `display:none`/`visibility:hidden` alone, since some
 *  spam bots specifically skip fields hidden that way. Absolute-positioned
 *  off-canvas plus a zero-size, clipped box combines both approaches.
 *  Pair with aria-hidden="true" on the wrapper and tabIndex={-1}
 *  autoComplete="off" on the input itself at each call site, so a keyboard
 *  or screen-reader user can never tab into or hear it either. */
export const HONEYPOT_WRAPPER_CLASS = "pointer-events-none absolute left-[-9999px] top-[-9999px] h-px w-px overflow-hidden opacity-0";

/** True when the honeypot came back non-empty — something filled in a
 *  field a real visitor never sees or reaches. Accepts either a FormData
 *  value (the two <form>-based components) or a plain ref value (the fan-
 *  vote widget, which has no <form> to read a FormData from). */
export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
