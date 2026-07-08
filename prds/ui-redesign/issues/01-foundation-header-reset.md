---
title: "Foundation + Header + Reset"
type: AFK
status: done
blocked_by: []
depends_on_story_ids: [13, 17]
slice_order: 1
---

## What to build

Stand up the shadcn/ui + Tailwind v4 foundation and prove it end-to-end by
re-skinning the header and the reset flow.

Install Tailwind v4 (via the `@tailwindcss/vite` plugin, no separate PostCSS
config) and initialize shadcn, dark mode only. Map the Resplendent palette onto
shadcn's semantic tokens, including a **custom `success` token (green)** for
Like alongside `destructive` (pink) for Pass. Flatten the page background —
remove the radial gradient glows so the background is a flat brand surface.
Bring in the `Button` and `Avatar` primitives. Convert the **Header** (brand
mark, "Swiping as Nara" with the gradient Avatar, and the Reset control) to
shadcn, and make **Reset** show a themed **Sonner** toast confirmation.

This is the tracer bullet: the app boots on the new stack and one real control
plus the reset flow are already on-brand.

## Acceptance criteria

- [x] Tailwind v4 compiles via the Vite plugin; `npm run dev` runs and `npm run build` passes.
- [x] shadcn initialized; component source is vendored into the repo; dark-only (no theme toggle).
- [x] Resplendent palette wired to semantic tokens: background `#101426`, card `#151a30`, secondary surfaces `#192038`, primary `#3366ff`, destructive `#ff3d71`, custom success `#00d68f`, accent `#fac951`, muted-foreground `#8f9bb3`, border `#232a45`, ring blue.
- [x] Page background is a flat brand color — no gradient.
- [x] Header renders on shadcn: brand, current user name + gradient Avatar, Reset as a shadcn Button.
- [x] Resetting the demo restores the deck + pod and shows a Sonner toast confirmation.
- [x] Nothing reads like a generic shadcn default — the header is unmistakably on-brand.

## Blocked by

- None - can start immediately
