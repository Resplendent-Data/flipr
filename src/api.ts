import type {
  CurrentUser,
  DeckEntry,
  Match,
  SwipeDirection,
  SwipeResponse,
} from './types.ts'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  getCurrentUser: () => get<CurrentUser>('/api/current-user'),
  getProfiles: () => get<DeckEntry[]>('/api/profiles'),
  getMatches: () => get<Match[]>('/api/matches'),
  swipe: (profileId: number, direction: SwipeDirection) =>
    post<SwipeResponse>('/api/swipes', { profileId, direction }),
  resetDemo: () => post<{ ok: true }>('/api/reset-demo'),
}
