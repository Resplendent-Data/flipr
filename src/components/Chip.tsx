import type { ReactNode } from 'react'

interface ChipProps {
  variant: 'trait' | 'interest'
  icon?: ReactNode
  children: ReactNode
}

/** Small labeled pill used for traits and interests. */
export function Chip({ variant, icon, children }: ChipProps) {
  return (
    <span className={`chip ${variant}`}>
      {icon}
      {children}
    </span>
  )
}
