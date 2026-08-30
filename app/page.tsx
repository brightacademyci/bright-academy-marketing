import { Header } from "@/components/Header";
import { LiveMatchBanner } from "@/components/LiveMatchBanner";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FounderTeaser } from "@/components/FounderTeaser";
import { Approach } from "@/components/Approach";
import { SafetySection } from "@/components/SafetySection";
import { Achievements } from "@/components/Achievements";
import { KitShowcase } from "@/components/KitShowcase";
import { Programs } from "@/components/Programs";
import { Sites } from "@/components/Sites";
import { Gallery } from "@/components/Gallery";
import { Videos } from "@/components/Videos";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { FAQ } from "@/components/FAQ";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getFirstTeam, getGalleryItems, getNewsPosts, getVideos } from "@/lib/api";

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
//
// Reworked again 2026-08-30, homepage-length audit fix (Patrick: "fix what
// need to be fixed... the goal is a professional site"). The audit
// (measured against the real live-equivalent build, ~11,500px/~13 screens)
// found two real problems, not a "too much content overall" problem —
// Programs/Sites/Approach/Safety/Achievements are all fine as-is:
//   1. Founder's full bio + a separate standalone Philosophy pull-quote sat
//      back-to-back, two large, visually near-identical blocks. Philosophy
//      is now folded into the end of Founder's own section (see
//      Founder.tsx) instead of being its own section, and the full bio
//      moved off the homepage entirely to /founder (see
//      app/founder/page.tsx). <Philosophy /> is gone from this page;
//      <Founder /> is replaced below by <FounderTeaser />, a short
//      photo+intro+link version — same teaser-plus-dedicated-page pattern
//      already used for Gallery/Videos/News.
//   2. A parent scrolling the homepage hit five sections of trust-building
//      content (About → Founder → Philosophy → Approach → Safety) before
//      ever reaching Programs or Sites — "what do you actually offer,
//      where". Kit/News/Programs/Sites now move up to sit right after
//      About (preserving their prior relative order/adjacency reasoning
//      from the 2026-08-13 pass above), with Approach/Safety/the Founder
//      teaser/Achievements — deeper trust content — following before
//      Gallery/Videos/FAQ/the final CTA.
export default async function HomePage() {
  // getFirstTeam's nextFixture/isLive fields aren't lang-dependent (they
  // come straight from the fixtures/opponents tables, not lib/content.ts),
  // so a single "fr" call is enough here — unlike newsEn/newsFr below,
  // which carry genuinely per-language post content.
  const [liveGalleryItems, newsEn, newsFr, videos, team] = await Promise.all([
    getGalleryItems(30),
    getNewsPosts("en"),
    getNewsPosts("fr"),
    getVideos(8),
    getFirstTeam("fr"),
  ]);

  return (
    <main>
      <Header />
      <LiveMatchBanner fixture={team.nextFixture} />
      <Hero />
      <About />
      <KitShowcase />
      <LatestNewsSection postsEn={newsEn} postsFr={newsFr} />
      <Programs />
      <Sites />
      <Approach />
      <SafetySection />
      <FounderTeaser />
      <Achievements />
      <Gallery liveItems={liveGalleryItems} limit={8} />
      <Videos items={videos} limit={4} />
      <FAQ limit={6} />
      <EnrollCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
