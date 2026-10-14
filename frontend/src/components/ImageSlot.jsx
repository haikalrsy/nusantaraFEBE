import { useState } from 'react'
export default function ImageSlot({ src, alt, color = false, className = '', style }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div role="img" aria-label={alt} className={className} style={{ background:'linear-gradient(135deg,#4a3226,#241711)', ...style }} />
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={`${color ? 'grade-color' : 'grade'} object-cover ${className}`} style={style} />
}
