import { useEffect, useRef, useState } from 'react'
import { BookOpen, Compass, Home, Info, Layers, MapPin, Sparkles } from 'lucide-react'
import { getLenis } from '../lib/lenis'

// Label & ikon berdasarkan id section; section tanpa id jadi "Detail"
const META = {
  home: { label: 'Home', Icon: Home },
  about: { label: 'About', Icon: Info },
  islands: { label: 'Islands', Icon: MapPin },
  cultures: { label: 'Cultures', Icon: Layers },
  living: { label: 'Living', Icon: Sparkles },
  rekomendasi: { label: 'Temukan', Icon: Compass },
}
const FALLBACK = { label: 'Detail', Icon: BookOpen }

export function useSectionNav() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState([])
  const sections = useRef([])

  // Ambil section dari #main, hitung ulang kalau isinya berubah
  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return
    let raf
    const collect = () => {
      let els = Array.from(main.children)
      if (els.length === 1 && els[0].children.length > 1) els = Array.from(els[0].children)
      if (!els.length) return
      const same = els.length === sections.current.length && els.every((e, i) => e === sections.current[i])
      if (same) return
      sections.current = els
      setItems(els.map((el) => META[el.id] || FALLBACK))
    }
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(collect) }
    collect()
    const mo = new MutationObserver(schedule)
    mo.observe(main, { childList: true, subtree: true })
    return () => { mo.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  // Section aktif + progres tiap section dari posisi scroll
  useEffect(() => {
    if (!items.length) return
    const on = () => {
      const els = sections.current
      const midY = window.innerHeight * 0.5
      let i = 0
      const prog = els.map((el, idx) => {
        const r = el.getBoundingClientRect()
        if (r.top <= midY) i = idx
        const p = Math.min(1, Math.max(0, (midY - r.top) / Math.max(1, r.height)))
        return Math.round(p * 50) / 50
      })
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      if (atBottom) { i = els.length - 1; prog[i] = 1 }
      setActive(i)
      setProgress((prev) => (prev.length === prog.length && prev.every((v, k) => v === prog[k]) ? prev : prog))
    }
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [items.length])

  const go = (i) => {
    const el = sections.current[i]
    if (!el) return
    if (el.id) history.replaceState(null, '', '#' + el.id)
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: -70, duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { items, active, progress, go }
}