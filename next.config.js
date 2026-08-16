/** @type {import('next').NextConfig} */
const nextConfig = {
  // AVIF added 2026-08-14, second pass, Priority 15 — the brief asks for
  // WebP/AVIF; only WebP was configured. AVIF listed first so Next.js's
  // image optimizer prefers it when a browser's Accept header supports it,
  // falling back to WebP otherwise — same optimizer, no new asset pipeline.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // REVERTED 2026-08-14 — this redirect (www -> apex) caused an infinite
  // redirect loop in production. Vercel's own domain configuration for
  // this project already redirects the apex (brightacademyci.com) to
  // www.brightacademyci.com at the platform level (confirmed: the CLI's
  // own deploy output aliases to "www.brightacademyci.com" as the primary
  // domain, and both brightacademyci.com and www.brightacademyci.com
  // started failing every request with "exceeded maximum redirects"
  // immediately after this shipped). This app-level rule was redirecting
  // www -> apex at the exact same time Vercel's dashboard was redirecting
  // apex -> www, so every request bounced between the two forever. The
  // original comment here even flagged this exact risk ("rather than
  // relying on Vercel's dashboard domain settings, which aren't in this
  // repo and can't be reviewed here") — that risk materialized. Do not
  // re-add a host redirect here without first confirming, in the Vercel
  // dashboard's Domains settings, which direction (if any) is already
  // configured — duplicating it in code is what broke this.
};

module.exports = nextConfig;
