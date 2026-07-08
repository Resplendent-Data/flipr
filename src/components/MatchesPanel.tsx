import { Heart, MapPin } from 'lucide-react'
import type { Match } from '../types.ts'
import { Avatar } from './Avatar.tsx'
import { EmptyState } from './EmptyState.tsx'
import { Card } from './ui/card.tsx'

interface MatchesPanelProps {
  matches: Match[]
}

/** The Pod: the current user's collection of Matches, always visible. */
export function MatchesPanel({ matches }: MatchesPanelProps) {
  return (
    <Card className="sticky top-24 gap-0 self-start p-5">
      <h2 className="flex items-center gap-2 text-base font-extrabold">
        <Heart size={18} className="text-accent" />
        Matches
        {matches.length > 0 && <span className="text-accent">· {matches.length}</span>}
      </h2>
      <p className="mb-4 mt-1 text-[13px] text-muted-foreground">
        Narwhals you liked show up here.
      </p>

      {matches.length === 0 ? (
        <EmptyState
          icon={<Heart size={28} />}
          title="No matches yet"
          message="Like a narwhal to start your pod."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center gap-3 rounded-xl border bg-secondary p-2.5 transition hover:bg-[#202a4a]"
            >
              <Avatar
                name={match.profile.name}
                color={match.profile.avatarColor}
                size={40}
              />
              <div className="min-w-0">
                <div className="text-sm font-bold">{match.profile.name}</div>
                <div className="mt-0.5 flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
                  <MapPin size={11} /> {match.profile.location} · {match.profile.age}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
