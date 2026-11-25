import { useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Envelope from './components/Envelope.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CoupleSection from './components/CoupleSection.jsx'
import InvitationMessage from './components/InvitationMessage.jsx'
import Countdown from './components/Countdown.jsx'
import WeddingDetails from './components/WeddingDetails.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import SvgDefs from './components/decor/SvgDefs.jsx'
import FloatingPetals from './components/decor/FloatingPetals.jsx'
import { useScrollLock } from './hooks/useScrollLock.js'
import { useSectionRouting } from './hooks/useSectionRouting.js'

export default function App() {
  const [opened, setOpened] = useState(false)
  const music = useRef(null)

  useScrollLock(!opened)
  useSectionRouting(opened)

  function handleOpened() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpened(true)
  }

  // Keyboard skip link: move focus to the main content without changing the URL.
  function skipToContent(event) {
    event.preventDefault()
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
    main?.scrollIntoView({ block: 'start' })
  }

  return (
    <MotionConfig reducedMotion="user">
      <SvgDefs />

      <AnimatePresence>
        {!opened && (
          <Envelope
            key="envelope"
            // Starting music inside the click handler satisfies browser autoplay rules.
            onOpenStart={() => music.current?.play()}
            onOpened={handleOpened}
          />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <a
            href="/"
            onClick={skipToContent}
            className="sr-only z-70 rounded-full bg-navy px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Navbar />
          <FloatingPetals className="fixed inset-0 z-30" density={0.55} />
          <motion.main
            id="main"
            tabIndex={-1}
            className="outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Hero />
            <CoupleSection />
            <InvitationMessage />
            <Countdown />
            <WeddingDetails />
            <Gallery />
          </motion.main>
          <Footer />
        </>
      )}

      <MusicPlayer ref={music} visible={opened} />
    </MotionConfig>
  )
}
