# 🐳 Flipr — Tinder for Narwhals

A playful demo app. Browse narwhal profiles, **Pass** or **Like**, and build
your pod of matches. Dark, dashboard-style UI in a Resplendent Data-inspired
theme.

The SQLite database ships **committed** with live demo data, so you can clone,
run one command, and start swiping immediately.

---

## Install

```bash
npm install
```

> Requires Node 18+ (developed on Node 22). `better-sqlite3` compiles a native
> binding during install.

## Run

```bash
npm run dev
```

This starts **both** the API server and the frontend:

- API → http://localhost:3001
- Web → http://localhost:5173  ← open this

Vite proxies `/api/*` to the API server, so the frontend uses same-origin URLs.

## Where the database lives

```
data/flipr.sqlite
```

This file is committed to the repo and already contains the seeded demo data
(1 user + 12 narwhals). Nothing to set up on a fresh clone.

## Reset demo data

Three equivalent ways:

- Click **Reset demo** in the app header.
- `POST /api/reset-demo`
- `npm run seed` (rebuilds the committed database from scratch)

Reset clears all swipes and matches and restores the original 12 narwhals.

---

## Files that matter most

| File | Why it matters |
| --- | --- |
| `server/db.ts` | SQLite schema + all query helpers (deck, matches, swipes) |
| `server/seedData.ts` | The demo data — 12 narwhals and the current user |
| `server/seed.ts` | Reseed logic, shared by `npm run seed` and reset-demo |
| `server/index.ts` | Express API endpoints |
| `shared/types.ts` | The API contract, shared by server and client |
| `src/App.tsx` | App state: loads data, handles swipes, wires up the UI |
| `src/components/ProfileCard.tsx` | The main profile card + Pass/Like buttons |
| `src/components/MatchesPanel.tsx` | The matches list |
| `src/index.css` | The theme (brand palette as CSS variables) |

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/current-user` | The signed-in demo user |
| GET | `/api/profiles` | The deck (unswiped profiles, seed order) |
| GET | `/api/matches` | Liked profiles |
| POST | `/api/swipes` | Record a like/pass (`{ profileId, direction }`) |
| POST | `/api/reset-demo` | Wipe swipes/matches, restore seed data |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run API + frontend together |
| `npm run build` | Type-check and build the frontend |
| `npm run typecheck` | Type-check without emitting |
| `npm run seed` | Rebuild the committed SQLite demo database |
