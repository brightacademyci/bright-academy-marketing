import test from "node:test";
import assert from "node:assert/strict";
import { MAX_REVALIDATE_PATHS, isRevalidatablePath, secretsMatch, selectPaths } from "./revalidate-paths.ts";

test("accepts the pages the OS app really sends", () => {
  for (const p of ["/", "/first-team", "/videos", "/careers", "/careers/head-coach-u15", "/news/abc-123", "/live/9f2c", "/first-team/players/12"]) {
    assert.equal(isRevalidatablePath(p), true, p);
  }
});

test("refuses anything else", () => {
  for (const p of ["", "first-team", "/admin", "/api/revalidate", "/../etc", "/news/", "/news/a/b", "/news/..", "/news/%2e%2e", "//evil.com", "/first-team?x=1", "/prenez-votre-place", 5, null, undefined, {}]) {
    assert.equal(isRevalidatablePath(p as unknown), false, String(p));
  }
  assert.equal(isRevalidatablePath("/news/" + "a".repeat(101)), false);
  assert.equal(isRevalidatablePath("/" + "a".repeat(250)), false);
});

test("selectPaths defaults to the home page", () => {
  assert.deepEqual(selectPaths(undefined), { accepted: ["/"], rejected: 0 });
  assert.deepEqual(selectPaths([]), { accepted: ["/"], rejected: 0 });
  assert.deepEqual(selectPaths("/x"), { accepted: ["/"], rejected: 0 });
});

test("selectPaths keeps valid paths once, counts the rest, and caps the number", () => {
  assert.deepEqual(selectPaths(["/", "/first-team", "/", "/nope", 3]), { accepted: ["/", "/first-team"], rejected: 2 });
  const many = Array.from({ length: 80 }, (_, i) => `/news/n${i}`);
  assert.equal(selectPaths(many).accepted.length, MAX_REVALIDATE_PATHS);
  assert.deepEqual(selectPaths(["/nope"]), { accepted: [], rejected: 1 });
});

test("secretsMatch compares exactly, whatever the lengths", () => {
  assert.equal(secretsMatch("s3cret", "s3cret"), true);
  assert.equal(secretsMatch("s3cret ", "s3cret"), false);
  assert.equal(secretsMatch("", "s3cret"), false);
  assert.equal(secretsMatch(null, "s3cret"), false);
  assert.equal(secretsMatch("x", ""), false);
  assert.equal(secretsMatch("", ""), false);
  assert.equal(secretsMatch("a".repeat(5000), "s3cret"), false);
});
