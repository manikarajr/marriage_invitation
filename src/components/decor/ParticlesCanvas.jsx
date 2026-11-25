import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, CanvasTexture, Color } from 'three'
import { createRandom, range } from '../../utils/random.js'

function makeGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.75)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.12)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

const PALETTE = ['#ffffff', '#a9c7e8', '#d6e4f4', '#f3dfb4']

function buildField(count) {
  const random = createRandom(7)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new Color()
  for (let i = 0; i < count; i++) {
    positions[i * 3] = range(random, -7, 7)
    positions[i * 3 + 1] = range(random, -4.5, 4.5)
    positions[i * 3 + 2] = range(random, -4, 2)
    color.set(PALETTE[Math.floor(random() * PALETTE.length)])
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  return { positions, colors }
}

function Particles({ count }) {
  const points = useRef(null)
  const material = useRef(null)
  const { positions, colors } = useMemo(() => buildField(count), [count])
  const texture = useMemo(() => makeGlowTexture(), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (points.current) {
      points.current.rotation.y += delta * 0.025
      points.current.rotation.x = Math.sin(t * 0.12) * 0.06
      points.current.position.y = Math.sin(t * 0.25) * 0.15
    }
    if (material.current) material.current.opacity = 0.75 + Math.sin(t * 1.3) * 0.15
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={texture}
        size={0.16}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/** Soft glowing particles rendered with Three.js (lazy-loaded). */
export default function ParticlesCanvas({ count = 260 }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  )
}
