import { Camera } from 'lucide-react'
import { reference } from '../../config/wedding.js'
import CroppedImage from '../decor/CroppedImage.jsx'
import FloralCorner from '../decor/FloralCorner.jsx'
import { Heart } from '../decor/Hearts.jsx'

const TONES = {
  navy: 'bg-[radial-gradient(circle_at_30%_20%,#2c4677,#172d57_60%,#0f1f3f)] text-ivory',
  sky: 'bg-[radial-gradient(circle_at_30%_20%,#eef4fb,#a9c7e8_75%)] text-navy',
  ivory: 'bg-[radial-gradient(circle_at_30%_20%,#ffffff,#f8efe2_80%)] text-navy',
}

/** Placeholder card shown until real photographs are supplied. */
function Placeholder({ item, large }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center ${TONES[item.tone] ?? TONES.ivory}`}>
      <FloralCorner className="absolute -top-3 -left-3 w-1/2 opacity-80" />
      <FloralCorner flip="xy" className="absolute -right-3 -bottom-3 w-1/2 opacity-80" />
      <div className="relative flex flex-col items-center px-3 text-center">
        <span className="relative">
          <Camera className={large ? 'h-12 w-12' : 'h-7 w-7 sm:h-9 sm:w-9'} strokeWidth={1.4} aria-hidden="true" />
          <Heart filled className="absolute -right-2 -bottom-1 h-3.5 w-3.5 text-sky" />
        </span>
        <span className={`mt-2 font-script leading-tight ${large ? 'text-5xl' : 'text-2xl sm:text-3xl'}`}>
          {item.caption}
        </span>
      </div>
    </div>
  )
}

/**
 * Renders one gallery item. `variant="tile"` fills a fixed-ratio card;
 * `variant="full"` shows the whole item for the lightbox.
 */
export default function GalleryMedia({ item, variant = 'tile' }) {
  const full = variant === 'full'

  if (item.type === 'placeholder') {
    return full ? (
      <div className="relative aspect-4/5 w-[min(88vw,calc(72svh*0.8))] overflow-hidden rounded-3xl">
        <Placeholder item={item} large />
      </div>
    ) : (
      <Placeholder item={item} />
    )
  }

  if (item.type === 'crop') {
    const crop = reference.crops[item.crop]
    const ratio = crop.w / crop.h
    return full ? (
      <CroppedImage
        src={reference.src}
        source={reference}
        crop={crop}
        alt={item.alt}
        className="rounded-3xl"
        style={{ width: `min(88vw, calc(78svh * ${ratio}))` }}
      />
    ) : (
      <CroppedImage
        src={reference.src}
        source={reference}
        crop={crop}
        alt={item.alt}
        className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2"
      />
    )
  }

  return full ? (
    <img
      src={item.src}
      alt={item.alt}
      decoding="async"
      draggable="false"
      className="max-h-[78svh] w-auto max-w-[88vw] rounded-3xl object-contain select-none"
    />
  ) : (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`absolute inset-0 h-full w-full select-none ${
        item.fit === 'contain' ? 'object-cover object-top' : 'object-cover'
      }`}
    />
  )
}
