import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { api } from './api.ts'
import type { CurrentUser, Match, NarwhalProfile, SwipeDirection } from './types.ts'
import { Header } from './components/Header.tsx'
import { SwipeDeck } from './components/SwipeDeck.tsx'
import { MatchesPanel } from './components/MatchesPanel.tsx'
import { MatchOverlay } from './components/MatchOverlay.tsx'
import { EmptyState } from './components/EmptyState.tsx'
import { Card } from './components/ui/card.tsx'
import { Toaster } from './components/ui/sonner.tsx'

export default function App() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [deck, setDeck] = useState<NarwhalProfile[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [matchWith, setMatchWith] = useState<NarwhalProfile | null>(null)

  // Load everything the app needs in one pass.
  async function load() {
    const [u, profiles, m] = await Promise.all([
      api.getCurrentUser(),
      api.getProfiles(),
      api.getMatches(),
    ])
    setUser(u)
    setDeck(profiles)
    setMatches(m)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const current = deck[0] ?? null
  const next = deck[1] ?? null

  async function handleSwipe(direction: SwipeDirection) {
    if (!current) return
    const swiped = current
    setBusy(true)
    try {
      const { matched } = await api.swipe(swiped.id, direction)
      // Remove the swiped narwhal from the top of the deck.
      setDeck((prev) => prev.slice(1))
      if (matched) {
        setMatches(await api.getMatches())
        setMatchWith(swiped)
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleReset() {
    setMatchWith(null)
    setLoading(true)
    await api.resetDemo()
    await load()
    toast.success('Demo reset. Fresh pod ahead!')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onReset={handleReset} />

      {loading ? (
        <div className="p-16 text-center text-muted-foreground">Loading narwhals…</div>
      ) : (
        <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-10 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="flex flex-col items-center gap-5">
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
              {deck.length > 0
                ? `${deck.length} narwhal${deck.length === 1 ? '' : 's'} left`
                : 'Deck cleared'}
            </div>

            {current ? (
              <SwipeDeck
                current={current}
                next={next}
                onSwipe={handleSwipe}
                disabled={busy}
              />
            ) : (
              <Card className="w-full max-w-[440px]">
                <EmptyState
                  icon={<Sparkles size={28} />}
                  title="You've seen every narwhal"
                  message="Check your matches, or reset the demo to swim through again."
                />
              </Card>
            )}
          </section>

          <MatchesPanel matches={matches} />
        </main>
      )}

      {matchWith && user && (
        <MatchOverlay user={user} profile={matchWith} onClose={() => setMatchWith(null)} />
      )}

      <Toaster />
    </div>
  )
}
