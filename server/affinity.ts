// Affinity scoring: how well an unswiped narwhal fits the current user's
// Preferences. Pure and database-free so it is trivially unit-testable.
import type { NarwhalProfile } from '../shared/types.ts'
import type { Preferences } from './seedData.ts'

/**
 * Score a narwhal against the current user's Preferences.
 *
 *   score = 2·(shared traits) + 1·(pod-style match) + 1·(age in range)
 *
 * Traits dominate; pod style and age are boosters. Interests are display-only
 * and deliberately do not contribute. A higher score means a better match.
 */
export function scoreAffinity(prefs: Preferences, narwhal: NarwhalProfile): number {
  const sharedTraits = narwhal.traits.filter((t) => prefs.preferredTraits.includes(t)).length
  const podStyleMatch = narwhal.podStyle === prefs.preferredPodStyle ? 1 : 0
  const ageInRange = narwhal.age >= prefs.ageMin && narwhal.age <= prefs.ageMax ? 1 : 0
  return 2 * sharedTraits + podStyleMatch + ageInRange
}
