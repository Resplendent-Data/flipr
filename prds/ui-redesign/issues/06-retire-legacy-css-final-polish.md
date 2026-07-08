---
title: "Retire legacy CSS + final polish"
type: AFK
status: done
blocked_by:
  - "02-narwhal-card-portrait-badges.md"
  - "03-drag-to-swipe-deck.md"
  - "04-match-overlay-dialog.md"
  - "05-pod-and-empty-state.md"
depends_on_story_ids: [14, 16]
slice_order: 6
---

## What to build

Final cleanup once every component has migrated to shadcn.

Remove the retired hand-authored component styles so the global stylesheet holds
only the Tailwind entry and the brand token/theme layer. Ensure the desktop
two-column layout fills a wide screen without dead gutters, the Pod is a proper
sticky companion, and there is no horizontal overflow anywhere. Close with a
type-check + build gate and a manual smoke of the full flow.

## Acceptance criteria

- [x] Hand-authored component styles are removed; nothing references the deleted classes and the app still looks correct.
- [x] The global stylesheet contains only the Tailwind import and the brand token/theme layer.
- [x] The layout fills a wide desktop screen without floaty gutters; the Pod is a sticky companion; no horizontal scroll anywhere.
- [x] `npm run build` (type-check + bundle) passes clean.
- [x] Manual smoke passes: drag both directions, Pass/Like buttons, peek card, match Dialog's three dismiss paths, Pod grows, both empty states, reset toast.

## Blocked by

- `02-narwhal-card-portrait-badges.md`
- `03-drag-to-swipe-deck.md`
- `04-match-overlay-dialog.md`
- `05-pod-and-empty-state.md`
