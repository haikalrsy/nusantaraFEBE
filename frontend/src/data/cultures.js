  // Data kebudayaan: 8 pulau x 3 kategori (Makanan, Pakaian, Tradisi) x 3 budaya = 72 entri.
  // Foto per slug bisa diisi lewat ./images (images[slug] = { src, credit }).
  // Jika belum ada, dipakai foto cadangan per kategori (placeholder) sampai kamu mengganti dengan foto asli.
  import { images } from './images'

  // Foto asli yang sudah kamu punya untuk slug tertentu
  const defaultImages = {
    'rendang': 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/17A7A/production/_102609869_rendanggettysatu.jpg.webp',
    'pacu-jalur': 'https://api.kemenpar.go.id/storage/app/uploads/public/688/c94/6b4/thumb_14595_1200_630_0_0_crop.jpg',
    'songket-palembang': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    'batik': 'https://images.unsplash.com/photo-1695306441929-0082158cfc27?q=80&w=735&auto=format&fit=crop',
    'tari-kecak': 'https://images.unsplash.com/photo-1773563794845-b56cfaf0532a?auto=format&fit=crop&w=1200&q=80',
    'tari-hudoq': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    'tenun-ikat': 'https://i.pinimg.com/1200x/0f/4d/93/0f4d933283bcff58eeda10537c9ebf98.jpg',
    'noken': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
  }

  // Foto cadangan per kategori (placeholder)
  const fallbackByCategory = {
    Makanan: [
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    ],
    Pakaian: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1695306441929-0082158cfc27?q=80&w=735&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1761516659497-8478e39d2b26?auto=format&fit=crop&w=1200&q=80',
    ],
    Tradisi: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    ],
  }

  const base = [
    // ===================== SUMATRA =====================
    // --- Makanan ---
    {
      slug: 'rendang',
      title: 'Rendang',
      category: 'Makanan',
      island: 'sumatra',
      place: 'Sumatra Barat',
      summary: 'Mahakarya kuliner Minangkabau: daging dimasak perlahan dengan santan dan rempah melimpah hingga meresap sempurna dan berwarna gelap karamel.',
      description: 'Rendang bukan sekadar masakan, tetapi cerminan kesabaran dan kebersamaan orang Minang. Proses memasaknya bisa memakan waktu berjam-jam hingga bumbu mengering dan awet disimpan lama.',
      funFacts: [
        'Rendang pernah dinobatkan CNN sebagai salah satu makanan terlezat di dunia.',
        'Empat bahan utamanya sering dimaknai sebagai simbol unsur masyarakat Minang yang bermusyawarah: daging, kelapa, cabai, dan bumbu.'
      ]
    },
    {
      slug: 'sate-padang',
      title: 'Sate Padang',
      category: 'Makanan',
      island: 'sumatra',
      place: 'Padang, Sumatra Barat',
      summary: 'Sate daging sapi dengan kuah kental kuning kecokelatan beraroma rempah, disajikan bersama ketupat dan taburan bawang goreng.',
      description: 'Sate Padang punya beberapa gaya, seperti Padang Panjang, Pariaman, dan Padang Kota, yang dibedakan oleh warna dan kepedasan kuahnya. Daging direbus bersama rempah sebelum dibakar sebentar di atas bara.',
      funFacts: [
        'Kuahnya dikentalkan dengan tepung beras dan dibumbui puluhan jenis rempah.',
        'Selain daging, isian sate yang lazim adalah lidah dan jeroan sapi.'
      ]
    },
    {
      slug: 'pempek',
      title: 'Pempek Palembang',
      category: 'Makanan',
      island: 'sumatra',
      place: 'Palembang, Sumatra Selatan',
      summary: 'Olahan ikan dan sagu yang kenyal gurih, disajikan dengan kuah cuko asam manis pedas.',
      description: 'Pempek hadir dalam banyak bentuk: kapal selam berisi telur, lenjer, adaan, hingga kulit. Kuah cuko dibuat dari gula, cuka, bawang putih, dan cabai yang menyeimbangkan rasa gurih ikannya.',
      funFacts: [
        'Menurut cerita populer, nama pempek berasal dari sebutan "apek" bagi penjual keturunan Tionghoa yang dahulu menjajakannya.',
        'Pempek kapal selam adalah varian paling dikenal karena isian telur ayam utuhnya.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'songket-palembang',
      title: 'Songket Palembang',
      category: 'Pakaian',
      island: 'sumatra',
      place: 'Palembang, Sumatra Selatan',
      summary: 'Kain tenun mewah bersulam benang emas yang dijuluki "ratu segala kain", lambang kemegahan budaya Melayu Palembang.',
      description: 'Songket ditenun tangan dengan menyisipkan benang emas atau perak ke dalam kain dasar sehingga membentuk motif timbul. Dahulu kain ini identik dengan busana bangsawan dan perhelatan adat besar.',
      funFacts: [
        'Motif seperti lepus dan bunga tanjung menjadi ciri khas songket Palembang.',
        'Selembar songket halus bisa memakan waktu berminggu-minggu hingga berbulan-bulan untuk ditenun.'
      ]
    },
    {
      slug: 'ulos-batak',
      title: 'Ulos Batak',
      category: 'Pakaian',
      island: 'sumatra',
      place: 'Sumatra Utara',
      summary: 'Kain tenun sakral suku Batak yang melambangkan kehangatan, restu, dan kasih sayang, dipakai dalam hampir semua upacara adat.',
      description: 'Ulos tidak hanya dikenakan, tetapi juga diberikan sebagai bentuk doa dan penghormatan. Setiap jenis ulos memiliki warna, motif, dan peruntukan sendiri sesuai acara dan penerimanya.',
      funFacts: [
        'Tradisi mangulosi adalah prosesi menyelimutkan ulos kepada seseorang sebagai tanda restu.',
        'Ulos kerap diberikan oleh pihak orang tua atau yang dituakan kepada anak, menantu, atau cucu dalam upacara adat.'
      ]
    },
    {
      slug: 'pakaian-adat-minang',
      title: 'Busana Adat Minangkabau',
      category: 'Pakaian',
      island: 'sumatra',
      place: 'Sumatra Barat',
      summary: 'Busana pengantin dan kebesaran Minang dengan baju kurung beludru, kain songket, dan suntiang, mahkota logam bertingkat di kepala perempuan.',
      description: 'Busana ini mencerminkan kedudukan perempuan Minang dalam sistem matrilineal. Suntiang yang berkilau dan bergoyang menjadi pusat perhatian sekaligus simbol kehormatan.',
      funFacts: [
        'Suntiang dapat berbobot beberapa kilogram sehingga pemakainya harus berlatih menahan beban di kepala.',
        'Bentuk dan jumlah hiasan suntiang berbeda antar daerah (nagari) di Sumatra Barat.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'tari-saman',
      title: 'Tari Saman',
      category: 'Tradisi',
      island: 'sumatra',
      place: 'Gayo Lues, Aceh',
      summary: 'Tarian dari dataran tinggi Gayo yang menampilkan puluhan penari bersila dengan tepukan tangan dan dada yang serempak dan cepat.',
      description: 'Saman biasa dibawakan dalam acara adat dan perayaan penting masyarakat Gayo. Keseragaman gerak dan syair yang dilantunkan bersama menjadi inti pertunjukannya.',
      funFacts: [
        'UNESCO mengakui Tari Saman sebagai Warisan Budaya Takbenda pada 2011.',
        'Tari ini tidak memakai alat musik; ritmenya lahir dari tepukan dan suara penari sendiri.'
      ]
    },
    {
      slug: 'lompat-batu-nias',
      title: 'Lompat Batu Nias (Fahombo)',
      category: 'Tradisi',
      island: 'sumatra',
      place: 'Pulau Nias, Sumatra Utara',
      summary: 'Tradisi pemuda Nias melompati susunan batu setinggi sekitar dua meter sebagai bukti ketangkasan dan kedewasaan.',
      description: 'Fahombo dahulu menjadi latihan ketangkasan prajurit untuk melompati benteng desa musuh. Kini tradisi ini dipertunjukkan di desa adat seperti Bawomataluo dan menjadi kebanggaan masyarakat Nias.',
      funFacts: [
        'Tumpukan batu yang dilompati tingginya sekitar dua meter.',
        'Pemuda yang berhasil melompat dianggap telah dewasa dan dihormati di desanya.'
      ]
    },
    {
      slug: 'pacu-jalur',
      title: 'Pacu Jalur',
      category: 'Tradisi',
      island: 'sumatra',
      place: 'Kuantan Singingi, Riau',
      summary: 'Lomba dayung perahu kayu panjang yang diawaki puluhan pendayung di Sungai Batang Kuantan.',
      description: 'Jalur dibuat dari satu batang pohon besar yang dilubangi, dan pengerjaannya melibatkan ritual serta gotong royong warga. Di haluan jalur berdiri anak coki yang menari memberi semangat pendayung.',
      funFacts: [
        'Tradisi ini diperkirakan telah berlangsung sejak berabad-abad lalu di tepian Sungai Kuantan.',
        'Satu jalur dapat diawaki puluhan pendayung yang harus kompak mendayung serempak.'
      ]
    },

    // ===================== JAWA =====================
    // --- Makanan ---
    {
      slug: 'gudeg',
      title: 'Gudeg Yogyakarta',
      category: 'Makanan',
      island: 'jawa',
      place: 'Yogyakarta',
      summary: 'Nangka muda yang dimasak lama bersama gula aren, santan, dan daun jati hingga berwarna cokelat dan berasa manis legit.',
      description: 'Gudeg biasa disajikan dengan nasi, ayam, telur pindang, tahu-tempe, dan sambal krecek yang pedas. Perpaduan manis dan pedasnya menjadi identitas kuliner Yogyakarta.',
      funFacts: [
        'Daun jati yang ikut dimasak memberi warna cokelat kemerahan alami.',
        'Gudeg kering tahan lebih lama sehingga populer sebagai oleh-oleh.'
      ]
    },
    {
      slug: 'rawon',
      title: 'Rawon',
      category: 'Makanan',
      island: 'jawa',
      place: 'Jawa Timur',
      summary: 'Sup daging sapi berkuah hitam pekat dari kluwek, disajikan dengan tauge pendek, telur asin, dan sambal.',
      description: 'Kluwek memberi rawon warna gelap dan rasa gurih khas yang sulit ditiru. Hidangan ini lazim ditemui di Surabaya dan sekitarnya, biasanya dimakan dengan kerupuk dan sambal terasi.',
      funFacts: [
        'Kluwek berasal dari biji pohon pangi (Pangium edule) yang harus diolah dahulu agar aman dimakan.',
        'Tauge pendek dan telur asin adalah pelengkap khas rawon Jawa Timur.'
      ]
    },
    {
      slug: 'lumpia-semarang',
      title: 'Lumpia Semarang',
      category: 'Makanan',
      island: 'jawa',
      place: 'Semarang, Jawa Tengah',
      summary: 'Gulungan kulit tipis berisi rebung, telur, dan udang atau ayam, hasil perpaduan kuliner Tionghoa dan Jawa.',
      description: 'Lumpia Semarang dapat dinikmati goreng maupun basah, disantap dengan saus kental manis gurih dan acar. Isian rebungnya memberi aroma dan tekstur khas.',
      funFacts: [
        'Lumpia Semarang dikenal sebagai hasil akulturasi budaya Tionghoa dan Jawa.',
        'Rebung (bambu muda) menjadi bahan isian yang menjadi ciri khasnya.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'batik',
      title: 'Batik Tulis',
      category: 'Pakaian',
      island: 'jawa',
      place: 'Yogyakarta & Solo, Jawa Tengah',
      summary: 'Kain bermotif filosofis yang digambar dengan canting dan malam panas, diakui UNESCO sebagai warisan budaya dunia.',
      description: 'Setiap motif batik membawa makna dan doa, misalnya Parang yang melambangkan keteguhan atau Truntum yang berarti cinta yang tumbuh kembali. Proses canting menuntut ketelatenan tinggi.',
      funFacts: [
        'UNESCO menetapkan Batik Indonesia sebagai Warisan Budaya Takbenda pada 2 Oktober 2009, yang kini diperingati sebagai Hari Batik Nasional.',
        'Di keraton tertentu ada motif larangan yang hanya boleh dikenakan keluarga raja.'
      ]
    },
    {
      slug: 'kebaya',
      title: 'Kebaya Jawa',
      category: 'Pakaian',
      island: 'jawa',
      place: 'Jawa Tengah & Yogyakarta',
      summary: 'Atasan perempuan berpotongan anggun yang dipadukan dengan jarik batik dan sanggul, busana khas perempuan Jawa.',
      description: 'Kebaya Jawa biasanya dikenakan bersama kain jarik dan stagen sehingga membentuk siluet yang rapi dan berwibawa. Busana ini dipakai pada upacara adat, pernikahan, dan acara resmi.',
      funFacts: [
        'Kebaya menjadi bagian nominasi bersama beberapa negara untuk pengakuan UNESCO.',
        'Cara memakai jarik dan lipatan wiru punya aturan tersendiri dalam tata busana Jawa.'
      ]
    },
    {
      slug: 'beskap-blangkon',
      title: 'Beskap & Blangkon',
      category: 'Pakaian',
      island: 'jawa',
      place: 'Yogyakarta & Surakarta',
      summary: 'Busana adat pria Jawa berupa beskap, kain batik, keris, dan penutup kepala blangkon.',
      description: 'Beskap adalah jas tertutup yang dipadukan dengan jarik dan blangkon dalam upacara adat serta pertunjukan seni. Kelengkapan busana ini mencerminkan sikap tertib dan sopan.',
      funFacts: [
        'Blangkon gaya Yogyakarta memiliki tonjolan di belakang (mondholan), sedangkan gaya Solo cenderung datar.',
        'Keris yang diselipkan di punggung melengkapi busana adat pria Jawa dalam upacara tertentu.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'wayang-kulit',
      title: 'Wayang Kulit',
      category: 'Tradisi',
      island: 'jawa',
      place: 'Jawa Tengah & Jawa Timur',
      summary: 'Pertunjukan bayangan boneka kulit yang digerakkan dalang dengan iringan gamelan, membawakan kisah Mahabharata dan Ramayana.',
      description: 'Dalang memainkan semua tokoh, mengubah suara, dan menyampaikan petuah lewat cerita. Pertunjukan semalam suntuk adalah bagian dari tradisi dalam hajatan dan upacara besar.',
      funFacts: [
        'UNESCO menetapkan wayang sebagai karya agung warisan budaya lisan dan takbenda pada 2003.',
        'Dalang dalam satu pertunjukan memerankan seluruh tokoh sekaligus mengendalikan iringan musik.'
      ]
    },
    {
      slug: 'sekaten',
      title: 'Sekaten',
      category: 'Tradisi',
      island: 'jawa',
      place: 'Yogyakarta & Surakarta',
      summary: 'Perayaan Maulid Nabi di lingkungan keraton, ditandai gamelan pusaka dan kirab gunungan hasil bumi.',
      description: 'Sekaten diselenggarakan dengan memainkan gamelan pusaka di halaman masjid agung dan diakhiri Grebeg Maulud, ketika gunungan diarak lalu diperebutkan warga. Perayaan ini memadukan nilai keagamaan dan tradisi keraton.',
      funFacts: [
        'Gamelan Sekaten hanya dimainkan pada perayaan ini dan dianggap pusaka keraton.',
        'Gunungan berisi hasil bumi dan diyakini membawa berkah bagi yang mendapatkannya.'
      ]
    },
    {
      slug: 'reog-ponorogo',
      title: 'Reog Ponorogo',
      category: 'Tradisi',
      island: 'jawa',
      place: 'Ponorogo, Jawa Timur',
      summary: 'Seni pertunjukan dengan topeng singa raksasa berhias bulu merak yang ditopang penari dengan kekuatan gigi dan leher.',
      description: 'Reog menampilkan Singa Barong, warok, dan penari jathil dalam pertunjukan yang gagah dan dramatis. Kisahnya berakar dari legenda dan sindiran terhadap penguasa pada masa lalu.',
      funFacts: [
        'Topeng dadak merak berbobot puluhan kilogram sehingga penarinya membutuhkan kekuatan khusus.',
        'Warok adalah tokoh yang dihormati karena kewibawaan dan ilmu kanuragannya.'
      ]
    },

    // ===================== BALI =====================
    // --- Makanan ---
    {
      slug: 'sate-lilit',
      title: 'Sate Lilit',
      category: 'Makanan',
      island: 'bali',
      place: 'Bali',
      summary: 'Daging atau ikan cincang berbumbu basa genep yang dililitkan pada batang serai atau bambu lalu dibakar.',
      description: 'Adonan sate lilit dicampur kelapa parut dan rempah khas Bali sehingga gurih dan harum. Penyajiannya sering ditemani sambal matah dan nasi.',
      funFacts: [
        'Berbeda dari sate biasa, dagingnya dilumatkan dan dililitkan, bukan ditusuk.',
        'Batang serai memberi aroma tambahan saat sate dibakar.'
      ]
    },
    {
      slug: 'ayam-betutu',
      title: 'Ayam Betutu',
      category: 'Makanan',
      island: 'bali',
      place: 'Gilimanuk & Gianyar, Bali',
      summary: 'Ayam atau bebek yang diisi bumbu basa genep, dibungkus daun, lalu dimasak lama hingga empuk dan meresap.',
      description: 'Betutu dikenal pedas, gurih, dan kaya rempah. Proses memasaknya yang lama membuat bumbu menyatu dengan dagingnya.',
      funFacts: [
        'Bumbu basa genep terdiri dari beragam rempah seperti kunyit, jahe, kencur, dan cabai.',
        'Hidangan ini sering disajikan dalam acara adat dan perayaan di Bali.'
      ]
    },
    {
      slug: 'babi-guling',
      title: 'Babi Guling',
      category: 'Makanan',
      island: 'bali',
      place: 'Bali',
      summary: 'Babi panggang berbumbu rempah yang diputar di atas bara hingga kulitnya renyah dan dagingnya gurih.',
      description: 'Babi guling lekat dengan upacara adat dan perayaan masyarakat Bali Hindu. Perut babi diisi bumbu basa genep sebelum dipanggang perlahan.',
      funFacts: [
        'Kulit yang renyah dan bumbu rempah menjadi ciri khasnya.',
        'Hidangan ini biasa hadir pada upacara adat dan hari raya di Bali.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'endek-bali',
      title: 'Kain Endek',
      category: 'Pakaian',
      island: 'bali',
      place: 'Klungkung, Gianyar & Denpasar, Bali',
      summary: 'Kain tenun ikat Bali dengan pola yang dibentuk dari benang pakan yang diikat dan dicelup sebelum ditenun.',
      description: 'Endek dibuat dengan teknik ikat pakan, sehingga motifnya terbentuk dari benang yang diwarnai bertahap. Kain ini dipakai untuk busana harian, seragam, hingga upacara.',
      funFacts: [
        'Teknik ikat pakan berarti hanya benang pakan yang diikat dan diwarnai.',
        'Endek kini banyak dipadukan dengan desain busana modern.'
      ]
    },
    {
      slug: 'payas-agung',
      title: 'Payas Agung',
      category: 'Pakaian',
      island: 'bali',
      place: 'Bali',
      summary: 'Busana pengantin kebesaran Bali dengan kain songket, mahkota emas, dan hiasan bunga yang mewah.',
      description: 'Payas Agung berasal dari busana kebangsawanan dan dipakai dalam upacara pernikahan adat. Busana ini terdiri dari kain songket, perhiasan emas, dan hiasan kepala yang penuh ornamen.',
      funFacts: [
        'Tata rias dan busana pengantin Bali dibedakan menurut tingkatan, seperti agung, madya, dan nista.',
        'Hiasan bunga emas pada mahkota menjadi daya tarik utamanya.'
      ]
    },
    {
      slug: 'udeng-kamen',
      title: 'Udeng & Kamen',
      category: 'Pakaian',
      island: 'bali',
      place: 'Bali',
      summary: 'Busana adat ke pura berupa ikat kepala udeng, kain kamen, dan selendang saput.',
      description: 'Pria Bali mengenakan udeng, kamen, dan saput saat menghadiri upacara keagamaan sebagai bentuk kesopanan dan penghormatan. Cara melipat udeng pun memiliki makna.',
      funFacts: [
        'Ujung udeng yang mengarah ke atas sering dimaknai sebagai pemusatan pikiran kepada Tuhan.',
        'Kamen adalah kain yang dililitkan di pinggang sebagai bawahan busana adat.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'tari-kecak',
      title: 'Tari Kecak',
      category: 'Tradisi',
      island: 'bali',
      place: 'Uluwatu & Bona, Bali',
      summary: 'Dramatari yang dibawakan puluhan pria bersila melingkar sambil menyerukan "cak" serempak, mengisahkan Ramayana.',
      description: 'Kecak berkembang dari ritual sanghyang yang bernuansa trans, lalu diperkaya dengan kisah Ramayana. Pertunjukannya di Uluwatu saat matahari terbenam menjadi daya tarik wisata terkenal.',
      funFacts: [
        'Tari ini tidak memakai gamelan; seluruh iringan berasal dari suara para penari.',
        'Kecak dalam bentuk pertunjukan seperti sekarang berkembang sekitar 1930-an.'
      ]
    },
    {
      slug: 'ngaben',
      title: 'Ngaben',
      category: 'Tradisi',
      island: 'bali',
      place: 'Bali',
      summary: 'Upacara kremasi umat Hindu Bali untuk mengantarkan roh leluhur menuju alam berikutnya.',
      description: 'Ngaben dipandang sebagai penyucian dan pelepasan roh dari ikatan duniawi. Jenazah diarak dalam wadah atau bade dan kemudian dibakar dalam suasana yang penuh doa dan kebersamaan.',
      funFacts: [
        'Bade adalah menara tandu yang mengusung jenazah menuju tempat kremasi.',
        'Ngaben bisa melibatkan banyak warga dan kerap dilakukan secara bersama-sama (ngaben massal).'
      ]
    },
    {
      slug: 'nyepi',
      title: 'Nyepi & Ogoh-Ogoh',
      category: 'Tradisi',
      island: 'bali',
      place: 'Bali',
      summary: 'Hari Raya Nyepi, tahun baru Saka, dirayakan dengan hening sehari penuh setelah arak-arakan ogoh-ogoh sehari sebelumnya.',
      description: 'Pada Nyepi, umat Hindu Bali menjalankan Catur Brata Penyepian: tidak menyalakan api, tidak bekerja, tidak bepergian, dan tidak bersenang-senang. Malam sebelumnya, ogoh-ogoh raksasa diarak lalu dibakar sebagai simbol penyucian.',
      funFacts: [
        'Pada hari Nyepi, bandara internasional di Bali berhenti beroperasi selama sekitar 24 jam.',
        'Ogoh-ogoh dibuat secara gotong royong oleh pemuda banjar.'
      ]
    },

    // ===================== KALIMANTAN =====================
    // --- Makanan ---
    {
      slug: 'soto-banjar',
      title: 'Soto Banjar',
      category: 'Makanan',
      island: 'kalimantan',
      place: 'Banjarmasin, Kalimantan Selatan',
      summary: 'Soto ayam berkuah bening harum rempah dengan lontong atau ketupat, perkedel, dan telur rebus.',
      description: 'Soto Banjar memakai rempah seperti kayu manis, cengkih, dan pala yang membuat kuahnya wangi. Penyajiannya khas dengan soun, suwiran ayam, dan sambal.',
      funFacts: [
        'Kuahnya bening tetapi sangat beraroma karena rempah utuh.',
        'Soto Banjar sering ditemani ketupat dan perkedel.'
      ]
    },
    {
      slug: 'juhu-singkah',
      title: 'Juhu Singkah',
      category: 'Makanan',
      island: 'kalimantan',
      place: 'Kalimantan Tengah',
      summary: 'Masakan Dayak berbahan umbut rotan muda yang dimasak dengan ikan atau daging dan bumbu sederhana.',
      description: 'Juhu singkah memanfaatkan umbut rotan dari hutan sebagai bahan utama. Rasanya khas dengan sedikit pahit yang berpadu gurih kuah ikan atau ayam.',
      funFacts: [
        'Bahan utamanya diambil dari pucuk muda tanaman rotan.',
        'Hidangan ini mencerminkan cara masyarakat Dayak memanfaatkan hasil hutan.'
      ]
    },
    {
      slug: 'bubur-pedas-sambas',
      title: 'Bubur Pedas Sambas',
      category: 'Makanan',
      island: 'kalimantan',
      place: 'Sambas, Kalimantan Barat',
      summary: 'Bubur nasi gurih dengan beragam sayuran dan dedaunan, kacang, dan teri, yang populer di bulan Ramadan.',
      description: 'Bubur pedas Sambas dimasak dengan campuran rempah, sayuran, dan daun-daunan sehingga beraroma kuat. Hidangan ini sangat lekat dengan tradisi berbuka puasa masyarakat Sambas.',
      funFacts: [
        'Bubur ini sering dibagikan kepada warga saat Ramadan.',
        'Aroma dan rasanya berasal dari aneka daun dan rempah lokal.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'sasirangan',
      title: 'Kain Sasirangan',
      category: 'Pakaian',
      island: 'kalimantan',
      place: 'Banjarmasin, Kalimantan Selatan',
      summary: 'Kain khas suku Banjar yang dihias dengan teknik jahit-jelujur dan ikat celup.',
      description: 'Nama sasirangan berasal dari kata menyirang, yakni menjahit jelujur kain sebelum dicelup. Hasilnya adalah motif warna-warni yang khas dan sarat makna.',
      funFacts: [
        'Pada awalnya kain ini digunakan dalam ritual pengobatan tradisional Banjar.',
        'Kini sasirangan dikembangkan menjadi busana, dekorasi, dan suvenir.'
      ]
    },
    {
      slug: 'baju-king-baba',
      title: 'Baju King Baba & King Bibinge',
      category: 'Pakaian',
      island: 'kalimantan',
      place: 'Kalimantan Barat',
      summary: 'Busana adat Dayak berhias manik dan bulu burung, King Baba untuk pria dan King Bibinge untuk perempuan.',
      description: 'Busana ini dikenakan dalam upacara dan perayaan adat Dayak. Hiasan manik dan bulu menambah kesan gagah serta mencerminkan kekayaan alam Kalimantan.',
      funFacts: [
        'Bahan tradisionalnya diolah dari alam sekitar seperti kulit kayu dan serat.',
        'Manik-manik menjadi hiasan penting pada busana adat Dayak.'
      ]
    },
    {
      slug: 'manik-dayak',
      title: 'Manik-Manik Dayak',
      category: 'Pakaian',
      island: 'kalimantan',
      place: 'Kalimantan',
      summary: 'Perhiasan dan hiasan busana dari manik-manik yang dirangkai dengan motif Dayak, sekaligus benda pusaka keluarga.',
      description: 'Manik dipakai pada kalung, ikat kepala, baju, hingga tas gendong. Manik-manik tua sering diwariskan antargenerasi dan dipercaya memiliki nilai spiritual.',
      funFacts: [
        'Manik-manik lama diwariskan sebagai pusaka keluarga.',
        'Motif manik umumnya terinspirasi flora, fauna, dan kepercayaan Dayak.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'tari-hudoq',
      title: 'Tari Hudoq',
      category: 'Tradisi',
      island: 'kalimantan',
      place: 'Kalimantan Timur',
      summary: 'Tarian bertopeng suku Dayak yang dilakukan pada awal musim tanam untuk memohon panen yang baik.',
      description: 'Penari memakai topeng kayu berwujud burung atau makhluk mitos dan kostum dari dedaunan. Gerakan mereka melambangkan roh pelindung yang menjaga ladang dari hama.',
      funFacts: [
        'Tarian ini berkaitan erat dengan siklus bercocok tanam padi.',
        'Topeng dan kostum dedaunan membuat penari tampil sebagai roh pelindung.'
      ]
    },
    {
      slug: 'erau-kutai',
      title: 'Erau Kutai',
      category: 'Tradisi',
      island: 'kalimantan',
      place: 'Tenggarong, Kalimantan Timur',
      summary: 'Pesta adat Kesultanan Kutai Kartanegara dengan ritual mengulur naga dan belimbur, saling siram air.',
      description: 'Erau berarti ramai atau riuh, dan menjadi perayaan besar budaya Kutai. Rangkaian acaranya meliputi upacara adat, pertunjukan seni, dan ritual yang melibatkan masyarakat luas.',
      funFacts: [
        'Salah satu puncaknya adalah ritual mengulur naga di Sungai Mahakam.',
        'Belimbur adalah tradisi saling menyiram air di penghujung acara.'
      ]
    },
    {
      slug: 'tiwah',
      title: 'Tiwah',
      category: 'Tradisi',
      island: 'kalimantan',
      place: 'Kalimantan Tengah',
      summary: 'Upacara ritual kematian tingkat akhir masyarakat Dayak Ngaju penganut Kaharingan untuk mengantar roh ke alam leluhur.',
      description: 'Dalam Tiwah, tulang belulang leluhur dipindahkan ke sandung sebagai tempat peristirahatan terakhir. Upacara ini berlangsung beberapa hari dan melibatkan keluarga besar serta masyarakat.',
      funFacts: [
        'Sandung adalah bangunan kecil tempat menyimpan tulang leluhur.',
        'Upacara ini dapat memakan waktu beberapa hari dan biaya besar sehingga sering diadakan bersama-sama.'
      ]
    },

    // ===================== SULAWESI =====================
    // --- Makanan ---
    {
      slug: 'coto-makassar',
      title: 'Coto Makassar',
      category: 'Makanan',
      island: 'sulawesi',
      place: 'Makassar, Sulawesi Selatan',
      summary: 'Sup daging dan jeroan sapi berkuah kental gurih dari kacang tanah dan puluhan rempah.',
      description: 'Coto disantap bersama ketupat dan sambal, menjadi sarapan favorit warga Makassar. Kuahnya pekat dengan aroma rempah dan kacang yang kuat.',
      funFacts: [
        'Kuahnya dikentalkan dengan kacang tanah sangrai yang digiling.',
        'Coto biasa dimakan dengan ketupat atau burasa.'
      ]
    },
    {
      slug: 'konro',
      title: 'Konro',
      category: 'Makanan',
      island: 'sulawesi',
      place: 'Makassar, Sulawesi Selatan',
      summary: 'Iga sapi berkuah cokelat gelap dari kluwek, tersedia juga versi bakar dengan olesan bumbu manis.',
      description: 'Konro berkuah hitam kecokelatan dengan rasa gurih rempah. Versi konro bakar disajikan tanpa kuah, dibakar dan dilumuri bumbu, dimakan dengan sambal dan nasi atau ketupat.',
      funFacts: [
        'Warna gelap kuahnya berasal dari kluwek.',
        'Iga sapi menjadi bahan utama sehingga dagingnya empuk dan berlemak.'
      ]
    },
    {
      slug: 'tinutuan',
      title: 'Tinutuan (Bubur Manado)',
      category: 'Makanan',
      island: 'sulawesi',
      place: 'Manado, Sulawesi Utara',
      summary: 'Bubur nasi dengan labu kuning, singkong, jagung, bayam, dan kemangi, disantap dengan ikan asin dan sambal dabu-dabu.',
      description: 'Tinutuan adalah sarapan khas Manado yang kaya sayuran. Rasanya ringan dan gurih, dilengkapi sambal dabu-dabu yang segar pedas.',
      funFacts: [
        'Tinutuan dimasak dengan beragam sayuran dan umbi sehingga bergizi.',
        'Sambal dabu-dabu dan ikan asin adalah teman makan yang lazim.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'baju-bodo',
      title: 'Baju Bodo',
      category: 'Pakaian',
      island: 'sulawesi',
      place: 'Sulawesi Selatan',
      summary: 'Busana tradisional perempuan Bugis-Makassar berpotongan persegi dan bahan tipis, dipadukan dengan sarung sutra.',
      description: 'Baju bodo dikenal sebagai salah satu pakaian tradisional tertua di Nusantara. Warna yang dikenakan dapat menandakan usia atau kedudukan pemakainya.',
      funFacts: [
        'Warna baju bodo menandakan kelompok usia dan status sosial.',
        'Pakaian ini biasanya dikenakan dalam upacara adat dan pernikahan.'
      ]
    },
    {
      slug: 'sutra-sengkang',
      title: 'Sutra Sengkang',
      category: 'Pakaian',
      island: 'sulawesi',
      place: 'Sengkang, Wajo, Sulawesi Selatan',
      summary: 'Sarung sutra tenunan tangan khas Bugis dari Sengkang yang halus dan berkilau.',
      description: 'Sengkang dikenal sebagai sentra sutra, dengan sarung sutra yang disebut lipa sabbe. Kain ini ditenun dengan motif kotak-kotak khas dan dipakai dalam acara adat.',
      funFacts: [
        'Sarung sutra Bugis dikenal dengan sebutan lipa sabbe.',
        'Sengkang di Kabupaten Wajo terkenal sebagai pusat persuteraan.'
      ]
    },
    {
      slug: 'tenun-sadan',
      title: 'Tenun Sa’dan Toraja',
      category: 'Pakaian',
      island: 'sulawesi',
      place: 'Toraja, Sulawesi Selatan',
      summary: 'Tenun tradisional Toraja bermotif geometris yang ditenun dengan alat tenun gedogan.',
      description: 'Motif tenun Sa’dan terinspirasi dari alam dan ukiran Toraja, dengan warna-warna yang bernuansa sakral. Kain ini dipakai dalam upacara adat dan sebagai hiasan.',
      funFacts: [
        'Tenun Sa’dan dikerjakan dengan alat tenun tradisional gedogan.',
        'Pola geometrisnya sering terhubung dengan motif ukiran Toraja.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'rambu-solo',
      title: 'Rambu Solo',
      category: 'Tradisi',
      island: 'sulawesi',
      place: 'Tana Toraja, Sulawesi Selatan',
      summary: 'Upacara pemakaman adat Toraja yang megah untuk mengantarkan arwah menuju alam leluhur.',
      description: 'Rambu Solo dipandang sebagai kewajiban keluarga terhadap yang meninggal dan berlangsung beberapa hari. Rangkaiannya mencakup pengorbanan kerbau, tarian, dan prosesi adat.',
      funFacts: [
        'Kerbau menjadi lambang status dan bagian penting dalam upacara.',
        'Keluarga dapat menyimpan jenazah lebih lama sambil menyiapkan upacara besar.'
      ]
    },
    {
      slug: 'pembuatan-pinisi',
      title: 'Seni Pembuatan Perahu Pinisi',
      category: 'Tradisi',
      island: 'sulawesi',
      place: 'Bulukumba, Sulawesi Selatan',
      summary: 'Tradisi membuat kapal layar pinisi oleh pengrajin Bugis-Makassar di Bulukumba dengan ritual dan keahlian turun-temurun.',
      description: 'Pembuatan pinisi disertai ritual, mulai dari menentukan hari baik hingga peluncuran kapal. Keahlian ini diwariskan lintas generasi tanpa gambar teknik tertulis.',
      funFacts: [
        'UNESCO mengakui seni pembuatan perahu pinisi di Sulawesi Selatan sebagai warisan budaya takbenda pada 2017.',
        'Pinisi dikenal dengan dua tiang layar utama dan tujuh layar.'
      ]
    },
    {
      slug: 'tari-pakarena',
      title: 'Tari Pakarena',
      category: 'Tradisi',
      island: 'sulawesi',
      place: 'Gowa, Sulawesi Selatan',
      summary: 'Tarian perempuan Makassar yang lemah gemulai, diiringi gendang dan alat tiup tradisional.',
      description: 'Pakarena menampilkan gerak lembut dan pelan yang mencerminkan kesantunan perempuan Makassar. Tarian ini awalnya dipentaskan di lingkungan istana dan kini menjadi kebanggaan daerah.',
      funFacts: [
        'Gerakan tarian yang lambat melambangkan kesopanan dan kehalusan budi.',
        'Iringan musiknya memakai gendang dan alat tiup khas Makassar.'
      ]
    },

    // ===================== NUSA TENGGARA =====================
    // --- Makanan ---
    {
      slug: 'ayam-taliwang',
      title: 'Ayam Taliwang',
      category: 'Makanan',
      island: 'nusa-tenggara',
      place: 'Mataram, Lombok',
      summary: 'Ayam kampung bakar berbumbu cabai dan terasi yang pedas, kuliner ikonik Lombok.',
      description: 'Ayam taliwang dibakar dengan bumbu pedas khas Sasak, biasanya disajikan bersama plecing kangkung. Rasanya pedas, gurih, dan beraroma bakaran.',
      funFacts: [
        'Namanya dikaitkan dengan kawasan Karang Taliwang di Mataram.',
        'Plecing kangkung adalah pendamping yang lazim.'
      ]
    },
    {
      slug: 'sei-sapi',
      title: 'Se’i Sapi',
      category: 'Makanan',
      island: 'nusa-tenggara',
      place: 'Kupang, Nusa Tenggara Timur',
      summary: 'Daging asap khas Timor yang diasap dengan kayu kosambi hingga empuk dan beraroma khas.',
      description: 'Se’i berarti daging yang diiris dan diasapi, dan di NTT umumnya dibuat dari daging sapi atau babi. Pengasapan memberi aroma dan rasa gurih yang khas, dinikmati dengan sambal luat.',
      funFacts: [
        'Kayu kosambi dipakai untuk mengasapi dan memberi aroma khas.',
        'Se’i dinikmati bersama sambal luat dan nasi.'
      ]
    },
    {
      slug: 'jagung-bose',
      title: 'Jagung Bose',
      category: 'Makanan',
      island: 'nusa-tenggara',
      place: 'Timor, Nusa Tenggara Timur',
      summary: 'Hidangan jagung pipil yang ditumbuk lalu dimasak dengan santan, kacang, dan labu, makanan pokok masyarakat Timor.',
      description: 'Jagung bose mencerminkan kebiasaan makan masyarakat Timor yang bertumpu pada jagung. Teksturnya lembut dan gurih, cocok disantap bersama lauk ikan atau daging.',
      funFacts: [
        'Jagung adalah makanan pokok penting di banyak wilayah NTT.',
        'Proses menumbuk jagung menjadi bagian dari tradisi dapur masyarakat Timor.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'tenun-ikat',
      title: 'Tenun Ikat Sumba',
      category: 'Pakaian',
      island: 'nusa-tenggara',
      place: 'Sumba, Nusa Tenggara Timur',
      summary: 'Kain tenun ikat dengan motif kuda, ayam, dan manusia yang diwarnai pewarna alami dalam proses panjang.',
      description: 'Tenun ikat Sumba memiliki makna adat dan spiritual, dipakai dalam upacara kelahiran, pernikahan, hingga pemakaman. Pewarna alaminya berasal dari akar dan daun tanaman.',
      funFacts: [
        'Warna merah umumnya berasal dari akar mengkudu dan biru dari tanaman nila.',
        'Selembar kain berkualitas tinggi bisa memakan waktu berbulan-bulan hingga setahun.'
      ]
    },
    {
      slug: 'songket-lombok',
      title: 'Songket Lombok (Sukarara)',
      category: 'Pakaian',
      island: 'nusa-tenggara',
      place: 'Sukarara, Lombok Tengah',
      summary: 'Songket tenun tangan Sasak dengan motif geometris dan benang emas, terkenal dari Desa Sukarara.',
      description: 'Di Sukarara, menenun songket menjadi keterampilan yang diwariskan kepada anak perempuan. Kain ini dipakai dalam upacara adat dan pernikahan Sasak.',
      funFacts: [
        'Menenun dipandang sebagai keterampilan penting bagi perempuan Sasak.',
        'Desa Sukarara kini menjadi tujuan wisata belajar menenun.'
      ]
    },
    {
      slug: 'ti-i-langga',
      title: 'Topi Ti’i Langga',
      category: 'Pakaian',
      island: 'nusa-tenggara',
      place: 'Rote Ndao, Nusa Tenggara Timur',
      summary: 'Topi anyaman daun lontar dari Pulau Rote dengan hiasan mencuat di bagian atasnya.',
      description: 'Ti’i langga dibuat dari daun lontar yang dianyam dan dikenakan pria Rote dalam upacara serta acara adat. Bentuknya yang khas menjadi ikon budaya Rote.',
      funFacts: [
        'Bahan utamanya adalah daun lontar, tanaman khas Rote.',
        'Bentuknya yang khas dengan bagian atas mencuat mudah dikenali sebagai ikon NTT.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'pasola-sumba',
      title: 'Pasola',
      category: 'Tradisi',
      island: 'nusa-tenggara',
      place: 'Sumba Barat, Nusa Tenggara Timur',
      summary: 'Ritual adat penganut Marapu: dua kelompok penunggang kuda saling melempar tombak kayu di lapangan terbuka.',
      description: 'Pasola digelar setiap tahun bertepatan dengan musim nyale sekitar Februari-Maret. Tradisi ini dipercaya memohon kesuburan tanah dan hasil panen, dibuka dengan ritual adat.',
      funFacts: [
        'Tombak yang dilempar terbuat dari kayu dan tumpul.',
        'Waktu pelaksanaannya mengikuti kemunculan cacing laut nyale.'
      ]
    },
    {
      slug: 'caci-manggarai',
      title: 'Caci',
      category: 'Tradisi',
      island: 'nusa-tenggara',
      place: 'Manggarai, Flores',
      summary: 'Pertunjukan adu ketangkasan dua pria Manggarai: satu memecut dengan cambuk, satu menangkis dengan perisai.',
      description: 'Caci biasanya dipentaskan pada perayaan syukur panen seperti Penti. Para peserta mengenakan busana adat dan topi bertanduk, diiringi nyanyian dan gong.',
      funFacts: [
        'Cambuk disebut larik, sedangkan perisainya disebut nggiling.',
        'Pertunjukan ini identik dengan perayaan syukur panen.'
      ]
    },
    {
      slug: 'bau-nyale',
      title: 'Bau Nyale',
      category: 'Tradisi',
      island: 'nusa-tenggara',
      place: 'Lombok Tengah, Nusa Tenggara Barat',
      summary: 'Tradisi menangkap cacing laut nyale di pantai pada waktu tertentu setiap tahun, terkait legenda Putri Mandalika.',
      description: 'Warga berbondong-bondong ke pantai selatan Lombok pada malam tertentu untuk menangkap nyale. Tradisi ini diyakini terkait kisah Putri Mandalika yang menceburkan diri ke laut.',
      funFacts: [
        'Nyale muncul pada waktu tertentu, biasanya sekitar Februari-Maret.',
        'Legenda Putri Mandalika menjadi latar kisah tradisi ini.'
      ]
    },

    // ===================== MALUKU =====================
    // --- Makanan ---
    {
      slug: 'papeda',
      title: 'Papeda & Ikan Kuah Kuning',
      category: 'Makanan',
      island: 'maluku',
      place: 'Maluku',
      summary: 'Bubur sagu kenyal yang disantap bersama ikan berkuah kuning dari kunyit dan jeruk nipis.',
      description: 'Papeda adalah makanan pokok masyarakat Maluku dan Papua yang terbuat dari pati sagu. Kuah kuning ikan yang segar asam menjadi pasangan yang pas.',
      funFacts: [
        'Papeda biasanya dimakan dengan cara dililit memakai sumpit atau garpu lalu ditaruh ke piring.',
        'Sagu telah menjadi sumber pangan penting di Indonesia Timur sejak lama.'
      ]
    },
    {
      slug: 'kohu-kohu',
      title: 'Kohu-Kohu',
      category: 'Makanan',
      island: 'maluku',
      place: 'Ambon, Maluku',
      summary: 'Salad ikan khas Maluku dengan kelapa parut, tauge, kemangi, dan perasan jeruk.',
      description: 'Kohu-kohu menyajikan ikan segar yang diolah ringan bersama sayuran dan kelapa. Rasanya segar, asam, dan pedas.',
      funFacts: [
        'Kelapa parut dan kemangi memberi aroma segar khas Maluku.',
        'Hidangan ini cocok disantap bersama papeda atau nasi.'
      ]
    },
    {
      slug: 'sagu-lempeng',
      title: 'Sagu Lempeng',
      category: 'Makanan',
      island: 'maluku',
      place: 'Maluku',
      summary: 'Sagu panggang berbentuk lempengan keras yang tahan lama, dinikmati dengan teh, kopi, atau sup.',
      description: 'Sagu dicetak dalam cetakan tanah liat lalu dipanggang hingga mengeras. Lempeng ini awet disimpan dan biasa dicelup ke minuman hangat atau kuah.',
      funFacts: [
        'Teksturnya keras sehingga biasanya dicelup sebelum dimakan.',
        'Sagu lempeng dapat disimpan lama sebagai bekal.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'baju-cele',
      title: 'Baju Cele',
      category: 'Pakaian',
      island: 'maluku',
      place: 'Ambon, Maluku',
      summary: 'Busana tradisional Maluku berupa baju longgar bercorak cerah yang dipadukan dengan kain tradisional.',
      description: 'Baju cele dikenakan pada acara adat dan perayaan sebagai identitas Maluku. Warna-warna cerahnya mencerminkan keceriaan masyarakat pesisir.',
      funFacts: [
        'Busana ini sering dipakai pada acara adat dan penyambutan tamu.',
        'Warna cerahnya menggambarkan kehangatan masyarakat Maluku.'
      ]
    },
    {
      slug: 'tenun-tanimbar',
      title: 'Tenun Ikat Tanimbar',
      category: 'Pakaian',
      island: 'maluku',
      place: 'Kepulauan Tanimbar, Maluku',
      summary: 'Tenun ikat Kepulauan Tanimbar bermotif geometris dan flora fauna, dipakai dalam upacara adat.',
      description: 'Tenun Tanimbar dibuat dengan teknik ikat dan pewarna alami. Kain ini punya peran dalam upacara adat dan sebagai benda berharga dalam pertukaran adat.',
      funFacts: [
        'Kain ini dipakai dalam upacara adat dan pertukaran adat.',
        'Motifnya terinspirasi dari alam dan kepercayaan setempat.'
      ]
    },
    {
      slug: 'lenso',
      title: 'Lenso',
      category: 'Pakaian',
      island: 'maluku',
      place: 'Maluku',
      summary: 'Sapu tangan berwarna cerah yang menjadi aksesori khas tarian dan pergaulan masyarakat Maluku.',
      description: 'Lenso dipakai penari dan sering dilambaikan dalam tarian pergaulan. Aksesori ini menjadi simbol keramahan dan keceriaan dalam budaya Maluku.',
      funFacts: [
        'Lenso identik dengan tarian pergaulan Maluku.',
        'Warna dan cara menggunakannya menambah keceriaan pertunjukan.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'tari-cakalele',
      title: 'Tari Cakalele',
      category: 'Tradisi',
      island: 'maluku',
      place: 'Kepulauan Maluku',
      summary: 'Tarian perang Maluku dengan parang dan salawaku (perisai), diiringi tifa dan teriakan semangat.',
      description: 'Cakalele ditarikan para pria berpakaian merah dan ikat kepala, menggambarkan keberanian prajurit. Tarian ini sering dibawakan dalam penyambutan tamu dan upacara adat.',
      funFacts: [
        'Salawaku adalah perisai kayu yang menjadi perlengkapan penari.',
        'Tifa dan gong mengiringi gerakan yang dinamis dan penuh semangat.'
      ]
    },
    {
      slug: 'pela-gandong',
      title: 'Pela Gandong',
      category: 'Tradisi',
      island: 'maluku',
      place: 'Pulau Ambon & Lease, Maluku',
      summary: 'Ikatan persaudaraan adat antar-negeri (desa) di Maluku yang diikrarkan lewat sumpah dan saling tolong-menolong.',
      description: 'Pela adalah perjanjian persaudaraan antar desa, sedangkan gandong berarti kakak-adik. Tradisi ini menjadi perekat sosial yang menjembatani perbedaan, termasuk lintas agama.',
      funFacts: [
        'Pela Gandong berfungsi sebagai ikatan tolong-menolong antar desa.',
        'Nilai persaudaraannya sering dihidupkan kembali sebagai perekat perdamaian.'
      ]
    },
    {
      slug: 'bambu-gila',
      title: 'Bambu Gila',
      category: 'Tradisi',
      island: 'maluku',
      place: 'Maluku',
      summary: 'Pertunjukan ritual ketika sebatang bambu bergerak liar dan sulit ditahan beberapa orang setelah dibacakan doa oleh pawang.',
      description: 'Bambu gila dibuka dengan doa dan asap kemenyan oleh sang pawang. Bambu kemudian bergerak kuat dan para pemainnya berusaha menahannya, menjadi tontonan yang menegangkan.',
      funFacts: [
        'Pawang memimpin doa dan ritual sebelum bambu dimainkan.',
        'Beberapa orang harus bekerja sama untuk menahan gerak bambu.'
      ]
    },

    // ===================== PAPUA =====================
    // --- Makanan ---
    {
      slug: 'papeda-papua',
      title: 'Papeda Papua',
      category: 'Makanan',
      island: 'papua',
      place: 'Papua',
      summary: 'Bubur sagu kenyal yang menjadi makanan pokok Papua, disantap dengan ikan berkuah kuning.',
      description: 'Di Papua, sagu merupakan sumber pangan pokok bagi banyak komunitas. Papeda disantap bersama kuah ikan segar yang gurih asam.',
      funFacts: [
        'Sagu dipanen dari batang pohon sagu yang tumbuh di rawa.',
        'Papeda biasanya disajikan panas dan dimakan bersama ikan berkuah.'
      ]
    },
    {
      slug: 'ulat-sagu',
      title: 'Ulat Sagu',
      category: 'Makanan',
      island: 'papua',
      place: 'Papua',
      summary: 'Larva kumbang yang hidup di batang sagu dan dinikmati mentah, dibakar, atau ditumis sebagai sumber protein.',
      description: 'Ulat sagu merupakan makanan tradisional di beberapa komunitas di Papua, seperti suku Asmat dan Kamoro. Gizinya tinggi dan biasa diolah dengan cara sederhana.',
      funFacts: [
        'Ulat sagu hidup di batang pohon sagu yang membusuk.',
        'Kaya protein, sehingga menjadi sumber gizi penting di beberapa komunitas.'
      ]
    },
    {
      slug: 'udang-selingkuh',
      title: 'Udang Selingkuh',
      category: 'Makanan',
      island: 'papua',
      place: 'Merauke, Papua Selatan',
      summary: 'Udang air tawar khas Merauke bercapit mirip kepiting, bercita rasa manis dan gurih.',
      description: 'Udang selingkuh dinamai demikian karena bentuknya yang tampak perpaduan udang dan kepiting. Hidangan ini diolah dengan digoreng, direbus, atau dibakar.',
      funFacts: [
        'Nama uniknya berasal dari bentuk tubuh yang mirip udang sekaligus kepiting.',
        'Merauke dikenal sebagai daerah penghasil udang ini.'
      ]
    },
    // --- Pakaian ---
    {
      slug: 'noken',
      title: 'Tas Noken Papua',
      category: 'Pakaian',
      island: 'papua',
      place: 'Tanah Papua',
      summary: 'Tas rajutan dari serat kulit kayu yang dibawa di kepala atau punggung, diakui UNESCO sebagai warisan budaya.',
      description: 'Noken dipakai untuk membawa hasil kebun, kayu bakar, bahkan menggendong bayi. Tas ini melambangkan kehidupan dan kesuburan dalam budaya Papua.',
      funFacts: [
        'UNESCO menetapkan noken sebagai Warisan Budaya Takbenda pada 2012.',
        'Serat yang dipakai diolah dari kulit kayu atau tanaman hutan.'
      ]
    },
    {
      slug: 'kain-kulit-kayu-asei',
      title: 'Kain Kulit Kayu Asei',
      category: 'Pakaian',
      island: 'papua',
      place: 'Pulau Asei, Danau Sentani',
      summary: 'Kain dari kulit kayu yang dipukul hingga lentur lalu dilukis dengan motif alam khas Sentani.',
      description: 'Pengrajin Asei mengolah kulit kayu menjadi lembaran yang dilukis dengan motif flora, fauna, dan simbol adat. Dahulu dipakai sebagai busana adat dan kini juga menjadi karya seni.',
      funFacts: [
        'Kulit kayu dipukul-pukul hingga menjadi lembaran lentur.',
        'Motifnya terinspirasi alam dan lambang adat Sentani.'
      ]
    },
    {
      slug: 'busana-adat-papua',
      title: 'Busana Adat Papua',
      category: 'Pakaian',
      island: 'papua',
      place: 'Tanah Papua',
      summary: 'Ragam busana tradisional Papua seperti koteka, rok rumbai, dan hiasan kepala yang berbeda antar suku.',
      description: 'Papua memiliki ratusan suku dengan busana adat yang beragam. Koteka, rok rumbai dari serat, dan hiasan kepala dikenakan dalam upacara dan perayaan adat.',
      funFacts: [
        'Setiap suku memiliki gaya busana adat yang berbeda.',
        'Hiasan kepala dan aksesori sering memakai bahan alami dari hutan.'
      ]
    },
    // --- Tradisi ---
    {
      slug: 'bakar-batu',
      title: 'Bakar Batu',
      category: 'Tradisi',
      island: 'papua',
      place: 'Lembah Baliem & Pegunungan Tengah, Papua',
      summary: 'Tradisi memasak bersama dengan batu panas di lubang tanah untuk merayakan syukur, pernikahan, atau perdamaian.',
      description: 'Batu dipanaskan dalam api lalu ditumpuk bersama sayuran, umbi, dan daging dalam lubang. Seluruh warga berkumpul menikmati hasilnya sebagai tanda kebersamaan.',
      funFacts: [
        'Di Lembah Baliem tradisi ini dikenal dengan sebutan barapen.',
        'Namanya berbeda-beda di tiap daerah pegunungan Papua.'
      ]
    },
    {
      slug: 'festival-lembah-baliem',
      title: 'Festival Lembah Baliem',
      category: 'Tradisi',
      island: 'papua',
      place: 'Wamena, Papua Pegunungan',
      summary: 'Festival tahunan di Wamena yang menampilkan perang-perangan suku Dani, Lani, dan Yali serta tarian dan pesta adat.',
      description: 'Festival ini mempertemukan berbagai suku pegunungan untuk memperlihatkan budaya mereka. Perang-perangan di festival adalah pertunjukan simbolis, bukan pertempuran sungguhan.',
      funFacts: [
        'Festival digelar setiap tahun, biasanya pada bulan Agustus.',
        'Perang-perangan di festival bersifat simbolis dan penuh nilai budaya.'
      ]
    },
    {
      slug: 'tari-yospan',
      title: 'Tari Yospan',
      category: 'Tradisi',
      island: 'papua',
      place: 'Papua',
      summary: 'Tarian pergaulan Papua yang riang, gabungan Yosim dan Pancar, diiringi ukulele, gitar, dan tifa.',
      description: 'Yospan dibawakan secara berkelompok dalam penyambutan tamu dan perayaan. Gerakannya energik dan menggambarkan keceriaan serta kebersamaan masyarakat Papua.',
      funFacts: [
        'Nama Yospan berasal dari gabungan tarian Yosim dan Pancar.',
        'Tarian ini kerap dipentaskan saat menyambut tamu.'
      ]
    },
  ]

  // Galeri foto asli (3 foto + keterangan) untuk budaya yang sudah punya sejak file lama
  const img = (src, caption = '') => ({ src, caption })
  const g = (src, caption = '') => img(typeof src === 'object' ? src.src : src, caption)

  const P = {
    food1: img('https://kediripedia.com/wp-content/uploads/2020/01/sate-padang-1024x683.jpg'),
    food2: img('https://www.jamrocksportsbarandgrill.com/wp-content/uploads/2026/02/Proses-Pembuatan-Rendang-Tradisional-yang-Kaya-Rempah-788x520.jpg'),
    food3: img('https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80'),
    dance: img('https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'),
    beach: img('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'),
    lake: img('https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80'),
    weave: img('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-SVgko2JTImRwC-3dGIE_3V2WjQDWi7UenMIhf0SnGo1CmJttJpxxnV_hwox08fANXpSsoel0tv8TE_aAoA78rFTVnMoAuE81Fy1IbGc-1gnbvt3CXADlaPPYzqjppkYJ0hauREqYDMQ/s1600/Industri-Batik-Hadapi-MEA-271015-Prad-1.jpg'),
    craft: img('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'),
    batikProc: img('https://images.unsplash.com/photo-1695306441929-0082158cfc27?q=80&w=1200&auto=format&fit=crop'),
    sogan: img('https://www.yupiland.com/assets/images/blog%202023/Contoh%20Batik/Batik%20Sogan.webp'),
    satePadang : img ('https://static.vecteezy.com/system/resources/thumbnails/015/957/916/small_2x/sate-padang-or-satay-padang-is-spicy-beef-satay-from-padang-west-sumatra-served-with-spicy-curry-sauce-and-rice-cake-lontong-on-banana-leaf-isolated-on-white-background-photo.jpg'),
    rendangCook: img(
      'https://image.idntimes.com/post/20250122/1542px-memasak-rendang-59f506aa441e3192bb4237a4e87b2a36-7875d0d5fe6d24dc396302de528f1f39.jpg?tr=w-1200'
    ),
    pempek : img ('https://www.pinterpolitik.com/wp-content/uploads/2023/09/foto-radarmukomuko-dot-disway-dot-id.webp'),
    macempempek : img ('https://www.dandapala.com/assets/back/article/img/compress/menilik-kreativitas-wong-kito-galo-dalam-ragam-jenis-pempek-thumbnail.jpg'),
    cuko : img('https://awsimages.detik.net.id/community/media/visual/2024/10/01/cuko-pempek-palembang_43.jpeg?w=700&q=90'),
    songket : img ('https://enimekspres.disway.id/upload/1cc69ea7a4a1a549b6540051b43d1d75.jpg'),
    kecak: img('https://images.unsplash.com/photo-1773563794845-b56cfaf0532a?auto=format&fit=crop&w=1200&q=80'),
    cliff: img('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'),
    hudoq: img('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'),
    music: img('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'),
    pacujalur :img('https://images.bisnis.com/posts/2025/07/02/1889814/pacu_jalur_1751443671.jpg'),
    pacujalur1 :img('https://asset.mediaindonesia.com/news/2025/08/19/1755558617_1a0cbac0abf7ddec3aa1.jpg'),
  }

  const keptGalleries = {
    'rendang': [
      g('https://www.dailymeatrecipe.com/wp-content/uploads/2025/07/Beef-Rendang-Recipe.webp', 'Penyajian Rendang Daging Sapi dengan bumbu pekat berminyak alami'),
      g(P.rendangCook, 'Proses memasak rendang dengan api kuali yang besar dan tradisional'),
      g(P.food2, 'Rempah-rempah asli Nusantara: serai, lengkuas, jahe, dan cabai merah keriting'),
    ],

    'sate-padang': [
      g(P.satePadang, 'Sate Padang dengan kuah kental beraroma rempah dan taburan bawang goreng yang di sajikan di atas daun pisang'),
      g(P.food1, 'Proses pembakaran tusukan daging di atas arang batok kelapa'),
      g(P.satePadang, 'Penyajian dengan ketupat potong dalam pincuk daun pisang'),
    ],
    'pempek': [
      g(P.pempek, 'Pempek Kapal Selam digoreng garing dengan kuah cuko hitam kental'),
      g(P.macempempek, 'Aneka ragam pempek'),
      g(P.cuko, 'Cuko pempek asli dari gula aren dan cabai rawit'),
    ],
    'songket-palembang': [
      g(P.songket, 'Kilau benang emas motif songket Lepus Palembang'),
      g(P.batikProc, 'Pengrajin perempuan menenun helai demi helai di alat tenun gedogan'),
      g(P.craft, 'Busana adat kebesaran pengantin Palembang Aesan Gede berbahan songket'),
    ],
    'tari-saman': [
      g(P.dance, 'Deretan penari Saman bergerak dalam sinkronisasi sempurna dan cepat'),
      g(P.beach, 'Pola gerak serong dan lentikan tubuh suku Gayo nan energik'),
      g(P.weave, 'Detail motif tenun kerawang Gayo pada busana penari Saman'),
    ],
    'lompat-batu-nias': [
      g(P.beach, 'Pemuda Nias melayang di udara melompati monolit batu Hombo'),
      g(P.lake, 'Desa adat Bawomataluo dengan deretan rumah panggung Omo Sebua'),
      g(P.craft, 'Baju adat perang Nias warna kuning dan merah mencolok'),
    ],
    'pacu-jalur': [
      g('https://api.kemenpar.go.id/storage/app/uploads/public/688/c94/6b4/thumb_14595_1200_630_0_0_crop.jpg', ' Perahu viral jalur beradu cepat di Sungai Batang Kuantan'),
      g(P.pacujalur, 'Puluhan pendayung mendayung serempak dengan energi maksimal'),
      g(P.pacujalur1, 'Suasana riuh ribuan penonton memadati tepian sungai festival'),
    ],
    'gudeg': [
      g(P.food1, 'Satu porsi komplit Gudeg dengan sambal krecek, ayam kampung, dan telur pindang'),
      g(P.food2, 'Proses memasak gudeg di dalam kuali tanah liat besar berjam-jam'),
      g(P.food3, 'Gudeg basah disiram areh santan kental yang gurih di warung lesehan'),
    ],
    'batik': [
      g(P.batikProc, 'Proses menorehkan canting lilin malam panas di atas lembaran kain'),
      g(P.sogan, 'Motif klasik batik sogan dengan warna cokelat dan nila alami'),
      g(P.weave, 'Proses penjemuran kain batik setelah pewarnaan alami di pekarangan'),
    ],
    'tari-kecak': [
      g(P.kecak, 'Lingkaran puluhan penari Kecak mengangkat kedua tangan ke angkasa di kala senja'),
      g(P.dance, 'Tokoh Hanoman Si Kera Putih beraksi di tengah lingkaran api'),
      g(P.cliff, 'Latar tebing laut Uluwatu yang dramatis dengan deburan ombak samudra Hindia'),
    ],
    'tari-hudoq': [
      g(P.hudoq, 'Penari Hudoq bertopeng kayu dan berbalut rimbun dedaunan pisang'),
      g(P.dance, 'Ritual tarian di halaman desa Dayak diiringi tabuhan gong dan tubun'),
      g(P.music, 'Detail ukiran topeng sakral Hudoq dengan taring kayu khas'),
    ],
    'sate-lilit': [
      g(P.food2, 'Sate lilit batang serai yang dipanggang harum di atas bara arang'),
      g(P.food1, 'Penyajian sate lilit dengan sambal matah segar dan nasi campur Bali'),
      g(P.food3, 'Bumbu rempah basa genep khas pulau Dewata yang kaya kunyit dan terasi'),
    ],
    'coto-makassar': [
      g(P.food1, 'Semangkuk Coto Makassar kuah kacang kental dengan taburan daun bawang dan seledri'),
      g(P.food2, 'Penyajian dengan ketupat daun kelapa potong dan sambal taoco pedas'),
      g(P.food3, 'Rebusan daging sapi dalam kuali tanah liat besar beraroma rempah wangi'),
    ],
    'tenun-ikat': [
      g(P.weave, 'Corak motif kuda dan burung kakatua pada kain Tenun Ikat Sumba Timur'),
      g(P.batikProc, 'Mama-mama Sumba mengikat pola benang kapas sebelum proses celup warna alami'),
      g(P.craft, 'Pameran kain tenun ikat pusaka di kampung adat Prai Ijing Sumba'),
    ],
    'papeda': [
      g(P.food3, 'Papeda kenyal bening disajikan bersama sup ikan kuah kuning berempah'),
      g(P.food1, 'Teknik menggulung papeda dari mangkuk gerabah menggunakan gata-gata'),
      g(P.food2, 'Olahan ikan cakalang bumbu kuning segar khas laut banda'),
    ],
    'tari-cakalele': [
      g(P.dance, 'Prajurit Cakalele memegang parang dan salawaku dengan tatapan tajam berani'),
      g(P.beach, 'Gerakan loncatan dinamis menghentak bumi mengelilingi api unggun'),
      g(P.music, 'Tabuhan tifa berdentum mengiringi teriakan pekik perang adat'),
    ],
    'noken': [
      g(P.craft, 'Mama Papua mengenakan tas Noken rajutan serat kayu alami di dahi kepala'),
      g(P.weave, 'Pola rajutan Noken dengan warna-warni pewarna alami daun dan buah hutan'),
      g(P.batikProc, 'Proses pemintalan serat kulit kayu hutan menjadi benang rajut kuat'),
    ],
  }

  export const cultures = base.map((c, i) => {
    const custom = images[c.slug] || {}
    const pool = fallbackByCategory[c.category] || fallbackByCategory.Tradisi
    const mainSrc = custom.src || defaultImages[c.slug] || pool[i % pool.length]

    // Galeri minimal 3 foto: pakai gallery milik entri / galeri lama jika ada, selain itu otomatis
    const own = c.gallery || keptGalleries[c.slug]
    const gal = own && own.length >= 3
      ? own
      : [
          { src: mainSrc, caption: `${c.title} - Dokumentasi utama` },
          { src: pool[(i + 1) % pool.length], caption: `${c.title} - Keindahan warisan nusantara` },
          { src: pool[(i + 2) % pool.length], caption: `${c.title} - Warisan budaya luhur` },
        ]

    return {
      ...c,
      src: mainSrc,
      gallery: gal,
      credit: custom.credit || 'Dokumentasi Kebudayaan Nusantara'
    }
  })