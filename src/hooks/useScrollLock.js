import { useEffect } from 'react'

let locks = 0

/** Locks page scrolling while `active` is true (supports nesting). */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    locks += 1
    document.body.classList.add('scroll-locked')
    return () => {
      locks -= 1
      if (locks === 0) document.body.classList.remove('scroll-locked')
    }
  }, [active])
}
