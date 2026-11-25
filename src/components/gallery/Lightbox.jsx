import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import GalleryMedia from './GalleryMedia.jsx'

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir >= 0 ? -80 : 80, scale: 0.96 }),
}

function itemLabel(item) {
  return item.alt ?? item.caption ?? 'Gallery item'
}

/** Accessible full-screen viewer: Esc closes, ←/→ navigate, swipe on touch. */
export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null
  const [direction, setDirection] = useState(0)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useScrollLock(open)

  const go = useCallback(
    (delta) => {
      setDirection(delta)
      onChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  // Move focus into the dialog, then give it back to the opener on close.
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    closeRef.current?.focus()
    return () => opener?.focus?.({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === 'Tab' && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll('button:not([disabled])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  const item = open ? items[index] : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-60 flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute top-3 right-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition hover:bg-white/20 sm:top-5 sm:right-5"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={item.id}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(1)
                else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
              }}
              className="flex cursor-grab touch-pan-y flex-col items-center active:cursor-grabbing"
            >
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <GalleryMedia item={item} variant="full" />
              </div>
              <figcaption className="mt-4 max-w-[88vw] text-center font-serif text-sm text-ivory/85 italic sm:text-base">
                {itemLabel(item)}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <p className="absolute top-5 left-5 font-display text-sm font-semibold tracking-[0.3em] text-ivory/80 sm:top-7 sm:left-7" aria-live="polite">
            {index + 1} / {items.length}
          </p>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition hover:bg-white/20 sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-y-1/2"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-5 bottom-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition hover:bg-white/20 sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
