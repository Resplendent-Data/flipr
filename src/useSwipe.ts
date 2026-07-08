import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { SwipeDirection } from './types.ts'

// Hand-rolled drag-to-swipe. No animation library: the card follows the
// pointer, tilts, and shows LIKE/NOPE stamps as you drag. Release past the
// threshold flings it off-screen; otherwise it springs back. Buttons reuse the
// same fling via `swipe()`.

const THRESHOLD = 110 // px of horizontal travel needed to commit
const FLING_MS = 320 // must match the fling transition below

export interface SwipeState {
  handlers: {
    onPointerDown: (e: ReactPointerEvent) => void
    onPointerMove: (e: ReactPointerEvent) => void
    onPointerUp: (e: ReactPointerEvent) => void
    onPointerCancel: (e: ReactPointerEvent) => void
  }
  style: { transform: string; transition: string }
  dragging: boolean
  flinging: boolean
  likeStamp: number // 0..1 opacity for the LIKE stamp
  nopeStamp: number // 0..1 opacity for the NOPE stamp
  swipe: (direction: SwipeDirection) => void // programmatic (Pass/Like buttons)
}

/**
 * @param cardId  the current top card's id — state resets when it changes
 * @param onCommit called once the fling animation finishes
 * @param enabled  false disables all input (e.g. while a request is in flight)
 */
export function useSwipe(
  cardId: number,
  onCommit: (direction: SwipeDirection) => void,
  enabled: boolean,
): SwipeState {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)
  const [fling, setFling] = useState<SwipeDirection | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const dragRef = useRef<{ x: number; y: number } | null>(null)

  // A new top card is a fresh start — clear any leftover drag/fling state.
  useEffect(() => {
    setDrag(null)
    setFling(null)
    start.current = null
    dragRef.current = null
  }, [cardId])

  function commit(direction: SwipeDirection) {
    setFling(direction)
    window.setTimeout(() => onCommit(direction), FLING_MS)
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (!enabled || fling) return
    start.current = { x: e.clientX, y: e.clientY }
    dragRef.current = { x: 0, y: 0 }
    setDrag({ x: 0, y: 0 })
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!start.current) return
    const next = { x: e.clientX - start.current.x, y: e.clientY - start.current.y }
    dragRef.current = next
    setDrag(next)
  }

  const finish = () => {
    const d = dragRef.current
    start.current = null
    if (!d) return
    if (d.x > THRESHOLD) commit('like')
    else if (d.x < -THRESHOLD) commit('pass')
    else {
      setDrag(null)
      dragRef.current = null
    }
  }

  const swipe = (direction: SwipeDirection) => {
    if (!enabled || fling) return
    commit(direction)
  }

  // Resolve the card transform for this render.
  let transform = 'translate3d(0, 0, 0) rotate(0deg)'
  let transition = 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)'
  if (fling) {
    const dir = fling === 'like' ? 1 : -1
    transform = `translate3d(${dir * 140}%, 24px, 0) rotate(${dir * 16}deg)`
    transition = `transform ${FLING_MS}ms ease-out`
  } else if (drag) {
    transform = `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${drag.x * 0.05}deg)`
    transition = 'none'
  }

  const dx = fling ? (fling === 'like' ? THRESHOLD : -THRESHOLD) : (drag?.x ?? 0)
  const likeStamp = Math.min(Math.max(dx / THRESHOLD, 0), 1)
  const nopeStamp = Math.min(Math.max(-dx / THRESHOLD, 0), 1)

  return {
    handlers: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish },
    style: { transform, transition },
    dragging: drag !== null,
    flinging: fling !== null,
    likeStamp,
    nopeStamp,
    swipe,
  }
}
