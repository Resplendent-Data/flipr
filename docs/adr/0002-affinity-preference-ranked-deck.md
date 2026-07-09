# Rank the deck by Affinity from explicit, server-side Preferences

## Status

Accepted

## Context and decision

The deck was served in seed order (`ORDER BY p.id`). We are adding **Affinity**:
the deck is now ordered best-first by how well each unswiped narwhal fits the
current user's **Preferences**, and each card shows a short **Affinity reason**
explaining the fit. See `CONTEXT.md` for the canonical terms.

Key decisions:

- **Explicit Preferences, not learned.** The current user gains stored
  Preferences (preferred traits, preferred pod style, age range) rather than
  inferring taste from swipe history. This gives a meaningful ranking on first
  load with zero swipes and keeps the demo deterministic across `reset-demo`.
- **Server-computed, deck-only.** `getDeck` scores, sorts, and builds the
  reason; the client renders in order. The deck endpoint returns a new
  `DeckEntry { profile, affinity, affinityReason }` wrapper rather than adding
  fields to `NarwhalProfile` — Affinity is pre-Like suitability, so it must not
  leak onto `Match.profile` or any bare profile.
- **Traits dominate.** `score = 2·(shared traits) + 1·(pod-style match) +
  1·(age in range)`; ties break by seed order. Personality is the primary
  signal.
- **Interests are display-only.** They remain on the card but do not affect
  Affinity and are never cited in the Affinity reason.
- **Preferences stay server-internal.** They are seeded on the user row and
  restored by `reset-demo`, but never appear in any API response. The client
  never sees raw preferences — it only receives the already-sorted deck and the
  reason text.
- **Reason is ephemeral.** Shown only on the active deck card; not persisted
  onto a Match when the narwhal is Liked.

## Considered options

- **Learn Preferences from swipe history** — more "real", but the cold-start
  deck is unranked until several swipes exist, and ranking shifts every swipe.
  Rejected for a reset-heavy demo.
- **Add `affinity`/`affinityReason` to `NarwhalProfile`** — fewer types, but the
  fields are meaningless on `Match.profile` and every other bare-profile use.
  Rejected in favor of the `DeckEntry` wrapper.
- **Client-side scoring** — would require exposing raw Preferences to the client
  and duplicating domain logic in React. Rejected; the server already owns deck
  order.

## Consequences

- The `users` table gains preference columns (seeded, restored on reset).
- `GET /api/profiles` changes shape from `NarwhalProfile[]` to `DeckEntry[]`.
- Because Preferences are static, the remaining deck's order is stable within a
  session; no re-sort is needed after each swipe.
