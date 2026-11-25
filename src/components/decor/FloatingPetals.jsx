import { motion } from 'framer-motion'
import { createRandom, range } from '../../utils/random.js'
import { useIsMobile } from '../../hooks/useMediaQuery.js'
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref.js'
import { PETAL_PATH } from './paths.js'

const FILLS = ['url(#petal-fall)', '#ffffff', '#d6e4f4', '#a9c7e8']

function buildPetals(count, seed) {
  const random = createRandom(seed)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: range(random, 0, 100),
    size: range(random, 10, 22),
    duration: range(random, 11, 20),
    delay: -range(random, 0, 20),
    sway: range(random, 20, 60) * (random() > 0.5 ? 1 : -1),
    spin: range(random, 180, 540) * (random() > 0.5 ? 1 : -1),
    fill: FILLS[Math.floor(random() * FILLS.length)],
    opacity: range(random, 0.55, 0.95),
  }))
}

const PETALS_DESKTOP = buildPetals(20, 11)
const PETALS_MOBILE = PETALS_DESKTOP.slice(0, 11)

/**
 * Blue and white petals drifting down the viewport.
 * Pure transform/opacity animation; disabled for reduced motion.
 */
export default function FloatingPetals({ className = 'fixed inset-0 z-0', density = 1 }) {
  const isMobile = useIsMobile()
  const reduced = useReducedMotionPref()
  if (reduced) return null
  const pool = isMobile ? PETALS_MOBILE : PETALS_DESKTOP
  const petals = pool.slice(0, Math.max(1, Math.round(pool.length * density)))

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 20 28"
          className="absolute -top-10 drop-shadow-[0_2px_3px_rgba(23,45,87,0.15)]"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.4, opacity: p.opacity }}
          initial={{ y: '-5vh' }}
          animate={{ y: '110vh', x: [0, p.sway, 0], rotate: p.spin }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.duration / 2.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}
        >
          <path d={PETAL_PATH} fill={p.fill} stroke="#a9c7e8" strokeOpacity="0.6" strokeWidth="0.6" />
          <path d="M10 4 Q9.5 14 10 24" stroke="#a9c7e8" strokeOpacity="0.5" strokeWidth="0.5" fill="none" />
        </motion.svg>
      ))}
    </div>
  )
}
