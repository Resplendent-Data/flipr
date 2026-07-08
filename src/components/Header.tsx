import { RotateCcw, Waves } from 'lucide-react'
import type { CurrentUser } from '../types.ts'
import { Avatar } from './Avatar.tsx'
import { Button } from './ui/button.tsx'

interface HeaderProps {
  user: CurrentUser | null
  onReset: () => void
}

export function Header({ user, onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/70 px-8 py-4 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <Waves className="text-primary" size={24} />
        <span className="text-xl font-extrabold tracking-tight">Flipr</span>
        <span className="ml-1 border-l border-border pl-2.5 text-[13px] font-medium text-muted-foreground">
          Tinder for narwhals
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {user && (
          <>
            <span>Swiping as {user.name}</span>
            <Avatar name={user.name} color={user.avatarColor} size={32} />
          </>
        )}
        <Button variant="secondary" size="sm" onClick={onReset} title="Reset demo data">
          <RotateCcw size={15} />
          Reset demo
        </Button>
      </div>
    </header>
  )
}
