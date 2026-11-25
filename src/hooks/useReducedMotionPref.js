import { useReducedMotion } from 'framer-motion'

/** True when the visitor asked the OS to minimise motion. */
export function useReducedMotionPref() {
  return Boolean(useReducedMotion())
}
