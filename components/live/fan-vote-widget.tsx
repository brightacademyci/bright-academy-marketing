"use client";

import { useEffect, useState } from "react";

/** Player of the Match "Fan Vote" — added 2026-08-29, Patrick's ask to
 *  follow Sofascore's match page layout. Mirrors bright-academy-os's own
 *  components/live/fan-vote-widget.tsx exactly, except apiBase here is
 *  always the OS app's absolute origin (portal.brightacademyci.com) since
 *  this site is a different origin — same cross-origin pattern already
 *  used for reading match data (see lib/api.ts's getLiveMatch). Posts to
 *  that origin's app/api/public/live-match/[id]/vote/route.ts, which
 *  re-validates the player against the fixture's lineup server-side. */
export function FanVoteWidget({
  fixtureId,
  apiBase,
  players,
  t,
}: {
  fixtureId: string;
  apiBase: string;
  players: { id: string; name: string }[];
  t: { votePrompt: string; voteButton: string; voted: string; voteError: string };
}) {
  const storageKey = `bam_fan_vote_${fixtureId}`;
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setVotedFor(JSON.parse(raw).playerId ?? null);
    } catch {
      // Private window / storage blocked — vote still works, just isn't
      // remembered locally for next time.
    }
  }, [storageKey]);

  if (players.length === 0) return null;

  if (votedFor) {
    const name = players.find((p) => p.id === votedFor)?.name;
    return <p className="text-[12px] text-white/50">{t.voted}{name ? ` ${name}` : ""}</p>;
  }

  async function castVote() {
    if (!selected) return;
    setPending(true);
    setError(null);
    try {
      let voterToken = "";
      try {
        voterToken = window.localStorage.getItem("bam_fan_voter_token") ?? "";
      } catch {
        // ignore — falls through to a fresh token below
      }
      if (!voterToken) {
        voterToken = crypto.randomUUID();
        try {
          window.localStorage.setItem("bam_fan_voter_token", voterToken);
        } catch {
          // vote will still work this one time
        }
      }
      const res = await fetch(`${apiBase}/api/public/live-match/${fixtureId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: selected, voterToken }),
      });
      if (!res.ok) throw new Error("vote failed");
      try {
        window.localStorage.setItem(storageKey, JSON.stringify({ playerId: selected }));
      } catch {
        // ok — the vote still landed server-side
      }
      setVotedFor(selected);
    } catch {
      setError(t.voteError);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-[13px] text-white sm:w-auto"
      >
        <option value="" disabled>
          {t.votePrompt}
        </option>
        {players.map((p) => (
          <option key={p.id} value={p.id} className="text-black">
            {p.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!selected || pending}
        onClick={castVote}
        className="shrink-0 rounded-lg bg-orange px-3.5 py-2 text-[13px] font-semibold text-navy-deep transition hover:opacity-90 disabled:opacity-40"
      >
        {t.voteButton}
      </button>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
