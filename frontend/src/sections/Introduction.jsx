import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const Line = ({ children }) => (
  <span className="block overflow-hidden">
    <span data-line className="block">{children}</span>
  </span>
)

export default function Introduction() {
  const root = useRef(null)
  const statueRef = useRef(null)
  const textBgLeftRef = useRef(null)
  const textBgRightRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Text reveal
      gsap.from('[data-line]', {
        yPercent: 125,
        rotateX: -25,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        }
      })

      // 2. Patung: parallax halus saja, supaya kepala & alasnya selalu
      // tetap di dalam section (sebelumnya terpotong karena geser -26% & scale 1.22)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      tl.fromTo(statueRef.current,
        {
          yPercent: 2,
          scale: 0.99,
          rotationY: -4,
        },
        {
          yPercent: -2,
          scale: 1.01,
          rotationY: 4,
          ease: 'none',
        }
      )

      // 3. Parallax horizontal untuk tipografi watermark
      gsap.fromTo(textBgLeftRef.current,
        { xPercent: -20 },
        {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
      gsap.fromTo(textBgRightRef.current,
        { xPercent: 20 },
        {
          xPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="about"
      ref={root}
      className="relative bg-[#161412] border-y border-white/10 overflow-hidden"
    >

      {/* Watermark raksasa, bergerak horizontal saat scroll */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-between opacity-[0.05] z-0">
        <span ref={textBgLeftRef} className="font-serif text-[22vw] font-bold leading-none tracking-tighter text-[#f1e6d6] will-change-transform">
          NUSANTARA
        </span>
        <span ref={textBgRightRef} className="font-serif text-[22vw] font-bold leading-none tracking-tighter text-[#f1e6d6] will-change-transform">
          SINGHASARI
        </span>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-9 grid lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-14 items-center z-10">

        {/* Kolom kiri: teks */}
        <div className="z-20 py-12 md:py-16">

          <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[#f1e6d6]">
            <Line>KEKAYAAN DAN</Line>
            <Line>KEBUDAYAAN INDONESIA.</Line>
          </h2>

          <p className="font-text text-base md:text-lg leading-[1.85] text-[#cdbfae] mt-6 mb-0 max-w-[44ch]">
            &ldquo;Bhinneka Tunggal Ika tan hana dharma mangrwa, Berbeda-beda tetapi tetap satu jua, tiada kebenaran yang terbelah.&rdquo;
          </p>

          <div className="w-16 h-px bg-[#d9a074]/50 my-8" />

          {/* Statistik */}
          <div className="grid grid-cols-2 gap-6 max-w-sm mb-8">
            <div className="border-l-2 border-[#d9a074]/60 pl-4">
              <div className="font-serif text-3xl md:text-4xl text-[#f1e6d6] font-medium leading-none">8</div>
              <div className="text-xs uppercase tracking-wider text-[#cdbfae]/80 mt-1.5">Gugus Wilayah Besar</div>
            </div>
            <div className="border-l-2 border-[#d9a074]/60 pl-4">
              <div className="font-serif text-3xl md:text-4xl text-[#f1e6d6] font-medium leading-none">1.340+</div>
              <div className="text-xs uppercase tracking-wider text-[#cdbfae]/80 mt-1.5">Suku & Etnis Bangsa</div>
            </div>
          </div>

        </div>

        {/* Kolom kanan: patung Ganesha + cincin teks berputar */}
        <div className="relative h-[520px] md:h-[680px] select-none [perspective:1400px]  flex items-center justify-center">

          {/* Titik pusat cincin = pusat patung. Semua cincin & glow dipusatkan di sini */}
          <div className="absolute left-1/2 top-[288px] md:top-[432px] h-0 w-0 flex items-center justify-center lg:ml-10 pointer-events-none">

          {/* Pendaran cahaya di belakang patung */}
          <div className="absolute w-[450px] h-[450px] md:w-[640px] md:h-[640px] rounded-full bg-gradient-to-tr from-amber-600/25 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Cincin teks luar */}
          <div className="absolute w-[560px] h-[560px] md:w-[680px] md:h-[680px] pointer-events-none select-none z-0 flex items-center justify-center animate-[spin_32s_linear_infinite] will-change-transform">
            <svg viewBox="0 0 680 680" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circleGrandOuter"
                  d="M 340, 340 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 -600,0"
                />
              </defs>
              <text className="font-serif text-[14px] tracking-[0.42em] uppercase fill-[#d9a074] font-medium">
                <textPath href="#circleGrandOuter" startOffset="0%">
                  ★ INDONESIA ★ WARISAN TRADISIONAL ★ PERADABAN NUSANTARA ★ NILAI ADILUHUNG ★
                </textPath>
              </text>
            </svg>
          </div>

          {/* Cincin teks dalam, berputar berlawanan arah */}
          <div className="absolute w-[440px] h-[440px] md:w-[540px] md:h-[540px] pointer-events-none select-none z-0 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse] will-change-transform">
            <svg viewBox="0 0 540 540" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circleGrandInner"
                  d="M 270, 270 m -235, 0 a 235,235 0 1,1 470,0 a 235,235 0 1,1 -470,0"
                />
              </defs>
              <text className="font-serif text-[11.5px] tracking-[0.46em] uppercase fill-[#cdbfae]/70 font-semibold">
                <textPath href="#circleGrandInner" startOffset="0%">
                  ✦ SEJARAH ✦ FILOSOFI KUNO ✦ SIMBOL KEBIJAKSANAAN ✦ CANDI NUSANTARA ✦
                </textPath>
              </text>
            </svg>
          </div>

          {/* Cincin garis */}
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-[#f1e6d6]/15 pointer-events-none z-0" />
          <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-dashed border-[#f1e6d6]/25 pointer-events-none z-0" />

          </div>

          {/* Patung Ganesha: besar, kepala dekat tepi atas, bagian bawah dipotong section seperti di desain */}
          <div className="absolute inset-0 z-20 flex justify-center items-start pointer-events-none">
            <div ref={statueRef} className="mt-12 md:mt-28 lg:ml-20 will-change-transform">
              <img
                src="/images/arca-ganesha.png"
                alt="Arca Batu Ganesha Nusantara"
                className="h-[480px] md:h-[640px] w-auto max-w-none object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] select-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}