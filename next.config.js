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
    const CSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: ${SUPABASE_ORIGIN} ${OSM_TILES}`,
      "font-src 'self' data:",
      `connect-src 'self' ${SUPABASE_ORIGIN} ${OSM_TILES}`,
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
