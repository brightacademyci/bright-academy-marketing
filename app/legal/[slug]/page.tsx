import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LegalPageContent } from "@/components/LegalPageContent";
import { LEGAL_SLUGS, LEGAL_CONTENT, type LegalSlug } from "@/lib/legal-content";
import { buildPageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  // Filled in with real content 2026-08-17 (see lib/legal-content.ts's top
  // comment) — no longer a placeholder, so the "(Brouillon)"/noindex
  // treatment from the 2026-08-13 draft pass is removed and these pages are
  // now indexable and listed in the sitemap (see app/sitemap.ts).
  //
  // Fixed 2026-08-13, Priority 8 verification pass: this always used the
  // English title regardless of the site's French default, so the browser
  // tab showed an English title on a page whose <html lang> and rendered
  // content are French — the exact "mixed-language metadata" the brief
  // flagged. generateMetadata can't see the client-side language toggle
  // (there's no per-language URL), so it matches the same French-default
  // convention already applied to every other route's metadata in this
  // pass (see app/layout.tsx and the other app/**/page.tsx metadata).
  const title = `${LEGAL_CONTENT[slug].fr.title} — Bright Academy`;
  return buildPageMetadata({ path: `/legal/${slug}`, title });
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  return (
    <main>
      <Header />
      <LegalPageContent slug={slug} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
