import { type CSSProperties } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

/** App toaster, themed to the Resplendent palette. Dark only. */
function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--border)',
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
