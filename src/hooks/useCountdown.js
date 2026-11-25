import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function compute(startMs, endOfDayMs) {
  const now = Date.now()
  const diff = Math.max(0, startMs - now)
  let status = 'upcoming'
  if (now >= startMs) status = now < endOfDayMs ? 'today' : 'past'
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    status,
    isOver: status !== 'upcoming',
  }
}

/**
 * Live countdown to an absolute instant (ISO string with offset), so the
 * result is correct in every visitor's timezone. Never goes negative.
 *
 * status: 'upcoming' | 'today' (from start until 12 hours later) | 'past'
 */
export function useCountdown(targetISO, celebrateForHours = 12) {
  const startMs = new Date(targetISO).getTime()
  const endOfDayMs = startMs + celebrateForHours * HOUR
  const [state, setState] = useState(() => compute(startMs, endOfDayMs))

  useEffect(() => {
    const tick = () => setState(compute(startMs, endOfDayMs))
    // Align ticks with the start of each wall-clock second.
    let interval
    const timeout = setTimeout(() => {
      tick()
      interval = setInterval(tick, SECOND)
    }, SECOND - (Date.now() % SECOND))
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [startMs, endOfDayMs])

  return state
}
