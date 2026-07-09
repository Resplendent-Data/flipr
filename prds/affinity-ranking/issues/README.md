# Affinity Ranking — Implementation Issues

Board-friendly manifest for the [Rank the Deck by Affinity](../2026-07-09-rank-deck-by-affinity.md)
PRD. Terminology follows `CONTEXT.md` and `docs/adr/0002-affinity-preference-ranked-deck.md`.

## Slices (dependency order)

| # | Title | Type | Status | Blocked by | Stories | File |
|---|-------|------|--------|------------|---------|------|
| 01 | Rank the deck by Affinity | AFK | done | — | 1, 5, 6, 7, 9, 10, 11 | [01-rank-deck-by-affinity.md](./01-rank-deck-by-affinity.md) |
| 02 | Affinity reason on each card | AFK | ready | 01 | 2, 3, 4, 8 | [02-affinity-reason-on-each-card.md](./02-affinity-reason-on-each-card.md) |

## Ready

- **02 — Affinity reason on each card** (AFK, blocked by 01) — reason composition + zero-match fallback, `affinityReason` on `DeckEntry`, reason line on the card.

## In Progress

_None._

## Done

- **01 — Rank the deck by Affinity** (AFK) — schema + seeded Preferences, pure scoring, best-first deck, `DeckEntry` contract, client renders in order.
