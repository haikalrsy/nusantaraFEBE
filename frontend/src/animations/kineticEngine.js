/**
 * ============================================================================
 * NUSANTARA GSAP & LENIS MASTER ANIMATION ORCHESTRATOR
 * Comprehensive Cinematic ScrollTriggers, Physics-based Spring Easing,
 * Stagger Reveals, 3D Rotation scrubbing, Magnetic Cursors, and Kinetic Tilts.
 * ============================================================================
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 1. Global Page Scroll Orchestrator:
 * Updates global kinetic variables, skewing cards and sections during fast scroll
 */
export function initGlobalKineticScroll(rootElement) {
  if (!rootElement) return () => {}

  const ctx = gsap.context(() => {
    // Reactive Card Parallax & Dynamic Skew on Scroll
    ScrollTrigger.create({
      trigger: rootElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const vel = self.getVelocity()
        const clampedVel = Math.max(-25, Math.min(25, vel / 90))
        gsap.to('[data-kinetic-skew]', {
          skewY: clampedVel * 0.35,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
    })

    // Cinematic Fade & Rise for all section headers
    gsap.utils.toArray('section').forEach((sec) => {
      const heading = sec.querySelector('h2')
      if (heading) {
        gsap.fromTo(heading,
          { y: 55, opacity: 0.1, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })
  }, rootElement)

  return () => ctx.revert()
}

/**
 * 2. Mega Statue Ganesha 3D Scrub & Sacred Aura
 * Meluncurkan animasi patung raksasa berputar 3D secara penuh mengikuti scroll
 */
export function initGaneshaMonumentalScrub(triggerEl, statueEl, textRingA, textRingB) {
  if (!triggerEl || !statueEl) return () => {}

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2, // Buttery buttery Lenis response
      }
    })

    tl.fromTo(statueEl,
      {
        yPercent: 35,
        scale: 0.8,
        rotationY: -22,
        rotationZ: -4,
        filter: 'brightness(0.85) contrast(1.15) drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
      },
      {
        yPercent: -32,
        scale: 1.3,
        rotationY: 16,
        rotationZ: 3,
        filter: 'brightness(1.15) contrast(1.08) drop-shadow(0 40px 60px rgba(124,45,18,0.4))',
        ease: 'none',
      }
    )

    // Sync subtle parallax onto rotating text rings
    if (textRingA) {
      gsap.to(textRingA, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }

    if (textRingB) {
      gsap.to(textRingB, {
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }
  }, triggerEl)

  return () => ctx.revert()
}

/**
 * 3. Kinetic Tile Parallax Scrub Engine (Untuk Cultural Discovery)
 */
export function initDiscoveryTileEngine(containerEl) {
  if (!containerEl) return () => {}

  const ctx = gsap.context(() => {
    // 1. Reveal bertahap dengan skew dan scale saat scroll
    gsap.fromTo('[data-tile]',
      { y: 80, opacity: 0, scale: 0.92, rotateX: 10 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: {
          each: 0.08,
          from: 'start'
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 82%',
        }
      }
    )

    // 2. Powerful Lenis Parallax per tile gambar
    gsap.utils.toArray('[data-tile-img]').forEach((img, i) => {
      const factor = (i % 2 === 0 ? 1 : -1) * 22
      gsap.fromTo(img,
        { yPercent: -factor, scale: 1.2 },
        {
          yPercent: factor,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('[data-tile]'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          }
        }
      )
    })
  }, containerEl)

  return () => ctx.revert()
}

/**
 * 4. Island Diorama Floating Hover Engine
 */
export function initIslandHoverEffect(islandElement) {
  if (!islandElement) return () => {}

  const onEnter = () => {
    gsap.to(islandElement, {
      y: -14,
      scale: 1.03,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    })
  }

  const onLeave = () => {
    gsap.to(islandElement, {
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    })
  }

  islandElement.addEventListener('mouseenter', onEnter)
  islandElement.addEventListener('mouseleave', onLeave)

  return () => {
    islandElement.removeEventListener('mouseenter', onEnter)
    islandElement.removeEventListener('mouseleave', onLeave)
  }
}
