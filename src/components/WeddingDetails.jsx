import { motion } from 'framer-motion'
import { CalendarHeart, CalendarPlus, Clock, MapPin, Navigation } from 'lucide-react'
import { mapsUrl, wedding } from '../config/wedding.js'
import { downloadWeddingICS } from '../utils/calendar.js'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import FloralCorner from './decor/FloralCorner.jsx'
import Reveal from './decor/Reveal.jsx'
import SectionHeading from './decor/SectionHeading.jsx'

// Falls back to a plain Google Maps search for the venue name if no link is configured.
const directionsUrl =
  mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue)}`

const DETAILS = [
  { icon: CalendarHeart, label: 'Date', value: wedding.dateLabel },
  { icon: Clock, label: 'Time', value: wedding.timeLabel },
  { icon: MapPin, label: 'Venue', value: wedding.venue },
]

function DetailCard({ icon: Icon, label, value, index }) {
  const reduced = useReducedMotionPref()
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-paper group relative flex h-full flex-col items-center rounded-3xl border border-sky/50 px-6 py-10 text-center shadow-card"
      >
        <div className="absolute inset-2 rounded-[1.25rem] border border-navy/10" aria-hidden="true" />
        <motion.div
          className="relative grid h-16 w-16 place-items-center rounded-full bg-navy text-ivory shadow-[0_10px_24px_-8px_rgba(23,45,87,0.7)]"
          initial={{ scale: 0, rotate: -60 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 + index * 0.12 }}
        >
          {!reduced && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-sky"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.4 }}
              aria-hidden="true"
            />
          )}
          <Icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
        </motion.div>
        <h3 className="mt-6 font-display text-sm font-semibold tracking-[0.35em] text-navy-soft uppercase">{label}</h3>
        <p className="mt-2 font-serif text-xl leading-snug text-navy sm:text-2xl">{value}</p>
      </motion.article>
    </Reveal>
  )
}

export default function WeddingDetails() {
  return (
    <section id="details" aria-labelledby="details-title" className="relative overflow-hidden bg-ivory px-5 py-20 sm:py-28">
      <FloralCorner flip="x" className="pointer-events-none absolute -top-6 -right-6 w-36 opacity-70 sm:w-52" />
      <FloralCorner flip="y" className="pointer-events-none absolute -bottom-6 -left-6 w-36 opacity-70 sm:w-52" />

      <div className="relative">
        <SectionHeading eyebrow="Save the date" title="Wedding Details" id="details-title" />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {DETAILS.map((detail, i) => (
            <DetailCard key={detail.label} {...detail} index={i} />
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full max-w-xs sm:w-auto"
            aria-label={`Get directions to ${wedding.venue} (opens Google Maps in a new tab)`}
          >
            <Navigation className="h-5 w-5" aria-hidden="true" />
            Get Directions
          </a>
          <button
            type="button"
            onClick={() => downloadWeddingICS(mapsUrl)}
            className="btn btn-outline w-full max-w-xs sm:w-auto"
            aria-label="Add the wedding to your calendar (downloads an .ics file)"
          >
            <CalendarPlus className="h-5 w-5" aria-hidden="true" />
            Add to Calendar
          </button>
        </Reveal>
      </div>
    </section>
  )
}
