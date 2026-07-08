# Flipr UI Redesign — shadcn/ui + Tailwind v4

## Problem Statement

Flipr is about to be shown as a live demo on a wide desktop screen, and the
current UI doesn't hold up. It reads flat and unfinished: every narwhal's
Portrait is a solid color block with a generic fish glyph, the panels are three
near-identical navy tones with no depth or focal point, there is no motion (Pass
and Like hard-swap the card instantly), and the small card floats in a wide
column leaving dead gutters. The current user's location is even printed twice.
It looks like an admin panel, not a smooth consumer product worth demoing.

## Solution

Rebuild the frontend on **shadcn/ui** (Radix primitives, vendored component
source) styled with **Tailwind v4**, keeping the exact **Resplendent palette**
so it stays on-brand while finally reading like a polished product. The
experience becomes: gradient monogram **Portraits** with real per-narwhal
personality; a balanced desktop **two-column layout** with the **Pod**
(matches) always visible; tactile **drag-to-swipe** where the card follows the
cursor, tilts, and shows LIKE/PASS stamps before flinging off while the next
narwhal peeks behind; and a celebratory **"It's a match!" overlay** when a Like
lands. The look gains depth (subtle shadows, larger radii, layered panels) but
the page **background carries no gradient**.

The hand-rolled prototype from the earlier (premature) implementation is kept as
a visual reference; the styling-agnostic `useSwipe` drag hook is reused as-is.

## User Stories

1. As the current user, I want to browse a deck of narwhals one card at a time, so that I can decide on each in turn.
2. As the current user, I want each narwhal's card to show a distinctive gradient monogram Portrait, name, age, location (shown once), bio, traits, and interests, so that each narwhal has personality.
3. As the current user, I want to drag the top card right to Like or left to Pass, so that swiping feels like a real dating app.
4. As the current user, I want the card to tilt and reveal a LIKE or PASS stamp as I drag, so that I get clear feedback on which way I'm about to commit.
5. As the current user, I want releasing past a threshold to fling the card off-screen, and releasing short of it to spring the card back, so that accidental small drags don't count.
6. As the current user, I want Pass and Like buttons that trigger the same fling, so that I can decide without dragging (and so the action is keyboard-reachable).
7. As the current user, I want to see the next narwhal peeking behind the current card, so that the deck reads as a real stack.
8. As the current user, I want a celebratory "It's a match!" overlay when a Like becomes a Match, showing my Avatar and the narwhal's, so that matching feels rewarding.
9. As the current user, I want to dismiss the match overlay via a button, a backdrop click, or the Escape key, so that I can get back to swiping quickly.
10. As the current user, I want my Pod of Matches visible beside the deck at all times, so that I can watch it grow as I swipe.
11. As the current user, I want a clear empty state when I've swiped the whole deck, so that I know there's nothing left and what to do next.
12. As the current user, I want a clear empty state in the Pod before I have any Matches, so that the panel doesn't look broken.
13. As the current user, I want to reset the demo and see a brief confirmation toast, so that I can restart the demo cleanly between runs.
14. As the current user, I want the layout to fill a wide desktop screen without floaty gutters, and without a horizontal scrollbar flashing when a card flings off, so that it looks intentional on the demo display.
15. As the current user, I want the interface to be interaction-locked while a swipe is being recorded, so that rapid inputs can't double-submit or corrupt the deck.
16. As a presenter, I want every control (dialog, buttons, badges) to be accessible by keyboard and screen reader out of the box, so that the demo reflects real product quality.
17. As a presenter, I want consistent Resplendent branding across all components, so that shadcn's defaults never leak a generic look.

## Implementation Decisions

- **Adopt shadcn/ui on Tailwind v4** as the standard UI layer (see `docs/adr/0001-shadcn-tailwind-v4-ui-layer.md`). Component source is vendored into the app and owned; dark mode only.
- **Tailwind v4 setup** via the `@tailwindcss/vite` plugin (no separate PostCSS config). `src/index.css` is rewritten as the Tailwind entrypoint (`@import "tailwindcss"` plus the theme token layer); its hand-authored component styles are removed as components migrate.
- **Palette → semantic-token mapping** (for review): `background` = `#101426`; body text `foreground` = `#ffffff` with softer body copy at `#e6eaf5`; `card` = `#151a30`; `popover`/secondary surfaces = `#192038`; `primary` = `#3366ff` (blue); `accent` = `#fac951` (yellow, used for the Pod count); `destructive` = `#ff3d71` (pink, used for Pass); a custom `success` token = `#00d68f` (green, used for Like); `border`/`input` = `#232a45`; `ring` = `#3366ff`. Base radius ~12px, hero card larger (~20px).
- **Component inventory:**
  - Match overlay → shadcn **Dialog** (Radix): gains focus trap, Escape-to-close, backdrop click, and ARIA for free.
  - Pass / Like / Reset / "Keep swimming" → shadcn **Button** variants (Pass = destructive outline, Like = success outline, Reset = secondary, Keep swimming = primary).
  - Trait / Interest chips → shadcn **Badge** variants.
  - Small circular Avatars (Pod rows, header, overlay) → shadcn **Avatar** with `AvatarFallback` initials; the gradient is applied inline since there is no image.
  - Card frames (profile card shell, Pod rows, empty states) → shadcn **Card**.
  - Reset confirmation → **Sonner** toast.
  - **Portrait** has no shadcn equivalent — it stays a custom component (gradient built from `avatarColor` via CSS `color-mix`, monogram, faint narwhal watermark) styled with Tailwind, rendered inside the Card.
- **Drag-to-swipe** keeps the custom `useSwipe` hook (pointer events, tilt, threshold, fling, LIKE/PASS stamp opacities) unchanged; only the draggable card's styling moves from `index.css` to Tailwind. Threshold and fling timing carry over from the prototype.
- **Card stack** renders the next narwhal as a dimmed, scaled-down peek behind the draggable top card; the top card replays a short "rise" enter animation when it becomes current.
- **No background gradient** — the page background is a flat brand surface. Subtle gradients remain only where they carry meaning: the Portraits and Avatars.
- **"Pass" is canonical** for the reject action (see `CONTEXT.md`); the drag stamp reads "PASS", not "Nope."
- **Match flow unchanged at the data layer:** a Like still calls the existing swipe endpoint; the overlay is driven purely from client state (the liked narwhal + current user). No new fields cross the API.
- **Offline-friendly:** no external fonts or CDN assets, so the demo renders reliably without network.

## Testing Decisions

- Automated tests are optional for this demo-focused redesign; there is no existing test harness in the repo, so priority is manual verification via `npm run dev` plus a passing `npm run build` (type-check + bundle) as the regression gate.
- If any unit tests are added, target the **decision logic in `useSwipe`** (threshold crossing → correct direction, sub-threshold → spring back, stamp-opacity math), since that is pure and behavior-observable, not the presentational components.
- Good tests here assert **external behavior** — "dragging past the threshold commits a Like", "a Pass never creates a Match" — over implementation details like class names or transform strings.
- Manual smoke checklist: drag both directions, buttons trigger the same fling, peek card visible, match overlay opens and dismisses three ways, Pod grows, both empty states, reset restores, no horizontal scrollbar during fling, wide-screen layout has no dead gutters.

## Out of Scope

- No backend, API, database, or schema changes — the redesign is frontend-only.
- No mobile-first optimization; desktop is the primary target (existing responsive stacking is retained but not expanded).
- No light theme, no theme toggle — dark only.
- No real narwhal photos, no auth, no multi-user.

## Further Notes

- Decisions originate from a `grill-with-docs` session; terminology follows `CONTEXT.md` (Narwhal, Deck, Swipe/Pass/Like, Match, Pod, Portrait vs Avatar) and the architecture decision in `docs/adr/0001-shadcn-tailwind-v4-ui-layer.md`.
- The prototype (`src/components/*`, `src/useSwipe.ts`, `src/index.css`) is a working reference for the target look and feel; the migration re-skins it on shadcn rather than reinventing the interaction.
- Suggested migration order: (1) install/configure Tailwind v4 + shadcn and wire palette tokens, (2) add the shadcn primitives, (3) re-skin Portrait/Card/Badge/Avatar and the deck, (4) move the match overlay to Dialog and the reset toast to Sonner, (5) delete the retired hand-authored styles once nothing references them.

## Implementation Issues

Broken into 6 tracer-bullet vertical slices — see the board manifest at
[issues/README.md](./issues/README.md). Critical chain: 01 → 02 → 03 → 04;
slice 05 (Pod) runs in parallel; slice 06 is the final cleanup.

1. [Foundation + Header + Reset](./issues/01-foundation-header-reset.md) — stories 13, 17
2. [Narwhal card: Portrait + Badges](./issues/02-narwhal-card-portrait-badges.md) — story 2
3. [Drag-to-swipe deck](./issues/03-drag-to-swipe-deck.md) — stories 1, 3, 4, 5, 6, 7, 11, 15
4. [Match overlay (Dialog)](./issues/04-match-overlay-dialog.md) — stories 8, 9, 16
5. [Pod + empty state](./issues/05-pod-and-empty-state.md) — stories 10, 12
6. [Retire legacy CSS + final polish](./issues/06-retire-legacy-css-final-polish.md) — stories 14, 16
