import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, wedding } from '../config/wedding.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { Heart } from './decor/Hearts.jsx'
import FloralCorner from './decor/FloralCorner.jsx'
import SectionLink from './SectionLink.jsx'

function Monogram() {
  return (
    <SectionLink
      to="/"
      aria-label="Back to top"
      className="flex min-h-11 items-center gap-1.5 font-script text-3xl text-navy"
    >
      {wedding.initials.bride}
      <Heart filled className="h-3.5 w-3.5 text-sky" />
      {wedding.initials.groom}
    </SectionLink>
  )
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useScrollLock(menuOpen)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > previous && y > 180)
    setScrolled(y > 24)
  })

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? 'bg-ivory/85 shadow-[0_6px_24px_-12px_rgba(23,45,87,0.35)] backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: '-100%' }}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-18"
        >
          <Monogram />
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SectionLink
                  to={link.href}
                  className="group relative py-2 font-display text-sm font-semibold tracking-[0.22em] text-navy uppercase"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-navy transition-transform duration-300 group-hover:scale-x-100" />
                </SectionLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-navy/5 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="bg-watercolor fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden md:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <FloralCorner className="pointer-events-none absolute -top-4 -left-4 w-48 opacity-80" />
            <FloralCorner flip="xy" className="pointer-events-none absolute -right-4 -bottom-4 w-48 opacity-80" />
            <button
              type="button"
              autoFocus
              className="absolute top-3 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-navy/5"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <p className="mb-8 font-script text-5xl text-navy">
              {wedding.initials.bride} &amp; {wedding.initials.groom}
            </p>
            <ul className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <SectionLink
                    to={link.href}
                    onNavigate={() => setMenuOpen(false)}
                    className="block px-6 py-3 font-display text-xl font-semibold tracking-[0.25em] text-navy uppercase"
                  >
                    {link.label}
                  </SectionLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
