import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PlayerProfileSection } from "@/components/PlayerProfileSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getPlayerProfile } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

// Public player-profile page — added 2026-08-30, off the back of Patrick's
// Google "sports card" reference for the First Team tab: each squad-card
// player there links to their own page. Mirrors app/news/[id]/page.tsx's
// shape (generateMetadata + a thin server component fetching one thing and
// handing it to a client section), but PlayerProfileSection only needs a
// single fetch — see that component's own comment for why the en/fr-pair
// pattern getNewsPost() uses doesn't apply here.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getPlayerProfile(id);
  const title = profile.found ? `${profile.fullName} — Bright Academy` : "Joueur — Bright Academy";
  return buildPageMetadata({
    path: `/first-team/players/${id}`,
    title,
    // Not found (bad/foreign id, or a squad member removed since the link
    // was shared) shouldn't get indexed — same noindex convention as any
    // other thin/placeholder page (see buildPageMetadata's own doc comment).
    noindex: !profile.found,
  });
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getPlayerProfile(id);

  return (
    <main>
      <Header />
      <PlayerProfileSection profile={profile} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
