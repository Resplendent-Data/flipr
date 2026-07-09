import { db, DB_PATH, initSchema } from './db.ts'
import { currentUser, profiles } from './seedData.ts'

/**
 * Reset the database to its pristine demo state:
 * clears swipes + matches and restores the seed user and profiles.
 * Used by both the seed script and the POST /api/reset-demo endpoint.
 */
export function seedDatabase(): void {
  initSchema()

  const reseed = db.transaction(() => {
    // Clear everything, including AUTOINCREMENT counters, for a clean slate.
    db.exec(`
      DELETE FROM matches;
      DELETE FROM swipes;
      DELETE FROM narwhal_profiles;
      DELETE FROM users;
      DELETE FROM sqlite_sequence
        WHERE name IN ('matches', 'swipes', 'narwhal_profiles', 'users');
    `)

    db.prepare(
      `INSERT INTO users
         (name, avatar_color, preferred_traits, preferred_pod_style, age_min, age_max)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      currentUser.name,
      currentUser.avatarColor,
      JSON.stringify(currentUser.preferences.preferredTraits),
      currentUser.preferences.preferredPodStyle,
      currentUser.preferences.ageMin,
      currentUser.preferences.ageMax,
    )

    const insertProfile = db.prepare(`
      INSERT INTO narwhal_profiles
        (name, age, location, bio, traits, interests, looking_for, favorite_ice, pod_style, avatar_color)
      VALUES
        (@name, @age, @location, @bio, @traits, @interests, @lookingFor, @favoriteIce, @podStyle, @avatarColor)
    `)

    for (const p of profiles) {
      insertProfile.run({
        ...p,
        traits: JSON.stringify(p.traits),
        interests: JSON.stringify(p.interests),
      })
    }
  })

  reseed()
}

// Allow running directly: `npm run seed`.
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
  // Fold the WAL back into the main file so the committed .sqlite is a clean,
  // self-contained single file after seeding.
  db.pragma('wal_checkpoint(TRUNCATE)')
  console.log(`Seeded ${profiles.length} narwhals into ${DB_PATH}`)
}
