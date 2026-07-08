# Flipr UI Redesign — Implementation Issues

Board-ready slices for [2026-07-08-shadcn-ui-redesign.md](../2026-07-08-shadcn-ui-redesign.md).
All slices are tracer-bullet vertical increments. Critical chain: **01 → 02 → 03 → 04**.
**05 (Pod)** only needs the foundation and can run in parallel. **06** waits on everything.

| Order | Title | Type | Status | Blocked by | Stories | File |
|---|---|---|---|---|---|---|
| 01 | Foundation + Header + Reset | AFK | done | — | 13, 17 | [01-foundation-header-reset.md](./01-foundation-header-reset.md) |
| 02 | Narwhal card: Portrait + Badges | AFK | done | 01 | 2 | [02-narwhal-card-portrait-badges.md](./02-narwhal-card-portrait-badges.md) |
| 03 | Drag-to-swipe deck | AFK | done | 02 | 1, 3, 4, 5, 6, 7, 11, 15 | [03-drag-to-swipe-deck.md](./03-drag-to-swipe-deck.md) |
| 04 | Match overlay (Dialog) | AFK | done | 03 | 8, 9, 16 | [04-match-overlay-dialog.md](./04-match-overlay-dialog.md) |
| 05 | Pod + empty state | AFK | done | 01 | 10, 12 | [05-pod-and-empty-state.md](./05-pod-and-empty-state.md) |
| 06 | Retire legacy CSS + final polish | AFK | done | 02, 03, 04, 05 | 14, 16 | [06-retire-legacy-css-final-polish.md](./06-retire-legacy-css-final-polish.md) |

## Ready

_(none)_

## In Progress

_(none)_

## Done

- 01 — Foundation + Header + Reset
- 02 — Narwhal card: Portrait + Badges
- 03 — Drag-to-swipe deck
- 04 — Match overlay (Dialog)
- 05 — Pod + empty state
- 06 — Retire legacy CSS + final polish
