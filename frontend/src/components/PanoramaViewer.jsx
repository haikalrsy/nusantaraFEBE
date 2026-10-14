import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize, Minimize, Minus, Move, Plus, RotateCcw, X } from 'lucide-react'
import 'pannellum/build/pannellum.css'
import 'pannellum/build/pannellum.js' // memasang window.pannellum
import './panorama.css'
import { useReducedMotion } from '../hooks/useReducedMotion'

const MIN_HFOV = 50
const MAX_HFOV = 120
const clamp = (v) => Math.min(MAX_HFOV, Math.max(MIN_HFOV, v))

// Tombol kontrol: sedikit lebih kecil di layar kecil
const btn =
  'size-8 sm:size-9 rounded-full border border-paper/60 bg-ink/35 backdrop-blur-sm grid place-items-center text-paper cursor-pointer transition-colors duration-200 hover:bg-paper hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/70'

// Membuat isi penanda (titik info) di dalam foto
function buildHotspot(div, args) {
  div.setAttribute('role', 'button')
  div.setAttribute('aria-label', `Info: ${args.title}`)
  div.tabIndex = 0
  const dot = document.createElement('span')
  dot.className = 'pano-hs__dot'
  dot.textContent = String(args.index + 1)
  const label = document.createElement('span')
  label.className = 'pano-hs__label'
  label.textContent = args.title
  div.append(dot, label)
  div.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      div.click()
    }
  })
}

/**
 * Viewer foto 360 derajat (equirectangular, rasio 2:1) dengan titik info yang bisa diklik.
 *
 * hotSpots: [{ pitch, yaw, title, text, image?, url?, linkLabel? }]
 * Tambahkan ?hotspot di URL halaman untuk mengaktifkan "mode penanda":
 * klik di foto = koordinat pitch/yaw tersalin, siap ditempel ke data.
 *
 * Responsif:
 * - Layar kecil: tombol kontrol di pojok kanan atas, kartu info menjadi panel selebar foto di bawah.
 * - Layar sm ke atas: tombol kontrol di kanan bawah, kartu info di kiri bawah.
 */
export default function PanoramaViewer({
  src,
  alt = 'Panorama 360 derajat',
  yaw = 0,
  pitch = 0,
  hfov = 100,
  hotSpots,
  fallback = null,
  className = '',
}) {
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const boxRef = useRef(null)
  const viewerRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [touched, setTouched] = useState(false)
  const [isFs, setIsFs] = useState(false)
  const [canFs, setCanFs] = useState(false)
  const [active, setActive] = useState(null)
  const [picked, setPicked] = useState('')
  const [pickMode] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('hotspot')
  )

  const spots = Array.isArray(hotSpots) ? hotSpots : []
  const spotsKey = JSON.stringify(spots.map((s) => [s.pitch, s.yaw, s.title]))
  const spotsRef = useRef(spots)
  spotsRef.current = spots

  const zoomBy = (d) => {
    const v = viewerRef.current
    if (!v || !v.isLoaded()) return
    v.setHfov(clamp(v.getHfov() + d), 250)
  }

  // Buka info sebuah titik: arahkan kamera ke titik itu lalu tampilkan kartu
  const selectSpot = (i) => {
    const v = viewerRef.current
    const s = spotsRef.current[i]
    if (!v || !s) return
    setActive(i)
    setTouched(true)
    v.stopAutoRotate()
    v.lookAt(s.pitch, s.yaw, Math.min(v.getHfov(), 75), reduced ? false : 900)
  }
  const selectRef = useRef(selectSpot)
  selectRef.current = selectSpot

  // Buat viewer; dibuat ulang hanya jika gambar / posisi awal / titik info berubah
  useEffect(() => {
    const el = boxRef.current
    setStatus('loading')
    setTouched(false)
    setActive(null)
    if (!el || !window.pannellum) {
      setStatus('error')
      return
    }

    let cancelled = false
    let viewer
    try {
      viewer = window.pannellum.viewer(el, {
        type: 'equirectangular',
        panorama: src,
        autoLoad: true,
        showControls: false,
        compass: false,
        // Pannellum memasang listener keyboard di document; matikan supaya
        // tombol panah / +/- di halaman tidak dibajak. Kontrol keyboard ada di bawah.
        disableKeyboardCtrl: true,
        // Roda mouse tetap untuk scroll halaman (Lenis), bukan zoom
        mouseZoom: 'fullscreenonly',
        crossOrigin: 'anonymous',
        yaw,
        pitch,
        hfov: clamp(hfov),
        minHfov: MIN_HFOV,
        maxHfov: MAX_HFOV,
        autoRotate: reduced ? 0 : -2,
        autoRotateInactivityDelay: 6000,
        hotSpots: spotsRef.current.map((s, i) => ({
          pitch: s.pitch,
          yaw: s.yaw,
          type: 'custom',
          cssClass: 'pano-hs',
          createTooltipFunc: buildHotspot,
          createTooltipArgs: { title: s.title || `Titik ${i + 1}`, index: i },
          clickHandlerFunc: (_e, idx) => selectRef.current(idx),
          clickHandlerArgs: i,
        })),
      })
    } catch {
      setStatus('error')
      return
    }

    viewerRef.current = viewer
    const markTouched = () => !cancelled && setTouched(true)
    viewer.on('load', () => !cancelled && setStatus('ready'))
    viewer.on('error', () => !cancelled && setStatus('error'))
    viewer.on('mousedown', markTouched)
    viewer.on('touchstart', markTouched)

    return () => {
      cancelled = true
      viewerRef.current = null
      try {
        viewer.destroy()
      } catch {
        /* sudah bersih */
      }
      el.innerHTML = ''
    }
  }, [src, yaw, pitch, hfov, reduced, spotsKey])

  // Ikuti perubahan ukuran (rotasi layar, resize jendela, fullscreen)
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => viewerRef.current?.resize?.())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Fullscreen pada pembungkus sendiri supaya tombol kontrol dan kartu info ikut tampil
  useEffect(() => {
    setCanFs(!!(document.fullscreenEnabled || document.webkitFullscreenEnabled))
    const on = () => {
      const cur = document.fullscreenElement || document.webkitFullscreenElement
      setIsFs(cur === wrapRef.current)
    }
    document.addEventListener('fullscreenchange', on)
    document.addEventListener('webkitfullscreenchange', on)
    return () => {
      document.removeEventListener('fullscreenchange', on)
      document.removeEventListener('webkitfullscreenchange', on)
    }
  }, [])

  // Roda mouse = zoom, hanya saat fullscreen
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !isFs) return
    const onWheel = (e) => {
      e.preventDefault()
      zoomBy(e.deltaY * 0.05)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isFs])

  // Pesan "koordinat tersalin" hilang sendiri
  useEffect(() => {
    if (!picked) return
    const t = setTimeout(() => setPicked(''), 7000)
    return () => clearTimeout(t)
  }, [picked])

  const toggleFs = () => {
    const el = wrapRef.current
    if (!el) return
    if (isFs) (document.exitFullscreen || document.webkitExitFullscreen).call(document)
    else (el.requestFullscreen || el.webkitRequestFullscreen).call(el)
  }

  const reset = () => {
    const v = viewerRef.current
    if (!v || !v.isLoaded()) return
    setActive(null)
    v.setYaw(yaw, 600)
    v.setPitch(pitch, 600)
    v.setHfov(clamp(hfov), 600)
  }

  // Escape menutup kartu info, di mana pun fokus keyboard berada
  const cardOpen = active !== null
  useEffect(() => {
    if (!cardOpen) return
    const onEsc = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [cardOpen])

  const onKeyDown = (e) => {
    const v = viewerRef.current
    if (!v || !v.isLoaded() || e.target.closest?.('.pano-hs')) return
    let handled = true
    switch (e.key) {
      case 'ArrowLeft': v.setYaw(v.getYaw() - 15, 250); break
      case 'ArrowRight': v.setYaw(v.getYaw() + 15, 250); break
      case 'ArrowUp': v.setPitch(v.getPitch() + 10, 250); break
      case 'ArrowDown': v.setPitch(v.getPitch() - 10, 250); break
      case '+':
      case '=': zoomBy(-10); break
      case '-':
      case '_': zoomBy(10); break
      default: handled = false
    }
    if (handled) {
      e.preventDefault()
      setTouched(true)
    }
  }

  // Mode penanda: klik (bukan seret) di foto = salin koordinat
  const downPos = useRef(null)
  const onBoxPointerDown = (e) => {
    downPos.current = [e.clientX, e.clientY]
  }
  const onBoxClick = (e) => {
    if (!pickMode) return
    const d = downPos.current
    if (d && Math.hypot(e.clientX - d[0], e.clientY - d[1]) > 5) return
    if (e.target.closest?.('.pano-hs')) return
    const v = viewerRef.current
    if (!v || !v.isLoaded()) return
    const [p, y] = v.mouseEventToCoords(e.nativeEvent)
    const text = `{ pitch: ${p.toFixed(1)}, yaw: ${y.toFixed(1)}, title: '', text: '' },`
    try {
      navigator.clipboard?.writeText(text).catch(() => {})
    } catch {
      /* clipboard tidak tersedia, teks tetap ditampilkan */
    }
    setPicked(text)
  }

  const spot = active !== null ? spots[active] : null
  const nav = (d) => selectSpot((active + d + spots.length) % spots.length)

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label={`${alt}. Seret untuk melihat ke segala arah. Tombol panah menggeser, plus dan minus untuk zoom.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      // Titik info jangan bergeser terus: begitu kursor / jari masuk, putaran otomatis berhenti
      onPointerEnter={() => {
        if (spotsRef.current.length) viewerRef.current?.stopAutoRotate?.()
      }}
      data-status={status}
      data-lenis-prevent={isFs ? 'true' : undefined}
      className={`pano-view relative w-full h-full overflow-hidden bg-ink text-paper outline-none focus-visible:ring-2 focus-visible:ring-clay/70 ${className}`}
    >
      <div
        ref={boxRef}
        onPointerDown={onBoxPointerDown}
        onClick={onBoxClick}
        className={`absolute inset-0 ${status === 'error' ? 'invisible' : ''} ${pickMode ? 'cursor-crosshair' : ''}`}
      />

      {status === 'loading' && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-ink">
          <div className="flex flex-col items-center gap-3 text-[11px] tracking-[.2em] uppercase text-paper/70 text-center px-4">
            <span className="size-7 rounded-full border border-paper/25 border-t-paper animate-spin" />
            Memuat panorama 360°
          </div>
        </div>
      )}

      {status === 'error' && (
        <>
          {fallback && <div className="absolute inset-0">{fallback}</div>}
          <p className="absolute left-2 bottom-2 sm:left-4 sm:bottom-4 z-10 m-0 px-3 py-1.5 rounded-full bg-ink/70 backdrop-blur-sm text-[11px] text-paper/90">
            Panorama 360° belum bisa dimuat
          </p>
        </>
      )}

      {status === 'ready' && (
        <>
          {/* Petunjuk: dibatasi lebarnya supaya tidak menabrak tombol kontrol di pojok kanan atas (mobile) */}
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute left-2 top-2 sm:left-4 sm:top-4 z-10 m-0 inline-flex max-w-[calc(100%-3.5rem)] sm:max-w-[calc(100%-6rem)] items-center gap-2 px-3 py-1.5 rounded-full bg-ink/55 backdrop-blur-sm border border-paper/20 text-[10px] sm:text-[11px] tracking-wide text-paper transition-opacity duration-700 ${touched ? 'opacity-0' : 'opacity-100'}`}
          >
            <Move size={12} strokeWidth={1.6} className="shrink-0" />
            <span className="truncate">
              {spots.length ? `360° · Geser, ketuk titik untuk info (${spots.length})` : '360° · Geser untuk menjelajah'}
            </span>
          </p>

          {pickMode && (
            <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-12 sm:top-4 z-20 m-0 max-w-[90%] px-3 py-1.5 rounded-full bg-clay text-paper text-[11px] text-center">
              Mode penanda: klik titik pada foto untuk menyalin koordinat
            </p>
          )}
          {pickMode && picked && (
            <p className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-4 z-30 m-0 max-w-[92%] px-3 py-2 rounded-lg bg-ink/90 border border-paper/25 font-mono text-[11px] leading-snug text-paper select-text break-all">
              Disalin: {picked}
            </p>
          )}

          {spot && (
            <aside
              role="dialog"
              aria-label={spot.title || `Titik ${active + 1}`}
              className="pano-card absolute left-2 right-2 bottom-2 sm:right-auto sm:left-4 sm:bottom-4 z-20 sm:w-[min(22rem,calc(100%-6rem))] max-h-[62%] sm:max-h-[72%] overflow-y-auto overscroll-contain rounded-2xl border border-paper/20 bg-ink/85 sm:bg-ink/80 p-3.5 sm:p-4 pr-10 text-paper shadow-2xl backdrop-blur-md"
            >
              <button
                type="button"
                aria-label="Tutup informasi"
                onClick={() => setActive(null)}
                className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 size-8 sm:size-7 rounded-full grid place-items-center bg-transparent border-0 text-paper/70 cursor-pointer hover:bg-paper/15 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/70"
              >
                <X size={14} strokeWidth={1.6} />
              </button>
              {spot.image && (
                <img src={spot.image} alt="" loading="lazy" className="mb-3 h-20 sm:h-28 w-full rounded-lg object-cover" />
              )}
              <p className="m-0 mb-1 text-[10px] tracking-[.28em] uppercase text-amber-200/80">
                Titik {active + 1} dari {spots.length}
              </p>
              <h4 className="m-0 font-serif text-base sm:text-lg font-normal leading-snug">{spot.title}</h4>
              {spot.text && (
                <p className="font-text m-0 mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-paper/80">{spot.text}</p>
              )}
              {spot.url && (
                <a
                  href={spot.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-200 no-underline hover:underline"
                >
                  {spot.linkLabel || 'Selengkapnya'} <ArrowUpRight size={12} strokeWidth={1.6} />
                </a>
              )}
              {spots.length > 1 && (
                <div className="mt-3 flex items-center gap-2 border-t border-paper/15 pt-3">
                  <button type="button" aria-label="Titik sebelumnya" onClick={() => nav(-1)} className="size-8 sm:size-7 rounded-full grid place-items-center bg-transparent border border-paper/30 text-paper cursor-pointer hover:bg-paper hover:text-ink">
                    <ChevronLeft size={14} strokeWidth={1.6} />
                  </button>
                  <button type="button" aria-label="Titik berikutnya" onClick={() => nav(1)} className="size-8 sm:size-7 rounded-full grid place-items-center bg-transparent border border-paper/30 text-paper cursor-pointer hover:bg-paper hover:text-ink">
                    <ChevronRight size={14} strokeWidth={1.6} />
                  </button>
                </div>
              )}
            </aside>
          )}

          {/* Kontrol: kanan atas di mobile (supaya tidak tertutup kartu info), kanan bawah di sm ke atas */}
          <div className="absolute right-2 top-2 sm:right-4 sm:top-auto sm:bottom-4 z-20 flex flex-col gap-1.5 sm:gap-2">
            <button type="button" aria-label="Perbesar" className={btn} onClick={() => zoomBy(-10)}>
              <Plus size={15} strokeWidth={1.6} />
            </button>
            <button type="button" aria-label="Perkecil" className={btn} onClick={() => zoomBy(10)}>
              <Minus size={15} strokeWidth={1.6} />
            </button>
            <button type="button" aria-label="Kembali ke sudut awal" className={btn} onClick={reset}>
              <RotateCcw size={14} strokeWidth={1.6} />
            </button>
            {canFs && (
              <button
                type="button"
                aria-label={isFs ? 'Keluar layar penuh' : 'Layar penuh'}
                className={btn}
                onClick={toggleFs}
              >
                {isFs ? <Minimize size={14} strokeWidth={1.6} /> : <Maximize size={14} strokeWidth={1.6} />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}