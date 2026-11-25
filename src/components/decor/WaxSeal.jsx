import { HEART_PATH } from './paths.js'
import { wedding } from '../../config/wedding.js'

/** Heart-shaped navy wax seal embossed with the couple's initials. */
export default function WaxSeal({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {/* poured-wax lip */}
      <path
        d={HEART_PATH}
        transform="translate(50 49) scale(1.12) translate(-50 -49)"
        fill="#10224a"
        opacity="0.9"
      />
      <path d={HEART_PATH} fill="url(#wax)" />
      {/* pressed inner rim */}
      <path
        d={HEART_PATH}
        transform="translate(50 47) scale(0.76) translate(-50 -47)"
        fill="none"
        stroke="#d6e4f4"
        strokeOpacity="0.55"
        strokeWidth="1.8"
      />
      <text
        x="35"
        y="53"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="25"
        fill="#e6eef9"
      >
        {wedding.initials.bride}
      </text>
      <text
        x="65"
        y="53"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="25"
        fill="#e6eef9"
      >
        {wedding.initials.groom}
      </text>
      <path
        d={HEART_PATH}
        transform="translate(50 46) scale(0.11) translate(-50 -50)"
        fill="#a9c7e8"
      />
      {/* glossy highlight */}
      <ellipse cx="31" cy="27" rx="11" ry="5.5" fill="#ffffff" opacity="0.22" transform="rotate(-28 31 27)" />
    </svg>
  )
}
