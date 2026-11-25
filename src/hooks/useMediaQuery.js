import { useCallback, useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. Returns false during SSR. */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
