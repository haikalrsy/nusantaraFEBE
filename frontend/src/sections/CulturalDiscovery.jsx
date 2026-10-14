import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import ImageSlot from '../components/ImageSlot'
import SectionLabel from '../components/SectionLabel'
import { cultures } from '../data/cultures'
import { islands } from '../data/islands'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../lib/lenis'

gsap.registerPlugin(ScrollTrigger)
// Address bar HP yang naik-turun tidak boleh memicu hitung ulang & lompatan posisi
ScrollTrigger.config({ ignoreMobileResize: true })

const CATEGORIES = ['Makanan', 'Pakaian', 'Tradisi']
const BASE_TONE = '#1b1410'

// Budaya "ikon" yang jadi foto utama tiap bab
const SIGNATURE = {
  sumatra: 'rendang',
  jawa: 'batik',
  bali: 'tari-kecak',
  kalimantan: 'tari-hudoq',
  sulawesi: 'rambu-solo',
  'nusa-tenggara': 'tenun-ikat',
  maluku: 'tari-cakalele',
  papua: 'noken',
}

// Warna latar yang bergeser halus saat pindah bab
const TONES = {
  sumatra: '#2b1710',
  jawa: '#2a1d12',
  bali: '#0f2629',
  kalimantan: '#10241a',
  sulawesi: '#1a1b30',
  'nusa-tenggara': '#2f1c10',
  maluku: '#2b1019',
  papua: '#0f2a22',
}

const chapters = islands.map((isl, i) => {
  const list = cultures.filter(c => c.island === isl.slug)
  const hero = list.find(c => c.slug === SIGNATURE[isl.slug]) || list[0]
  return {
    ...isl,
    num: String(i + 1).padStart(2, '0'),
    tone: TONES[isl.slug] || BASE_TONE,
    hero,
    groups: CATEGORIES.map(cat => ({ cat, items: list.filter(c => c.category === cat) })),
  }
})

const INTRO_WORDS = ['Setiap', 'pulau', 'menyimpan', 'satu', 'hal', 'yang', 'tak', 'ada', 'di', 'tempat', 'lain.']

function Chars({ text }) {
  return (
    <span aria-hidden="true" className="flex">
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom leading-[1.05]">
          <span data-char className="inline-block">{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  )
}

export default function CulturalDiscovery() {
  const root = useRef(null)
  const pin = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const counter = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Satu perjalanan horizontal yang di-pin untuk desktop dan HP.
      // Di HP: scroll ke bawah = geser slide, dan otomatis "klik" ke slide terdekat.
      mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (context) => {
        const { isMobile } = context.conditions
        const panels = gsap.utils.toArray('[data-panel]')
        const last = panels.length - 1
        const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
        let lastIdx = -1

        const journey = gsap.to(track.current, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            pin: true,
            anticipatePin: 1,
            scrub: isMobile ? 0.4 : 0.6,
            start: 'top top',
            end: () => '+=' + dist() * (isMobile ? 1.2 : 1),
            invalidateOnRefresh: true,
            snap: isMobile
              ? { snapTo: 1 / last, duration: { min: 0.2, max: 0.55 }, delay: 0.08, ease: 'power2.inOut' }
              : false,
            onUpdate: (self) => {
              if (bar.current) gsap.set(bar.current, { scaleX: self.progress })
              const idx = Math.round(self.progress * last)
              const chapter = Math.min(chapters.length, Math.max(1, idx))
              if (chapter !== lastIdx && counter.current) {
                lastIdx = chapter
                counter.current.textContent = String(chapter).padStart(2, '0')
              }
            },
          },
        })

        panels.forEach((panel) => {
          const q = (s) => panel.querySelectorAll(s)
          const chars = q('[data-char]')
          const lines = q('[data-line]')
          const hero = q('[data-hero]')
          const heroImg = q('[data-hero-img]')
          const groups = q('[data-group]')

          // Reveal saat slide masuk layar
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: journey,
              start: isMobile ? 'left 85%' : 'left 72%',
              toggleActions: 'play none none reverse',
            },
          })
          if (chars.length) tl.from(chars, { yPercent: 115, rotate: 5, stagger: 0.03, duration: 0.9, ease: 'power4.out' }, 0)
          if (lines.length) tl.from(lines, { y: 28, opacity: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out' }, 0.15)
          if (hero.length) {
            tl.fromTo(hero, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' }, 0.05)
          }
          if (heroImg.length) tl.from(heroImg, { scale: 1.45, duration: 1.6, ease: 'expo.out' }, 0.05)
          if (groups.length) tl.from(groups, { x: 70, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' }, 0.3)

          // Parallax foto & angka raksasa saat slide melintas
          const parallax = (el, from, to) => {
            if (!el) return
            gsap.fromTo(el, { xPercent: from }, {
              xPercent: to,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: journey,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            })
          }
          parallax(panel.querySelector('[data-hero-img]'), -7, 7)
          parallax(panel.querySelector('[data-ghost]'), 25, -25)

          // Latar berganti warna mengikuti bab aktif
          const tone = panel.dataset.tone || BASE_TONE
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: journey,
            start: 'left 55%',
            end: 'right 55%',
            onToggle: (self) => {
              if (self.isActive) gsap.to(pin.current, { backgroundColor: tone, duration: 0.9, ease: 'power2.out', overwrite: true })
            },
          })
        })
      })
    }, root)

    // Hitung ulang posisi setelah semua gambar selesai dimuat
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      mm.revert()
      ctx.revert()
    }
  }, [reduced])

  const skew = reduced ? undefined : { transform: 'skewX(calc(var(--scroll-velocity, 0) * -0.22deg))' }

  return (
    <section id="cultures" ref={root} className="relative bg-ink text-paper">
      <div
        ref={pin}
        className="relative h-[100svh] overflow-hidden"
        style={{ backgroundColor: BASE_TONE }}
      >
        {/* Progress & penghitung bab */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-paper/10 z-30">
          <div ref={bar} className="h-full origin-left bg-clay" style={{ transform: 'scaleX(0)' }} />
        </div>
        <div className="flex absolute top-5 right-5 md:top-7 md:right-9 z-30 items-baseline gap-2 font-serif text-paper/70">
          <span ref={counter} className="text-xl md:text-2xl text-paper">01</span>
          <span className="text-[10px] md:text-xs tracking-widest">/ {String(chapters.length).padStart(2, '0')}</span>
        </div>

        <div
          ref={track}
          className={`flex flex-row h-full ${reduced ? 'overflow-x-auto snap-x snap-mandatory w-full' : 'w-max'}`}
        >
          {/* ======= Slide pembuka ======= */}
          <div
            data-panel
            data-tone={BASE_TONE}
            className="relative shrink-0 w-screen h-[100svh] px-6 md:px-16 pt-14 pb-6 md:py-0 flex items-center snap-start"
          >
            <div className="max-w-[1100px]">
              <div data-line><SectionLabel>Cultural Discovery</SectionLabel></div>
              <h2 className="m-0 mt-4 font-serif font-normal text-[clamp(2.4rem,6.4vw,6rem)] leading-[1.02] flex flex-wrap gap-x-[.28em]">
                {INTRO_WORDS.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom pb-[.08em]">
                    <span
                      data-char
                      className={`inline-block ${i === INTRO_WORDS.length - 1 ? 'italic text-amber-200' : ''}`}
                    >
                      {w}
                    </span>
                  </span>
                ))}
              </h2>
              <p data-line className="font-text text-sm md:text-base text-paper/70 mt-6 md:mt-8 mb-0 max-w-[52ch] leading-relaxed">
                Dari Sumatra sampai Papua, temukan makanan, busana, dan tradisi yang membuat tiap pulau tak tergantikan. Teruskan scroll untuk berjalan dari satu pulau ke pulau berikutnya.
              </p>
              <p data-line className="flex items-center gap-3 mt-8 md:mt-10 text-[11px] tracking-[.3em] uppercase text-paper/50">
                Scroll <ArrowRight size={14} strokeWidth={1.5} className="animate-pulse" />
              </p>
            </div>
          </div>

          {/* ======= Satu slide per pulau ======= */}
          {chapters.map((ch) => (
            <div
              key={ch.slug}
              data-panel
              data-tone={ch.tone}
              className="relative shrink-0 w-screen h-[100svh] px-5 md:px-14 pt-14 pb-6 md:py-0 flex items-center overflow-hidden snap-start"
            >
              {/* Angka raksasa di belakang */}
              <span
                data-ghost
                aria-hidden="true"
                className="pointer-events-none select-none absolute right-[-2%] md:right-[8%] top-1/2 -translate-y-1/2 font-serif text-[clamp(14rem,34vw,30rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.09)]"
              >
                {ch.num}
              </span>

              <div className="relative z-10 grid w-full max-w-[1500px] mx-auto gap-3 md:gap-10 md:grid-cols-[1.05fr_1fr_.95fr] items-center">
                {/* Kolom A: judul & cerita singkat */}
                <div>
                  <p data-line className="m-0 mb-2 md:mb-4 font-text text-[11px] tracking-[.32em] uppercase text-amber-200/80">
                    Bab {ch.num}
                  </p>
                  <h3
                    aria-label={ch.name}
                    className="m-0 font-serif font-normal uppercase text-[clamp(2rem,3.9vw,4.2rem)] leading-[1.02] tracking-[.02em] text-paper max-md:flex max-md:flex-wrap max-md:gap-x-[.3em]"
                  >
                    {ch.name.split(' ').map((word, i) => (
                      <Chars key={i} text={word} />
                    ))}
                  </h3>
                  <p data-line className="font-text text-xs md:text-base text-amber-200/90 mt-2 md:mt-5 mb-0 md:mb-3 max-w-[38ch] leading-relaxed max-md:line-clamp-2">
                    {ch.tagline}
                  </p>
                  {ch.hero && (
                    <p data-line className="hidden md:block font-text text-[13px] text-paper/60 m-0 max-w-[44ch] leading-relaxed line-clamp-3">
                      {ch.hero.summary}
                    </p>
                  )}
                  <p data-line className="hidden md:block mt-6 mb-0 text-[11px] tracking-[.2em] uppercase text-paper/45">
                    Ikon: <span className="text-paper/80">{ch.stats?.ikon}</span>
                  </p>
                </div>

                {/* Kolom B: foto utama */}
                {ch.hero && (
                  <Link
                    to="/culture/$slug"
                    params={{ slug: ch.hero.slug }}
                    data-hero
                    style={skew}
                    className="group relative block h-[22svh] md:h-[68vh] overflow-hidden rounded-2xl md:rounded-[1.75rem] no-underline text-paper shadow-2xl transition-transform duration-300 ease-out"
                  >
                    <div data-hero-img className="absolute inset-[-10%] will-change-transform">
                      <ImageSlot
                        src={ch.hero.src}
                        alt={ch.hero.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute left-4 bottom-4 right-14 md:left-6 md:bottom-6 md:right-16">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] tracking-wider uppercase bg-paper/20 backdrop-blur-sm border border-paper/10 mb-1 md:mb-2">
                        {ch.hero.category}
                      </span>
                      <p className="m-0 font-serif text-lg md:text-2xl">{ch.hero.title}</p>
                      <p className="m-0 mt-0.5 md:mt-1 text-xs text-amber-200">{ch.hero.place}</p>
                    </div>
                    <span className="absolute right-4 bottom-4 md:right-6 md:bottom-6 size-8 md:size-10 rounded-full border border-paper/60 backdrop-blur-sm grid place-items-center transition-all duration-300 group-hover:bg-paper group-hover:text-ink group-hover:scale-110">
                      <ArrowUpRight size={16} strokeWidth={1.6} />
                    </span>
                  </Link>
                )}

                {/* Kolom C: 3 kategori x 3 budaya (kartu di HP, daftar di desktop) */}
                <div className="grid gap-3 md:gap-4">
                  {ch.groups.map((g) => (
                    <div key={g.cat} data-group>
                      <p className="m-0 mb-1.5 pb-1 md:pb-1.5 border-b border-paper/15 text-[10px] tracking-[.28em] uppercase text-paper/50">
                        {g.cat}
                      </p>
                      <ul className="list-none p-0 m-0 grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-0">
                        {g.items.map((c) => (
                          <li key={c.slug} className="min-w-0">
                            <Link
                              to="/culture/$slug"
                              params={{ slug: c.slug }}
                              className="group/item flex flex-col gap-1 md:flex-row md:items-center md:gap-3 md:py-1 no-underline text-paper"
                            >
                              <span className="block w-full aspect-[16/10] rounded-lg md:size-8 md:aspect-auto md:rounded-full overflow-hidden shrink-0 border border-paper/20">
                                <ImageSlot src={c.src} alt="" className="w-full h-full object-cover" />
                              </span>
                              <span className="block md:flex-1 min-w-0 font-serif max-md:text-[11px] max-md:leading-tight max-md:line-clamp-2 md:text-[15px] md:truncate transition-transform duration-300 group-hover/item:translate-x-1">
                                {c.title}
                              </span>
                              <ArrowUpRight
                                size={13}
                                strokeWidth={1.6}
                                className="max-md:hidden opacity-0 -translate-x-1 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-amber-200"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ======= Slide penutup ======= */}
          <div
            data-panel
            data-tone={BASE_TONE}
            className="relative shrink-0 w-screen h-[100svh] px-6 md:px-16 pt-14 pb-6 md:py-0 flex items-center snap-start"
          >
            <div className="max-w-[900px]">
              <h3 data-line className="m-0 font-serif font-normal text-[clamp(2.2rem,5.4vw,5rem)] leading-[1.05]">
                Delapan pulau,<br />
                <span className="italic text-amber-200">satu Nusantara.</span>
              </h3>
              <p data-line className="font-text text-sm md:text-base text-paper/70 mt-6 mb-8 max-w-[48ch] leading-relaxed">
                Mau menggali satu pulau lebih dalam? Pilih pulaunya dan bedah budayanya satu per satu.
              </p>
              <button
                data-line
                type="button"
                onClick={() => scrollToId('islands')}
                className="inline-flex items-center gap-2 bg-clay text-paper rounded-full border-0 px-6 py-3 text-sm cursor-pointer hover:bg-clay/90 shadow-md"
              >
                Jelajahi di Island Explorer <ArrowRight size={14} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}