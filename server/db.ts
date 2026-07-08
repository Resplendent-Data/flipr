import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CurrentUser, Match, NarwhalProfile } from '../shared/types.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** The committed demo database lives here so `git clone` ships live data. */
export const DB_PATH = resolve(__dirname, '../data/flipr.sqlite')

mkdirSync(dirname(DB_PATH), { recursive: true })

export const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

/** Create tables if they do not exist. Safe to call on every startup. */
export function initSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT NOT NULL,
      avatar_color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS narwhal_profiles (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT NOT NULL,
      age          INTEGER NOT NULL,
      location     TEXT NOT NULL,
      bio          TEXT NOT NULL,
      traits       TEXT NOT NULL,   -- JSON array of strings
      interests    TEXT NOT NULL,   -- JSON array of strings
      looking_for  TEXT NOT NULL,
      favorite_ice TEXT NOT NULL,
      pod_style    TEXT NOT NULL,
      avatar_color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS swipes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id),
      profile_id INTEGER NOT NULL REFERENCES narwhal_profiles(id),
      direction  TEXT NOT NULL CHECK (direction IN ('like', 'pass')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (user_id, profile_id)
    );

    CREATE TABLE IF NOT EXISTS matches (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id),
      profile_id INTEGER NOT NULL REFERENCES narwhal_profiles(id),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (user_id, profile_id)
    );
  `)
}

// --- Row shapes as stored in SQLite (snake_case, JSON columns as text) ---

interface ProfileRow {
  id: number
  name: string
  age: number
  location: string
  bio: string
  traits: string
  interests: string
  looking_for: string
  favorite_ice: string
  pod_style: string
  avatar_color: string
}

interface UserRow {
  id: number
  name: string
  avatar_color: string
}

/** Convert a stored profile row into the API/client-facing shape. */
export function toProfile(row: ProfileRow): NarwhalProfile {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    location: row.location,
    bio: row.bio,
    traits: JSON.parse(row.traits),
    interests: JSON.parse(row.interests),
    lookingFor: row.looking_for,
    favoriteIce: row.favorite_ice,
    podStyle: row.pod_style,
    avatarColor: row.avatar_color,
  }
}

function toUser(row: UserRow): CurrentUser {
  return { id: row.id, name: row.name, avatarColor: row.avatar_color }
}

/** The single demo user is always the first row in `users`. */
export function getCurrentUser(): CurrentUser {
  const row = db.prepare('SELECT * FROM users ORDER BY id LIMIT 1').get() as UserRow
  return toUser(row)
}

/** Profiles the user has not yet swiped, in seed order. */
export function getDeck(userId: number): NarwhalProfile[] {
  const rows = db
    .prepare(
      `SELECT p.* FROM narwhal_profiles p
       WHERE p.id NOT IN (SELECT profile_id FROM swipes WHERE user_id = ?)
       ORDER BY p.id`,
    )
    .all(userId) as ProfileRow[]
  return rows.map(toProfile)
}

/** Matches for the user, newest first. */
export function getMatches(userId: number): Match[] {
  const rows = db
    .prepare(
      `SELECT m.id AS match_id, m.created_at AS created_at, p.*
       FROM matches m
       JOIN narwhal_profiles p ON p.id = m.profile_id
       WHERE m.user_id = ?
       ORDER BY m.created_at DESC, m.id DESC`,
    )
    .all(userId) as (ProfileRow & { match_id: number; created_at: string })[]

  return rows.map((row) => ({
    id: row.match_id,
    createdAt: row.created_at,
    profile: toProfile(row),
  }))
}

/**
 * Record a swipe. A 'like' also creates a match. Returns whether a match was
 * made. Idempotent per (user, profile) thanks to the UNIQUE constraints.
 */
export function recordSwipe(
  userId: number,
  profileId: number,
  direction: 'like' | 'pass',
): boolean {
  const swipe = db.transaction(() => {
    db.prepare(
      `INSERT OR IGNORE INTO swipes (user_id, profile_id, direction)
       VALUES (?, ?, ?)`,
    ).run(userId, profileId, direction)

    if (direction === 'like') {
      db.prepare(
        `INSERT OR IGNORE INTO matches (user_id, profile_id) VALUES (?, ?)`,
      ).run(userId, profileId)
      return true
    }
    return false
  })
  return swipe()
}
