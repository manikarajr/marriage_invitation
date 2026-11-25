/**
 * Shared SVG gradients used by every floral / heart illustration.
 * Rendered once at the app root so each decoration stays lightweight.
 */
export default function SvgDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <linearGradient id="leaf-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c4677" />
          <stop offset="0.6" stopColor="#5d83b5" />
          <stop offset="1" stopColor="#8fb0d8" />
        </linearGradient>
        <linearGradient id="leaf-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d83b5" />
          <stop offset="1" stopColor="#c3d7ef" />
        </linearGradient>
        <linearGradient id="leaf-c" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#172d57" />
          <stop offset="1" stopColor="#4a6ea3" />
        </linearGradient>
        <radialGradient id="petal-white" cx="0.5" cy="0.9" r="0.9">
          <stop offset="0" stopColor="#dfe8f4" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f4f8fd" />
        </radialGradient>
        <radialGradient id="petal-blue" cx="0.5" cy="0.95" r="0.95">
          <stop offset="0" stopColor="#2c4677" />
          <stop offset="0.55" stopColor="#6b90c2" />
          <stop offset="1" stopColor="#bcd3ee" />
        </radialGradient>
        <radialGradient id="center-gold" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#fbeecb" />
          <stop offset="1" stopColor="#c9a66b" />
        </radialGradient>
        <linearGradient id="bud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf1dc" />
          <stop offset="1" stopColor="#d2b27a" />
        </linearGradient>
        <radialGradient id="wash" cx="0.4" cy="0.4" r="0.55">
          <stop offset="0" stopColor="#a9c7e8" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#a9c7e8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#a9c7e8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wax" cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#4d6ea6" />
          <stop offset="0.45" stopColor="#1f3a6b" />
          <stop offset="1" stopColor="#0b1830" />
        </radialGradient>
        <radialGradient id="petal-fall" cx="0.5" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c6dbf1" />
        </radialGradient>
      </defs>
    </svg>
  )
}
