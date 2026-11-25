import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fades and lifts its children into view once, when scrolled to. */
export default function Reveal({ children, delay = 0, y = 28, className = '', amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
