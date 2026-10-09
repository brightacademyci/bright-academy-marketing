import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ChezNousPage } from "@/components/ChezNousPage";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildPageMetadata } from "@/lib/metadata";
import { CHEZ_NOUS_PATH, copy } from "@/lib/chez-nous";

// Campaign page "Prenez votre place" (campagne CHEZ NOUS), built 2026-10-09
// from the campaign working document and the visuals Patrick supplied.
// noindex + not in the sitemap or navigation until Patrick has validated the
// wording, the offers and the legal/payment points listed in
// docs/campaign/01-prenez-votre-place.md.
export const metadata: Metadata = buildPageMetadata({
  path: CHEZ_NOUS_PATH,
  title: copy.fr.meta.title,
  description: copy.fr.meta.description,
  noindex: true,
});

export default function PrenezVotrePlacePage() {
  return (
    <main>
      <Header />
      <ChezNousPage />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
