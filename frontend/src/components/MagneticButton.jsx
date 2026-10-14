import { useRef } from 'react'
import gsap from 'gsap'
export default function MagneticButton({ children, className = '', ...p }) {
  const r = useRef(null)
  const move = (e) => { const b = r.current.getBoundingClientRect(); gsap.to(r.current, { x:(e.clientX-b.left-b.width/2)*.25, y:(e.clientY-b.top-b.height/2)*.35, duration:.4, ease:'power3.out' }) }
  const leave = () => gsap.to(r.current, { x:0, y:0, duration:.7, ease:'elastic.out(1,.5)' })
  return <button ref={r} type="button" onMouseMove={move} onMouseLeave={leave} className={className} {...p}>{children}</button>
}
