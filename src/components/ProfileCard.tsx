import { Compass, MapPin, Sparkles } from 'lucide-react'
import type { NarwhalProfile } from '../types.ts'
import { Badge } from './ui/badge.tsx'
import { Card } from './ui/card.tsx'
import { Portrait } from './Portrait.tsx'

interface ProfileCardProps {
  profile: NarwhalProfile
  /** The Affinity reason blurb — the short "why this fits" line. */
  affinityReason?: string
}

/**
 * A narwhal card: a tall gradient Portrait with the name/age/location overlaid
 * at the bottom (dating-app style), then the Affinity reason, bio, and
 * trait/interest badges below.
 */
export function ProfileCard({ profile, affinityReason }: ProfileCardProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0 shadow-[0_26px_60px_-22px_rgba(0,0,0,0.75)]">
      <div className="relative">
        <Portrait name={profile.name} color={profile.avatarColor} />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {profile.name}
            </span>
            <span className="text-2xl font-semibold text-white/85">{profile.age}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <MapPin size={14} />
            {profile.location}
          </div>
        </div>
      </div>

      <div className="p-5">
        {affinityReason && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2.5 text-[13px] font-medium leading-snug text-accent">
            <Sparkles size={14} className="mt-0.5 shrink-0" />
            <span>{affinityReason}</span>
          </div>
        )}

        <p className="text-[15px] leading-relaxed text-[#e6eaf5]">{profile.bio}</p>

        <div className="mb-2 mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Sparkles size={13} />
          Traits
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.traits.map((trait) => (
            <Badge
              key={trait}
              variant="outline"
              className="border-[#bf8abd]/35 bg-[#bf8abd]/10 px-3 py-1 text-[13px] text-[#bf8abd]"
            >
              {trait}
            </Badge>
          ))}
        </div>

        <div className="mb-2 mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Compass size={13} />
          Interests
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge
              key={interest}
              variant="outline"
              className="border-[#3366ff]/35 bg-[#3366ff]/12 px-3 py-1 text-[13px] text-[#a9c0ff]"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}
