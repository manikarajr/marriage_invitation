import { motion } from 'framer-motion'
import { wedding } from '../config/wedding.js'
import FloralCorner from './decor/FloralCorner.jsx'
import FloatingHearts from './decor/FloatingHearts.jsx'
import Reveal from './decor/Reveal.jsx'
import { Heart, HeartDivider, TwinHearts } from './decor/Hearts.jsx'

const TAIL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 26px 50%)'

/** Navy banner with folded, notched tails. */
function Ribbon({ children }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl px-6 sm:px-10"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative -rotate-2">
        {/* tails */}
        <div
          className="absolute top-4 -bottom-4 left-0 w-16 bg-navy-deep sm:w-20"
          style={{ clipPath: TAIL, transform: 'translateX(-55%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-4 right-0 -bottom-4 w-16 bg-navy-deep sm:w-20"
          style={{ clipPath: TAIL, transform: 'translateX(55%) scaleX(-1)' }}
          aria-hidden="true"
        />
        {/* band */}
        <div className="relative rounded-sm bg-[linear-gradient(180deg,#2c4677,#172d57_55%,#13264b)] px-6 py-5 shadow-float sm:px-12 sm:py-7">
          <div className="absolute inset-x-3 inset-y-2 border-y border-dashed border-sky/40" aria-hidden="true" />
          {children}
        </div>
        <FloralCorner flip="y" stems={false} className="pointer-events-none absolute -bottom-12 -left-14 w-24 sm:-left-16 sm:w-32" />
        <FloralCorner flip="x" stems={false} className="pointer-events-none absolute -top-12 -right-14 w-24 sm:-right-16 sm:w-32" />
      </div>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer
      id="blessing"
      aria-labelledby="blessing-title"
      className="bg-watercolor relative overflow-hidden px-5 pt-20 pb-28 sm:pt-28"
    >
      <FloatingHearts />
      <FloralCorner className="pointer-events-none absolute -top-6 -left-6 w-36 opacity-80 sm:w-56" />
      <FloralCorner flip="x" className="pointer-events-none absolute -top-6 -right-6 w-36 opacity-80 sm:w-56" />

      <div className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <TwinHearts className="mx-auto w-40 text-navy sm:w-52" />
          <h2 id="blessing-title" className="sr-only">
            Blessings
          </h2>
          <p className="mt-4 font-serif text-[clamp(1.4rem,4.6vw,2.4rem)] leading-snug text-navy italic">
            {wedding.closingMessage}
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          <Ribbon>
            <p className="relative text-center font-script text-[clamp(1.9rem,6.5vw,3.4rem)] leading-tight text-ivory">
              {wedding.welcomeMessage}
              <Heart className="ml-2 inline-block h-[0.6em] w-[0.6em] align-middle text-sky" strokeWidth={6} />
            </p>
          </Ribbon>
        </div>

        <Reveal delay={0.3} className="mt-20 text-center">
          <p className="font-script text-[clamp(2.2rem,7vw,3.25rem)] leading-tight text-ink">
            {wedding.bride} <span className="text-navy-soft">&amp;</span> {wedding.groom}
          </p>
          <HeartDivider className="my-4" />
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-navy uppercase">
            {wedding.dateLabel}
          </p>
          <p className="mt-1 font-serif text-sm text-navy-soft italic">{wedding.venue}</p>
        </Reveal>
      </div>
    </footer>
  )
}
