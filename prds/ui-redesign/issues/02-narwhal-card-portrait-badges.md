---
title: "Narwhal card: Portrait + Badges"
type: AFK
status: done
blocked_by: ["01-foundation-header-reset.md"]
depends_on_story_ids: [2]
slice_order: 2
---

## What to build

Rebuild the narwhal card's presentational content on shadcn `Card`.

Render the custom gradient monogram **Portrait** at the top — a two-tone
gradient derived from the narwhal's `avatarColor` (via CSS `color-mix`), the
monogram initial, and the faint narwhal watermark. Below it: name + age,
location shown **exactly once**, bio, and the trait/interest chips as shadcn
`Badge`s with visually distinct trait vs interest variants. Give the card depth
(shadow) and the larger hero radius from the tokens. The Portrait stays a custom
component (no shadcn equivalent) but lives inside the Card.

## Acceptance criteria

- [x] The profile card uses shadcn `Card` as its shell.
- [x] Portrait shows a gradient built from `avatarColor`, the monogram, and the narwhal watermark; each narwhal looks distinct by color.
- [x] Traits and interests render as `Badge`s with distinct variants.
- [x] Location appears once — the earlier duplicate (badge over the portrait) is gone.
- [x] Name, age, and bio are present and legible; the card has depth and the larger hero radius.
- [x] `npm run build` passes; the card renders correctly for every seeded narwhal.

## Blocked by

- `01-foundation-header-reset.md`
