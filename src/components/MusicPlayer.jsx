import { useImperativeHandle, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Volume2, VolumeX } from 'lucide-react'
import { musicSrc } from '../config/wedding.js'

/**
 * Optional background music. Hidden entirely when `musicSrc` is empty.
 * Never autoplays: playback only starts from a user gesture (the
 * "Open Invitation" click calls `ref.current.play()`, or the play button).
 */
export default function MusicPlayer({ ref, visible }) {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      play() {
        const el = audio.current
        if (!el) return
        el.volume = 0.6
        el.play().catch(() => setPlaying(false))
      },
    }),
    [],
  )

  if (!musicSrc) return null

  function togglePlay() {
    const el = audio.current
    if (!el) return
    if (el.paused) el.play().catch(() => setPlaying(false))
    else el.pause()
  }

  function toggleMute() {
    const el = audio.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  return (
    <>
      <audio
        ref={audio}
        src={musicSrc}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-2 sm:right-6 sm:bottom-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            <AnimatePresence>
              {playing && (
                <motion.button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute music' : 'Mute music'}
                  aria-pressed={muted}
                  className="grid h-11 w-11 place-items-center rounded-full border border-sky/60 bg-ivory/90 text-navy shadow-card backdrop-blur"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
                </motion.button>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause background music' : 'Play background music'}
              aria-pressed={playing}
              className="relative grid h-14 w-14 place-items-center rounded-full bg-navy text-ivory shadow-[0_12px_28px_-8px_rgba(23,45,87,0.7)] transition hover:bg-navy-soft"
            >
              {playing && (
                <motion.span
                  className="absolute -inset-1 rounded-full border-2 border-dashed border-sky"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
              )}
              {playing ? <Pause className="h-6 w-6" aria-hidden="true" /> : <Music className="h-6 w-6" aria-hidden="true" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
