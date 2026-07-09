---
title: "Affinity reason on each card"
type: AFK
status: ready
blocked_by: ["01-rank-deck-by-affinity.md"]
depends_on_story_ids: [2, 3, 4, 8]
slice_order: 2
---

## What to build

A vertical slice that adds the **Affinity reason** — the short "why this narwhal
fits" blurb — to each deck card, building on the ranked deck from slice 1.

Scope:

- **Reason composition (server-side).** Extend the scoring logic to produce an
  Affinity reason string from the **matched scored signals only** — shared
  traits, pod-style match, age-in-range. Combine them into a single line of up to
  three clauses (e.g. "Shares Calm + Thoughtful, same pod style, in your age
  range"). **Interests are never cited** — they do not contribute to Affinity.
- **Zero-match fallback.** When a narwhal matches none of the scored signals
  (score 0), the reason is a fixed friendly fallback (e.g. "A fresh current to
  explore") so every card always has a reason line.
- **Contract.** Add `affinityReason: string` to `DeckEntry`, so it becomes
  `{ profile: NarwhalProfile; affinity: number; affinityReason: string }`.
- **Client render.** Render the reason line on the active deck card. The reason
  is **ephemeral** — it appears on the deck card only, is not captured onto a
  Match, and the Pod/match view stays unchanged. No numeric score and no "top
  pick" badge.

Keep the reason building inside the same pure function established in slice 1 so
it stays unit-testable without a database.

## Acceptance criteria

- [ ] The scoring function returns an Affinity reason built only from matched
      traits, pod style, and age; interests are never referenced.
- [ ] The reason is one line of at most three clauses, ordered/grouped sensibly.
- [ ] A narwhal with score 0 yields the friendly fallback reason.
- [ ] `DeckEntry` includes `affinityReason`; `GET /api/profiles` returns it.
- [ ] Every deck card displays exactly one reason line; the bottom-of-deck
      narwhals show the fallback.
- [ ] No numeric score or badge is shown; the Pod/match view is unchanged and the
      reason is not persisted onto a Match.
- [ ] `npm run typecheck` passes and a manual pass confirms a correct, honest
      reason on the top card and the fallback on a zero-match card.

## Blocked by

- `01-rank-deck-by-affinity.md`
