// Sorotan Mahakarya Budaya Utama (Featured Spotlight) per Pulau
//
// Cara pakai panorama 360° (equirectangular, rasio 2:1):
//   panoramas: [ { src, alt, yaw, pitch, hfov, hotSpots: [...] }, ... ]
//   - Taruh file di public/panoramas/ lalu isi src: '/panoramas/nama-file.jpg'
//   - yaw/pitch/hfov = sudut pandang awal (opsional)
//   - hotSpots = titik info yang bisa diklik di dalam foto:
//       { pitch, yaw, title, text, image?, url?, linkLabel? }
//
// Mencari nilai pitch & yaw: buka halaman dengan ?hotspot di URL
// (mis. http://localhost:5173/?hotspot), lalu klik objek di foto.
// Koordinat tersalin otomatis, tinggal tempel ke hotSpots.
//
// NILAI pitch/yaw di bawah masih contoh. Sesuaikan dengan foto 360° kamu.

export const islandFeatured = {
  'sumatra': {
    slug: 'rumah-gadang',
    title: 'RUMAH GADANG',
    place: 'Sumatra Barat',
    kind: 'Arsitektur Pusaka',
    description: 'Rumah Gadang adalah rumah adat Minangkabau yang melambangkan nilai-nilai kehidupan masyarakatnya. Dengan atap gonjong melengkung seperti tanduk kerbau, bangunan ini dirancang tahan gempa dengan sistem pasak kayu tanpa paku besi, merefleksikan keagungan falsafah matrilineal Minang.',
    meta: [
      { label: 'Asal Usul', value: 'Minangkabau, Sumatra Barat', icon: 'origin' },
      { label: 'Material', value: 'Kayu ulin, bambu talang, ijuk hitam', icon: 'material' },
      { label: 'Makna', value: 'Kekerabatan ibu, kebijaksanaan, dan adat', icon: 'meaning' },
    ],
    panoramas: [
      {
src: '/panoramas/gadang1.jpg',
alt: 'Panorama 360° Rumah Gadang dengan arsitektur tradisional Minangkabau',
yaw: 0,
pitch: 0,
hfov: 100,
hotSpots: [
{
pitch: 8,
yaw: 0,
title: 'Rumah Gadang',
text: 'Rumah Gadang merupakan rumah adat masyarakat Minangkabau di Sumatera Barat. Bangunan ini secara tradisional berfungsi sebagai tempat tinggal keluarga besar dan ruang berlangsungnya kegiatan adat. Bentuk arsitekturnya mencerminkan nilai kebersamaan, kekerabatan, dan identitas budaya Minangkabau.',
},
{
pitch: 20,
yaw: -20,
title: 'Atap Gonjong',
text: 'Atap Rumah Gadang memiliki bentuk melengkung dengan ujung runcing yang disebut gonjong. Bentuk khas ini menjadi identitas arsitektur Minangkabau dan sering dikaitkan dengan tanduk kerbau dalam tradisi setempat.',
},
{
pitch: 5,
yaw: 15,
title: 'Fasad dan Ornamen',
text: 'Bagian depan Rumah Gadang menampilkan susunan jendela, ukiran, dan detail dekoratif tradisional. Motif ukiran Minangkabau banyak terinspirasi dari tumbuhan, hewan, serta kehidupan sehari-hari dan mengandung nilai filosofis tentang hubungan manusia dengan alam.',
},
{
pitch: -12,
yaw: 0,
title: 'Halaman Depan',
text: 'Halaman terbuka di depan bangunan menjadi ruang transisi antara lingkungan luar dan Rumah Gadang. Area ini mendukung aktivitas pengunjung serta membantu memperlihatkan keseluruhan bentuk bangunan dari kejauhan.',
},
{
pitch: 0,
yaw: -65,
title: 'Taman dan Pepohonan',
text: 'Pepohonan dan taman di sekitar kompleks memberikan suasana hijau yang menyatu dengan lingkungan bangunan tradisional. Lanskap ini memperlihatkan bagaimana kawasan budaya dapat menghadirkan hubungan antara arsitektur dan alam.',
},
{
pitch: 0,
yaw: 65,
title: 'Lingkungan Budaya',
text: 'Kawasan di sekitar Rumah Gadang menjadi bagian dari pengalaman mengenal kebudayaan Minangkabau. Tata ruang, vegetasi, dan bangunan pendukung membentuk lingkungan yang memperkenalkan warisan arsitektur tradisional kepada pengunjung.',
},
],
},

    ],
    gallery: [
      { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Rumah_Gadang.jpg/1280px-Rumah_Gadang.jpg?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=thumbnail', alt: 'Rumah Gadang tampak depan dengan lengkung gonjong megah' },
      { src: 'https://marinews.mahkamahagung.go.id/static/2026/01/23/rumah-gadang-yyaB1.jpg', alt: 'Ukiran dinding Rumah Gadang bermotif flora alam' },
      { src: 'https://courtina.id/ot/wp-content/uploads/2020/12/rumah-gadang-2.jpg', alt: 'Interior ruang lepas tiang kayu Rumah Gadang' },
      { src: 'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80', alt: 'Atap gonjong bertingkat berlapis ijuk hitam' },
      { src: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80', alt: 'Rangkiang lumbung pangan di pekarangan adat' },
    ],
  },
  'jawa': {
    slug: 'candi-borobudur',
    title: 'CANDI BOROBUDUR',
    place: 'Magelang, Jawa Tengah',
    kind: 'Monumen Dunia',
    description: 'Mahakarya arsitektur batu andesit terbesar di dunia yang dibangun oleh Dinasti Syailendra pada abad ke-8 Masehi. Menggambarkan kosmologi alam semesta Buddha dari tingkatan nafsu hingga pencerahan spiritual tertinggi.',
    meta: [
      { label: 'Asal Usul', value: 'Kerajaan Mataram Kuno, Jawa Tengah', icon: 'origin' },
      { label: 'Material', value: '2 juta balok batu andesit interlocking', icon: 'material' },
      { label: 'Makna', value: 'Perjalanan jiwa manusia menuju nirwana', icon: 'meaning' },
    ],
    // Dulu ada dua key "panorama" (kembar, yang kedua menimpa yang pertama). Sekarang satu daftar.
    panoramas: [
      {
src: '/panoramas/borobudur.jpg',
alt: 'Panorama 360° pelataran depan Candi Borobudur',
yaw: 0,
pitch: 0,
hfov: 100,
hotSpots: [
{
pitch: 8,
yaw: 0,
title: 'Bangunan Utama Candi',
text: 'Candi Borobudur merupakan monumen Buddha yang dibangun pada abad ke-8 hingga ke-9 pada masa Dinasti Syailendra. Struktur bertingkatnya memperlihatkan keahlian arsitektur masyarakat Jawa Kuno dan mencerminkan perjalanan spiritual dalam ajaran Buddha.',
},
{
pitch: -8,
yaw: 0,
title: 'Tangga Utama',
text: 'Tangga utama menjadi akses menuju teras-teras candi. Secara simbolis, perjalanan naik melalui tingkatan candi dapat dimaknai sebagai perjalanan manusia menuju kebijaksanaan dan pembebasan spiritual.',
},
{
pitch: -12,
yaw: -45,
title: 'Pelataran Batu',
text: 'Pelataran di depan candi terdiri atas jalur dan susunan batu yang menghubungkan area terbuka dengan bangunan utama. Dari sini, pengunjung dapat mengamati skala monumental Borobudur secara langsung.',
},
{
pitch: 2,
yaw: -65,
title: 'Taman dan Lingkungan Candi',
text: 'Area hijau di sekitar Borobudur menghadirkan perpaduan antara warisan arsitektur dan lanskap alam. Pepohonan serta ruang terbuka menjadi bagian dari lingkungan kawasan candi di Magelang, Jawa Tengah.',
},
{
pitch: 5,
yaw: 35,
title: 'Dinding dan Relief',
text: 'Dinding Borobudur dihiasi panel relief yang menggambarkan kisah kehidupan, ajaran moral, dan tradisi Buddhis. Relief-relief ini menjadi sumber penting untuk mempelajari seni serta kebudayaan Jawa Kuno.',
},
],
},
{
src: '/panoramas/borobudur2.jpg',
alt: 'Panorama 360° teras stupa di puncak Candi Borobudur',
yaw: 0,
pitch: 0,
hfov: 100,
hotSpots: [
{
pitch: 12,
yaw: -30,
title: 'Stupa Berlubang Kiri',
text: 'Stupa berlubang di teras atas memiliki pola geometris berbentuk belah ketupat. Melalui celah-celahnya, pengunjung dapat melihat bagian dalam stupa yang menaungi arca Buddha.',
},
{
pitch: 30, yaw: -60,
title: 'Stupa Induk',
text: 'Stupa induk merupakan stupa terbesar yang berada di pusat puncak Borobudur. Bentuknya yang monumental menjadi pusat komposisi arsitektur teras atas dan melambangkan pencapaian spiritual tertinggi.',
},
{
pitch: -45,
yaw: 0,
title: 'Lantai Batu Andesit',
text: 'Lantai teras tersusun dari batu andesit yang membentuk jalur di antara stupa-stupa. Area ini memungkinkan pengunjung berjalan mengelilingi teras sambil mengamati detail arsitektur dari berbagai sudut.',
},
{
pitch: 2,
yaw: 115,
title: 'Perbukitan Menoreh',
text: 'Di kejauhan, perbukitan dan lanskap hijau di sekitar Magelang menjadi latar alami bagi kompleks Borobudur. Panorama ini memperlihatkan hubungan antara monumen bersejarah dan lingkungan alam Jawa Tengah.',
},
{
pitch: 0,
yaw: -120,
title: 'Deretan Stupa',
text: 'Berbagai stupa dengan bentuk dan ukuran berbeda membentuk susunan yang harmonis di teras atas. Penataan ini merupakan salah satu ciri paling ikonik dari arsitektur Candi Borobudur.',
},
],
},

    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1780748711983-75cb96f1bf76?auto=format&fit=crop&w=1200&q=80', alt: 'Stupa puncak Candi Borobudur saat mentari pagi' },
      { src: 'https://images.unsplash.com/photo-1576233475048-55f08b53a8bd?auto=format&fit=crop&w=1200&q=80', alt: 'Pahatan relief andesit cerita kehidupan kuno' },
      { src: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80', alt: 'Siluet Borobudur di antara pegunungan Menoreh' },
    ],
  },
  'bali': {
    slug: 'tari-kecak',
    title: 'TARI KECAK ULUWATU',
    place: 'Uluwatu, Bali',
    kind: 'Seni Pertunjukan Sakral',
    description: 'Dramatari tanpa instrumen gamelan yang dipentaskan oleh puluhan pria bertelanjang dada di pelataran tebing samudra Pura Uluwatu, menyerukan ritme vokal "cak-cak-cak" menyala seiring tenggelamnya matahari ke batas cakrawala.',
    meta: [
      { label: 'Asal Usul', value: 'Tradisi Sanghyang, Bali', icon: 'origin' },
      { label: 'Unsur Seni', value: 'Vokal paduan suara & api unggun sakral', icon: 'material' },
      { label: 'Makna', value: 'Keteguhan kebajikan menaklukkan keangkaramurkaan', icon: 'meaning' },
    ],
    // Isi bila sudah ada foto 360°, mis. pelataran Pura Uluwatu atau tempat pentas Kecak
panoramas: [
  {
    src: '/panoramas/bal1i.jpg',
    alt: 'Panorama 360° pertunjukan Tari Kecak di Pura Uluwatu saat matahari terbenam',
    yaw: 0,
    pitch: 0,
    hfov: 100,
    hotSpots: [
      {
        pitch: -29,
        yaw: -189,
        title: 'Lingkaran Penari Kecak',
        text: 'Puluhan penari pria duduk melingkar sambil menyerukan suara cak-cak-cak secara berirama tanpa menggunakan alat musik. Pola lingkaran menjadi ciri khas pertunjukan Tari Kecak dan membangun suasana dramatis dalam setiap adegan.',
      },
      {
         pitch: -18,
        yaw: -190,
        title: 'Arena Pertunjukan',
        text: 'Arena berbentuk amfiteater terbuka menjadi pusat pementasan Tari Kecak. Susunan tempat duduk bertingkat memungkinkan penonton menyaksikan gerakan para penari dari berbagai sudut dengan latar alam Uluwatu.',
      },
      {
        pitch: -1,
        yaw: -190,
        title: 'Samudra Hindia',
        text: 'Pertunjukan berlangsung di kawasan tebing Pura Luhur Uluwatu yang menghadap Samudra Hindia. Hamparan laut menjadi latar alami yang memperkuat suasana pertunjukan budaya Bali ini.',
      },
      {
         pitch: 15,
        yaw: -190,
        title: 'Senja Uluwatu',
        text: 'Cahaya matahari terbenam menghadirkan nuansa keemasan di sekitar arena pertunjukan. Perpaduan langit senja, suara koor Kecak, dan panorama laut menjadikan pengalaman ini salah satu daya tarik budaya Bali.',
      },
      {
        pitch: -18,
        yaw: -180,
        title: 'Adegan Tari Api',
        text: 'Adegan api menjadi salah satu bagian klimaks pertunjukan. Dalam rangkaian cerita yang melibatkan Hanoman, unsur api menghadirkan suasana dramatis dan memperkuat penggambaran konflik dalam kisah Ramayana.',
      },
    ],
  },
],
    gallery: [
      { src: 'https://i.pinimg.com/1200x/38/ab/0b/38ab0b7acfa7ffe5019c63f9d388f9e0.jpg', alt: 'Lingkaran puluhan penari kecak di tebing Uluwatu' },
      { src: 'https://i.pinimg.com/1200x/11/e5/2b/11e52b6f2e1ed31b67158dc012e9318b.jpg', alt: 'Aksi Hanoman kera putih di tengah kobaran api' },
      { src: 'https://i.pinimg.com/1200x/a9/a5/ff/a9a5ff24f2e35be199c2c9c940018e01.jpg  ', alt: 'Pemandangan laut lepas senja pura dewata' },
    ],
  },
  'kalimantan': {
    slug: 'rumah-betang',
    title: 'RUMAH BETANG DAYAK',
    place: 'Kalimantan Tengah',
    kind: 'Arsitektur Komunal',
    description: 'Rumah panggung kayu ulin raksasa sepanjang ratusan meter yang menjadi hunian puluhan keluarga Dayak dalam kerukunan komunal yang damai dan menyatu dengan rimba raya khatulistiwa.',
    meta: [
      { label: 'Asal Usul', value: 'Suku Dayak, Kalimantan', icon: 'origin' },
      { label: 'Material', value: 'Kayu ulin (kayu besi kalimantan)', icon: 'material' },
      { label: 'Makna', value: 'Kebersamaan, kesetaraan, dan harmoni alam', icon: 'meaning' },
    ],
    // Isi bila sudah ada foto 360°, mis. teras atau halaman Rumah Betang
panoramas: [
  {
    src: '/panoramas/betang.jpg',
    alt: 'Panorama Rumah Betang Ensaid Panjang, rumah adat Dayak di Kalimantan Barat',
    yaw: 0,
    pitch: 0,
    hfov: 100,
    hotSpots: [
      {
        pitch: 2,
        yaw: 65,
        title: 'Rumah Betang Ensaid Panjang',
        text: 'Rumah adat masyarakat Dayak Desa di Kalimantan Barat. Bangunannya memanjang dan menjadi simbol kebersamaan serta kehidupan komunal masyarakat.'
      },
      
      {
        pitch: 5,
        yaw: 20,
        title: 'Atap Sirap Kayu',
        text: 'Atap tradisional yang menggunakan sirap dari kayu, mencerminkan pemanfaatan bahan alam dalam arsitektur rumah Betang.'
      },
      {
        pitch: -8,
        yaw: 65,
        title: 'Kolong Rumah',
        text: 'Ruang di bawah rumah panggung yang terbentuk karena bangunan berdiri di atas tiang kayu.'
      },
      {
        pitch: -8,
        yaw: 145,
        title: 'Tangga Kayu',
        text: 'Tangga menjadi akses untuk naik ke lantai rumah panggung. Pada rumah Betang Ensaid Panjang, tangga merupakan bagian penting dari arsitektur tradisional.'
      },
      {
        pitch: 10,
        yaw: 145,
        title: 'Warisan Budaya Dayak',
        text: 'Rumah Betang melestarikan arsitektur, tradisi, dan nilai gotong royong masyarakat Dayak yang diwariskan antargenerasi.'
      }
    ]
  }
],
    gallery: [
      { src: 'https://indonesiakaya.com/wp-content/uploads/2020/10/5__IMG_1960_Rumah_ini_dibangun_sekitar_tahun_1875_dan_baru_mengalami_rehabilitasi_di_tahun_2012.jpg', alt: 'Arsitektur kayu Rumah Betang Dayak panjang' },
      { src: 'https://asset.kompas.com/crops/oouBO-9CdY2npxHD-WtdThmvBP0=/0x0:0x0/1200x800/data/photo/2026/07/30/6a6b4e1b58140.jpg', alt: 'Upacara adat suku Dayak di pelataran betang' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRRbP0IsFRKfXa4XV4X759FUa1_hsMAmYNXcIjPOd4tVvcc4E0bE4_rz-&s=10', alt: 'Petikan instrumen dawai Sampe merdu' },
    ],
  },
'sulawesi': {
  slug: 'makam-lemo',
  title: 'MAKAM LEMO',
  place: 'Lemo, Tana Toraja, Sulawesi Selatan',
  kind: 'Situs Pemakaman Leluhur',
  description: 'Makam tebing khas suku Toraja yang dipahat langsung pada dinding batu kapur, menjadi tempat peristirahatan leluhur yang dilengkapi liang kubur, patung tau-tau sebagai representasi orang yang telah meninggal, serta mencerminkan penghormatan terhadap leluhur dan tingginya nilai budaya masyarakat Toraja.',
  meta: [
    {
      label: 'Asal Usul',
      value: 'Suku Toraja, Lemo, Tana Toraja',
      icon: 'origin'
    },
    {
      label: 'Material',
      value: 'Tebing batu kapur, kayu, dan patung tau-tau',
      icon: 'material'
    },
    {
      label: 'Makna',
      value: 'Penghormatan kepada leluhur dan perjalanan menuju alam baka',
      icon: 'meaning'
    },
  ],
  // Isi jika sudah tersedia foto 360° situs Makam Lemo
panoramas: [

  {
    src: '/panoramas/toraja.jpg',
    alt: 'Panorama 360° Kuburan Batu Lemo dengan tebing makam, tau-tau, dan bangunan Toraja',
    yaw: 0,
    pitch: 0,
    hfov: 100,
    hotSpots: [
      {
        pitch: 8,
        yaw: 0,
        title: 'Tebing Makam Lemo',
        text: 'Tebing batu di hadapan pengunjung merupakan bagian utama kompleks Kuburan Batu Lemo. Dindingnya dipahat menjadi sejumlah liang kubur yang menjadi tempat peristirahatan leluhur masyarakat Toraja.',
      },
      {
        pitch: -5,
        yaw: 0,
        title: 'Pelataran Batu',
        text: 'Pelataran berbatu di kaki tebing menjadi ruang untuk mengamati situs pemakaman. Area ini menghubungkan pengunjung dengan bagian utama makam dan memperlihatkan bentuk permukaan tanah yang mengikuti kontur alami kawasan.',
      },
      {
        pitch: 20,
        yaw: -20,
        title: 'Liang Kubur Leluhur',
        text: 'Lubang-lubang pada dinding tebing merupakan liang kubur yang dipahat ke dalam batu. Penempatannya memperlihatkan tradisi pemakaman khas Toraja yang menghubungkan penghormatan kepada leluhur dengan bentang alam.',
      },
      {
        pitch: 10,
        yaw: -15,
        title: 'Patung Tau-Tau',
        text: 'Tau-tau merupakan patung kayu yang merepresentasikan orang yang telah meninggal. Dalam tradisi Toraja, patung ini berkaitan dengan penghormatan kepada leluhur dan biasanya ditempatkan di area tertentu pada kompleks pemakaman.',
      },
      {
        pitch: -10,
        yaw: 10,
        title: 'Bangunan Tongkonan',
        text: 'Bangunan beratap melengkung di depan tebing merupakan rumah adat Toraja atau tongkonan. Bentuk atapnya yang khas menjadi ciri arsitektur tradisional Toraja dan mencerminkan identitas budaya masyarakat setempat.',
      },
      {
        pitch: 15,
        yaw: -65,
        title: 'Tebing dan Vegetasi',
        text: 'Pepohonan serta tumbuhan hijau tumbuh di sekitar dinding batu dan membingkai kompleks pemakaman. Perpaduan alam dan situs budaya ini menciptakan suasana khas kawasan Kuburan Batu Lemo.',
      },
      {
        pitch: -42,
        yaw: 90,
        title: 'Tangga dan Jalur Akses',
        text: 'Jalur serta undakan batu di area bawah tebing membantu pengunjung menjangkau bagian tertentu dari kompleks. Posisi jalur mengikuti kontur tanah di antara pelataran, tebing, dan bangunan tradisional.',
      },
    ],
  },

  // {
  //   src: '/panoramas/lemo2.jpg',
  //   alt: 'Panorama 360° lebih dekat ke liang kubur dan patung tau-tau Makam Lemo',
  //   yaw: 0,
  //   pitch: 0,
  //   hfov: 100,
  //   hotSpots: [
  //     {
  //       pitch: 10,
  //       yaw: -30,
  //       title: 'Deretan Liang Kubur',
  //       text: 'Lubang-lubang makam dipahat pada bagian tebing dengan ukuran dan posisi yang beragam. Setiap liang kubur berkaitan dengan tradisi pemakaman keluarga dan penghormatan terhadap anggota keluarga yang telah meninggal.',
  //     },
  //     {
  //       pitch: 8,
  //       yaw: 0,
  //       title: 'Patung Tau-Tau Leluhur',
  //       text: 'Patung tau-tau ditempatkan di ceruk atau balkon tertentu pada tebing makam. Patung ini melambangkan representasi orang yang telah meninggal dan menjadi pengingat hubungan antara keluarga yang masih hidup dengan leluhur mereka.',
  //     },
  //     {
  //       pitch: -15,
  //       yaw: 0,
  //       title: 'Jalur Batu',
  //       text: 'Jalur berbatu menghubungkan area pelataran dan bagian-bagian kompleks makam. Permukaan jalur yang mengikuti kontur tanah memperlihatkan penyesuaian akses terhadap kondisi alam kawasan tebing.',
  //     },
  //     {
  //       pitch: 0,
  //       yaw: 60,
  //       title: 'Bangunan Tongkonan',
  //       text: 'Di sekitar kompleks makam terdapat bangunan tradisional Toraja dengan atap melengkung menyerupai perahu. Tongkonan memiliki fungsi sosial dan adat sebagai pusat identitas serta kehidupan keluarga Toraja.',
  //     },
  //     {
  //       pitch: 15,
  //       yaw: 120,
  //       title: 'Ceruk Pemakaman',
  //       text: 'Ceruk-ceruk pada tebing berfungsi sebagai tempat penyimpanan jenazah. Tradisi pemakaman seperti ini menunjukkan hubungan erat antara kepercayaan leluhur, struktur sosial keluarga, dan bentang alam Toraja.',
  //     },
  //     {
  //       pitch: 25,
  //       yaw: -120,
  //       title: 'Pemandangan Tebing',
  //       text: 'Dari sudut ini, pengunjung dapat mengamati skala tebing dan susunan makam yang menyatu dengan lingkungan sekitarnya. Makam Lemo menjadi bukti pentingnya tradisi leluhur dalam identitas budaya masyarakat Toraja.',
  //     },
  //   ],
  // },
],

  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pemandangan situs pemakaman tebing khas Toraja'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qeY7pGWaN_P_Kodjn98iND6TLKudVtq07R7j7O08CerKPKCNlqzr_WZ2&s=10',
      alt: 'Liang kubur dan patung tau-tau di tebing Lemo'
    },
    {
      src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      alt: 'Detail tradisi pemakaman dan warisan budaya Toraja'
    },
  ],
},
  'nusa-tenggara': {
  slug: 'kampung-adat-bena',
  title: 'KAMPUNG ADAT BENA',
  place: 'Ngada, Flores, NTT',
  kind: 'Warisan Budaya',
  description: 'Perkampungan adat megalitik di kaki Gunung Inerie yang mempertahankan rumah tradisional beratap ilalang, susunan batu megalitik, serta tradisi leluhur masyarakat Ngada yang diwariskan secara turun-temurun.',
  meta: [
    { label: 'Asal Usul', value: 'Desa Tiwuriwu, Kabupaten Ngada, Flores, NTT', icon: 'origin' },
    { label: 'Arsitektur', value: 'Rumah adat tradisional dengan atap ilalang dan struktur kayu', icon: 'material' },
    { label: 'Makna', value: 'Identitas leluhur, kehidupan komunal, dan kepercayaan adat masyarakat Ngada', icon: 'meaning' },
  ],
    // Isi bila sudah ada foto 360°, mis. kampung adat Sumba atau savana
    panoramas: [
      {
src: '/panoramas/bena.jpg',
alt: 'Panorama 360° Kampung Adat Bena, Flores, Nusa Tenggara Timur',
yaw: 0,
pitch: 0,
hfov: 100,
hotSpots: [
{
pitch: 8,
yaw: 0,
title: 'Kampung Adat Bena',
text: 'Kampung Adat Bena berada di Kabupaten Ngada, Pulau Flores, Nusa Tenggara Timur. Perkampungan ini dikenal dengan rumah adat tradisional, peninggalan megalitik, dan tradisi leluhur masyarakat Ngada yang masih dijaga hingga kini.',
},
{
pitch: 20,
yaw: 25,
title: 'Rumah Adat Sa’o',
text: 'Sa’o adalah sebutan untuk rumah adat masyarakat Ngada. Bangunannya menggunakan struktur tradisional dengan atap tinggi berbahan ilalang. Rumah tidak hanya berfungsi sebagai tempat tinggal, tetapi juga berkaitan dengan identitas keluarga, garis keturunan, dan kehidupan adat.',
},
{
pitch: 15,
yaw: -35,
title: 'Atap Ilalang',
text: 'Atap tebal dari ilalang menjadi ciri khas rumah tradisional Bena. Bentuknya yang tinggi dan curam memberikan karakter visual yang kuat sekaligus memperlihatkan penggunaan bahan alam dalam arsitektur lokal.',
},
{
pitch: -5,
yaw: 0,
title: 'Halaman Adat',
text: 'Ruang terbuka di tengah perkampungan menjadi bagian penting dari tata ruang Kampung Bena. Area ini menghubungkan rumah-rumah adat dan menjadi ruang bersama bagi aktivitas masyarakat serta pelaksanaan kegiatan adat.',
},
{
pitch: -3,
yaw: -15,
title: 'Batu Megalitik',
text: 'Batu-batu megalitik di Kampung Bena menjadi bagian dari warisan tradisi leluhur masyarakat Ngada. Susunan batu tertentu memiliki hubungan dengan kegiatan seremonial dan penghormatan kepada leluhur.',
},
{
pitch: 5,
yaw: 65,
title: 'Ngadhu dan Bhaga',
text: 'Ngadhu berupa tiang kayu dengan atap kecil yang melambangkan leluhur laki-laki, sedangkan Bhaga berbentuk rumah mini yang melambangkan leluhur perempuan. Keduanya merupakan simbol penting dalam sistem kekerabatan dan kehidupan spiritual masyarakat Ngada.',
},
{
pitch: 20,
yaw: 190,
title: 'Gunung Inerie',
text: 'Kampung Adat Bena terletak di kawasan kaki Gunung Inerie, gunung berapi yang menjadi penanda alam penting di wilayah Ngada. Keberadaan gunung dan lanskap sekitarnya berkaitan erat dengan identitas serta pandangan budaya masyarakat setempat.',
},

],
},

    ],
    gallery: [
      { src: 'https://mediaindonesia.gumlet.io/news/2021/05/3732096a0d351e2dd28b42efb8204349.jpg?w=360&dpr=2.6', alt: 'Pemandangan rumah adat bena' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-0gvglHaOqV26TnvugFW7SbsHi1S88_ZkIOiLcaBhA&s=10', alt: 'Proses menenun helai benang kapas di alat tenun tradisional' },
      { src: 'https://phinemo.com/wp-content/uploads/2018/03/21819925_423224464745739_9004827930282426368_n.jpg', alt: 'Savana Sumba tanah lahirnya mahakarya tenun ikat' },
    ],
  },
  'maluku': {
    slug: 'tari-cakalele',
    title: 'TARI CAKALELE',
    place: 'Kepulauan Maluku',
    kind: 'Tarian Perang Heroik',
    description: 'Tarian perang berkharisma tinggi dengan parang dan tameng salawaku, mengobarkan gelora patriotik membela pusaka tanah rempah pala dan cengkih kepulauan Maluku.',
    meta: [
      { label: 'Asal Usul', value: 'Kepulauan Rempah Maluku', icon: 'origin' },
      { label: 'Atribut', value: 'Parang tajam, tameng salawaku, bulu cenderawasih', icon: 'material' },
      { label: 'Makna', value: 'Keberanian, kehormatan leluhur, dan cinta tanah air', icon: 'meaning' },
    ],
    // Isi bila sudah ada foto 360°, mis. pantai atau benteng bersejarah di Maluku
    panoramas: [
      {
      src: '/panoramas/bandaneira.jpg'
      }
    ],
    gallery: [
      { src: 'https://i.pinimg.com/1200x/63/51/eb/6351ebe2dc9f8950bc5138c953c1d869.jpg', alt: 'Prajurit Cakalele memegang parang dan salawaku dengan tatapan tajam' },
      { src: 'https://i.pinimg.com/1200x/63/51/eb/6351ebe2dc9f8950bc5138c953c1d869.jpg  ', alt: 'Gerak tarian perang heroik di tepian laut Banda' },
      { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', alt: 'Dentuman tifa mengiringi sorak prajurit' },
    ],
  },
  'papua': {
    slug: 'raja-ampat',
    title: 'SURGA RAJA AMPAT',
    place: 'Papua Barat Daya',
    kind: 'Bentang Alam Pusaka',
    description: 'Gugusan pulau karst zamrud yang mengapung di atas samudra toska kristal, menyimpan jantung keanekaragaman hayati terumbu karang terkaya di muka bumi.',
    meta: [
      { label: 'Asal Usul', value: 'Papua Barat Daya', icon: 'origin' },
      { label: 'Kekayaan', value: '75% spesies karang keras dan 1.500 spesies ikan dunia', icon: 'material' },
      { label: 'Makna', value: 'Mahkota kemurnian alam semesta Nusantara', icon: 'meaning' },
    ],
    // Isi bila sudah ada foto 360°, mis. puncak Wayag atau pantai Raja Ampat
    panoramas: [
      {
        src : '/panoramas/rajaampat.jpg'
      }
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1675377668920-86545643d25c?auto=format&fit=crop&w=1200&q=80', alt: 'Gugusan karst Wayag Raja Ampat yang mendunia' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', alt: 'Keindahan bawah laut terumbu karang hidup yang sehat' },
      { src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80', alt: 'Tas Noken serat kulit kayu warisan mama Papua' },
    ],
  },
}

// Default fallback untuk backward compatibility
export const featured = islandFeatured['sumatra']