import cors from 'cors'
import express from 'express'
import {
  getCurrentUser,
  getDeck,
  getMatches,
  initSchema,
  recordSwipe,
} from './db.ts'
import { seedDatabase } from './seed.ts'
import type { SwipeRequest, SwipeResponse } from '../shared/types.ts'

const PORT = 3001

initSchema()

const app = express()
app.use(cors())
app.use(express.json())

/** The signed-in demo user. */
app.get('/api/current-user', (_req, res) => {
  res.json(getCurrentUser())
})

/** The deck: profiles not yet swiped, in seed order. */
app.get('/api/profiles', (_req, res) => {
  const user = getCurrentUser()
  res.json(getDeck(user.id))
})

/** Everyone the user has liked. */
app.get('/api/matches', (_req, res) => {
  const user = getCurrentUser()
  res.json(getMatches(user.id))
})

/** Record a like/pass. A like becomes a match. */
app.post('/api/swipes', (req, res) => {
  const { profileId, direction } = req.body as Partial<SwipeRequest>

  if (typeof profileId !== 'number' || (direction !== 'like' && direction !== 'pass')) {
    res.status(400).json({ error: 'Expected { profileId: number, direction: "like" | "pass" }' })
    return
  }

  const user = getCurrentUser()
  const matched = recordSwipe(user.id, profileId, direction)
  const response: SwipeResponse = { ok: true, matched }
  res.json(response)
})

/** Wipe swipes/matches and restore the seed data. */
app.post('/api/reset-demo', (_req, res) => {
  seedDatabase()
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`🐳 Flipr API listening on http://localhost:${PORT}`)
})
