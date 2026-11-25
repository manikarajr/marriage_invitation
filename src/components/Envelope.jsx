import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MailOpen } from 'lucide-react'
import { wedding } from '../config/wedding.js'
import { useFinePointer, useIsMobile } from '../hooks/useMediaQuery.js'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import FloatingPetals from './decor/FloatingPetals.jsx'
import FloralCorner from './decor/FloralCorner.jsx'
import WaxSeal from './decor/WaxSeal.jsx'
import ErrorBoundary from './decor/ErrorBoundary.jsx'
import { Heart } from './decor/Hearts.jsx'

const ParticlesCanvas = lazy(() => import('./decor/ParticlesCanvas.jsx'))

const EASE = [0.22, 1, 0.36, 1]

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

/** The invitation card tucked inside the envelope (sized with container units). */
function InvitationCardFace() {
  return (
    <div className="bg-paper relative h-full w-full overflow-hidden rounded-[2.5cqw] shadow-[0_10px_30px_-10px_rgba(11,24,48,0.45)]">
      <div className="absolute inset-[2.2cqw] rounded-[1.5cqw] border border-navy/25" />
      <div className="absolute inset-[3cqw] rounded-[1cqw] border border-sky/60" />
      <FloralCorner stems={false} className="absolute top-[-2cqw] left-[-2cqw] w-[22cqw]" />
      <FloralCorner flip="x" stems={false} className="absolute top-[-2cqw] right-[-2cqw] w-[22cqw]" />
      <div className="relative flex h-full flex-col items-center justify-center px-[8cqw] text-center text-navy">
        <Heart className="h-[4cqw] w-[4cqw] text-navy" strokeWidth={7} />
        <p className="font-script text-[7.5cqw] leading-[1.1]">Wedding Invitation</p>
        <p className="mt-[1.4cqw] font-script text-[6cqw] leading-[1.15]">{wedding.bride}</p>
        <p className="font-script text-[4.5cqw] leading-none text-navy-soft">&amp;</p>
        <p className="font-script text-[6cqw] leading-[1.15]">{wedding.groom}</p>
        <p className="mt-[2cqw] font-display text-[2.6cqw] font-semibold tracking-[0.25em] uppercase">
          {wedding.dateLabel}
        </p>
      </div>
    </div>
  )
}

/**
 * Full-screen opening scene: a sealed ivory envelope that opens in 3D
 * and slides out the invitation card.
 *
 * stage: closed → opening (seal breaks, flap lifts) → flapOpen (card
 * slides up) → cardOut (card comes forward, envelope falls away) → onOpened
 */
export default function Envelope({ onOpenStart, onOpened }) {
  const [stage, setStage] = useState('closed')
  const [webgl] = useState(detectWebGL)
  const timers = useRef([])
  const reduced = useReducedMotionPref()
  const finePointer = useFinePointer()
  const isMobile = useIsMobile()

  // Desktop-only tilt that follows the pointer.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-9, 9]), { stiffness: 110, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-1, 1], [7, -7]), { stiffness: 110, damping: 18 })

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const isClosed = stage === 'closed'
  const flapOpen = stage === 'flapOpen' || stage === 'cardOut'
  const cardOut = stage === 'cardOut'

  function handlePointerMove(event) {
    if (!finePointer || reduced || !isClosed) return
    px.set((event.clientX / window.innerWidth) * 2 - 1)
    py.set((event.clientY / window.innerHeight) * 2 - 1)
  }

  function handleOpen() {
    if (!isClosed) return
    onOpenStart?.()
    px.set(0)
    py.set(0)
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms))
    if (reduced) {
      setStage('cardOut')
      at(600, onOpened)
      return
    }
    setStage('opening')
    at(1150, () => setStage('flapOpen'))
    at(2350, () => setStage('cardOut'))
    at(3700, onOpened)
  }

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby="envelope-title"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#2c4677_0%,#172d57_45%,#0b1830_100%)] px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: 'easeInOut' } }}
      onPointerMove={handlePointerMove}
    >
      {/* ambience */}
      {webgl && !reduced && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ParticlesCanvas count={isMobile ? 140 : 280} />
          </Suspense>
        </ErrorBoundary>
      )}
      <FloatingPetals className="absolute inset-0" />
      <FloralCorner className="pointer-events-none absolute -top-4 -left-4 w-[38vw] max-w-65 opacity-40" />
      <FloralCorner flip="xy" className="pointer-events-none absolute -right-4 -bottom-4 w-[38vw] max-w-65 opacity-40" />

      {/* heading */}
      <motion.header
        className="relative z-10 mb-8 text-center sm:mb-12"
        animate={isClosed ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.p
          className="font-display text-xs font-semibold tracking-[0.4em] text-sky uppercase sm:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          You are cordially invited
        </motion.p>
        <motion.h1
          id="envelope-title"
          className="mt-2 font-script text-[clamp(2.75rem,11vw,4.75rem)] leading-none text-ivory drop-shadow-[0_4px_20px_rgba(169,199,232,0.35)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Wedding Invitation
        </motion.h1>
        <motion.p
          className="mt-3 font-serif text-sm text-ivory/80 italic sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          {wedding.bride} &amp; {wedding.groom}
        </motion.p>
      </motion.header>

      {/* envelope */}
      <div
        className="perspective-far relative z-10"
        style={{ width: 'clamp(220px, min(88vw, calc((100svh - 17rem) * 1.5)), 520px)' }}
      >
        <motion.div
          className="@container perspective-near relative aspect-3/2 w-full"
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={
            isClosed && !reduced
              ? { opacity: 1, scale: 1, y: [0, -8, 0] }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{
            opacity: { duration: 0.9, delay: 0.2 },
            scale: { duration: 0.9, delay: 0.2, ease: EASE },
            y: isClosed ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 },
          }}
        >
          {/* ground shadow */}
          <motion.div
            className="absolute inset-x-[10%] bottom-[-9%] h-[12%] rounded-[50%] bg-black/45 blur-xl"
            animate={{ opacity: cardOut ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* back panel / inner liner */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-[2cqw] bg-[linear-gradient(180deg,#c9dcf1_0%,#e3ecf7_40%,#f3e8d8_100%)] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)]"
            animate={cardOut ? { opacity: 0, y: '25%' } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <FloralCorner className="absolute top-[-4cqw] left-[20cqw] w-[26cqw] opacity-40" />
            <FloralCorner flip="x" className="absolute top-[-4cqw] right-[20cqw] w-[26cqw] opacity-40" />
          </motion.div>

          {/* invitation card */}
          <motion.div
            className="absolute top-[7%] right-[6%] left-[6%] h-[86%]"
            style={{ zIndex: cardOut ? 40 : 10 }}
            animate={
              cardOut
                ? { y: '-14%', scale: isMobile ? 1.12 : 1.22 }
                : flapOpen
                  ? { y: '-58%', scale: 1 }
                  : { y: '0%', scale: 1 }
            }
            transition={{ duration: cardOut ? 1.1 : 1.15, ease: EASE }}
          >
            <InvitationCardFace />
          </motion.div>

          {/* front pocket */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            animate={cardOut ? { opacity: 0, y: '30%' } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <svg
              viewBox="0 0 300 200"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pocket-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#f6ecdd" />
                  <stop offset="1" stopColor="#fdf7ee" />
                </linearGradient>
                <linearGradient id="pocket-side-r" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stopColor="#f6ecdd" />
                  <stop offset="1" stopColor="#fdf7ee" />
                </linearGradient>
                <linearGradient id="pocket-bottom" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#fbf3e7" />
                  <stop offset="1" stopColor="#fffaf3" />
                </linearGradient>
              </defs>
              <path d="M0 6 Q0 0 6 0 L150 112 L6 200 Q0 200 0 194 Z" fill="url(#pocket-side)" />
              <path d="M300 6 Q300 0 294 0 L150 112 L294 200 Q300 200 300 194 Z" fill="url(#pocket-side-r)" />
              <path
                d="M6 200 L150 98 L294 200 Z"
                fill="url(#pocket-bottom)"
                stroke="#172d57"
                strokeOpacity="0.08"
                strokeWidth="0.8"
              />
              <path d="M6 200 L150 98 L294 200" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.6" />
            </svg>
            <FloralCorner flip="y" stems={false} className="absolute bottom-[-3cqw] left-[-3cqw] w-[30cqw]" />
            <FloralCorner flip="xy" stems={false} className="absolute right-[-3cqw] bottom-[-3cqw] w-[30cqw]" />
            <p className="absolute inset-x-0 bottom-[8%] text-center font-script text-[4.2cqw] text-navy/70">
              {wedding.bride} &amp; {wedding.groom}
            </p>
          </motion.div>

          {/* top flap — hinged along the top edge */}
          <motion.div
            className="preserve-3d absolute inset-x-0 top-0 h-[58%]"
            style={{ transformOrigin: '50% 0%', zIndex: flapOpen ? 5 : 30 }}
            animate={
              cardOut
                ? { rotateX: 180, opacity: 0 }
                : { rotateX: isClosed ? 0 : 180, opacity: 1 }
            }
            transition={{
              rotateX: { duration: 1, delay: isClosed ? 0 : 0.2, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.6 },
            }}
          >
            {/* outside face */}
            <svg
              viewBox="0 0 300 116"
              preserveAspectRatio="none"
              className="backface-hidden absolute inset-0 h-full w-full drop-shadow-[0_6px_6px_rgba(23,45,87,0.18)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flap-out" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fbf3e6" />
                  <stop offset="1" stopColor="#fffaf2" />
                </linearGradient>
              </defs>
              <path d="M0 6 Q0 0 6 0 L294 0 Q300 0 300 6 L156 112 Q150 116 144 112 Z" fill="url(#flap-out)" />
              <path
                d="M14 6 L150 104 L286 6"
                fill="none"
                stroke="#a9c7e8"
                strokeWidth="0.9"
                strokeDasharray="3 3"
              />
            </svg>
            {/* inside face (visible once opened) */}
            <svg
              viewBox="0 0 300 116"
              preserveAspectRatio="none"
              className="backface-hidden absolute inset-0 h-full w-full"
              style={{ transform: 'rotateX(180deg)' }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flap-in" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#bcd3ee" />
                  <stop offset="1" stopColor="#e3ecf7" />
                </linearGradient>
              </defs>
              <path d="M0 6 Q0 0 6 0 L294 0 Q300 0 300 6 L156 112 Q150 116 144 112 Z" fill="url(#flap-in)" />
              <path d="M20 8 L150 100 L280 8" fill="none" stroke="#172d57" strokeOpacity="0.25" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* heart wax seal */}
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={handleOpen}
            className="absolute top-[58%] left-1/2 z-35 w-[19cqw] drop-shadow-[0_6px_10px_rgba(11,24,48,0.45)]"
            style={{ x: '-50%', y: '-50%' }}
            animate={
              isClosed
                ? { scale: 1, opacity: 1, rotate: 0 }
                : { scale: [1, 1.15, 0.3], opacity: [1, 1, 0], rotate: -16 }
            }
            whileHover={isClosed ? { scale: 1.06 } : undefined}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          >
            <WaxSeal className="h-auto w-full" />
          </motion.button>
        </motion.div>
      </div>

      {/* call to action */}
      <motion.div
        className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:mt-14"
        initial={{ opacity: 0, y: 16 }}
        animate={isClosed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: isClosed ? 1 : 0 }}
      >
        <motion.button
          type="button"
          autoFocus
          onClick={handleOpen}
          disabled={!isClosed}
          aria-label="Open the wedding invitation"
          className="group relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full border border-sky/50 bg-ivory px-7 py-3 font-display text-base font-semibold tracking-[0.2em] text-navy uppercase shadow-[0_10px_30px_-8px_rgba(169,199,232,0.6)] transition-colors hover:bg-white focus-visible:outline-ivory sm:px-9 sm:text-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
            aria-hidden="true"
          />
          <MailOpen className="h-5 w-5" aria-hidden="true" />
          Open Invitation
        </motion.button>
        <p className="font-serif text-xs text-sky/80 italic sm:text-sm">Tap the seal or the button</p>
      </motion.div>
    </motion.section>
  )
}
