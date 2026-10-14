import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { heroTitle } from '../animations/heroTimeline'
import IndonesiaMap from '../components/IndonesiaMap'
import MagneticButton from '../components/MagneticButton'
import SectionLabel from '../components/SectionLabel'
import { scrollToId } from '../lib/lenis'

export default function Hero() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => { heroTitle() }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="home" ref={root} className="relative overflow-hidden pb-8">
      {/* Header Teks Pengantar Hero */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-9 pt-8 pb-4 grid md:grid-cols-[1fr_minmax(0,290px)] gap-6 md:gap-16">
        <div>
          <SectionLabel>  Every Region Has a Story to Tell</SectionLabel>
          <div className="overflow-hidden">
            <h1 data-hero-title className="text-[clamp(3.4rem,10vw,8rem)] leading-[1] tracking-[.015em] text-clay">
              NUSANTARA
            </h1>
          </div>
          <p className="font-text text-base md:text-lg leading-snug text-ink-soft mt-4 mb-0">
            More than islands,<br />it&rsquo;s a thousand stories.
          </p>
        </div>
        <div className="md:pt-6">
          <p className="font-text text-[13px] leading-relaxed text-ink-soft m-0">
            Dari Sabang sampai Merauke, setiap pulau di Indonesia menyimpan keindahan budaya yang unik. Mari jelajahi kekayaan tradisi, kuliner, arsitektur, musik, dan kehidupan masyarakatnya.
          </p>
          <div className="w-6 h-px bg-ink my-5" />
          <MagneticButton onClick={() => scrollToId('islands')} className="inline-flex items-center gap-2 bg-transparent border-0 p-0 text-[13px] font-normal cursor-pointer">
            Mulai Jelajahi <ArrowRight size={14} strokeWidth={1.5} />
          </MagneticButton>
        </div>
      </div>

      {/* Peta Full-Width Edge-to-Edge Satu Section Penuh Tanpa Border Kanan Kiri */}
      <div className="w-full mt-4">
        <IndonesiaMap />
      </div>
    </section>
  )
}
