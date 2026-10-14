import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Search, Star } from 'lucide-react'
import SectionLabel from '../../components/SectionLabel'
import { fetchPlaceOptions, searchPlaces } from '../../lib/placesApi'

// Pilihan cepat untuk kolom daerah
const QUICK_REGIONS = ['Jakarta', 'Yogyakarta', 'Bali', 'Bandung', 'Padang', 'Makassar']

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-text cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors duration-300 ${
        active
          ? 'border-clay bg-clay !text-white'
          : 'border-clay/25 bg-transparent text-clay hover:bg-clay/10'
      }`}
    >
      {children}
    </button>
  )
}

function Step({ n, title, children }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid size-7 place-items-center rounded-full bg-clay text-[12px] text-white">{n}</span>
        <h2 className="m-0 text-lg text-clay">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function PlaceCard({ place, index }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="m-0 overflow-hidden rounded-2xl border border-clay/15 bg-paper/70"
    >
      <div className="relative h-44 w-full bg-clay/10">
        {place.photo && imgOk ? (
          <img
            src={place.photo}
            alt={place.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-clay/40">
            <MapPin size={32} strokeWidth={1.2} />
          </div>
        )}
      </div>

      <div className="p-5">
        {place.type && (
          <p className="font-text m-0 mb-1 text-[11px] uppercase tracking-[.16em] text-ink-soft">{place.type}</p>
        )}
        <h3 className="m-0 text-[17px] leading-snug text-clay">{place.name}</h3>

        <div className="mt-2 flex items-center gap-1.5">
          {place.rating ? (
            <>
              <Star size={15} className="fill-emerald-600 text-emerald-600" strokeWidth={1.4} />
              <span className="font-text text-[14px] font-medium text-ink">{place.rating.toFixed(1)}</span>
              <span className="font-text text-[12px] text-ink-soft">
                ({place.reviews.toLocaleString('id-ID')} ulasan Tripadvisor)
              </span>
            </>
          ) : (
            <span className="font-text text-[12px] text-ink-soft">Belum ada rating</span>
          )}
        </div>

        {place.address && (
          <p className="font-text m-0 mt-3 text-[12px] leading-relaxed text-ink-soft">{place.address}</p>
        )}

        {place.url && (
          <a
            href={place.url}
            target="_blank"
            rel="noreferrer"
            className="font-text mt-4 inline-flex items-center gap-1.5 text-[12px] text-clay no-underline hover:underline"
          >
            Lihat di Tripadvisor <ExternalLink size={13} strokeWidth={1.6} />
          </a>
        )}
      </div>
    </motion.li>
  )
}

function Skeletons() {
  return (
    <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="m-0 h-[340px] animate-pulse rounded-2xl bg-clay/10" />
      ))}
    </ul>
  )
}

export default function RecommendationPage() {
  const [region, setRegion] = useState('')
  const [category, setCategory] = useState(null)
  const [type, setType] = useState(null)
  const [query, setQuery] = useState(null) // parameter yang sudah dikirim

  const options = useQuery({
    queryKey: ['place-options'],
    queryFn: fetchPlaceOptions,
    staleTime: Infinity,
  })

  const result = useQuery({
    queryKey: ['places', query],
    queryFn: () => searchPlaces(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  const categories = options.data?.categories ?? []
  const placeTypes = options.data?.place_types ?? []
  const current = categories.find((c) => c.key === category)
  const needType = !!current?.has_types

  const canSubmit = region.trim().length >= 2 && !!category && (!needType || !!type)

  const pickCategory = (key) => {
    setCategory(key)
    setType(null)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setQuery({ region: region.trim(), category, type: needType ? type : null })
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-32 pt-12 md:px-9">
      <header className="mb-10">
        <SectionLabel>Temukan Budaya</SectionLabel>
        <h1 className="text-[clamp(1.9rem,4vw,3rem)] text-clay">Cari Budaya di Daerahmu</h1>
        <p className="font-text mt-2 max-w-[520px] text-[14px] leading-relaxed text-ink-soft">
          Pilih daerah dan kategori, lalu kami tampilkan rekomendasinya lengkap dengan rating dari Tripadvisor.
        </p>
      </header>

      <form onSubmit={submit}>
        <Step n="1" title="Masukkan daerah">
          <div className="relative max-w-[460px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Contoh: Jakarta"
              maxLength={80}
              className="font-text h-12 w-full rounded-full border border-clay/25 bg-paper/70 pl-11 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-clay"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_REGIONS.map((r) => (
              <Chip key={r} active={region.trim().toLowerCase() === r.toLowerCase()} onClick={() => setRegion(r)}>
                {r}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n="2" title="Pilih kategori">
          {options.isError ? (
            <p className="font-text text-[13px] text-red-700">
              Daftar kategori gagal dimuat. Pastikan backend Laravel sedang berjalan.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {options.isLoading && <span className="font-text text-[13px] text-ink-soft">Memuat kategori...</span>}
              {categories.map((c) => (
                <Chip key={c.key} active={category === c.key} onClick={() => pickCategory(c.key)}>
                  {c.label}
                </Chip>
              ))}
            </div>
          )}
        </Step>

        {needType && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Step n="3" title="Pilih jenis tempat">
              <div className="flex flex-wrap gap-2">
                {placeTypes.map((t) => (
                  <Chip key={t.key} active={type === t.key} onClick={() => setType(t.key)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Step>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="font-text h-12 cursor-pointer rounded-full border-0 bg-clay px-8 text-[14px] font-medium tracking-wide !text-white shadow-[0_8px_20px_-8px_rgba(120,45,20,0.6)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Cari Rekomendasi
        </button>
      </form>

      {/* Hasil */}
      <section className="mt-14" aria-live="polite">
        {result.isFetching && <Skeletons />}

        {result.isError && !result.isFetching && (
          <p className="font-text rounded-2xl border border-red-300/60 bg-red-50 p-5 text-[13px] text-red-800">
            {result.error.message}
          </p>
        )}

        {result.data && !result.isFetching && (
          <>
            <h2 className="mb-6 text-xl text-clay">
              {result.data.category} di {result.data.region}
            </h2>
            {result.data.places.length === 0 ? (
              <p className="font-text text-[14px] text-ink-soft">
                Belum ada hasil. Coba nama daerah lain, kategori lain, atau jenis tempat yang berbeda.
              </p>
            ) : (
              <>
                <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {result.data.places.map((p, i) => (
                    <PlaceCard key={p.id} place={p} index={i} />
                  ))}
                </ul>
                <p className="font-text mt-8 text-[11px] text-ink-soft">
                  Data, rating, dan foto bersumber dari Tripadvisor.
                </p>
              </>
            )}
          </>
        )}
      </section>
    </div>
  )
}