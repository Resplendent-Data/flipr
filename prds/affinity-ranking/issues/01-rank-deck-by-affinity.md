---
title: "Rank the deck by Affinity"
type: AFK
status: done
blocked_by: []
depends_on_story_ids: [1, 5, 6, 7, 9, 10, 11]
slice_order: 1
---

## What to build

A complete vertical slice that orders the deck best-first by **Affinity** — how
well each unswiped narwhal fits Nara's **Preferences**. No reason blurb yet; that
is slice 2. After this slice the app works end-to-end, just ranked instead of in
seed order.

Scope:

- **Preferences (server-internal).** Give the current user stored Preferences:
  preferred traits (list), preferred pod style (single value), and an inclusive
  age range (min/max). Add the needed columns to the users schema, seed Nara's
  values, and ensure `reset-demo` restores them. Preferences are read only by the
  scoring code and are **never** included in any API response — `GET
  /api/current-user` keeps its current shape.
- **Scoring (pure function).** A pure function `(Preferences, narwhal) -> number`
  with the formula `score = 2·(shared traits) + 1·(pod-style match) + 1·(age in
  range)`:
  - shared traits = intersection size of preferred traits and the narwhal's
    `traits`
  - pod-style match = 1 if the narwhal's `podStyle` equals the preferred pod
    style, else 0
  - age in range = 1 if the narwhal's `age` is within the inclusive range, else 0
  - **Interests do not contribute.** Only traits, pod style, and age count.
- **Sorted deck.** The deck query/endpoint returns entries sorted best-first,
  with equal scores breaking by seed order (ascending id).
- **Contract.** `GET /api/profiles` changes from `NarwhalProfile[]` to
  `DeckEntry[]`, where `DeckEntry = { profile: NarwhalProfile; affinity: number }`.
  `affinityReason` is deliberately **not** part of the shape yet — it is added in
  slice 2. `NarwhalProfile`, `Match`, `SwipeRequest`, `SwipeResponse` are
  unchanged; Affinity never appears on `Match.profile`.
- **Client (renderer only).** The deck consumer reads the pre-sorted
  `DeckEntry[]` and renders top-down. The client does no scoring or sorting. The
  narwhal card still renders the full profile, including interests. No numeric
  score or badge is shown.

Concrete seed Preference values for Nara are an implementation choice — pick
values that make the ranked demo deck visibly compelling. Server and client
changes must land together so the deck is never broken.

## Acceptance criteria

- [ ] The users schema has Preference fields; Nara's Preferences are seeded and
      restored by `reset-demo`.
- [ ] No Preference fields appear in any API response (verify
      `GET /api/current-user` is unchanged).
- [ ] A pure scoring function implements `2·traits + 1·pod + 1·age`; interests do
      not affect the score.
- [ ] `GET /api/profiles` returns `DeckEntry[]` sorted best-first, with equal
      scores in ascending-id (seed) order.
- [ ] `Match`, `NarwhalProfile`, and the swipe contract are unchanged; no
      `affinity` field appears on a `Match`.
- [ ] The client renders the deck top-down from the server order; the card still
      shows name, age, location, bio, traits, and interests.
- [ ] No numeric score or badge is shown on the card.
- [ ] `npm run typecheck` passes and a manual pass confirms the deck renders
      best-first and Reset demo restores the ranked deck.

## Blocked by

- `None - can start immediately`
