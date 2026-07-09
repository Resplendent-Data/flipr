// Affinity scoring: how well an unswiped narwhal fits the current user's
// Preferences, plus the short "why" reason shown on its card. Pure and
// database-free so it is trivially unit-testable.
import type { NarwhalProfile } from '../shared/types.ts'
import type { Preferences } from './seedData.ts'

export interface Affinity {
  /** score = 2·(shared traits) + 1·(pod-style match) + 1·(age in range). */
  score: number
  /**
   * One-line reason built only from the matched *scored* signals (traits, pod
   * style, age) — up to three clauses. Interests are display-only and are never
   * cited. Falls back to a friendly line when nothing matched.
   */
  reason: string
}

/** Shown when a narwhal matches none of the scored signals (score 0). */
const FALLBACK_REASON = 'A fresh current to explore'

/**
 * Score a narwhal against the current user's Preferences and build its Affinity
 * reason. Traits dominate; pod style and age are boosters. A higher score means
 * a better match.
 */
export function computeAffinity(prefs: Preferences, narwhal: NarwhalProfile): Affinity {
  const matchedTraits = narwhal.traits.filter((t) => prefs.preferredTraits.includes(t))
  const podStyleMatch = narwhal.podStyle === prefs.preferredPodStyle
  const ageInRange = narwhal.age >= prefs.ageMin && narwhal.age <= prefs.ageMax

  const score = 2 * matchedTraits.length + (podStyleMatch ? 1 : 0) + (ageInRange ? 1 : 0)

  const clauses: string[] = []
  if (matchedTraits.length > 0) clauses.push(`shares ${matchedTraits.join(' + ')}`)
  if (podStyleMatch) clauses.push('same pod style')
  if (ageInRange) clauses.push('in your age range')

  // Capitalize the first letter so the blurb reads cleanly whichever clause
  // leads (e.g. "Same pod style" when only the booster matched).
  const joined = clauses.join(', ')
  const reason = joined ? joined[0].toUpperCase() + joined.slice(1) : FALLBACK_REASON
  return { score, reason }
}
