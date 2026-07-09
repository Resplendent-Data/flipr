# Rank the Deck by Affinity

Ordering the deck best-first by fit to the current user's Preferences, with a short "why" blurb on each card.

Terminology follows `CONTEXT.md` and the decision in `docs/adr/0002-affinity-preference-ranked-deck.md`.

## Problem Statement

Nara swipes through the deck in a fixed seed order. There is no signal about
which narwhals are actually worth her time, and no explanation of why any given
narwhal is on screen. The best potential matches can sit at the bottom of the
pile, and every card looks equally (un)promising. Nara wants the narwhals most
likely to suit her shown first, and a quick reason she should care about each
one.

## Solution

The deck is ordered best-first by **Affinity** — how well each unswiped narwhal
fits Nara's stated **Preferences** — and every deck card shows a short
**Affinity reason** explaining the fit (e.g. "Shares Calm + Thoughtful, same pod
style, in your age range"). Nara sees her strongest candidates immediately and
understands, at a glance, why each narwhal is a good match. Nothing else about
swiping, matching, or the Pod changes.

## User Stories

1. As Nara, I want the deck ordered so the narwhals that best fit my Preferences
   appear first, so that I spend my attention on the strongest candidates.
2. As Nara, I want a short reason on each card explaining why a narwhal fits me,
   so that I understand the ranking instead of guessing.
3. As Nara, I want the reason to name what we actually have in common (shared
   traits, same pod style, matching age range), so that the "why" feels honest
   and specific.
4. As Nara, I want a friendly line even on narwhals I share nothing with (e.g.
   "A fresh current to explore"), so that the bottom of the deck still reads as
   an invitation rather than a blank or a rejection.
5. As Nara, I want the ranking to be present on the very first card with zero
   swipes, so that I get value immediately without having to "train" the app.
6. As Nara, I want the ordering to stay stable as I swipe through a session, so
   that the deck does not reshuffle unpredictably under me.
7. As Nara, I want a Reset demo to restore the same ranked starting deck, so that
   the demo is repeatable.
8. As Nara, I want the card to stay clean — the reason, but no scores or
   badges — so that it still reads like a dating app, not a debug view.
9. As Nara, I want my interests to keep showing on cards even though they do not
   affect the ranking, so that the card still tells the full story of each
   narwhal.
10. As a developer, I want Affinity to exist only on unswiped deck entries and
    never on a Match or a bare profile, so that a Liked narwhal never drags along
    a meaningless score.
11. As a developer, I want Preferences to stay on the server and never ship to
    the client, so that the client stays a dumb renderer and no scoring internals
    leak.

## Implementation Decisions

**Preferences (new, server-owned)**

- The current user gains stored **Preferences**: preferred traits (list),
  preferred pod style (single value), and an age range (min/max).
- Preferences are seeded onto the user record and restored by `reset-demo`,
  following the existing seed/reset pattern. Concrete seed values for Nara are
  left to implementation, chosen so the ranked demo deck looks compelling.
- Preferences are **server-internal**: they are read only by the scoring code
  and are never included in any API response. `GET /api/current-user` keeps its
  current shape (name + avatarColor).

**Affinity scoring (server-side)**

- The deck query computes an Affinity score per unswiped narwhal and returns the
  deck already sorted best-first.
- Scoring formula: `score = 2·(shared traits) + 1·(pod-style match) + 1·(age in
  range)`. Traits dominate; pod style and age are boosters.
  - Shared traits = size of the intersection of Nara's preferred traits and the
    narwhal's `traits`.
  - Pod-style match = exact equality of the narwhal's `podStyle` with Nara's
    preferred pod style (1 if equal, else 0).
  - Age in range = 1 if the narwhal's `age` falls within Nara's inclusive age
    range, else 0.
- **Interests are display-only**: they do not contribute to the score and are
  never cited in the Affinity reason.
- **Tie-break**: equal scores fall back to seed order (ascending id), keeping
  ordering deterministic across resets.
- Because Preferences are static, the remaining deck's order is stable within a
  session; there is no re-sort after each swipe.

**Affinity reason (server-side)**

- Built from the matched scored signals only (traits, pod style, age), combined
  into a single line of up to three clauses.
- When a narwhal matches none of the scored signals (score 0), the reason is a
  fixed friendly fallback (e.g. "A fresh current to explore") so every card
  always has a reason line.

**API contract**

- Introduce a wrapper type for deck items:

  ```ts
  // decision-level shape (from grilling), not final code
  interface DeckEntry {
    profile: NarwhalProfile
    affinity: number
    affinityReason: string
  }
  ```

- `GET /api/profiles` changes shape from `NarwhalProfile[]` to `DeckEntry[]`,
  sorted best-first.
- `NarwhalProfile`, `Match`, `SwipeRequest`, and `SwipeResponse` are unchanged.
  Affinity never appears on `Match.profile` or any bare profile.

**Client (renderer only)**

- The deck consumer reads the pre-sorted `DeckEntry[]` and renders top-down; the
  client does no scoring, sorting, or reason-building.
- The narwhal card gains a single reason line. No numeric score and no "top
  pick" badge are shown.
- The reason appears on the active deck card only. It is **ephemeral**: it is not
  captured onto a Match, and the Pod/match view is unchanged (name, location,
  age).

## Testing Decisions

- The repo currently has **no test harness** (no test runner in dependencies;
  the only automated guardrails are `npm run typecheck` and `npm run build`).
  This PRD does not require standing one up, but if one is added the scoring and
  reason logic is the natural first target.
- A good test here asserts **external behavior, not internals**: given a set of
  Preferences and a set of narwhals, the returned deck is ordered best-first and
  the expected ties break by seed order; the Affinity reason cites only matched
  scored signals; a zero-match narwhal yields the friendly fallback.
- The scoring + reason builder should be structured as a **pure function**
  (Preferences + narwhal → score + reason) so it is trivially unit-testable
  without a database, independent of Express or React.
- Minimum bar for every change: `npm run typecheck` passes, and a manual pass
  confirms the deck renders best-first with a reason on every card, including the
  bottom-of-deck fallback, and that Reset demo restores the ranked deck.
- Contract-level check: confirm no Preferences fields appear in any API response
  and no `affinity`/`affinityReason` appears on a `Match`.

## Out of Scope

- **Learned preferences.** Affinity does not adapt to swipe history; Preferences
  are explicit and static. (Considered and rejected in ADR-0002.)
- **Scoring on interests, favorite ice, location, or `lookingFor`.** Only traits,
  pod style, and age count.
- **Editing Preferences in the UI.** There is no screen to view or change Nara's
  Preferences; they are seed data.
- **Showing scores or badges.** No numeric Affinity, no "Top pick" indicator.
- **Persisting the reason onto matches.** The Pod view and match record are
  unchanged.
- **Reciprocation / two-sided matching.** Unchanged: every Like is still a Match.
- **Multi-user preferences.** There is still exactly one current user.

## Further Notes

- Canonical terms live in `CONTEXT.md`: **Preferences**, **Affinity**,
  **Affinity reason**. Note that **Match** remains reserved for a Liked narwhal —
  the deck-card blurb is an *Affinity reason*, never a "match reason".
- Architectural rationale and rejected alternatives are recorded in
  `docs/adr/0002-affinity-preference-ranked-deck.md`.
- The committed demo database ships with seed data; the schema change for
  Preferences must be reflected in both the schema init and the seed so a fresh
  clone and a `reset-demo` both produce the ranked deck.
- Because `GET /api/profiles` changes shape, the server change and client change
  are coupled and should land together (or behind a single slice) to avoid a
  broken deck.

## Implementation Issues

Broken into tracer-bullet vertical slices. See the board manifest at
[issues/README.md](./issues/README.md).

| # | Title | Type | Blocked by | Stories |
|---|-------|------|------------|---------|
| 01 | [Rank the deck by Affinity](./issues/01-rank-deck-by-affinity.md) | AFK | — | 1, 5, 6, 7, 9, 10, 11 |
| 02 | [Affinity reason on each card](./issues/02-affinity-reason-on-each-card.md) | AFK | 01 | 2, 3, 4, 8 |
