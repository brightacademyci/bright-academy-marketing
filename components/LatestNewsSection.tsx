"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import type { PublicNewsPost } from "@/lib/api";

function formatDate(iso: string, lang: "en" | "fr") {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

// Homepage "latest news" teaser — added as part of the 2026-08-13
// PSG.fr-inspired revamp: PSG's own homepage is dominated by content cards
// (match reports, interviews, behind-the-scenes), and this site had no
// equivalent before now — News only ever lived on its own /news page with
// no link in from the homepage beyond the nav bar. Shows up to 3 posts,
// photo-forward like NewsListSection's own cards, and is omitted entirely
// (not even the section wrapper) when there's nothing published yet —
// a teaser with "no news yet" reads worse than no teaser at all.
export function LatestNewsSection({ postsEn, postsFr }: { postsEn: PublicNewsPost[]; postsFr: PublicNewsPost[] }) {
  const { lang, t } = useLanguage();
  const posts = useMemo(() => (lang === "fr" ? postsFr : postsEn).slice(0, 3), [lang, postsEn, postsFr]);

  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-orange">{t.news.eyebrow}</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{t.news.title}</h2>
          </div>
          <Link href="/news" className="shrink-0 text-[13px] font-semibold text-orange hover:underline">
            {t.news.seeAll}
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <Link
                href={`/news/${post.id}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/30"
              >
                {post.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImageUrl} alt={post.title} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-orange/25 via-navy-deep to-navy-deep" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[12px] font-medium text-white/50">{formatDate(post.publishedAt, lang)}</p>
                  <h3 className="mt-1.5 font-display text-[15px] font-semibold text-white">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-white/70">{post.body}</p>
                  <span className="mt-3 text-[13px] font-semibold text-orange">{t.news.readMore}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
