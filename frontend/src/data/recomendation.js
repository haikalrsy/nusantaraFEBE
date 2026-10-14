// Data untuk form rekomendasi (src/data/recommendation.js)
// Hanya data tampilan. Pencarian ke TripAdvisor dilakukan di halaman /rekomendasi (backend kamu).

const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

// `key` ikut dikirim ke halaman hasil lewat query ?kategori=
export const CATEGORIES = [
  { key: 'makanan', label: 'Makanan', icon: 'Utensils', photo: U('1541832676-9b763b0239ab'), caption: 'Rendang, Sumatera Barat' },
  { key: 'minuman', label: 'Minuman', icon: 'CupSoda', photo: '', caption: 'Es dawet, Jawa Tengah' },
  { key: 'tradisi', label: 'Tradisi', icon: 'Drum', photo: U('1533105079780-92b9be482077'), caption: 'Tari Kecak, Bali' },
  { key: 'wisata', label: 'Tempat Wisata', icon: 'Landmark', photo: U('1507525428034-b723cf961d3e'), caption: 'Pantai Kuta, Bali' },
  { key: 'kerajinan', label: 'Kerajinan', icon: 'Scissors', photo: U('1607604276583-eef5d076aa5f'), caption: 'Batik tulis, Yogyakarta' },
]

// Hanya muncul saat kategori = Tempat Wisata
export const PLACE_TYPES = [
  'Museum', 'Situs bersejarah', 'Situs prasejarah', 'Candi & pura', 'Kampung adat',
  'Galeri & seni', 'Taman & alam', 'Pantai',
]

export const POPULAR = ['Yogyakarta', 'Bali', 'Jakarta', 'Bandung', 'Padang', 'Makassar']

// Saran pada kolom daerah: provinsi + kota/destinasi yang sering dicari
export const REGIONS = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan',
  'Bangka Belitung', 'Bengkulu', 'Lampung', 'DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah',
  'DI Yogyakarta', 'Jawa Timur', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
  'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
  'Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan',
  'Sulawesi Tenggara', 'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Selatan',
  'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya',
  'Jakarta', 'Bandung', 'Yogyakarta', 'Solo', 'Semarang', 'Surabaya', 'Malang', 'Denpasar', 'Ubud',
  'Lombok', 'Labuan Bajo', 'Medan', 'Padang', 'Bukittinggi', 'Palembang', 'Makassar', 'Toraja',
  'Manado', 'Banjarmasin', 'Pontianak', 'Ambon', 'Raja Ampat', 'Magelang (Borobudur)', 'Cirebon',
]