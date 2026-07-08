// The gradient "portrait" for a narwhal — the tall hero of the swipe card.
// They have no photos, so each portrait is a rich two-tone gradient derived
// from the profile's avatarColor, a big monogram initial, a faint narwhal
// watermark, and a bottom scrim so the overlaid name/age stays legible.

interface PortraitProps {
  name: string
  color: string
}

/** A two-tone gradient built from a single seed color, via CSS color-mix. */
function gradientFrom(color: string): string {
  return `linear-gradient(150deg, color-mix(in srgb, ${color} 70%, #ffffff), ${color} 52%, color-mix(in srgb, ${color} 72%, #05070f))`
}

export function Portrait({ name, color }: PortraitProps) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className="relative h-80 overflow-hidden"
      style={{ backgroundImage: gradientFrom(color) }}
    >
      {/* soft top light for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 80% at 50% -10%, rgba(255,255,255,0.22), transparent 55%)',
        }}
      />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="absolute -bottom-8 -right-6 w-48 rotate-6 fill-white/12"
      >
        <path d="M6 20c4-1 7-4 10-8l9-6-4 8c-2 4-6 8-11 9-3 .5-5-2-4-3z" />
        <path d="M21 6l6-4-4 8z" className="fill-white/25" />
      </svg>

      {/* monogram, sitting a little above center to leave room for the name */}
      <div className="absolute inset-0 grid place-items-center pb-16">
        <span
          className="text-[128px] font-extrabold leading-none tracking-tighter text-white/90"
          style={{ textShadow: '0 6px 26px rgba(0,0,0,0.3)' }}
        >
          {initial}
        </span>
      </div>

      {/* bottom scrim for the overlaid name/age/location */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
        style={{
          background: 'linear-gradient(to top, rgba(5,7,15,0.78), transparent)',
        }}
      />
    </div>
  )
}
