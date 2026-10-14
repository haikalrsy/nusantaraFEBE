import { useEffect, useRef } from 'react'
import anime from 'animejs'
export default function Compass({ size = 56 }) {
  const needle = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const a = anime({ targets:needle.current, rotate:[-7,7], duration:3400, direction:'alternate', loop:true, easing:'easeInOutSine' })
    return () => a.pause()
  }, [])
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="#5a3524" strokeWidth=".8" aria-hidden="true">
      <circle cx="30" cy="30" r="22" /><circle cx="30" cy="30" r="17" opacity=".5" />
      {[0,90,180,270].map(a => <line key={a} x1="30" y1="4" x2="30" y2="10" transform={`rotate(${a} 30 30)`} />)}
      <g ref={needle} style={{ transformOrigin:'30px 30px' }}>
        <path d="M30 8 L34 30 L30 52 L26 30 Z" fill="#5a3524" fillOpacity=".15" /><path d="M30 8 L34 30 L26 30 Z" fill="#5a3524" />
      </g>
      <text x="30" y="3" fontSize="5" textAnchor="middle" fill="#5a3524" stroke="none">U</text>
    </svg>
  )
}
