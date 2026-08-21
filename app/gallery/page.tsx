import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/content";
import { getGalleryItems } from "@/lib/api";

// Added 2026-08-13, site improvement pass, Priority 6/9 — the homepage's
// #gallery section now shows a capped preview (see app/page.tsx's
// Gallery liveItems limit prop); this is the full, unlimited grid it
// links out to, so nothing from the previous single-page gallery was lost.
const TITLE = "Galerie — Bright Academy";
const DESCRIPTION = "La vie à Bright Academy en photos — entraînements, matchs et moments forts sur nos cinq sites à Abidjan et Grand-Bassam.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/gallery",
  // Self-referencing hreflang, added 2026-08-21 -- matches app/layout.tsx's
  // homepage stub and the same reasoning: this is a client-side language
  // toggle with no per-URL routing, so there's no distinct French/English
  // URL to point hreflang at. Real per-language alternates need the kind
  // of URL-based locale routing flagged as out of scope for this pass --
  // this stub is strictly better than omitting hreflang entirely, not a
  // substitute for real routing.
    languages: { fr: "/gallery", en: "/gallery", "x-default": "/gallery" },
  },
  // Added 2026-08-20 -- see first-team/page.tsx's comment on why every
  // page needs its own openGraph block rather than inheriting layout.tsx's.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/gallery`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default async function GalleryPage() {
  const liveItems = await getGalleryItems(30);

  return (
    <main>
      <Header />
      <Gallery liveItems={liveItems} asH1 />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
