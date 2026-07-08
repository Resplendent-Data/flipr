---
title: "Pod + empty state"
type: AFK
status: done
blocked_by: ["01-foundation-header-reset.md"]
depends_on_story_ids: [10, 12]
slice_order: 5
---

## What to build

Rebuild the **Pod** (the current user's collection of Matches) sidebar on shadcn
`Card` and `Avatar`.

It stays visible alongside the deck at all times, shows the match count in the
**accent (yellow)** color, and lists each match with its gradient `Avatar`,
name, location, and age. Render a no-matches empty state before any Likes.

This slice only depends on the foundation, so it can be built in parallel with
the card/deck/overlay chain.

## Acceptance criteria

- [x] The Pod renders on shadcn `Card`, with each match row using the gradient `Avatar`.
- [x] The match count is displayed in the accent yellow color and updates as matches are added.
- [x] A no-matches empty state shows when the Pod is empty.
- [x] The Pod is present in the layout at all times — not hidden behind a toggle or drawer.
- [x] `npm run build` passes.

## Blocked by

- `01-foundation-header-reset.md`
