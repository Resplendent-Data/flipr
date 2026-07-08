import { Heart } from 'lucide-react'
import type { CurrentUser, NarwhalProfile } from '../types.ts'
import { Avatar } from './Avatar.tsx'
import { Button } from './ui/button.tsx'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog.tsx'

interface MatchOverlayProps {
  user: CurrentUser
  profile: NarwhalProfile
  onClose: () => void
}

/**
 * The celebratory "It's a match!" moment, on a shadcn Dialog: two overlapping
 * Avatars, a beating heart, and an oversized headline. Radix provides the focus
 * trap, Escape-to-close, and backdrop dismissal; Keep swimming and the corner
 * close also dismiss it.
 */
export function MatchOverlay({ user, profile, onClose }: MatchOverlayProps) {
  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent className="max-w-[400px] gap-0 overflow-hidden text-center">
        {/* celebratory glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 75% at 50% 0%, rgba(255,61,113,0.20), transparent 60%), radial-gradient(90% 60% at 50% 100%, rgba(0,214,143,0.14), transparent 60%)',
          }}
        />

        <div className="relative">
          <DialogTitle className="mt-2 text-4xl font-extrabold tracking-tight">
            It&apos;s a match!
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            You and <span className="font-semibold text-white">{profile.name}</span> liked
            each other
          </DialogDescription>

          <div className="relative my-8 flex items-center justify-center">
            <Avatar
              name={user.name}
              color={user.avatarColor}
              size={104}
              className="ring-4 ring-card"
            />
            <Avatar
              name={profile.name}
              color={profile.avatarColor}
              size={104}
              className="-ml-6 ring-4 ring-card"
            />
            <span className="absolute left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-destructive text-white shadow-lg ring-4 ring-card [animation:beat_0.9s_ease-in-out_infinite]">
              <Heart size={22} fill="currentColor" />
            </span>
          </div>

          <Button size="lg" className="w-full" onClick={onClose}>
            Keep swimming
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
