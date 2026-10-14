import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import SearchBar from './SearchBar'
import ScrollStack from './ScrollStack'
import { useSectionNav } from '../hooks/useSectionNav'
import { useReducedMotion } from '../hooks/useReducedMotion'

function useDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const on = () => setD(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return d
}

function Shell({ innerRef, children }) {
  return (
    <nav
      aria-label="Navigasi section"
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6"
    >
      <div
        ref={innerRef}
        className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center rounded-full border border-clay/20 bg-paper/90 p-1.5 backdrop-blur-xl shadow-[0_12px_32px_-10px_rgba(90,40,20,0.35)]"
      >
        {children}
      </div>
    </nav>
  )
}

export default function ScrollDock() {
  const path = useRouterState({ select: (st) => st.location.pathname })
  return path === '/' ? <HomeDock /> : <PageDock />
}

// Halaman selain Home: tombol Home + search
function PageDock() {
  const [searching, setSearching] = useState(false)
  return (
    <Shell>
      <Link
        to="/"
        aria-label="Kembali ke Home"
        className="flex h-10 items-center gap-2 rounded-full bg-clay px-4 text-[13px] font-medium tracking-wide !text-white no-underline shadow-[0_4px_12px_-4px_rgba(120,45,20,0.6)]"
      >
        <Home size={17} strokeWidth={1.6} className="shrink-0" />
        <span className={searching ? 'max-md:hidden' : ''}>Home</span>
      </Link>
      <span className="mx-2 h-6 w-px bg-rule" />
      <SearchBar onOpenChange={setSearching} />
    </Shell>
  )
}

function HomeDock() {
  const reduced = useReducedMotion()
  const desktop = useDesktop()
  const { items, active, progress, go } = useSectionNav()
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [searching, setSearching] = useState(false)
  const ref = useRef(null)

  // Ketuk di luar dock (ponsel) -> ciut kembali
  useEffect(() => {
    const on = (e) => { if (ref.current && !ref.current.contains(e.target)) setPinned(false) }
    addEventListener('pointerdown', on)
    return () => removeEventListener('pointerdown', on)
  }, [])

  if (!items.length) return null

  const open = (hover || pinned) && !searching
  const hideAll = searching && !desktop
  const t = reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

  const press = (i) => {
    if (!open) { setPinned(true); return }
    setPinned(false)
    go(i)
  }
  const mouseOnly = (fn) => (e) => { if (e.pointerType === 'mouse') fn() }

  return (
    <>
      <Shell innerRef={ref}>
        <div
          onPointerEnter={mouseOnly(() => setHover(true))}
          onPointerLeave={mouseOnly(() => setHover(false))}
        >
          <motion.ul
            initial={false}
            animate={{ width: hideAll ? 0 : 'auto', opacity: hideAll ? 0 : 1 }}
            transition={t}
            className="m-0 flex list-none items-center overflow-hidden p-0"
          >
            {items.map(({ label, Icon }, i) => {
              const isActive = i === active
              const show = open || isActive
              return (
                <motion.li
                  key={i}
                  initial={false}
                  animate={{ width: show ? 'auto' : 0, opacity: show ? 1 : 0 }}
                  transition={t}
                  className="overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => press(i)}
                    aria-label={label}
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={show ? 0 : -1}
                    className={`mx-0.5 flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border-0 px-3 text-[13px] font-medium tracking-wide transition-colors duration-300 sm:px-4 ${
                      isActive
                        ? 'bg-clay !text-white shadow-[0_4px_12px_-4px_rgba(120,45,20,0.6)]'
                        : 'bg-transparent !text-ink/70 hover:!text-clay'
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.6} className="shrink-0" />
                    <span className={isActive || desktop ? '' : 'hidden'}>{label}</span>
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>

        <span className={`mx-2 h-6 w-px bg-rule ${hideAll ? 'hidden' : ''}`} />
        <SearchBar onOpenChange={setSearching} />
      </Shell>

      <ScrollStack items={items} active={active} progress={progress} go={go} />
    </>
  )
}