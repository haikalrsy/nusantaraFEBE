import { Instagram, Youtube } from 'lucide-react'
import { scrollToId } from '../lib/lenis'
import { navItems } from './Navbar'
import { islandShapes, MAP_W, MAP_H } from '../data/islandShapes'
export default function Footer() {
  return (
    <footer className="bg-paper-deep border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-9 pt-12 pb-6 grid gap-10 md:grid-cols-[1.2fr_1fr_1.4fr_auto] items-start">
        <div>
          <h2 className="text-2xl">NUSANTARA</h2>
          <p className="font-text text-sm leading-relaxed text-ink-soft mt-3 mb-0 max-w-[22ch]">Stories from an archipelago of thousands of cultures.</p>
          <div className="w-6 h-px bg-ink mt-6" />
        </div>
        <nav aria-label="Footer"><p className="text-xs font-normal mb-3">Explore</p>
          <ul className="list-none p-0 m-0 grid gap-2 text-xs text-ink-soft">
            {navItems.slice(1).map(n => <li key={n.id}><a href={'#' + n.id} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }} className="no-underline hover:text-ink">{n.label}</a></li>)}
          </ul></nav>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-20 w-auto md:justify-self-center opacity-25" aria-hidden="true">{islandShapes.map(s => <path key={s.slug} d={s.d} fill="#7a6a60" />)}</svg>
        <div className="flex gap-4 md:justify-end">
          <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={16} strokeWidth={1.5} /></a>
          <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube size={16} strokeWidth={1.5} /></a>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-6 md:px-9 pb-6 m-0 text-[10px] text-ink-soft md:text-right">&copy; 2026 NUSANTARA. All rights reserved.</p>
    </footer>
  )
}
