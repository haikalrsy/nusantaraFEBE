import ImageSlot from './ImageSlot'
// Foto kecil + label; ukuran memakai cqw agar ikut skala peta.
export default function CulturalAnnotation({ loc, src, onEnter, onLeave, onSelect }) {
  const [x, y, w, h] = loc.box
  return (
    <button type="button" onClick={onSelect} onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave}
      aria-label={`${loc.label}, ${loc.place}: buka pulau`}
      className="absolute flex items-start gap-[.8cqw] bg-transparent border-0 p-0 text-left cursor-pointer group"
      style={{ left:`${x/10}%`, top:`${y/4.4}%`, flexDirection: loc.align === 'left' ? 'row-reverse' : 'row', fontSize:'max(9px,1.05cqw)' }}>
      <ImageSlot src={src} alt={loc.label} className="block shrink-0 border border-ink/30 transition-transform duration-500 group-hover:scale-105"
        style={{ width:`${w/10}cqw`, aspectRatio:`${w}/${h}` }} />
      <span className="max-sm:hidden block leading-tight pt-[.2cqw]" style={{ textAlign: loc.align === 'left' ? 'right' : 'left' }}>
        <strong className="block font-normal text-ink">{loc.label}</strong><span className="text-ink-soft">{loc.place}</span>
      </span>
    </button>
  )
}
