/**
 * Watercolour-style floral cluster inspired by the invitation:
 * white and powder-blue blossoms with golden centres, blue leaves
 * and golden buds on fine stems. Drawn for the top-left corner and
 * mirrored with `flip` ("x" | "y" | "xy").
 */

const LEAVES = [
  [60, 6, -6, 0.85, 'leaf-a'],
  [140, 16, -14, 0.7, 'leaf-b'],
  [96, 16, -32, 0.95, 'leaf-b'],
  [72, 28, -18, 1.05, 'leaf-a'],
  [118, 40, 12, 0.85, 'leaf-a'],
  [86, 68, 22, 0.95, 'leaf-b'],
  [10, 40, 32, 1, 'leaf-a'],
  [40, 70, 62, 1.05, 'leaf-b'],
  [18, 96, 76, 0.95, 'leaf-a'],
  [54, 104, 42, 0.8, 'leaf-c'],
  [26, 132, 82, 0.8, 'leaf-a'],
  [150, 4, -24, 0.6, 'leaf-c'],
  [4, 150, 96, 0.6, 'leaf-c'],
  [128, 58, 30, 0.7, 'leaf-c'],
]

const BUDS = [
  [130, 8, 70],
  [156, 13, 80],
  [178, 15, 100],
  [200, 19, 85],
  [8, 124, -20],
  [11, 152, -10],
  [13, 178, 10],
  [17, 200, -5],
]

const FLOWERS = [
  { x: 48, y: 46, s: 1.25, r: 8, tone: 'white' },
  { x: 100, y: 50, s: 0.78, r: -14, tone: 'blue' },
  { x: 24, y: 100, s: 0.85, r: 20, tone: 'white' },
  { x: 78, y: 92, s: 0.5, r: 4, tone: 'white' },
  { x: 14, y: 58, s: 0.45, r: 30, tone: 'blue' },
]

function Leaf({ x, y, r, s, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C10 -11 30 -11 44 0 C30 11 10 11 0 0Z" fill={`url(#${fill})`} opacity="0.95" />
      <path d="M3 0 Q22 -1.5 41 0" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
    </g>
  )
}

function Bud({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0 Q-2 -8 0 -13" stroke="#9db4d3" strokeWidth="0.9" fill="none" />
      <ellipse cx="0" cy="-16.5" rx="2.8" ry="4.2" fill="url(#bud)" />
    </g>
  )
}

const PETAL = 'M0 0 C-11 -6 -13 -24 0 -31 C13 -24 11 -6 0 0Z'

function Flower({ x, y, s, r, tone }) {
  const fill = tone === 'blue' ? 'url(#petal-blue)' : 'url(#petal-white)'
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          d={PETAL}
          transform={`rotate(${a})`}
          fill={fill}
          stroke={tone === 'blue' ? '#3b5d92' : '#b9cde6'}
          strokeOpacity="0.55"
          strokeWidth="0.6"
        />
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <circle key={a} cx="0" cy="-8.5" r="1" fill="#c9a66b" transform={`rotate(${a})`} />
      ))}
      <circle r="5.5" fill="url(#center-gold)" />
      <circle r="2.6" fill="#2c4677" />
    </g>
  )
}

const FLIPS = {
  none: undefined,
  x: 'translate(220 0) scale(-1 1)',
  y: 'translate(0 220) scale(1 -1)',
  xy: 'translate(220 220) scale(-1 -1)',
}

export default function FloralCorner({ flip = 'none', className = '', style, stems = true }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={FLIPS[flip]}>
        <ellipse cx="92" cy="88" rx="90" ry="84" fill="url(#wash)" />
        {stems && (
          <>
            <path d="M0 4 C60 0 120 6 212 20" stroke="#9db4d3" strokeWidth="1.1" fill="none" />
            <path d="M4 0 C2 60 6 130 18 212" stroke="#9db4d3" strokeWidth="1.1" fill="none" />
            {BUDS.map(([x, y, r]) => (
              <Bud key={`${x}-${y}`} x={x} y={y} r={r} />
            ))}
          </>
        )}
        {LEAVES.map(([x, y, r, s, fill]) => (
          <Leaf key={`${x}-${y}`} x={x} y={y} r={r} s={s} fill={fill} />
        ))}
        {FLOWERS.map((f) => (
          <Flower key={`${f.x}-${f.y}`} {...f} />
        ))}
      </g>
    </svg>
  )
}
