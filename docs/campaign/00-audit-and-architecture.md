# Bright Academy FC campaign: repository audit and architecture decisions

Written 2026-10-09 during Patrick's overnight mission (Priority 3). Branch `feat/fc-campaign-concept1`, based on `main` at `cb30c6a` (the commit currently in production on the marketing project).

## Status of the brief

The mission message refers to Patrick's full document "BRIGHT ACADEMY FC: PROMPT PRINCIPAL". **That document was not available to this session** (not in the conversation, the connected folders, Google Drive or Gmail). Later the same night Patrick sent the working document "Campagne CHEZ NOUS" (28 pages) and 12 campaign visuals. Those are the source actually used; see `01-prenez-votre-place.md`. Its concept names differ from the mission's (CHEZ NOUS and "Le club du village doit jouer chez lui" instead of "Le terrain qui n'attend que nous" and "Le club qui joue chez lui"), and it states the sporting status differently (see the conflict below).

No copy, offer, amount, testimonial, figure or photograph was invented: everything on the page comes from that document or the visuals.

## Which repository, project and backend

| Concern | Where it lives |
|---|---|
| Public site (pages, copy, forms) | `bright-academy-marketing`, Vercel project `bright-academy-marketing`, production = `main` @ `cb30c6a` |
| Data and CRM | Bright Academy OS (`bright-academy-os`, Supabase). The marketing site holds no database credentials. It reads `OS /api/public/*` and posts forms to it |
| Form pattern to reuse | `TrialRequestForm.tsx` and `CareersForm.tsx` post JSON to `portal.brightacademyci.com/api/public/trial-request` and `/careers`. The routes validate and length-cap every field server-side, check a honeypot, write with the admin client, and return 200 to bots |
| Cache refresh | The marketing site revalidates pages on a timer (60 s gallery, 900 s first team). `POST /api/revalidate` exists, guarded by `REVALIDATE_SECRET` |

Decision: campaign pages and copy go in the marketing repo. Enterprise and partner requests and the CRM go in OS tables, behind a new public route that follows the trial-request pattern. The two repositories stay separate and each change lives on its own branch.

## What exists and must be preserved

- Stack: Next.js 16 App Router, React 19, Tailwind 3. `AGENTS.md` warns that this Next version differs from older ones; read `node_modules/next/dist/docs/` before relying on memory.
- Brand tokens (`tailwind.config.ts`): navy `#113e6f` / dark `#0a2340` / deep `#071426`, orange `#f2790c` (use `orange-text` `#b55300` for small text on light grounds), page ground `#f7f8fa`. Fonts: Inter (body), Space Grotesk (display), Fredoka (programme badges only).
- Copy lives in `lib/content.ts` (about 1,700 lines, EN and FR dictionaries with `partners`, `firstTeam`, `nav`, etc.). New pages should add their own dictionary block rather than inline strings.
- Existing pages: home, first-team (+ player profiles), gallery, videos, news, our-coaches, founder, careers (+ openings), trial, faq, legal, live, partners.
- `/partners` was rewritten from the 2026-27 partnership dossier. It shows benefits and placements, **shows no FCFA amounts**, and **states that kit-supplier rights are not offered** (reserved to the Tielo Sport SAS / PUMA agreement). This is consistent with the mission rules and must not regress.
- Existing partner assets: `PartnersSection.tsx`, `JerseyPlacements.tsx`, `PitchDiagram.tsx`, `BrandDiagram.tsx`, `PARTNERSHIP_DOSSIER_URL` (a PDF in `public/documents`).
- Navigation already links Partners (`cb30c6a`).

## Conflict to resolve before any campaign text is written

The live `/partners` page (and `lib/content.ts`) says the club was **promoted to the Regional Division** and plays "Regional Division, February to May 2027". The mission says the 2026-27 season is currently announced at **District Championship** level, and that Regional Division and third division are ambitions, not results. Both cannot be shown to the public. Which one is right is a factual matter only Patrick can settle. Nothing has been changed on the live site.

## CRM: what exists and what does not

- `leads` (OS) is the parents' enrolment pipeline: it requires a guardian name and phone and carries child fields. It is **not** suitable for companies.
- No sponsor, partner or donation table exists. The treasury module only has a "Don / Sponsoring" receipt category.
- Therefore a company and partner CRM is a genuine addition, not a second CRM. It should be new `partner_*` tables in the OS database, not a copy of the leads table.

## Rules the CRM design must encode (from the mission)

1. Four distinct amount states: **proposed**, **promised**, **contracted**, **received**. A promise is never a receipt.
2. "Received" is derived only from receipt rows recorded by an authorised person. It is never edited as a free number.
3. No payment provider, no real transaction, no fictitious donor or counter. Any online payment stays disabled until the provider, merchant identifiers and controls exist and are tested.
4. Company requests are persisted. The confirmation shown to the visitor must say only that the request was recorded. No claim that a notification was sent unless a sending service confirmed it.
5. Private contact details, internal documents and financial figures are protected by row-level security and role checks. No global access is granted to speed up development.
6. No exclusivity offered that conflicts with Tielo Sport SAS / PUMA kit rights.
7. No contribution is mandatory for players or families. No fundraising target is shown before its budget and use are validated.

## Order of work

1. Concept 1 "LE TERRAIN QUI N'ATTEND QUE NOUS" (hero, status of the project split into existing / prepared / funded / still to do, signatures). Marketing repo.
2. Entreprises & Partenaires space with the validated offers. Marketing repo plus the public route.
3. CRM tables, admin screens and permissions. OS repo, QA first.
4. Community and contributions, payments disabled.
5. Dashboard.

## Open items for Patrick

- Provide the brief (or re-send it) so copy, offers and amounts can be taken from the source.
- Settle District versus Regional Division for 2026-27.
- Confirm who may see and edit partner finances (proposal: super admin and administrator write; accountant and treasurer read).
