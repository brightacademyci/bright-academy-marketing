import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Videos } from "@/components/Videos";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/content";
import { getVideos } from "@/lib/api";

// Added 2026-08-25, mirrors app/gallery/page.tsx exactly — the homepage's
// #videos section shows a capped preview (see app/page.tsx's Videos items
// limit prop); this is the full, unlimited grid it links out to.
const TITLE = "Vidéos — Bright Academy";
const DESCRIPTION = "Regardez Bright Academy en vidéo — entraînements, matchs et moments forts de l'académie.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/videos",
    // Self-referencing hreflang — same reasoning as gallery/page.tsx's own
    // comment (client-side language toggle, no per-URL routing yet).
    languages: { fr: "/videos", en: "/videos", "x-default": "/videos" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/videos`,
    images: [{ url: "/images/og/social-share.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default async function VideosPage() {
  const items = await getVideos(60);

  return (
    <main>
      <Header />
      <Videos items={items} asH1 />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
