import { Heart, RotateCcw, X } from 'lucide-react'
import type { NarwhalProfile, SwipeDirection } from '../types.ts'
import { useSwipe } from '../useSwipe.ts'
import { ProfileCard } from './ProfileCard.tsx'

interface SwipeDeckProps {
  current: NarwhalProfile
  next: NarwhalProfile | null
  currentReason: string
  nextReason: string | null
  onSwipe: (direction: SwipeDirection) => void
  disabled: boolean
}

/**
 * The draggable card stack. The next card peeks from behind so the deck reads
 * as a pile; the top card is drag-to-swipe (via the reused useSwipe hook) with
 * LIKE/PASS stamps. Round action buttons below trigger the same fling.
 */
export function SwipeDeck({
  current,
  next,
  currentReason,
  nextReason,
  onSwipe,
  disabled,
}: SwipeDeckProps) {
  const swipe = useSwipe(current.id, onSwipe, !disabled)
  const locked = disabled || swipe.flinging

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
      <div className="relative w-full">
        {next && (
          <article
            className="pointer-events-none absolute inset-0 translate-y-5 scale-[0.94] brightness-[0.72]"
            aria-hidden="true"
          >
            <ProfileCard profile={next} affinityReason={nextReason ?? undefined} />
          </article>
        )}

        {/* Keyed by id so a new top card remounts and replays the rise-in animation. */}
        <div
          key={current.id}
          className="relative z-[2] animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300"
        >
          <article
            className={`relative touch-none select-none will-change-transform ${
              swipe.dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={swipe.style}
            {...swipe.handlers}
          >
            <div
              className="pointer-events-none absolute left-5 top-6 z-[3] -rotate-12 rounded-lg border-[3px] border-success px-4 py-1.5 text-2xl font-extrabold uppercase tracking-widest text-success"
              style={{ opacity: swipe.likeStamp }}
            >
              Like
            </div>
            <div
              className="pointer-events-none absolute right-5 top-6 z-[3] rotate-12 rounded-lg border-[3px] border-destructive px-4 py-1.5 text-2xl font-extrabold uppercase tracking-widest text-destructive"
              style={{ opacity: swipe.nopeStamp }}
            >
              Pass
            </div>
            <ProfileCard profile={current} affinityReason={currentReason} />
          </article>
        </div>
      </div>

      {/* Round action buttons, floating below the card. */}
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          disabled
          aria-label="Rewind (coming soon)"
          className="grid size-12 cursor-not-allowed place-items-center rounded-full border border-border bg-card text-muted-foreground opacity-45"
        >
          <RotateCcw className="size-5" />
        </button>
        <button
          type="button"
          disabled={locked}
          onClick={() => swipe.swipe('pass')}
          aria-label="Pass"
          className="grid size-16 place-items-center rounded-full border-2 border-destructive/70 bg-card text-destructive shadow-lg transition hover:scale-105 hover:bg-destructive hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        >
          <X className="size-7" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          disabled={locked}
          onClick={() => swipe.swipe('like')}
          aria-label="Like"
          className="grid size-16 place-items-center rounded-full border-2 border-success/70 bg-card text-success shadow-lg transition hover:scale-105 hover:bg-success hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        >
          <Heart className="size-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
