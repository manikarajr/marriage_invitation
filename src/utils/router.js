/**
 * Tiny History-API router for this single-page site.
 *
 * Every section is reachable at a clean path (/couple, /details, …) instead
 * of a hash (#details). Navigating scrolls smoothly to the section and
 * updates the address bar; Back/Forward scroll to the matching section.
 */

/** Section element ids that have their own path. "/" maps to the hero ("top"). */
export const SECTION_IDS = ['couple', 'invitation', 'countdown', 'details', 'gallery', 'blessing']
const HOME_ID = 'top'

/** "/details" → "details", "/" → "top", unknown paths → null. */
export function sectionFromPath(pathname) {
  const slug = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').toLowerCase()
  if (!slug) return HOME_ID
  return SECTION_IDS.includes(slug) ? slug : null
}

/** "details" → "/details", "top" → "/". */
export function pathFromSection(id) {
  return id === HOME_ID ? '/' : `/${id}`
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Scrolls to a section; respects scroll-padding-top and reduced motion. */
export function scrollToSection(id, { smooth = true } = {}) {
  if (id === HOME_ID) {
    window.scrollTo({ top: 0, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' })
    return true
  }
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' })
  return true
}

/** Pushes a clean URL (if it changed) and scrolls to its section. */
export function navigate(path) {
  const id = sectionFromPath(path) ?? HOME_ID
  const target = pathFromSection(id)
  if (window.location.pathname !== target) {
    window.history.pushState({ section: id }, '', target)
  }
  scrollToSection(id)
}

/**
 * Normalises the current URL on first load:
 *  - legacy hash links (/#details) become /details
 *  - unknown paths fall back to /
 * Returns the section id to show.
 */
export function resolveInitialSection() {
  const { pathname, hash } = window.location
  const fromHash = hash ? sectionFromPath(hash.slice(1)) : null
  const id = fromHash ?? sectionFromPath(pathname) ?? HOME_ID
  const target = pathFromSection(id)
  if (pathname !== target || hash) {
    window.history.replaceState({ section: id }, '', target)
  }
  return id
}
