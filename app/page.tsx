import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Philosophy } from "@/components/Philosophy";
import { Approach } from "@/components/Approach";
import { SafetySection } from "@/components/SafetySection";
import { Achievements } from "@/components/Achievements";
import { KitShowcase } from "@/components/KitShowcase";
import { Programs } from "@/components/Programs";
import { Sites } from "@/components/Sites";
import { Gallery } from "@/components/Gallery";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { FAQ } from "@/components/FAQ";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getGalleryItems, getNewsPosts } from "@/lib/api";

// Server Component (not "use client") specifically so this can await the
// live gallery feed before rendering — see lib/api.ts's getGalleryItems()
// and Gallery.tsx's own merge-with-static-array note. Everything below it
// stays exactly the same client-composed page it always was.
//
// Section order reworked 2026-08-13, site improvement pass, Priority 6 —
// the brief asked for Hero → Why Bright Academy → Programmes → Locations →
// Achievements → Gallery → short FAQ → final conversion. The one real
// reorder this required: Achievements used to sit right after Safety
// (before Programs/Sites even rendered), which put "we won these
// tournaments" ahead of "here's what you're actually signing up for" —
// backwards for a parent evaluating the academy for the first time.
// Achievements now lands after Sites, immediately before Gallery, matching
// the requested flow. About/Philosophy/Approach/Safety stay as separate
// sections rather than being merged into one rewritten "Why Bright
// Academy" block — collapsing four already-reviewed sections into new
// prose risked rewriting content Patrick approved in earlier passes; this
// pass reorders and trims (see FAQ.tsx's homepage prop below) rather than
// rewrites. KitShowcase and the news teaser aren't named in the brief's
// flow — left where they already made sense (kit info alongside the
// programme content it's adjacent to; news right before Programs, and it
// already renders nothing at all when there's no post published, same as
// the old order).
export default async function HomePage() {
  const [liveGalleryItems, newsEn, newsFr] = await Promise.all([
    getGalleryItems(30),
    getNewsPosts("en"),
    getNewsPosts("fr"),
  ]);

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Philosophy />
      <Approach />
      <SafetySection />
      <KitShowcase />
      <LatestNewsSection postsEn={newsEn} postsFr={newsFr} />
      <Programs />
      <Sites />
      <Achievements />
      <Gallery liveItems={liveGalleryItems} limit={8} />
      <FAQ limit={6} />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
