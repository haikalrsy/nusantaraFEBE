<?php

// Sumber tunggal daftar kategori. Frontend mengambilnya lewat GET /api/places/options.
// ta_category harus salah satu dari: restaurants, attractions, hotels, geos (aturan Tripadvisor).
return [
    'categories' => [
        ['key' => 'makanan',   'label' => 'Makanan',       'query' => 'makanan khas',  'ta_category' => 'restaurants', 'has_types' => false],
        ['key' => 'minuman',   'label' => 'Minuman',       'query' => 'kopi minuman',  'ta_category' => 'restaurants', 'has_types' => false],
        ['key' => 'tradisi',   'label' => 'Tradisi',       'query' => 'budaya tradisional', 'ta_category' => 'attractions', 'has_types' => false],
        ['key' => 'kerajinan', 'label' => 'Kerajinan',     'query' => 'kerajinan oleh-oleh', 'ta_category' => 'attractions', 'has_types' => false],
        ['key' => 'tempat',    'label' => 'Tempat Wisata', 'query' => 'wisata',        'ta_category' => 'attractions', 'has_types' => true],
    ],

    // Muncul hanya kalau kategori "tempat" dipilih
    'place_types' => [
        ['key' => 'museum',     'label' => 'Museum',              'query' => 'museum'],
        ['key' => 'prasejarah', 'label' => 'Situs Prasejarah',    'query' => 'situs prasejarah'],
        ['key' => 'sejarah',    'label' => 'Bangunan Bersejarah', 'query' => 'bangunan bersejarah'],
        ['key' => 'candi',      'label' => 'Candi & Pura',        'query' => 'candi pura'],
        ['key' => 'alam',       'label' => 'Wisata Alam',         'query' => 'wisata alam'],
        ['key' => 'pantai',     'label' => 'Pantai',              'query' => 'pantai'],
        ['key' => 'taman',      'label' => 'Taman & Rekreasi',    'query' => 'taman rekreasi'],
    ],

    'max_results'    => 10,   // Location Search Tripadvisor mengembalikan maksimal 10
    'photos_for_top' => 6,    // hanya hasil teratas yang diambil fotonya (hemat kuota)
    'cache_minutes'  => 1440, // 24 jam

    // Skor urutan: rating dirata-ratakan dengan nilai prior supaya tempat
    // dengan 2 ulasan bintang 5 tidak mengalahkan tempat dengan ribuan ulasan bintang 4,5
    'prior_rating' => 4.0,
    'prior_weight' => 20,
];