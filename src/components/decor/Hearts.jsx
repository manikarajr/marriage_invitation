import { motion } from 'framer-motion'
import { HEART_PATH } from './paths.js'

/** Simple heart; outline or filled. */
export function Heart({ className = '', filled = false, strokeWidth = 5 }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <path
        d={HEART_PATH}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Gently beating filled heart. */
export function BeatingHeart({ className = '' }) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
      aria-hidden="true"
    >
      <Heart filled className="h-full w-full" />
    </motion.span>
  )
}

/** Two interlocking outlined hearts with a flourish (as on the card). */
export function TwinHearts({ className = '' }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: i * 0.25, duration: 1.4, ease: 'easeInOut' }, opacity: { delay: i * 0.25, duration: 0.2 } },
    }),
  }
  return (
    <motion.svg
      viewBox="0 0 240 70"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        custom={0}
        variants={draw}
        d="M4 52 C40 50 70 46 96 44"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        custom={0}
        variants={draw}
        d="M144 44 C170 46 200 50 236 52"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        custom={1}
        variants={draw}
        d="M110 58 C94 48 88 40 88 31 C88 24 93 19 100 19 C105 19 108 22 110 26 C112 22 115 19 120 19 C127 19 132 24 132 31 C132 40 126 48 110 58 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <motion.path
        custom={2}
        variants={draw}
        d="M130 60 C114 50 108 42 108 33 C108 26 113 21 120 21 C125 21 128 24 130 28 C132 24 135 21 140 21 C147 21 152 26 152 33 C152 42 146 50 130 60 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

/** "—•— ♡ —•—" ornamental divider. */
export function HeartDivider({ className = '', light = false }) {
  const line = light ? 'bg-ivory/50' : 'bg-navy/40'
  const dot = light ? 'bg-ivory/70' : 'bg-navy/60'
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className={`h-px w-12 sm:w-20 ${line}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${dot}`} />
      <Heart className={`h-5 w-5 ${light ? 'text-ivory' : 'text-navy'}`} strokeWidth={6} />
      <span className={`h-1.5 w-1.5 rotate-45 ${dot}`} />
      <span className={`h-px w-12 sm:w-20 ${line}`} />
    </div>
  )
}
