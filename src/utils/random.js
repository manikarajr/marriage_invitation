/**
 * Small deterministic PRNG (mulberry32). Decorative layouts (petals,
 * particles) are generated from a fixed seed so renders stay pure and the
 * layout is identical on every visit.
 */
export function createRandom(seed = 1) {
  let a = seed >>> 0
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function range(random, min, max) {
  return min + random() * (max - min)
}
