// Tumpukan garis di sisi kanan: satu garis per section, terisi sesuai progres scroll
export default function ScrollStack({ items, active, progress, go }) {
  return (
    <nav
      aria-label="Progres halaman"
      className="fixed right-2.5 sm:right-5 top-1/2 z-30 -translate-y-1/2 flex flex-col items-end gap-2.5"
    >
      {items.map(({ label }, i) => {
        const isActive = i === active
        return (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex h-3 cursor-pointer items-center justify-end border-0 bg-transparent p-0"
          >
            <span className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] text-paper opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`block h-[3px] overflow-hidden rounded-full bg-amber-500/25 ring-1 ring-black/5 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? 'w-7 sm:w-11' : 'w-4 sm:w-6 group-hover:w-6 sm:group-hover:w-8'
              }`}
            >
              <span
                className="block h-full origin-left rounded-full bg-amber-500 transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${progress[i] ?? 0})` }}
              />
            </span>
          </button>
        )
      })}
    </nav>
  )
}