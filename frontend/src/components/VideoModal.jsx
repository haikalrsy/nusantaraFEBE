import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Film, MapPin, Sparkles } from 'lucide-react'

// Mapping video per pulau (bisa menggunakan video lokal di public/videos/ atau embed/stream)
const ISLAND_VIDEOS = {
  'sumatra': {
    title: 'Pesona Pusaka Ranah Sumatra',
    place: 'Sumatra Barat, Utara & Aceh',
    src: '/videos/sumatra.mp4', // File video lokal jika diletakkan di public/videos/sumatra.mp4
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-indonesian-dance-performance-41554-large.mp4',
    description: 'Menyusuri kemegahan Rumah Gadang, gelora tarian piring, deburan Danau Toba purba, dan aroma rempah rendang yang melegenda.'
  },
  'jawa': {
    title: 'Keagungan Peradaban Keraton & Candi Jawa',
    place: 'Jawa Tengah & D.I. Yogyakarta',
    src: '/videos/jawa-web.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-temple-complex-surrounded-by-nature-41551-large.mp4',
    description: 'Kemegahan relief Candi Borobudur, alunan damai gamelan keraton, dan goresan canting malam batik tulis warisan dunia.'
  },
  'bali': {
    title: 'Harmoni Sakral Tari & Pura Dewata',
    place: 'Uluwatu & Ubud, Bali',
    src: '/videos/bali.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-balinese-dancer-moving-her-hands-41553-large.mp4',
    description: 'Dramatari kecak di tepi tebing samudra senja, aroma dupa harum, dan keindahan ornamen pura yang magis.'
  },
  'kalimantan': {
    title: 'Kearifan Rimba Khatulistiwa & Rumah Betang',
    place: 'Kalimantan Timur & Tengah',
    src: '/videos/kalimantan.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-indonesian-dance-performance-41554-large.mp4',
    description: 'Petikan merdu dawai Sampe Dayak, keagungan Rumah Betang kayu ulin, dan kesakralan tarian topeng Hudoq.'
  },
  'sulawesi': {
    title: 'Ketangguhan Pelaut Pinisi & Warisan Toraja',
    place: 'Tana Toraja & Makassar, Sulsel',
    src: '/videos/sulawesi.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-temple-complex-surrounded-by-nature-41551-large.mp4',
    description: 'Arsitektur Tongkonan beratap perahu leluhur, tradisi ritus adat Rambu Solo, dan megahnya perahu layar Pinisi.'
  },
  'nusa-tenggara': {
    title: 'Surga Savana & Mahakarya Tenun Ikat',
    place: 'Sumba, Komodo & Flores, NTT',
    src: '/videos/nusa-tenggara.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-indonesian-dance-performance-41554-large.mp4',
    description: 'Dentang petikan musik Sasando daun lontar, keagungan naga purba Komodo, dan tenun ikat Sumba berpewarna alami.'
  },
  'maluku': {
    title: 'Kepulauan Rempah & Tarian Patriotik Cakalele',
    place: 'Kepulauan Banda & Ambon, Maluku',
    src: '/videos/maluku.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-indonesian-dance-performance-41554-large.mp4',
    description: 'Aroma pala dan cengkih kepulauan rempah yang mengubah dunia, diiringi dentuman tifa dan keberanian Tari Cakalele.'
  },
  'papua': {
    title: 'Mahkota Surga Bahari & Ukiran Pusaka Asmat',
    place: 'Raja Ampat & Lembah Baliem, Papua',
    src: '/videos/papua.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/preview/mixkit-temple-complex-surrounded-by-nature-41551-large.mp4',
    description: 'Gugusan pulau karst zamrud Raja Ampat, rajutan kasih tas Noken UNESCO, dan pahatan kayu bernilai sakral suku Asmat.'
  }
}

export default function VideoModal({ island, onClose }) {
  const vidInfo = ISLAND_VIDEOS[island?.slug] || ISLAND_VIDEOS['sumatra']

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-ink text-paper rounded-2xl shadow-2xl border border-paper/20 z-10 overflow-hidden flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-paper/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-clay text-paper">
                <Film size={16} />
              </span>
              <div>
                <h3 className="text-sm md:text-base font-serif tracking-wide text-paper m-0">
                  Dokumenter Kesenian: {island?.name || 'Nusantara'}
                </h3>
                <p className="text-[11px] text-amber-200/80 m-0">
                  {vidInfo.place}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup video"
              className="p-1.5 rounded-full bg-paper/10 hover:bg-paper/25 text-paper transition-colors cursor-pointer border-0"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            <video
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              poster={island?.cover}
            >
              {/* Prioritas 1: File video lokal jika user menyimpan di public/videos/sumatra.mp4 */}
              <source src={vidInfo.src} type="video/mp4" />
              {/* Prioritas 2: Fallback video dokumenter budaya berkualitas tinggi */}
              <source src={vidInfo.fallbackUrl} type="video/mp4" />
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>
          </div>

          {/* Video Info Footer */}
          <div className="p-5 md:p-6 bg-gradient-to-t from-black to-black/80 border-t border-paper/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-base font-serif text-amber-200 m-0 mb-1">
                {vidInfo.title}
              </h4>
              <p className="text-xs text-paper/70 font-text m-0 max-w-xl leading-relaxed">
                {vidInfo.description}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] text-paper/50">
                Putar video layar penuh dengan tombol ⛶ di pemutar
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
