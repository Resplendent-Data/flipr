import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  message: string
}

/** Shared empty-state block for the deck and the pod. */
export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 px-5 py-9 text-center text-muted-foreground">
      <div className="rounded-xl bg-[#4c3851]/40 p-4 text-[#bf8abd]">{icon}</div>
      <div className="text-base font-bold text-white">{title}</div>
      <div>{message}</div>
    </div>
  )
}
