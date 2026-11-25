import Reveal from './Reveal.jsx'
import { HeartDivider } from './Hearts.jsx'

/** Small-caps eyebrow, script title and heart divider. */
export default function SectionHeading({ eyebrow, title, id, light = false }) {
  return (
    <Reveal className="mb-10 text-center sm:mb-14">
      {eyebrow && (
        <p
          className={`font-display text-xs font-semibold tracking-[0.35em] uppercase sm:text-sm ${
            light ? 'text-sky' : 'text-navy-soft'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-2 font-script text-[clamp(2.6rem,9vw,4.5rem)] leading-tight ${
          light ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <HeartDivider className="mt-3" light={light} />
    </Reveal>
  )
}
