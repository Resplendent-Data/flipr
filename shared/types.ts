// Shared types used by both the API server and the React frontend.

/** A swipe decision the user can make on a profile. */
export type SwipeDirection = 'like' | 'pass'

/** The one signed-in demo user. */
export interface CurrentUser {
  id: number
  name: string
  avatarColor: string
}

/** A narwhal profile shown in the deck. */
export interface NarwhalProfile {
  id: number
  name: string
  age: number
  location: string
  bio: string
  traits: string[]
  interests: string[]
  lookingFor: string
  favoriteIce: string
  podStyle: string
  avatarColor: string
}

/**
 * A deck item: a narwhal wrapped with its Affinity (how well it fits the
 * current user's Preferences). The deck is served best-first by `affinity`, and
 * `affinityReason` is the short "why this fits" blurb shown on the card.
 * Affinity is a deck-only concept — it never appears on a Match or a bare
 * profile.
 */
export interface DeckEntry {
  profile: NarwhalProfile
  affinity: number
  affinityReason: string
}

/** A profile the user liked that became a match. */
export interface Match {
  id: number
  profile: NarwhalProfile
  createdAt: string
}

/** Request body for POST /api/swipes. */
export interface SwipeRequest {
  profileId: number
  direction: SwipeDirection
}

/** Response for POST /api/swipes. */
export interface SwipeResponse {
  ok: true
  matched: boolean
}
