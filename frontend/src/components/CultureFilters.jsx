import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, motionValue, useTransform } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const CATEGORIES = ['Semua', 'Makanan', 'Pakaian', 'Tradisi']

// Parameter gerak (dibuat tetap supaya rasanya konsisten di seluruh situs)
const SWELL = 0.2       // seberapa besar chip terpilih membesar
const BARGE = 6         // dorongan ekstra untuk chip tetangga (px)
const SHRINK = 0.05     // seberapa kecil chip yang tidak terpilih
const JELLY = 1         // pembagian melebar-sebelum-meninggi
const BOUNCE = 0.25     // 0 = berhenti mulus, 0.4 = bergoyang
const STAGGER = 22      // jeda antar chip (ms)
const STIFFNESS = 580
const GAP = 8

const SIZES = { sm: [28, 12, 12], md: [36, 13, 16] }

const spring = (k, m, bounce) => ({
  type: 'spring',
  stiffness: k,
  damping: 2 * Math.sqrt(k * m) * (1 - bounce),
  mass: m,
})

const Chip = forwardRef(function Chip({ mv, children, ...rest }, ref) {
  const transform = useTransform(() => `translateX(${mv.x.get()}px) scale(${mv.sx.get()}, ${mv.sy.get()})`)
  return (
    <motion.button ref={ref} style={{ transform }} {...rest}>
      {children}
    </motion.button>
  )
})

function useCompact() {
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 479px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 479px)')
    const on = (e) => setCompact(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return compact
}

export default function CultureFilters({ value, onChange, items = CATEGORIES }) {
  const [inner, setInner] = useState(items[0])
  const current = value ?? inner
  const at = Math.max(0, items.findIndex(it => it === current))
  const reduce = useReducedMotion()
  const compact = useCompact()
  const size = compact ? 'sm' : 'md'
  const [h, font, px] = SIZES[size]

  const groupRef = useRef(null)
  const chipRefs = useRef([])
  const widths = useRef([])
  const mvs = useRef([])
  const applied = useRef(at)
  const reduceRef = useRef(reduce)
  reduceRef.current = reduce
  const itemsKey = items.join('|')

  const mvFor = (i) => {
    let mv = mvs.current[i]
    if (!mv) {
      mv = { x: motionValue(0), sx: motionValue(1), sy: motionValue(1) }
      mvs.current[i] = mv
    }
    return mv
  }

  const apply = (sel, instant) => {
    const push = ((widths.current[sel] ?? 0) * SWELL) / 2 + BARGE
    for (let i = 0; i < items.length; i++) {
      const mv = mvFor(i)
      const on = i === sel
      const far = Math.abs(i - sel)
      const x = Math.sign(i - sel) * push
      const s = on ? 1 + SWELL : 1 - SHRINK
      if (instant || reduceRef.current) {
        mv.x.jump(x)
        mv.sx.jump(s)
        mv.sy.jump(s)
        continue
      }
      const k = STIFFNESS * (1 - 0.12 * Math.min(far, 3))
      const inFlight = mv.x.isAnimating() || mv.sx.isAnimating() || mv.sy.isAnimating()
      const delay = inFlight ? 0 : (far * STAGGER) / 1000
      animate(mv.x, x, { ...spring(k, 0.9, BOUNCE), delay })
      animate(mv.sx, s, {
        ...spring(k * (1 + 0.24 * JELLY), 0.9 - 0.1 * JELLY, Math.min(0.85, BOUNCE + 0.3 * JELLY)),
        delay,
      })
      animate(mv.sy, s, { ...spring(k * (1 - 0.14 * JELLY), 0.9 + 0.05 * JELLY, BOUNCE), delay: delay + 0.05 * JELLY })
    }
  }

  const measure = () => {
    const group = groupRef.current
    if (!group) return
    widths.current = chipRefs.current.map(el => el?.offsetWidth ?? 0)
    const chipH = chipRefs.current[0]?.offsetHeight ?? 0
    const maxW = Math.max(0, ...widths.current)
    group.style.setProperty('--cf-pad-x', `${Math.ceil((maxW * SWELL * 1.3) / 2 + BARGE) + 2}px`)
    group.style.setProperty('--cf-pad-y', `${Math.ceil((chipH * SWELL) / 2) + 2}px`)
  }

  useLayoutEffect(() => {
    const settle = () => {
      measure()
      apply(applied.current, true)
    }
    settle()
    const observer = new ResizeObserver(settle)
    if (groupRef.current) observer.observe(groupRef.current)
    document.fonts?.ready.then(settle)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, size])

  // Perubahan dari luar (misal tombol "Tampilkan Semua") langsung melompat
  useEffect(() => {
    if (applied.current === at) return
    applied.current = at
    apply(at, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at])

  useEffect(
    () => () =>
      mvs.current.forEach(mv => {
        mv.x.destroy()
        mv.sx.destroy()
        mv.sy.destroy()
      }),
    []
  )

  const commit = (i, instant) => {
    if (i === at || !items[i]) return
    applied.current = i
    apply(i, instant)
    if (value === undefined) setInner(items[i])
    onChange?.(items[i], i)
  }

  const onKeyDown = (e, i) => {
    const n = items.length
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else if (e.key === ' ' || e.key === 'Enter') next = i
    if (next === null) return
    e.preventDefault()
    commit(next, true)
    chipRefs.current[next]?.focus()
  }

  return (
    <div className="max-w-full overflow-x-auto [scrollbar-width:none]">
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Filter kategori budaya"
        className="group inline-flex items-center select-none font-text [-webkit-touch-callout:none] gap-[var(--cf-gap)] px-[var(--cf-pad-x)] py-[var(--cf-pad-y)]"
        style={{
          '--cf-gap': `${GAP}px`,
          '--cf-h': `${h}px`,
          '--cf-font': `${font}px`,
          '--cf-px': `${px}px`,
        }}
      >
        {items.map((label, i) => (
          <Chip
            key={label}
            mv={mvFor(i)}
            ref={el => { chipRefs.current[i] = el }}
            type="button"
            role="radio"
            aria-checked={i === at}
            tabIndex={i === at ? 0 : -1}
            className="group/chip relative m-0 cursor-pointer touch-manipulation border-0 bg-transparent p-0 text-inherit outline-none [font:inherit] origin-center [-webkit-tap-highlight-color:transparent] data-[on=true]:cursor-default focus-visible:[&>span]:ring-2 focus-visible:[&>span]:ring-clay/60"
            data-on={i === at ? 'true' : 'false'}
            onClick={e => commit(i, e.detail === 0)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            <span className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-rule bg-paper text-ink leading-none font-medium whitespace-nowrap [height:var(--cf-h)] [padding:0_var(--cf-px)] [font-size:var(--cf-font)] [transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),background-color_200ms_ease,color_200ms_ease,border-color_200ms_ease] group-active/chip:scale-[0.97] motion-reduce:group-active/chip:scale-100 group-data-[on=true]/chip:border-clay group-data-[on=true]/chip:bg-clay group-data-[on=true]/chip:text-paper before:pointer-events-none before:absolute before:inset-0 before:bg-ink before:opacity-0 before:[transition:opacity_160ms_ease] before:content-[''] [@media(hover:hover)_and_(pointer:fine)]:group-hover/chip:group-data-[on=false]/chip:before:opacity-[0.07]">
              {label}
            </span>
          </Chip>
        ))}
      </div>
    </div>
  )
}