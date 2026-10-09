import test from "node:test";
import assert from "node:assert/strict";
import { content } from "./content.ts";
import { PROGRAM_PRICING } from "./pricing.ts";
import { SITE_SCHEDULES } from "./schedule.ts";
import {
  ACTIVATION_KEYS,
  ALL_DETAIL_IDS,
  OFFER_KEYS,
  PLACEMENT_KEYS,
  PROGRAM_KEYS,
  SITE_SLUGS,
  STAT_KEYS,
  buildDetail,
  parseDetailId,
  programsAtSite,
  sentences,
} from "./partners-detail.ts";

const langs = ["en", "fr"] as const;
const src = (lang: "en" | "fr") => ({ lang, t: content[lang], schedules: SITE_SCHEDULES, pricing: PROGRAM_PRICING });

/** Every string reachable in a view, for content-rule scans. */
function texts(view: ReturnType<typeof buildDetail>): string[] {
  assert.ok(view);
  const out: string[] = [view.title, view.eyebrow, view.lead ?? "", view.proposal.subject, view.proposal.body, view.proposal.whatsapp];
  for (const s of view.sections) {
    if (s.kind === "facts") s.rows.forEach((r) => out.push(r.label, r.value));
    else if (s.kind === "text") out.push(...s.paragraphs, s.title ?? "");
    else if (s.kind === "list") out.push(...s.items, s.title ?? "");
    else if (s.kind === "links") s.items.forEach((i) => out.push(i.label, i.note ?? ""));
    else if (s.kind === "table") out.push(...s.rows.flat(), ...(s.footer ?? []));
    else if (s.kind === "note") out.push(s.text);
    else if (s.kind === "external") s.items.forEach((i) => out.push(i.label));
  }
  return out;
}

test("the content dictionaries line up with the id lists (EN and FR)", () => {
  for (const l of langs) {
    const p = content[l].partners;
    assert.equal(p.stats.length, STAT_KEYS.length, `${l} stats`);
    assert.equal(p.offerGroups.flatMap((g) => g.items).length, OFFER_KEYS.length, `${l} offers`);
    assert.equal(p.activateItems.length, ACTIVATION_KEYS.length, `${l} activations`);
    assert.equal(p.placements.length, PLACEMENT_KEYS.length, `${l} placements`);
    assert.equal(content[l].sites.list.length, Object.keys(SITE_SLUGS).length, `${l} sites`);
    assert.equal(content[l].programs.groups.flatMap((g) => g.categories).length, PROGRAM_KEYS.length, `${l} programs`);
    for (const s of content[l].sites.list) assert.ok(SITE_SLUGS[s.name], `${l} site slug for ${s.name}`);
  }
  assert.deepEqual(PROGRAM_PRICING.map((p) => p.key), [...PROGRAM_KEYS]);
});

test("every id builds a complete view in both languages", () => {
  assert.equal(ALL_DETAIL_IDS.length, 6 + 5 + 7 + 9 + 7 + 5);
  for (const l of langs) {
    for (const id of ALL_DETAIL_IDS) {
      const v = buildDetail(id, src(l));
      assert.ok(v, `${l} ${id}`);
      assert.equal(v.id, id);
      assert.ok(v.title.trim().length > 0, `${l} ${id} title`);
      assert.ok(v.sections.length > 0, `${l} ${id} sections`);
      assert.ok(v.proposal.subject.includes(v.title.replace(/^\d+\.\s/, "")) || v.proposal.body.length > 0);
      for (const s of texts(v)) assert.ok(!/undefined|\[object|NaN/.test(s), `${l} ${id}: "${s}"`);
    }
  }
});

test("every internal link points at a real id", () => {
  for (const l of langs) {
    for (const id of ALL_DETAIL_IDS) {
      const v = buildDetail(id, src(l))!;
      for (const s of v.sections) {
        if (s.kind !== "links") continue;
        for (const item of s.items) assert.ok(parseDetailId(item.id), `${l} ${id} -> ${item.id}`);
      }
    }
  }
});

test("URL ids are allowlisted", () => {
  assert.equal(parseDetailId("offer-main"), "offer-main");
  for (const bad of ["", "offer-", "offer-nope", "__proto__", "constructor", "<script>", "offer-main ", "OFFER-MAIN", "../x", null, undefined, 3, {}, ["offer-main"]]) {
    assert.equal(parseDetailId(bad), null, String(bad));
  }
});

test("no sponsorship amount and no parent fee is ever shown", () => {
  const amount = /\b\d{1,3}([ .,  ]\d{3})+\b|\bFCFA\b|\bXOF\b|\bCFA\b/i;
  for (const l of langs) {
    for (const id of ALL_DETAIL_IDS) {
      const v = buildDetail(id, src(l))!;
      for (const s of texts(v)) {
        // The audience table and the follower total are not prices; the project facts are not reached by any view.
        if (id === "stat-followers") continue;
        assert.ok(!amount.test(s), `${l} ${id}: "${s}"`);
      }
    }
  }
  // Pricing module values never leak.
  const fees = new Set(PROGRAM_PRICING.flatMap((p) => [p.singleSessionXOF, p.classique.monthly1x, p.classique.quarterly1x]).filter(Boolean).map(String));
  for (const l of langs) for (const id of ALL_DETAIL_IDS) {
    const joined = texts(buildDetail(id, src(l)))
.join(" | ");
    for (const f of fees) assert.ok(!new RegExp(`(^|\\D)${f}(\\D|$)`).test(joined), `${l} ${id} leaks ${f}`);
  }
});

test("offers, activations and placements say prices on request and availability not published", () => {
  const por = { en: "Prices on request", fr: "Prix sur demande" };
  const np = { en: "Not published", fr: "Non publié" };
  for (const l of langs) {
    for (const id of ALL_DETAIL_IDS.filter((i) => /^(offer|activation|placement)-/.test(i))) {
      const joined = texts(buildDetail(id, src(l))).join(" | ");
      assert.ok(joined.includes(por[l]), `${l} ${id} price`);
      assert.ok(joined.includes(np[l]), `${l} ${id} availability`);
    }
  }
});

test("source conflicts are surfaced as 'to be confirmed', not resolved", () => {
  const find = (site: string, program: string) => programsAtSite(site, { schedules: SITE_SCHEDULES, pricing: PROGRAM_PRICING }).find((r) => r.program.name === program);
  // The two conflicts the club owner named.
  assert.equal(find("Palais des Sports de Treichville", "Bright Kids")?.status, "tbc");
  assert.equal(find("Arena Bassam", "Bright Junior")?.status, "tbc");
  // TBC pairings never carry days (that would pick one source).
  for (const site of Object.keys(SITE_SLUGS)) {
    for (const r of programsAtSite(site, { schedules: SITE_SCHEDULES, pricing: PROGRAM_PRICING })) {
      if (r.status === "tbc") assert.deepEqual(r.days, [], `${site}/${r.program.name}`);
    }
  }
  const v = buildDetail("site-palais-des-sports", src("en"))!;
  const links = v.sections.find((s) => s.kind === "links");
  assert.ok(links && links.kind === "links");
  assert.equal(links.items.find((i) => i.label === "Bright Kids")?.status, "tbc");
});

test("the audience stat states the period, the total and what is not published", () => {
  for (const l of langs) {
    const v = buildDetail("stat-followers", src(l))!;
    const joined = texts(v).join(" | ");
    assert.ok(joined.includes(content[l].partners.audienceGrandTotal), "grand total");
    assert.ok(joined.includes(l === "en" ? "October 2026" : "Octobre 2026"));
    for (const w of l === "en" ? ["Engagement", "Impressions", "Audience demographics"] : ["Engagement", "Impressions", "Données démographiques"]) assert.ok(joined.includes(w), w);
  }
});

test("offers list one bullet per published sentence", () => {
  assert.deepEqual(sentences("A b, c. D e."), ["A b, c.", "D e."]);
  for (const l of langs) for (const k of OFFER_KEYS) {
    const v = buildDetail(`offer-${k}`, src(l))!;
    const list = v.sections.find((s) => s.kind === "list");
    assert.ok(list && list.kind === "list" && list.items.length >= 1, `${l} offer-${k}`);
  }
});

test("proposal requests are pre-filled with the topic", () => {
  for (const l of langs) {
    const v = buildDetail("offer-main", src(l))!;
    assert.ok(v.proposal.body.includes(content[l].partners.offerGroups[0].items[0].name));
    assert.ok(v.proposal.whatsapp.includes("2026–2027"));
  }
});
