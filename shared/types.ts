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
