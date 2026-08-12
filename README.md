# Bright Academy — Marketing Site

A standalone marketing site for Bright Academy, separate from the `Bright Academy OS`
app on purpose — it deploys independently so a copy edit here never touches the
production app.

## Content status

- All copy (EN/FR) lives in `lib/content.ts` — it's real, drafted from what's already
  in the OS app (5 active training sites, 7 age programs, 602 active players as of
  2026-08-10). Nothing fabricated.
- **Two things to fill in before this goes live**, both flagged with `TODO(Patrick)`
  comments in `lib/content.ts`:
  1. The real Facebook page URL (`FOOTER_SOCIAL.facebook` is currently `"#"`).
  2. Nothing else is a placeholder — but double-check the WhatsApp number
     (`0716478625` / `+225 07 16 47 86 25`, pulled from the org's own settings)
     is the number you want the public to reach.
- Photos are real Bright Academy training/match photos already in this project
  (`public/images/`) — not stock or AI-generated.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build — run before every deploy
npm run typecheck
```

## Deploying (same CLI-only workflow as the OS app)

This project has no git remote by default, same as `Bright Academy OS`. From this
folder:

```bash
git init && git add -A && git commit -m "Initial marketing site"
npx vercel          # creates a NEW Vercel project — pick a fresh name, e.g. bright-academy-marketing
npx vercel --prod    # once the preview looks right
```

The first `npx vercel` will ask you to link to a new project — say **no** to linking
it to the existing `bright-academy-os` project. This needs to be its own Vercel
project so it can have its own domain.

## Domain — the part that needs care

Right now `brightacademyci.com` / `www.brightacademyci.com` point straight at the
**OS app** (confirmed live). The agreed plan (from our earlier discussion) is:

1. Deploy this marketing site to its own Vercel project first, verify it on its
   default `*.vercel.app` URL.
2. Once you're happy with it, in Vercel: add `brightacademyci.com` /
   `www.brightacademyci.com` as domains on **this** marketing-site project.
   Vercel will let you reassign a domain from one project to another — it'll
   warn you the domain is already in use elsewhere, which is expected.
3. Add a new domain to the **OS app** project instead — a subdomain like
   `app.brightacademyci.com` — and update `lib/content.ts`'s `APP_URL` in
   *this* project to match before your next deploy, so every "Enroll Now" /
   "Login" link on the marketing site points to the right place.
4. In the OS app itself, nothing needs to change code-wise for this — Vercel's
   domain aliasing handles the redirect, the app doesn't care what hostname it's
   reached on.

I'd recommend doing step 1 (deploy + review) before touching any domain settings,
so you can see the real site on a safe preview URL first. Happy to walk through
step 2-3 with you live when you're ready — reassigning a production domain is the
one part of this worth doing carefully and deliberately, not on autopilot.
