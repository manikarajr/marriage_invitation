import { useEffect } from 'react'
import { resolveInitialSection, scrollToSection, sectionFromPath } from '../utils/router.js'

/**
 * Connects clean URLs to the page once the invitation is open:
 *  - a deep link such as /gallery scrolls to that section after the envelope opens
 *  - Back / Forward scroll to the section for the new URL
 */
export function useSectionRouting(enabled) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (!enabled) return

    const initial = resolveInitialSection()
    let frame
    if (initial !== 'top') {
      // Wait one frame so the freshly mounted sections have been laid out.
      frame = requestAnimationFrame(() => scrollToSection(initial, { smooth: false }))
    }

    const onPopState = () => scrollToSection(sectionFromPath(window.location.pathname) ?? 'top')
    window.addEventListener('popstate', onPopState)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('popstate', onPopState)
    }
  }, [enabled])
}
