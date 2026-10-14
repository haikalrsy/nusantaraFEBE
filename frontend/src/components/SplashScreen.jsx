import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  usePresence,
  useSpring,
  useTransform,
} from 'framer-motion'

const LOGO = '/images/logo.png' // dipakai hanya untuk mode reduced motion

/* ================= PENGATURAN ================= */
// --- Penutup (saat loading selesai) ---
const FINALE_DUR = 1.9     // detik: lama tiap bulu terbang keluar
const OPEN_FRAC = 0.28     // porsi awal untuk "membuka barisan" sebelum terbang (0-1)
const CURTAIN_DELAY = 0.5  // detik: kapan tirai latar mulai terbelah
const CURTAIN_DUR = 1.05   // detik: lama tirai terbelah
const EXIT_PAD = 100       // tambahan jarak terbang di luar tepi layar (% lebar logo)

// --- Saat loading ---
const AUTO_BURST = false   // true = bulu terbang sendiri tiap beberapa detik selama loading
const FIRST_BURST = 2200   // ms: terbang otomatis pertama (kalau AUTO_BURST aktif)
const BURST_EVERY = 5200   // ms: jeda terbang otomatis
const BURST_HOLD = 1700    // ms: lama melayang sebelum pulang
const REACH = 2.6          // pengali jarak terbang saat intro dan klik (dibatasi ukuran layar)
const SCREEN_MARGIN = 1.0  // 1 = boleh sampai tepi layar, 1.15 = boleh sedikit keluar
const FLUTTER = 1.5        // pengali lebar kepakan di udara
const JITTER_MAX = 1.25    // jarak terbang tiap klik diacak 0.85 sampai nilai ini
const REPEL_RADIUS = 1.3   // jangkauan dorongan kursor (1 = setengah lebar logo)
const REPEL_FORCE = 14     // kekuatan dorongan kursor (% lebar logo)
const WIND = 0.12          // seberapa kuat kecepatan kursor menggetarkan bulu
const PERSPECTIVE = 900    // kedalaman efek balik 3D (px, makin kecil makin dramatis)

/*
  Setiap bagian logo = satu gambar. Urutan array = urutan tumpukan (yang terakhir paling depan).
  Semua angka jarak dalam persen terhadap LEBAR kotak logo.

  src     : path gambar potongan (file asli, tidak perlu di-crop)
  box     : [kiri, atas, lebar, tinggi] seluruh file gambar (termasuk margin transparannya)
  pivot   : titik putar (pangkal bulu / ujung ekor sayap)
  rot0    : sudut awal dalam derajat (+ = searah jarum jam)
  cn      : pusat bagian, untuk dorongan kursor dan batas layar
  scatter : arah terbang saat intro/klik { x, y, r }, dikali REACH
  flip    : balik 3D saat intro/klik (derajat)
  ax, ay, ar, f, ph : lebar kepakan, goyang putar, kecepatan, dan fase kepakan di udara
  sway, tilt : goyangan idle dan condong mengikuti kursor (derajat)
  pop     : membesar saat intro/klik     delay : urutan muncul (detik)
  k, d    : kekakuan dan redaman pegas (d kecil = lebih memantul)

  PENUTUP:
  open    : gerak "membuka barisan" { x, y (%), r (derajat), s (membesar) }
  exit    : terbang keluar { x, y = arah (-1..1, dikali jarak ke luar layar), r = putaran,
            flip = balik 3D (derajat), delay = jeda mulai (detik) }

  Tambahkan ?bulu di URL untuk melihat kotak dan titik putar (mode penyetelan).
*/
const PIECES = [
  {
    id: 'sayap-kiri',
    src: '/images/bulu/bulu1.png',
    box: [9.2, 32.6, 45.2, 39.2],
    pivot: [45.2, 68.4], rot0: -26, cn: [25, 61],
    scatter: { x: -70, y: -10, r: -95 }, flip: 160,
    ax: 4, ay: 5, ar: 16, f: 3.4, ph: 0.4,
    sway: 2, tilt: 4, pop: 0.1, delay: 0.34, k: 52, d: 7,
    open: { x: -9, y: 2, r: -32, s: 0.06 },
    exit: { x: -1, y: -0.18, r: -540, flip: 540, delay: 0.12 },
  },
  {
    id: 'sayap-kanan',
    src: '/images/bulu/bulu4.png',
    box: [46.9, 32.6, 44.0, 41.4],
    pivot: [54.8, 68.4], rot0: 26, cn: [75, 61],
    scatter: { x: 70, y: -10, r: 95 }, flip: -160,
    ax: 4, ay: 5, ar: 16, f: 3.9, ph: 2.1,
    sway: 2, tilt: 4, pop: 0.1, delay: 0.34, k: 52, d: 7,
    open: { x: 9, y: 2, r: 32, s: 0.06 },
    exit: { x: 1, y: -0.18, r: 540, flip: -540, delay: 0.12 },
  },
  {
    id: 'dalam-kiri',
    src: '/images/bulu/bulu2.png',
    box: [23.0, 29.7, 32.9, 38.3],
    pivot: [48.6, 66.4], rot0: -4, cn: [35, 49],
    scatter: { x: -60, y: -52, r: -110 }, flip: 200,
    ax: 5, ay: 6, ar: 20, f: 4.4, ph: 1.2,
    sway: 2.4, tilt: 3, pop: 0.12, delay: 0.22, k: 58, d: 7,
    open: { x: -5, y: -4, r: -24, s: 0.08 },
    exit: { x: -0.75, y: -0.95, r: -480, flip: 540, delay: 0.06 },
  },
  {
    id: 'dalam-kanan',
    src: '/images/bulu/bulu3.png',
    box: [44.8, 28.1, 39.0, 39.4],
    pivot: [51.4, 66.4], rot0: 4, cn: [65, 49],
    scatter: { x: 60, y: -52, r: 110 }, flip: -200,
    ax: 5, ay: 6, ar: 20, f: 3.7, ph: 3.3,
    sway: 2.4, tilt: 3, pop: 0.12, delay: 0.22, k: 58, d: 7,
    open: { x: 5, y: -4, r: 24, s: 0.08 },
    exit: { x: 0.75, y: -0.95, r: 480, flip: -540, delay: 0.06 },
  },
  {
    id: 'tengah',
    src: '/images/bulu/bulutengah.png',
    box: [30.9, 22.5, 42.1, 46.4],
    pivot: [50, 66.4], rot0: 0, cn: [50, 44],
    scatter: { x: 6, y: -66, r: 40 }, flip: 240,
    ax: 5, ay: 5, ar: 14, f: 3.1, ph: 5.0,
    sway: 1.6, tilt: 2, pop: 0.14, delay: 0.12, k: 62, d: 7,
    open: { x: 0, y: -8, r: 0, s: 0.1 },
    exit: { x: 0.12, y: -1, r: 300, flip: 720, delay: 0 },
  },
  {
    id: 'alas',
    src: '/images/bulu/bulubawah.png',
    box: [19.0, 52.2, 61.3, 40.1],
    pivot: [50, 73.8], rot0: 0, cn: [50, 75],
    scatter: { x: 0, y: 56, r: 0 }, flip: 110,
    ax: 3, ay: 3, ar: 6, f: 2.6, ph: 0.9,
    sway: 0.6, tilt: 0, pop: 0.06, delay: 0, k: 75, d: 9,
    open: { x: 0, y: 5, r: 0, s: 0.03 },
    exit: { x: 0.1, y: 1, r: 90, flip: 360, delay: 0.2 },
  },
]

// Total waktu penutup (detik): bulu terakhir mulai + lama terbangnya + sedikit cadangan
const FINALE_TOTAL = Math.max(...PIECES.map((p) => p.exit.delay)) + FINALE_DUR + 0.15

// Fase penutup dari progres 0..1: "buka barisan" (memantul keluar) lalu "terbang" (makin lama makin cepat)
const openAmt = (f) => {
  const x = Math.min(1, f / OPEN_FRAC)
  return 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2
}
const flyAmt = (f) => Math.max(0, (f - OPEN_FRAC) / (1 - OPEN_FRAC)) ** 2.4

// Dorongan kursor: bagian menjauh dari kursor, makin dekat makin kuat
function repel(px, py, cn) {
  const cx = (cn[0] - 50) / 50
  const cy = (cn[1] - 50) / 50
  const dx = cx - px
  const dy = cy - py
  const dist = Math.hypot(dx, dy)
  if (dist < 0.001 || dist > REPEL_RADIUS) return [0, 0]
  const f = 1 - dist / REPEL_RADIUS
  const push = f * f * REPEL_FORCE
  return [(dx / dist) * push, (dy / dist) * push]
}

// Pengali jarak terbang per sumbu: sejauh REACH, tapi dibatasi supaya bulu tidak keluar layar
function fitScale(p, reach) {
  const fit = (sc, rest, half) => {
    if (!sc) return REACH
    const room = sc > 0 ? half * SCREEN_MARGIN - rest : half * SCREEN_MARGIN + rest
    return Math.max(0.4, Math.min(REACH, room / (Math.abs(sc) * JITTER_MAX)))
  }
  return [
    fit(p.scatter.x, p.cn[0] - 50 + reach.cx, reach.hx),
    fit(p.scatter.y, p.cn[1] - 50 + reach.cy, reach.hy),
  ]
}

function Piece({ p, px, py, t, energy, burst, finale, reach }) {
  // bx dan by = seberapa jauh terbang (1 = jauh, 0 = menyatu). Pegasnya sengaja beda
  // supaya lintasan terbang melengkung, bukan garis lurus.
  const bx = useSpring(1, { stiffness: p.k, damping: p.d })
  const by = useSpring(1, { stiffness: p.k * 0.62, damping: p.d * 0.85 })
  const opacity = useMotionValue(0)
  const fin = useMotionValue(0) // progres penutup 0..1

  // Data layar terbaru, dibaca di dalam transform
  const reachRef = useRef(reach)
  reachRef.current = reach
  const kRef = useRef([REACH, REACH])
  kRef.current = fitScale(p, reach)

  const fly = (v) => {
    bx.set(v)
    by.set(v)
  }

  // Masuk: mulai dari posisi terbang, lalu melayang pulang menyatu
  useEffect(() => {
    const fade = animate(opacity, 1, { duration: 0.35 })
    const tm = setTimeout(() => fly(0), 250 + p.delay * 1000)
    return () => {
      fade.stop()
      clearTimeout(tm)
    }
  }, [])

  // Terbang lagi setiap "burst" berubah (klik / otomatis): jarak diacak, pulang bergantian
  useEffect(() => {
    if (!burst || finale) return
    const away = 0.85 + Math.random() * (JITTER_MAX - 0.85)
    const t1 = setTimeout(() => fly(away), p.delay * 600)
    const t2 = setTimeout(() => fly(0), BURST_HOLD + (0.34 - p.delay) * 700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [burst])

  // PENUTUP: kumpulkan dulu ke posisi utuh, lalu buka barisan dan terbang keluar
  useEffect(() => {
    if (!finale) return
    fly(0)
    let ctl
    const tm = setTimeout(() => {
      ctl = animate(fin, 1, { duration: FINALE_DUR, ease: 'linear' })
    }, p.exit.delay * 1000)
    return () => {
      clearTimeout(tm)
      ctl?.stop()
    }
  }, [finale])

  const offX = useSpring(useTransform([px, py], ([x, y]) => repel(x, y, p.cn)[0]), { stiffness: 110, damping: 14 })
  const offY = useSpring(useTransform([px, py], ([x, y]) => repel(x, y, p.cn)[1]), { stiffness: 110, damping: 14 })

  // "air" = 0 saat menyatu, 1 saat terbang. "live" = seberapa hidup bulunya
  // (di udara, atau sedang tertiup gerakan kursor yang cepat).
  const air = useTransform(bx, (v) => Math.min(1, Math.abs(v)))
  const live = useTransform([air, energy], ([a, e]) => a + e * 0.45)

  // Semua jarak dihitung dalam persen lebar logo, lalu dikali "unit" (piksel per 1%)
  const x = useTransform([bx, offX, t, live, fin], ([b, o, tt, lv, f]) => {
    const { unit, far } = reachRef.current
    const fl = flyAmt(f)
    const live2 = lv + Math.min(1, fl * 1.5)
    const v =
      b * p.scatter.x * kRef.current[0] +
      o +
      Math.sin(tt * p.f + p.ph) * p.ax * FLUTTER * live2 +
      openAmt(f) * p.open.x +
      fl * far * p.exit.x
    return v * unit
  })
  const y = useTransform([by, offY, t, live, fin], ([b, o, tt, lv, f]) => {
    const { unit, far } = reachRef.current
    const fl = flyAmt(f)
    const live2 = lv + Math.min(1, fl * 1.5)
    const v =
      b * p.scatter.y * kRef.current[1] +
      o +
      Math.sin(tt * 1.1 + p.ph) * 0.9 +
      Math.cos(tt * p.f * 1.3 + p.ph) * p.ay * FLUTTER * live2 +
      openAmt(f) * p.open.y +
      fl * far * p.exit.y
    return v * unit
  })
  const rotate = useTransform([bx, t, px, live, fin], ([b, tt, pxv, lv, f]) => {
    const look = Math.max(-1.5, Math.min(1.5, pxv))
    const fl = flyAmt(f)
    const live2 = lv + Math.min(1, fl * 1.5)
    return (
      p.rot0 +
      b * p.scatter.r +
      Math.sin(tt * 0.9 + p.ph) * p.sway +
      look * p.tilt +
      Math.sin(tt * p.f * 0.8 + p.ph) * p.ar * live2 +
      openAmt(f) * p.open.r +
      fl * p.exit.r
    )
  })
  const rotateY = useTransform([bx, t, live, fin], ([b, tt, lv, f]) => {
    const fl = flyAmt(f)
    return b * p.flip + Math.sin(tt * p.f * 0.9 + p.ph) * 22 * (lv + Math.min(1, fl * 1.5)) + fl * p.exit.flip
  })
  const rotateX = useTransform([t, live, fin], ([tt, lv, f]) => {
    const fl = flyAmt(f)
    return Math.cos(tt * p.f * 0.7 + p.ph) * 14 * (lv + Math.min(1, fl * 1.5))
  })
  const scale = useTransform([bx, fin], ([b, f]) => {
    const base = 1 + Math.min(1.2, Math.abs(b)) * p.pop
    return base * (1 + openAmt(f) * p.open.s) * (1 - flyAmt(f) * 0.45)
  })
  const filter = useTransform([air, fin], ([a, f]) => {
    const blur = Math.min(3, flyAmt(f) * 4)
    return `drop-shadow(0 ${3 + a * 16}px ${5 + a * 12}px rgba(60,30,12,${0.1 + a * 0.22})) blur(${blur}px)`
  })

  // Titik putar dihitung relatif terhadap kotak gambar ini
  const [bx0, by0, bw, bh] = p.box

  return (
    <motion.img
      src={p.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none absolute select-none object-fill"
      style={{
        left: `${bx0}%`,
        top: `${by0}%`,
        width: `${bw}%`,
        height: `${bh}%`,
        transformPerspective: PERSPECTIVE,
        x,
        y,
        rotate,
        rotateX,
        rotateY,
        scale,
        opacity,
        filter,
        originX: (p.pivot[0] - bx0) / bw,
        originY: (p.pivot[1] - by0) / bh,
        willChange: 'transform',
      }}
    />
  )
}

// Seluruh logo: dipasang hanya selama splash tampil, jadi loop animasinya ikut berhenti saat splash hilang
function Logo({ debug }) {
  const boxRef = useRef(null)
  const px = useMotionValue(9) // 9 = kursor jauh di luar logo
  const py = useMotionValue(9)
  const t = useMotionValue(0) // waktu (detik) untuk kepakan
  const energy = useMotionValue(0) // "angin" dari kecepatan kursor
  const [burst, setBurst] = useState(0)
  const [finale, setFinale] = useState(false)
  const [reach, setReach] = useState({ hx: 330, hy: 190, cx: 0, cy: 0, unit: 2.88, far: 760 })
  const last = useRef(null)
  const [isPresent, safeToRemove] = usePresence()

  useAnimationFrame((time) => {
    t.set(time / 1000)
    const e = energy.get()
    if (e > 0.002) energy.set(e * 0.95)
    else if (e) energy.set(0)
  })

  // Loading selesai (splash diminta keluar): jalankan penutup, lalu izinkan splash dilepas
  useEffect(() => {
    if (isPresent) return
    setFinale(true)
    const tm = setTimeout(() => safeToRemove?.(), FINALE_TOTAL * 1000)
    return () => clearTimeout(tm)
  }, [isPresent])

  // Ukuran layar relatif terhadap lebar kotak logo, untuk batas jarak terbang
  useEffect(() => {
    const measure = () => {
      const r = boxRef.current?.getBoundingClientRect()
      if (!r || !r.width) return
      const w = window.innerWidth
      const h = window.innerHeight
      const hx = (w / 2 / r.width) * 100
      const hy = (h / 2 / r.width) * 100
      setReach({
        hx,
        hy,
        cx: ((r.left + r.width / 2 - w / 2) / r.width) * 100,
        cy: ((r.top + r.height / 2 - h / 2) / r.width) * 100,
        unit: r.width / 100,
        far: Math.max(hx, hy) * 2 + EXIT_PAD, // cukup jauh untuk keluar dari layar ke arah mana pun
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Terbang otomatis berkala (opsional)
  useEffect(() => {
    if (!AUTO_BURST) return
    const first = setTimeout(() => setBurst((n) => n + 1), FIRST_BURST)
    const loop = setInterval(() => setBurst((n) => n + 1), BURST_EVERY)
    return () => {
      clearTimeout(first)
      clearInterval(loop)
    }
  }, [])

  // Interaksi: kursor/jari di mana saja di layar splash
  useEffect(() => {
    const away = () => {
      px.set(9)
      py.set(9)
      last.current = null
    }
    const onMove = (e) => {
      const r = boxRef.current?.getBoundingClientRect()
      if (!r) return
      px.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
      py.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
      const l = last.current
      if (l) {
        const speed = Math.hypot(e.clientX - l.x, e.clientY - l.y) / Math.max(8, e.timeStamp - l.t)
        energy.set(Math.min(1, energy.get() + speed * WIND))
      }
      last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp }
    }
    const onDown = (e) => {
      onMove(e)
      setBurst((n) => n + 1)
    }
    const onUp = (e) => {
      if (e.pointerType !== 'mouse') away() // jari diangkat: dorongan hilang
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', away)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', away)
    }
  }, [])

  return (
    <div ref={boxRef} className="relative size-56 cursor-pointer touch-none sm:size-72">
      {PIECES.map((p) => (
        <Piece key={p.id} p={p} px={px} py={py} t={t} energy={energy} burst={burst} finale={finale} reach={reach} />
      ))}
      {debug && (
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full overflow-visible">
          {PIECES.map((p, i) => {
            const color = `hsl(${i * 60} 90% 45%)`
            const [bx, by, bw, bh] = p.box
            return (
              <g key={p.id}>
                <rect x={bx} y={by} width={bw} height={bh} fill="none" stroke={color} strokeWidth="0.3" strokeDasharray="1 1" />
                <circle cx={p.pivot[0]} cy={p.pivot[1]} r="1" fill={color} />
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}

// instant: dipakai saat pertama kali buka website, layar langsung tertutup tanpa animasi masuk
export default function SplashScreen({ show, instant, reduced, hold }) {
  const ease = [0.76, 0, 0.24, 1]
  const [debug] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('bulu')
  )
  const curtain = { duration: reduced ? 0.01 : CURTAIN_DUR, delay: reduced ? 0 : CURTAIN_DELAY, ease }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          role="status"
          aria-label="Memuat halaman"
          className="fixed inset-0 z-[100]"
          initial={{ clipPath: instant ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: reduced ? 0.01 : 0.6, ease }}
        >
          {/* Tirai latar: terbelah ke kiri dan kanan saat loading selesai */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[50.4%] bg-paper"
            exit={{ x: '-101%', transition: curtain }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[50.4%] bg-paper"
            exit={{ x: '101%', transition: curtain }}
          />

          <div className="relative grid size-full place-items-center">
            <div className="flex flex-col items-center px-6">
              {reduced ? (
                <motion.img
                  src={LOGO}
                  alt=""
                  draggable={false}
                  className="size-44 select-none object-contain sm:size-56"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.01 } }}
                  transition={{ duration: 0.01 }}
                />
              ) : (
                <Logo debug={debug} />
              )}
              <motion.p
                className="m-0 -mt-6 font-serif text-xl tracking-[0.35em] text-clay sm:-mt-8 sm:text-2xl"
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12, transition: { duration: reduced ? 0.01 : 0.35 } }}
                transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                NUSANTARA
              </motion.p>
              <motion.div
                className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-clay/15 sm:w-40"
                exit={{ opacity: 0, transition: { duration: reduced ? 0.01 : 0.3 } }}
              >
                <motion.div
                  className="h-full origin-left bg-clay"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduced ? 0.01 : hold, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 