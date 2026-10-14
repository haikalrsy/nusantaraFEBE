import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import ImageSlot from './ImageSlot'
import { searchCultures, SUGGESTIONS } from '../lib/search'
import { useReducedMotion } from '../hooks/useReducedMotion'

function useViewport() {
  const read = () =>
    typeof window === 'undefined' ? { w: 1200, md: true } : { w: window.innerWidth, md: window.innerWidth >= 768 }
  const [v, setV] = useState(read)
  useEffect(() => {
    const on = () => setV(read())
    addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  return v
}

export default function SearchBar({ onOpenChange }) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const { w, md } = useViewport()
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [q, setQ] = useState('')
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)

  const expanded = hover || open
  const { results, total, filters } = useMemo(() => searchCultures(q), [q])
  const hasQuery = q.trim().length > 0

  useEffect(() => setCursor(0), [q])
  useEffect(() => { onOpenChange?.(open) }, [open, onOpenChange])

  // Pintasan: "/" atau Ctrl/Cmd + K
  useEffect(() => {
    const k = (e) => {
      const tag = e.target?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  // Jaga item aktif tetap terlihat di dalam daftar
  useEffect(() => {
    listRef.current?.children[cursor]?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const go = (c) => {
    navigate({ to: '/culture/$slug', params: { slug: c.slug } })
    setQ('')
    setHover(false)
    setOpen(false)
    inputRef.current?.blur()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, Math.max(0, results.length - 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter') {
      if (results[cursor]) { e.preventDefault(); go(results[cursor]) }
    } else if (e.key === 'Escape') {
      if (q) setQ('')
      else inputRef.current?.blur()
    }
  }

  const ease = [0.22, 1, 0.36, 1]
  const width = !expanded ? 40 : md ? 260 : open ? Math.min(w - 64, 420) : 40

  return (
    <motion.div
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      animate={{ width }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease }}
      className="relative h-10 shrink-0"
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className={`flex h-full cursor-text items-center overflow-hidden rounded-full border transition-[background-color,border-color] duration-500 ${
          expanded ? 'border-rule bg-paper' : 'border-transparent bg-transparent'
        } ${open ? '!border-clay/50' : ''}`}
      >
        <span className="grid size-10 shrink-0 place-items-center text-ink">
          <Search size={17} strokeWidth={1.6} />
        </span>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Mau Cari Apa?"
          aria-label="Cari budaya"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-results"
          aria-activedescendant={open && results[cursor] ? `sr-${cursor}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className={`min-w-0 flex-1 border-0 bg-transparent font-text text-[13px] text-ink outline-none placeholder:text-ink-soft/70 transition-opacity duration-300 ${
            expanded ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        />
        {(q || open) && (
          <button
            type="button"
            aria-label={q ? 'Hapus pencarian' : 'Tutup pencarian'}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation()
              if (q) { setQ(''); inputRef.current?.focus() } else inputRef.current?.blur()
            }}
            className="mr-1 grid size-7 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-ink-soft hover:text-clay"
          >
            <X size={14} strokeWidth={1.6} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.25, ease }}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute bottom-[calc(100%+16px)] max-md:inset-x-0 md:right-0 md:w-[440px] origin-bottom-right overflow-hidden rounded-2xl border border-rule bg-paper shadow-[0_-24px_60px_-20px_rgba(60,30,15,0.4)]"
          >
            {hasQuery ? (
              <div className="flex flex-wrap items-center gap-1.5 px-4 pt-3 pb-1 text-[11px] text-ink-soft">
                <span>{total} hasil</span>
                {filters.categories.map((c) => (
                  <span key={c} className="rounded-full bg-clay/10 px-2 py-0.5 text-clay">{c}</span>
                ))}
                {filters.islands.map((n) => (
                  <span key={n} className="rounded-full bg-clay/10 px-2 py-0.5 text-clay">{n}</span>
                ))}
              </div>
            ) : (
              <div className="px-4 pt-3 pb-3">
                <p className="m-0 mb-2 text-[11px] uppercase tracking-wider text-ink-soft">Coba cari</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      tabIndex={-1}
                      onClick={() => { setQ(s); inputRef.current?.focus() }}
                      className="cursor-pointer rounded-full border border-rule bg-transparent px-3 py-1 text-xs text-ink transition-colors hover:border-clay hover:text-clay"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasQuery && results.length > 0 && (
              <ul
                ref={listRef}
                id="search-results"
                role="listbox"
                data-lenis-prevent
                className="m-0 max-h-[min(50vh,380px)] list-none overflow-y-auto p-1.5"
              >
                {results.map((c, i) => (
                  <li key={c.slug} id={`sr-${i}`} role="option" aria-selected={i === cursor}>
                    <button
                      type="button"
                      tabIndex={-1}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(c)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-0 p-2 text-left transition-colors duration-200 ${
                        i === cursor ? 'bg-paper-deep/60' : 'bg-transparent'
                      }`}
                    >
                      <ImageSlot src={c.src} alt="" className="size-11 shrink-0 rounded-lg" />
                      <span className="min-w-0">
                        <span className="block truncate font-serif text-[15px] text-ink">{c.title}</span>
                        <span className="block truncate text-[11px] text-ink-soft">{c.category} • {c.place}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {hasQuery && results.length === 0 && (
              <div className="px-4 pb-4 pt-2">
                <p className="m-0 text-sm text-ink-soft">Tidak ada budaya yang cocok dengan “{q}”.</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.slice(0, 3).map((s) => (
                    <button
                      key={s}
                      type="button"
                      tabIndex={-1}
                      onClick={() => { setQ(s); inputRef.current?.focus() }}
                      className="cursor-pointer rounded-full border border-rule bg-transparent px-3 py-1 text-xs text-ink hover:border-clay hover:text-clay"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="hidden items-center justify-between border-t border-rule/70 px-4 py-2 text-[10px] text-ink-soft md:flex">
              <span>↑ ↓ pilih · Enter buka · Esc tutup</span>
              <span>/ atau Ctrl+K untuk mencari</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}