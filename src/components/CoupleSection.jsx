import { motion } from 'framer-motion'
import { portraits, reference, wedding } from '../config/wedding.js'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import FloralCorner from './decor/FloralCorner.jsx'
import CroppedImage from './decor/CroppedImage.jsx'
import Reveal from './decor/Reveal.jsx'
import SectionHeading from './decor/SectionHeading.jsx'
import { BeatingHeart, HeartDivider } from './decor/Hearts.jsx'

function Portrait({ photo, crop, alt, floatDelay }) {
  const reduced = useReducedMotionPref()
  return (
    <motion.div
      className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60"
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* slowly turning dashed ring */}
      <motion.div
        className="absolute -inset-4 rounded-full border-2 border-dashed border-sky"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <div
        className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_140deg,#172d57,#a9c7e8,#fff9f2,#a9c7e8,#172d57)]"
        aria-hidden="true"
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-ivory bg-mist">
        {photo ? (
          <img src={photo} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <CroppedImage
            src={reference.src}
            source={reference}
            crop={reference.crops[crop]}
            alt={alt}
            className="h-full w-full"
          />
        )}
      </div>
      <FloralCorner stems={false} className="pointer-events-none absolute -top-9 -left-9 w-28 sm:w-32" />
      <FloralCorner flip="xy" stems={false} className="pointer-events-none absolute -right-9 -bottom-9 w-28 sm:w-32" />
    </motion.div>
  )
}

function PersonCard({ role, name, photo, crop, delay, floatDelay }) {
  return (
    <Reveal delay={delay} className="w-full max-w-sm">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="bg-paper relative rounded-4xl border border-sky/50 px-6 pt-14 pb-10 text-center shadow-card"
      >
        <div className="absolute inset-2.5 rounded-[1.6rem] border border-navy/10" aria-hidden="true" />
        <Portrait photo={photo} crop={crop} alt={`${role} ${name}`} floatDelay={floatDelay} />
        <p className="mt-12 font-display text-sm font-semibold tracking-[0.35em] text-navy-soft uppercase">{role}</p>
        <h3 className="mt-1 font-script text-[clamp(2.1rem,8.5vw,2.75rem)] leading-tight whitespace-nowrap text-ink">{name}</h3>
        <HeartDivider className="mt-2" />
      </motion.article>
    </Reveal>
  )
}

export default function CoupleSection() {
  return (
    <section id="couple" aria-labelledby="couple-title" className="relative overflow-hidden bg-ivory px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Introducing" title="The Bride & Groom" id="couple-title" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-4 lg:gap-10">
        <PersonCard
          role="The Bride"
          name={wedding.bride}
          photo={portraits.bridePhoto}
          crop="bride"
          delay={0}
          floatDelay={0}
        />

        <Reveal delay={0.2} className="flex flex-col items-center text-navy">
          <BeatingHeart className="h-12 w-12 text-navy sm:h-14 sm:w-14" />
          <span className="font-script text-4xl" aria-hidden="true">
            &amp;
          </span>
        </Reveal>

        <PersonCard
          role="The Groom"
          name={wedding.groom}
          photo={portraits.groomPhoto}
          crop="groom"
          delay={0.3}
          floatDelay={1.2}
        />
      </div>
    </section>
  )
}
