import { motion } from 'framer-motion'
import { wedding } from '../config/wedding.js'
import FloralCorner from './decor/FloralCorner.jsx'
import FloatingHearts from './decor/FloatingHearts.jsx'
import Reveal from './decor/Reveal.jsx'
import { BeatingHeart, HeartDivider, TwinHearts } from './decor/Hearts.jsx'

// "With the blessings … celebrate the wedding of" — the lead-in before the names.
const lead = wedding.invitationMessage.split(wedding.bride)[0].trim()

export default function InvitationMessage() {
  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="bg-watercolor relative overflow-hidden px-5 py-20 sm:py-28"
    >
      <FloatingHearts />

      <Reveal className="relative mx-auto max-w-3xl">
        <div className="bg-paper relative rounded-4xl px-6 py-14 text-center shadow-float sm:px-14 sm:py-20">
          <div className="absolute inset-3 rounded-[1.6rem] border border-navy/20" aria-hidden="true" />
          <div className="absolute inset-5 rounded-[1.3rem] border border-sky/60" aria-hidden="true" />
          <FloralCorner className="pointer-events-none absolute -top-8 -left-8 w-32 sm:w-44" />
          <FloralCorner flip="xy" className="pointer-events-none absolute -right-8 -bottom-8 w-32 sm:w-44" />

          <div className="relative">
            <TwinHearts className="mx-auto w-40 text-navy sm:w-48" />
            <h2 id="invitation-title" className="mt-1 font-script text-[clamp(2.4rem,8vw,3.75rem)] leading-tight text-ink">
              You Are Invited
            </h2>
            <HeartDivider className="mt-3 mb-8" />

            {/* The invitation message, word for word */}
            <p className="font-serif text-[clamp(1.15rem,3.6vw,1.6rem)] leading-relaxed text-navy italic">
              {lead}{' '}
              <motion.span
                className="mt-5 block font-script text-[clamp(2.4rem,8vw,3.75rem)] leading-tight not-italic text-ink"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {wedding.bride}
              </motion.span>
              <span className="my-1 block font-display text-lg font-semibold tracking-[0.3em] not-italic text-navy-soft uppercase">
                {' '}and{' '}
              </span>
              <motion.span
                className="block font-script text-[clamp(2.4rem,8vw,3.75rem)] leading-tight not-italic text-ink"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {wedding.groom}.
              </motion.span>
            </p>

            <BeatingHeart className="mx-auto mt-8 h-8 w-8 text-navy" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
