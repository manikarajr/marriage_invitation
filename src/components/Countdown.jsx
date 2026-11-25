import { AnimatePresence, motion } from 'framer-motion'
import { wedding } from '../config/wedding.js'
import { useCountdown } from '../hooks/useCountdown.js'
import FloralCorner from './decor/FloralCorner.jsx'
import FloatingHearts from './decor/FloatingHearts.jsx'
import Reveal from './decor/Reveal.jsx'
import SectionHeading from './decor/SectionHeading.jsx'
import { BeatingHeart, HeartDivider } from './decor/Hearts.jsx'

function Unit({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-sky/30 bg-white/6 px-1 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:rounded-3xl sm:py-8">
      <div className="relative h-[1.15em] overflow-hidden font-display text-[clamp(2rem,9vw,4.5rem)] leading-[1.15] font-semibold text-ivory tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 font-display text-[0.65rem] font-semibold tracking-[0.25em] text-sky uppercase sm:text-sm">
        {label}
      </span>
    </div>
  )
}

function Celebration({ title, message }) {
  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
    >
      <BeatingHeart className="mx-auto h-14 w-14 text-sky" />
      <p className="mt-4 font-script text-[clamp(2.6rem,9vw,4.5rem)] leading-tight text-ivory">{title}</p>
      <p className="mt-3 font-serif text-lg text-ivory/85 italic sm:text-xl">{message}</p>
    </motion.div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds, status } = useCountdown(wedding.startISO)

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#2c4677_0%,#172d57_55%,#0f1f3f_100%)] px-5 py-20 text-ivory sm:py-28"
    >
      <FloralCorner className="pointer-events-none absolute -top-6 -left-6 w-40 opacity-25 sm:w-56" />
      <FloralCorner flip="xy" className="pointer-events-none absolute -right-6 -bottom-6 w-40 opacity-25 sm:w-56" />
      <FloatingHearts light count={6} />

      <div className="relative">
        <SectionHeading
          light
          id="countdown-title"
          eyebrow={status === 'upcoming' ? 'Counting down to' : 'Celebrating'}
          title="Our Wedding Day"
        />

        {status === 'upcoming' && (
          <Reveal className="mx-auto max-w-3xl">
            <div
              role="timer"
              aria-label={`${days} days, ${hours} hours and ${minutes} minutes until the wedding`}
              className="grid grid-cols-4 gap-2 sm:gap-5"
            >
              <Unit value={days} label="Days" />
              <Unit value={hours} label="Hours" />
              <Unit value={minutes} label="Minutes" />
              <Unit value={seconds} label="Seconds" />
            </div>
          </Reveal>
        )}

        {status === 'today' && (
          <Celebration
            title="Today is our wedding day!"
            message={`We are celebrating at ${wedding.venue}. Thank you for your love and blessings.`}
          />
        )}

        {status === 'past' && (
          <Celebration
            title="Happily married"
            message="Thank you for celebrating with us and for your love and blessings."
          />
        )}

        <Reveal delay={0.2} className="mt-10 text-center">
          <HeartDivider light className="mb-4" />
          <p className="font-display text-sm font-semibold tracking-[0.25em] text-ivory/90 uppercase sm:text-base">
            {wedding.dateLabel} · 10:00 AM IST
          </p>
        </Reveal>
      </div>
    </section>
  )
}
