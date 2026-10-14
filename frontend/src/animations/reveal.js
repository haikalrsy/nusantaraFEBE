import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Text reveal cinematic split
export const linesReveal = (trigger, start = 'top 75%') =>
  gsap.from('[data-line]', {
    yPercent: 120,
    rotateZ: 2,
    opacity: 0,
    duration: 1.3,
    ease: 'power4.out',
    stagger: 0.12,
    scrollTrigger: { trigger, start }
  })

// Masking reveal dengan ekspansi dramatis
export const maskReveal = (target, trigger, start = 'top 70%') =>
  gsap.fromTo(target, 
    { clipPath: 'inset(15% 15% 15% 15%)', scale: 0.92, opacity: 0.4 },
    { 
      clipPath: 'inset(0% 0% 0% 0%)', 
      scale: 1, 
      opacity: 1, 
      duration: 1.8, 
      ease: 'power3.out', 
      scrollTrigger: { trigger, start } 
    }
  )

// Parallax deep scroll synced with Lenis
export const parallax = (target, trigger, amount = 14) =>
  gsap.fromTo(target, 
    { yPercent: -amount, scale: 1.05 }, 
    { 
      yPercent: amount, 
      scale: 1, 
      ease: 'none', 
      scrollTrigger: { trigger, scrub: 0.6 } 
    }
  )

// Stagger in kartu-kartu
export const staggerIn = (target, trigger, start = 'top 70%') =>
  gsap.from(target, {
    opacity: 0,
    y: 40,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger, start }
  })

// Batch reveal gambar galeri
export function batchClipReveal(selector, start = 'top 85%') {
  gsap.set(selector, { clipPath: 'inset(100% 0 0 0)', scale: 0.95, opacity: 0 })
  ScrollTrigger.batch(selector, {
    start,
    once: true,
    onEnter: batch => gsap.to(batch, {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1,
      opacity: 1,
      duration: 1.3,
      stagger: 0.14,
      ease: 'power4.out',
      clearProps: 'clipPath'
    })
  })
}
