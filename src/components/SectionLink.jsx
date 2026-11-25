import { navigate } from '../utils/router.js'

/**
 * In-page link with a clean URL (e.g. "/details").
 * A normal click scrolls smoothly and updates the address bar without a reload.
 * Ctrl/Cmd/Shift/middle-click keep their default browser behaviour (new tab etc.).
 */
export default function SectionLink({ to, onNavigate, onClick, children, ...props }) {
  function handleClick(event) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onNavigate?.()
    // Let any state change (e.g. closing the mobile menu and its scroll lock) commit first.
    requestAnimationFrame(() => navigate(to))
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
