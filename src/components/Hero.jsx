import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { reference, wedding } from '../config/wedding.js'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import FloralCorner from './decor/FloralCorner.jsx'
import CroppedImage from './decor/CroppedImage.jsx'
import { HeartDivider, TwinHearts } from './decor/Hearts.jsx'
import SectionLink from './SectionLink.jsx'

const MotionSectionLink = motion.create(SectionLink)

const EASE = [0.22, 1, 0.36, 1]

/** Script text that appears as if written in ink, left to right. */
function InkReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.span
      className={`block ${className}`}
      initial={{ clipPath: 'inset(-40% 105% -40% -10%)', opacity: 0.2, filter: 'blur(4px)' }}
      animate={{ clipPath: 'inset(-40% -10% -40% -10%)', opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.6, delay, ease: [0.45, 0, 0.25, 1] }}
    >
      {children}
    </motion.span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotionPref()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift = reduced ? 0 : 1
  const up = useTransform(scrollYProgress, [0, 1], [0, -90 * drift])
  const down = useTransform(scrollYProgress, [0, 1], [0, 70 * drift])
  const artY = useTransform(scrollYProgress, [0, 1], [0, 60 * drift])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-names"
      className="bg-watercolor relative flex min-h-svh items-center overflow-hidden pt-24 pb-20 md:pt-28"
    >
      {/* parallax florals */}
      <motion.div style={{ y: up }} className="pointer-events-none absolute -top-6 -left-6 w-[34vw] max-w-75">
        <FloralCorner />
      </motion.div>
      <motion.div style={{ y: up }} className="pointer-events-none absolute -top-6 -right-6 w-[30vw] max-w-65">
        <FloralCorner flip="x" />
      </motion.div>
      <motion.div style={{ y: down }} className="pointer-events-none absolute -bottom-6 -left-6 w-[28vw] max-w-60">
        <FloralCorner flip="y" />
      </motion.div>
      <motion.div style={{ y: down }} className="pointer-events-none absolute -right-6 -bottom-6 w-[34vw] max-w-75">
        <FloralCorner flip="xy" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.15fr] md:gap-6">
        {/* illustration in an arched frame */}
        <motion.div
          style={{ y: artY }}
          className="perspective-far mx-auto w-[min(62vw,360px)] md:order-none md:w-[min(36vw,400px)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -18 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-t-full border border-navy/25" aria-hidden="true" />
              <div className="absolute -inset-1.5 rounded-t-full border-2 border-sky/70" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-t-full border-4 border-white bg-mist shadow-float">
                <CroppedImage
                  src={reference.src}
                  source={reference}
                  crop={reference.crops.couple}
                  alt={`Illustration of the bride ${wedding.bride} and the groom ${wedding.groom}`}
                  loading="eager"
                  style={{
                    maskImage: 'linear-gradient(to right, #000 86%, transparent 99%)',
                    WebkitMaskImage: 'linear-gradient(to right, #000 86%, transparent 99%)',
                  }}
                />
              </div>
              <FloralCorner flip="y" stems={false} className="pointer-events-none absolute -bottom-8 -left-10 w-32 sm:w-40" />
              <FloralCorner flip="xy" stems={false} className="pointer-events-none absolute -right-10 -bottom-8 w-28 sm:w-36" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* titles */}
        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <TwinHearts className="mx-auto w-40 text-navy sm:w-52" />
          </motion.div>

          <motion.p
            className="font-script text-[clamp(2.6rem,9vw,4.75rem)] leading-[1.05] text-ink"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          >
            Wedding Invitation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <HeartDivider className="my-4 sm:my-5" />
          </motion.div>

          <h1
            id="hero-names"
            className="font-script text-[clamp(2.4rem,10vw,4.75rem)] leading-[1.15] whitespace-nowrap text-ink"
          >
            <InkReveal delay={0.9}>{wedding.bride}</InkReveal>
            <motion.span
              className="my-1 block text-[0.6em] leading-none text-navy-soft"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
            >
              &amp;
            </motion.span>
            <InkReveal delay={2}>{wedding.groom}</InkReveal>
          </h1>

          <motion.p
            className="mt-6 font-serif text-lg text-navy-soft italic sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.9 }}
          >
            {wedding.heroSubtitle}
          </motion.p>

          <motion.p
            className="mt-3 font-display text-sm font-semibold tracking-[0.3em] text-navy uppercase sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            {wedding.dateLabel}
          </motion.p>
        </div>
      </div>

      <MotionSectionLink
        to="/couple"
        aria-label="Scroll to the bride and groom"
        className="absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-navy/70 hover:text-navy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: reduced ? 0 : [0, 8, 0] }}
        transition={{ opacity: { delay: 3.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </MotionSectionLink>
    </section>
  )
}
