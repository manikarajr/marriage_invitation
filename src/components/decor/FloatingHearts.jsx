import { motion } from 'framer-motion'
import { createRandom, range } from '../../utils/random.js'
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref.js'
import { Heart } from './Hearts.jsx'

const random = createRandom(42)
const HEARTS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: range(random, 4, 96),
  size: range(random, 10, 22),
  duration: range(random, 7, 12),
  delay: range(random, 0, 8),
  drift: range(random, -30, 30),
  filled: random() > 0.5,
}))

/** Small hearts rising softly inside the parent (which must be `relative`). */
export default function FloatingHearts({ count = 9, light = false }) {
  const reduced = useReducedMotionPref()
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {HEARTS.slice(0, count).map((h) => (
        <motion.div
          key={h.id}
          className={`absolute bottom-0 ${light ? 'text-sky' : 'text-navy/40'}`}
          style={{ left: `${h.left}%`, width: h.size, height: h.size }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [20, -320], x: [0, h.drift], opacity: [0, 0.8, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut' }}
        >
          <Heart filled={h.filled} className="h-full w-full" strokeWidth={7} />
        </motion.div>
      ))}
    </div>
  )
}
