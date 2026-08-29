import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Videos } from "@/components/Videos";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getVideos } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

// Added 2026-08-25, mirrors app/gallery/page.tsx exactly — the homepage's
// #videos section shows a capped preview (see app/page.tsx's Videos items
// limit prop); this is the full, unlimited grid it links out to.
export const metadata: Metadata = buildPageMetadata({
  path: "/videos",
  title: "Vidéos — Bright Academy",
  description: "Regardez Bright Academy en vidéo — entraînements, matchs et moments forts de l'académie.",
});

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
