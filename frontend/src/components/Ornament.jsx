import { useEffect, useRef } from 'react'
import { drawOnView } from '../animations/drawLine'
// Ornamen berpola belah ketupat bergaya songket; garisnya tergambar saat terlihat.
export default function Ornament({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    return drawOnView(ref.current)
  }, [])
  const rows = [0, 1, 2, 3, 4]
  return (
    <svg ref={ref} viewBox="0 0 80 160" className={className} fill="none" stroke="#5a3524" strokeWidth=".8" opacity=".4" aria-hidden="true">
      {rows.map(r => <path key={r} d={`M40,${r*32+2} L72,${r*32+18} L40,${r*32+34} L8,${r*32+18} Z M40,${r*32+10} L58,${r*32+18} L40,${r*32+26} L22,${r*32+18} Z`} />)}
    </svg>
  )
}
