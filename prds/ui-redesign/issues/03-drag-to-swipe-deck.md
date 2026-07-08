---
title: "Drag-to-swipe deck"
type: AFK
status: done
blocked_by: ["02-narwhal-card-portrait-badges.md"]
depends_on_story_ids: [1, 3, 4, 5, 6, 7, 11, 15]
slice_order: 3
---

## What to build

Assemble the swipeable deck around the narwhal card.

Reuse the existing `useSwipe` hook **unchanged** for pointer-driven drag. The
top card follows the cursor and tilts; LIKE and PASS stamps fade in with drag
distance on the correct side. Releasing past the threshold flings the card
off-screen; releasing short of it springs the card back. The next narwhal
renders as a dimmed, scaled-down peek behind the top card, and a fresh top card
plays a short rise animation. The Pass and Like buttons (shadcn `Button`,
destructive/success variants) trigger the same fling. Lock all input while a
swipe is being recorded. Show the deck-cleared empty state when the deck runs
out.

## Acceptance criteria

- [x] Dragging right past the threshold commits a Like; left past it commits a Pass; a sub-threshold drag springs back with no swipe recorded.
- [x] The card tilts during drag; LIKE/PASS stamps scale with drag distance and appear on the correct side.
- [x] The next narwhal is visible peeking behind the top card; a new top card animates in.
- [x] Pass/Like buttons produce the same fling and outcome as dragging.
- [x] Input is locked during the in-flight swipe request — rapid clicks/drags can't double-submit.
- [x] The deck-cleared empty state shows after the last card.
- [x] No horizontal scrollbar flashes while a card flings off-screen.
- [x] The reject stamp reads **"PASS"** (canonical per CONTEXT.md), not "Nope".

## Blocked by

- `02-narwhal-card-portrait-badges.md`
