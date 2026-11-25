import { useCallback, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Expand } from 'lucide-react'
import { gallery } from '../config/wedding.js'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import Reveal from './decor/Reveal.jsx'
import SectionHeading from './decor/SectionHeading.jsx'
import GalleryMedia from './gallery/GalleryMedia.jsx'
import Lightbox from './gallery/Lightbox.jsx'

const SPRING = { stiffness: 180, damping: 18, mass: 0.6 }

/** Floating card that tilts in 3D toward the pointer (desktop) or bobs gently (touch). */
function TiltCard({ item, index, onOpen }) {
  const finePointer = useFinePointer()
  const reduced = useReducedMotionPref()
  const tilt = finePointer && !reduced

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [11, -11]), SPRING)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-13, 13]), SPRING)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.38), transparent 55%)`

  function handleMove(event) {
    if (!tilt) return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  function reset() {
    mx.set(0.5)
    my.set(0.5)
  }

  const label = item.alt ?? `${item.caption} (placeholder ${index + 1})`

  return (
    <motion.div
      className="perspective-near"
      animate={!tilt && !reduced ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        aria-label={`View larger: ${label}`}
        style={tilt ? { rotateX, rotateY } : undefined}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="group preserve-3d relative block aspect-4/5 w-full overflow-hidden rounded-2xl border-4 border-white bg-mist text-left shadow-float sm:rounded-3xl"
      >
        <GalleryMedia item={item} />
        {item.badge && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/55 to-transparent px-2 pt-8 pb-3 text-center font-display text-[0.65rem] leading-tight font-semibold tracking-[0.18em] text-ivory uppercase sm:text-xs">
            {item.badge}
          </span>
        )}
        {tilt && (
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundImage: glare }}
            aria-hidden="true"
          />
        )}
        <span
          className="pointer-events-none absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-navy opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <Expand className="h-4 w-4" />
        </span>
      </motion.button>
    </motion.div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const hasPlaceholders = gallery.some((item) => item.type === 'placeholder')

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-watercolor relative overflow-hidden px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Cherished moments" title="Our Gallery" id="gallery-title" />

      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-7 md:grid-cols-3">
        {gallery.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={(i % 3) * 0.1} amount={0.15}>
              <TiltCard item={item} index={i} onOpen={() => setActive(i)} />
            </Reveal>
          </li>
        ))}
      </ul>

      {hasPlaceholders && (
        <p className="mt-10 text-center font-serif text-sm text-navy-soft italic sm:text-base">
          More photographs will be shared soon.
        </p>
      )}

      <Lightbox items={gallery} index={active} onClose={close} onChange={setActive} />
    </section>
  )
}
