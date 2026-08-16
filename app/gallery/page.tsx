import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getGalleryItems } from "@/lib/api";

// Added 2026-08-13, site improvement pass, Priority 6/9 — the homepage's
// #gallery section now shows a capped preview (see app/page.tsx's
// Gallery liveItems limit prop); this is the full, unlimited grid it
// links out to, so nothing from the previous single-page gallery was lost.
export const metadata: Metadata = {
  title: "Galerie — Bright Academy",
  description: "La vie à Bright Academy en photos — entraînements, matchs et moments forts sur nos cinq sites à Abidjan et Grand-Bassam.",
  alternates: { canonical: "/gallery" },
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
