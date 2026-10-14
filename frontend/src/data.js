// Foto: Wikimedia Commons (Special:FilePath). Ganti nama file di sini jika ada yang tidak muncul;
// komponen <Img> otomatis memakai latar coklat bila gambar gagal dimuat.
export const IMG = {
  prambanan:
    'https://images.unsplash.com/photo-1576233475048-55f08b53a8bd?auto=format&fit=crop&w=1200&q=80',

  gadang:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  gadang2:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  rendang:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  barong:
    'https://images.unsplash.com/photo-1773563794845-b56cfaf0532a?auto=format&fit=crop&w=1200&q=80',

  angklung:
    'https://i.pinimg.com/1200x/51/85/1c/51851caa5bb0302450e5d60f4969b9c0.jpg',

  gamelan:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  gondang:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  dancer:
    'https://images.unsplash.com/photo-1773563794845-b56cfaf0532a?auto=format&fit=crop&w=1200&q=80',

  batik:
    'https://images.unsplash.com/photo-1761516659497-8478e39d2b26?auto=format&fit=crop&w=1200&q=80',

  borobudur:
    'https://images.unsplash.com/photo-1780748711983-75cb96f1bf76?auto=format&fit=crop&w=1200&q=80',

  sate:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  piring:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  rajaampat:
    'https://images.unsplash.com/photo-1675377668920-86545643d25c?auto=format&fit=crop&w=1200&q=80',

  noken:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  carving:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',

  membatik:
    'https://images.unsplash.com/photo-1761516659497-8478e39d2b26?auto=format&fit=crop&w=1200&q=80',

  musik:
    'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',
}
export const CATS = ['Semua', 'Makanan', 'Bangunan', 'Musik', 'Tradisi', 'Wisata', 'Kesenian', 'Lainnya']
export const ISLANDS = [
  { id: 'Sumatra', d: 'Keberagaman budaya dari barat hingga timur.', img: IMG.gadang, items: [
    { n: 'Rendang', c: 'Makanan', img: IMG.rendang }, { n: 'Rumah Gadang', c: 'Bangunan', img: IMG.gadang },
    { n: 'Gondang', c: 'Musik', img: IMG.gondang }, { n: 'Tari Piring', c: 'Tradisi', img: IMG.piring }] },
  { id: 'Jawa', d: 'Pusat candi, batik, dan keraton yang masih hidup.', img: IMG.borobudur, items: [
    { n: 'Candi Borobudur', c: 'Bangunan', img: IMG.borobudur }, { n: 'Batik', c: 'Kesenian', img: IMG.batik },
    { n: 'Angklung', c: 'Musik', img: IMG.angklung }, { n: 'Candi Prambanan', c: 'Wisata', img: IMG.prambanan }] },
  { id: 'Kalimantan', d: 'Rimba, sungai, dan rumah panjang suku Dayak.', img: IMG.carving, items: [
    { n: 'Ukiran Dayak', c: 'Kesenian', img: IMG.carving }, { n: 'Sasando', c: 'Musik', img: IMG.musik }] },
  { id: 'Sulawesi', d: 'Dari rumah Tongkonan hingga pelaut Bugis.', img: IMG.prambanan, items: [
    { n: 'Ukiran Toraja', c: 'Kesenian', img: IMG.carving }, { n: 'Candi Prambanan', c: 'Wisata', img: IMG.prambanan }] },
  { id: 'Bali', d: 'Upacara, tari, dan kuliner yang dirayakan setiap hari.', img: IMG.barong, items: [
    { n: 'Tari Kecak', c: 'Tradisi', img: IMG.barong }, { n: 'Sate Lilit', c: 'Makanan', img: IMG.sate },
    { n: 'Gamelan', c: 'Musik', img: IMG.gamelan }, { n: 'Legong', c: 'Kesenian', img: IMG.dancer }] },
  { id: 'Nusa Tenggara', d: 'Tenun, sasando, dan savana yang luas.', img: IMG.musik, items: [
    { n: 'Sasando', c: 'Musik', img: IMG.musik }, { n: 'Ukiran Kayu', c: 'Kesenian', img: IMG.carving }] },
  { id: 'Maluku', d: 'Kepulauan rempah yang mengubah sejarah dunia.', img: IMG.rajaampat, items: [
    { n: 'Rempah Pala', c: 'Makanan', img: IMG.rendang }, { n: 'Tifa', c: 'Musik', img: IMG.gondang }] },
  { id: 'Papua', d: 'Laut, hutan, dan tradisi tertua di timur.', img: IMG.rajaampat, items: [
    { n: 'Raja Ampat', c: 'Wisata', img: IMG.rajaampat }, { n: 'Angklung Papua', c: 'Musik', img: IMG.noken }] },
]
export const GRID = [
  { n: 'Batik', s: 'Kesenian • Jawa', img: IMG.batik, cls: 'row-span-2 col-span-1' },
  { n: 'Candi Borobudur', s: 'Bangunan • Jawa', img: IMG.borobudur, cls: 'col-span-2' },
  { n: 'Sate Lilit', s: 'Makanan • Bali', img: IMG.sate, cls: 'col-span-2' },
  { n: 'Tari Piring', s: 'Tradisi • Sumatra', img: IMG.piring },
  { n: 'Raja Ampat', s: 'Wisata • Papua', img: IMG.rajaampat },
  { n: 'Angklung', s: 'Musik • Jawa Barat', img: IMG.angklung },
]
export const LIVING = [
  { n: 'Membatik', s: 'Seni & Kerajinan', img: IMG.membatik }, { n: 'Musik Tradisional', s: 'Musik', img: IMG.gamelan },
  { n: 'Ukiran Kayu', s: 'Seni & Kerajinan', img: IMG.carving }, { n: 'Tari Tradisional', s: 'Tari', img: IMG.dancer },
]
export const DETAIL = {
  n: 'Rumah Gadang', s: 'Sumatra Barat', t: 'Arsitektur', imgs: [IMG.gadang, IMG.gadang2, IMG.rendang, IMG.piring],
  p: 'Rumah Gadang adalah rumah adat Minangkabau yang melambangkan nilai-nilai kehidupan masyarakatnya. Dengan atap melengkung seperti tanduk kerbau, rumah ini menjadi simbol kekuatan, kehormatan, dan kebijaksanaan perempuan Minangkabau.',
  meta: [['Asal Usul', 'Minangkabau'], ['Material', 'Kayu • Bambu • Ijuk'], ['Makna', 'Persatuan, kekeluargaan, dan adat']],
}
export const fetchIslands = () => new Promise((r) => setTimeout(() => r(ISLANDS), 250))
