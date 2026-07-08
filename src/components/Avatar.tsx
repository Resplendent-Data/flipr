import { Avatar as AvatarRoot, AvatarFallback } from './ui/avatar.tsx'
import { cn } from '../lib/utils.ts'

interface AvatarProps {
  name: string
  color: string
  size?: number
  className?: string
}

// A circular gradient avatar built on the shadcn Avatar primitive. Narwhals
// have no photos, so we render only the fallback: a themed gradient (matching
// the card Portrait) with the initial.
export function Avatar({ name, color, size = 40, className }: AvatarProps) {
  const gradient = `linear-gradient(145deg, color-mix(in srgb, ${color} 68%, #ffffff), ${color}, color-mix(in srgb, ${color} 74%, #05070f))`
  return (
    <AvatarRoot
      style={{ width: size, height: size }}
      className={cn('shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]', className)}
    >
      <AvatarFallback
        className="text-white"
        style={{ backgroundImage: gradient, fontSize: size * 0.4 }}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </AvatarRoot>
  )
}
