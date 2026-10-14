import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let tick = null

export function getLenis() {
  return lenis
}

export function startLenis() {
  if (lenis) return lenis

  // Setup Lenis Ultimate: Inersia super elastis, kinetic scroll bertenaga
  lenis = new Lenis({
    lerp: 0.085,            // Kelembutan inersia responsif & responsif
    wheelMultiplier: 1.35,  // Kecepatan putaran roda mouse lebih dinamis
    touchMultiplier: 1.8,
    smoothWheel: true,
    infinite: false,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
  })

  // Sinkronisasi frame rate mutlak ke GSAP ScrollTrigger
  lenis.on('scroll', (e) => {
    ScrollTrigger.update()
    // Broadcast dynamic velocity ke CSS custom property untuk efek skew dinamis
    const clampedVelocity = Math.max(-18, Math.min(18, e.velocity || 0))
    document.documentElement.style.setProperty('--scroll-velocity', clampedVelocity.toString())
  })

  tick = (time) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function stopLenis() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

export function scrollToId(id, offset = -70) {
  const el = document.getElementById(id)
  if (!el) {
    window.dispatchEvent(new CustomEvent('go-home', { detail: id }))
    return
  }
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
