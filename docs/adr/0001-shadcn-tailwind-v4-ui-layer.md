# Adopt shadcn/ui on Tailwind v4 as the UI component layer

## Status

Accepted

## Context and decision

Flipr's frontend was first built with hand-authored CSS and the Resplendent
palette as plain CSS variables — a deliberately lean, near-zero-dependency
approach. We are replacing that with **shadcn/ui** (Radix primitives + vendored
component source) on **Tailwind v4** as the standard for all UI: Button, Card,
Badge, Avatar, Dialog (the match overlay), and Sonner (toasts). We chose this
for consistent, accessible primitives and faster iteration, mapping the
Resplendent palette onto shadcn's semantic design tokens so components stay
on-brand. Dark mode only.

## Considered options

- **Keep hand-rolled CSS** — most control, zero new deps, but every primitive
  (dialog focus-trapping, button variants, badges) is bespoke and must be built
  and maintained by hand; least accessible.
- **A runtime component library (MUI, Chakra)** — batteries included, but
  heavier runtime, opinionated styling that fights a custom brand, and you don't
  own the source.
- **shadcn/ui on Tailwind v4 (chosen)** — components are copied into the repo
  (we own and edit them), styled with Tailwind and themed through CSS-variable
  tokens, so brand control and accessibility both hold.

## Consequences

- Adds Tailwind v4 (`@tailwindcss/vite`), Radix UI primitives, and
  `class-variance-authority` / `clsx` / `tailwind-merge`. `lucide-react`
  (already present) is shadcn's icon set.
- Component source is vendored under the app (owned, editable) rather than
  imported from a package.
- The Resplendent palette is wired into shadcn's semantic tokens
  (`--background`, `--card`, `--primary`, `--destructive`, …); no light theme.
- The drag-to-swipe card has no shadcn equivalent — `useSwipe.ts` stays custom
  and the card is styled with Tailwind.
- The original hand-authored `src/index.css` is superseded and gets removed as
  components migrate.
- This reverses the earlier "lean, no build-tooling-beyond-Vite" posture on
  purpose; that is the trade-off we're accepting.
