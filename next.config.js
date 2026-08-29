/** @type {import('next').NextConfig} */
const nextConfig = {
  // AVIF added 2026-08-14, second pass, Priority 15 — the brief asks for
  // WebP/AVIF; only WebP was configured. AVIF listed first so Next.js's
  // image optimizer prefers it when a browser's Accept header supports it,
  // falling back to WebP otherwise — same optimizer, no new asset pipeline.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Added 2026-08-20 -- the public site had no security headers at all.
  // script-src/style-src include 'unsafe-inline' as a known, deliberate
  // tradeoff (the theme toggle + JSON-LD structured data blocks are
  // inline, and Tailwind emits inline `style` attrs in a few places) --
  // full nonce-based CSP is a real refactor, not a config change, and
  // this gets the real protections in place today without that risk.
  // img-src/connect-src include the Supabase project (site photos served
  // from Storage) and OpenStreetMap's tile subdomains (components/SiteMap.tsx's
  // Leaflet map).
  async headers() {
    const SUPABASE_ORIGIN = "https://zutonntnlroxiftvusnl.supabase.co";
    const OSM_TILES = "https://*.tile.openstreetmap.org";
    // 2026-08-29 platform audit: connect-src never allow-listed this —
    // lib/content.ts's APP_URL, which the trial-request, careers, and fan
    // vote widgets all fetch() to (see fan-vote-widget.tsx, the live match
    // page comment above). Under this enforced CSP the browser silently
    // blocks those requests client-side (no visible error to the visitor,
    // the submission just never leaves), so those three forms have likely
    // been failing in production since the CSP was added 2026-08-20.
    const PORTAL_ORIGIN = "https://portal.brightacademyci.com";
    const CSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: ${SUPABASE_ORIGIN} ${OSM_TILES}`,
      "font-src 'self' data:",
      `connect-src 'self' ${SUPABASE_ORIGIN} ${OSM_TILES} ${PORTAL_ORIGIN}`,
      // Added 2026-08-25 for the Videos section/tab (components/Videos.tsx,
      // FirstTeamSection.tsx's Videos tab) — with no frame-src set,
      // browsers fall back to default-src 'self' for embedded iframes
      // too, which would silently block every YouTube/Vimeo embed on this
      // public-facing site. Scoped to just the two embed hosts the OS
      // app's toEmbedUrl() ever normalizes a link into (same allowance
      // just added to bright-academy-os's own CSP for its /gallery
      // preview) — same "check a blanket security default against every
      // feature that needs the thing it locks down" fix as the
      // geolocation Permissions-Policy issue below.
      "frame-src https://www.youtube.com https://player.vimeo.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
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
