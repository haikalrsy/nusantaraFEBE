import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

// Tetap diekspor supaya import lain (kalau ada) tidak rusak
export const navItems = [
  { label: 'Home', id: 'home' }, { label: 'About', id: 'about' },
  { label: 'Islands', id: 'islands' }, { label: 'Cultures', id: 'cultures' },
]

export default function Navbar() {
  const path = useRouterState({ select: (st) => st.location.pathname })
  const [hidden, setHidden] = useState(false)
  const anchor = useRef(0)

  useEffect(() => {
    anchor.current = window.scrollY
    setHidden(false)
  }, [path])

  // Turun = sembunyi, naik sedikit = langsung muncul
  useEffect(() => {
    const on = () => {
      const y = Math.max(0, window.scrollY)
      const dy = y - anchor.current
      if (y < 24) { setHidden(false); anchor.current = y }
      else if (dy > 8) { setHidden(true); anchor.current = y }
      else if (dy < -4) { setHidden(false); anchor.current = y }
    }
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 bg-paper/85 backdrop-blur-[2px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center px-5 md:px-9">
        <Link to="/" aria-label="NUSANTARA, kembali ke beranda" className="group flex items-center gap-2.5 no-underline">
          <span className="relative block h-7 w-11 shrink-0">
            <img
              src="/images/logo.png"
              alt=""
              draggable={false}
              className="absolute left-1/2 top-1/2 size-12 max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
          </span>
          <span className="font-serif text-lg tracking-wide">NUSANTARA</span>
        </Link>
      </div>
      <div className="h-px bg-rule" />
    </header>
  )
}