# Page "Prenez votre place" (campagne CHEZ NOUS): what was built and what Patrick must validate

Route `/prenez-votre-place`, branch `feat/fc-campaign-concept1`. The page is `noindex`, absent from the sitemap and from the navigation until validated.

## Sources

- "Bright Academy FC: Campagne CHEZ NOUS" working document (chapters 00, 01, 04, 07, 08), received 2026-10-09.
- The 12 visuals Patrick sent the same day: 3 key visuals and 9 offer posters. The photos were cropped (poster text removed) and compressed into `public/images/chez-nous/`. The original PNGs are not stored in the repo.
- Offer headlines follow the finished posters where they differ from the document text (RSE, technical, performance).
- The mission brief named a "Concept 1: LE TERRAIN QUI N'ATTEND QUE NOUS" and the signature "LE CLUB QUI JOUE CHEZ LUI". Those texts were not available. The page uses the campaign document's signature, "Le club du village doit jouer chez lui."

## What the page contains

Hero, project (what is done, coming up, later; sporting status), nine offer cards, meeting request form, in-kind form, community gestures, "J'ai une entreprise à vous présenter" form, actions to support (empty state), contribution (button disabled), transparency (empty state), contact. French and English.

## Rules enforced in the code

- Amounts are always "à partir de" and "HT", with the mandatory sentence under the offers.
- No offer includes kit-supplier rights; the Tielo Sport SAS reservation is stated.
- No company is shown as a partner; no counter, donor, testimonial or collected amount exists on the page.
- The contribution button is disabled and says that no payment method is configured.
- The success message appears only after the OS endpoint answers `ok: true` (request recorded). It never claims a notification was sent.
- Every form needs an explicit consent box; the referral form also needs the referred person's agreement. A honeypot field is present.

## Forms need the OS endpoint

The three forms post to `POST {APP_URL}/api/public/partner-inquiry`. That route is built on the OS branch `feat/partner-crm` (see that branch's notes) and is **not deployed**. Until it is, the forms show the error message with the e-mail and phone fallback. Do not deploy this page to production before the OS route and table exist in production.

## Points Patrick must validate before publication

1. **Sporting status.** Mission brief: the 2026-27 season is announced at District Championship level. Campaign document: "champions de District 2025-2026, Division Régionale de février à mai 2027". The page says only "Champions de District 2025-2026, montée en Division Régionale" and states the goal (host matches in Attinguié, reach the 3rd division). The live `/partners` page already says Regional Division, February to May 2027. The wording sits in one constant (`SPORT_STATUS` in `lib/chez-nous.ts`).
2. **Budget wording.** The document says "126 M FCFA engagé par phases". The page says "Budget global du projet : 126 millions de FCFA, à engager par phases" and adds that these are planned budgets, not funds collected, to avoid any reading as "funded". Confirm.
3. **Tielo Sport SAS.** The posters and photos show players in the club kit. The document asks for Tielo's validation when the shirt appears. Confirm it before any public use of those photos and of the jersey illustrations.
4. **Image rights.** Some photos show young players and the village. Written parental agreement is required for minors. Confirm they are cleared for web use.
5. **Phone number.** The document gives 07 99 84 47 58; the rest of the site uses +225 07 16 47 86 25 on WhatsApp. Confirm which to show.
6. **Legal structure for community contributions** (SARL versus a support association) and **payment provider**. Nothing is enabled. Needed before any "Contribuer" button works.
7. **Data protection.** The form consent text is a draft. Compliance with Ivorian law no. 2013-450 and any ARTCI declaration are for the club's counsel.

## Deviations from the document

- No manifesto film in the hero (no video file was provided; the hero is the Attinguié photo).
- Fonts: the campaign asks for Nunito Sans Black and Bitter. The page keeps the site's Space Grotesk and Inter so it matches the rest of the site. A serif system font is used for the sub-line.
- The tracking spreadsheet and the HTML mock-up mentioned in the document ("fournis séparément") were not received.
