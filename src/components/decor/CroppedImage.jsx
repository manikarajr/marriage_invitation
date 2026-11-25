/**
 * Shows one rectangular region of a larger image, responsively.
 * `crop` ({ x, y, w, h }) and `source` ({ width, height }) are in source pixels.
 */
export default function CroppedImage({
  src,
  source,
  crop,
  alt,
  className = '',
  style,
  loading = 'lazy',
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${crop.w} / ${crop.h}`, ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable="false"
        className="absolute select-none"
        style={{
          maxWidth: 'none',
          width: `${(source.width / crop.w) * 100}%`,
          height: `${(source.height / crop.h) * 100}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
        }}
      />
    </div>
  )
}
