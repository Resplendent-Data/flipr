---
title: "Match overlay (Dialog)"
type: AFK
status: done
blocked_by: ["03-drag-to-swipe-deck.md"]
depends_on_story_ids: [8, 9, 16]
slice_order: 4
---

## What to build

Move the "It's a match!" celebration into a shadcn `Dialog`.

On a Like that creates a Match, open the Dialog showing the current user's
`Avatar` and the matched narwhal's `Avatar`, a beating heart, the "It's a
match!" headline, and a "Keep swimming" primary `Button`. Dismiss via the
button, a backdrop click, or the Escape key. Inherit Radix's focus trap and
ARIA labeling.

## Acceptance criteria

- [x] Liking a narwhal that becomes a Match opens the Dialog with both Avatars and the narwhal's name.
- [x] The Dialog dismisses via the Keep swimming button, a backdrop click, and Escape.
- [x] Focus is trapped while the Dialog is open and restored to a sensible place on close; the Dialog is screen-reader labeled.
- [x] The deck underneath is not interactable while the Dialog is open.
- [x] A Pass never opens the Dialog.

## Blocked by

- `03-drag-to-swipe-deck.md`
