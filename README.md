# Nusantara Cultural Heritage Platform

Proyek fullstack portal kebudayaan Nusantara:
- **frontend/**: React, Vite, Tailwind CSS, TanStack Router & Query, Framer Motion, GSAP.
- **backend/**: Laravel 12 API, Eloquent ORM, SQLite / MySQL.
- **nusantara.sql**: Skrip SQL skema dan isi data lengkap (8 pulau & 72 entri budaya).

---

## 🚀 1. Menjalankan Frontend
Masuk ke direktori `frontend`:
```bash
cd frontend
npm install
npm run dev
```
Aplikasi frontend akan aktif di: `http://localhost:5173`

---

## 🛠️ 2. Menjalankan Backend (Laravel)
Masuk ke direktori `backend`:
```bash
cd backend
php artisan serve
```
Backend API akan aktif di: `http://127.0.0.1:8000`

### Endpoint API yang Tersedia:
- `GET /api/islands` — Mendapatkan semua daftar kepulauan
- `GET /api/islands/{slug}` — Mendapatkan detail satu pulau berdasarkan slug
- `GET /api/cultures` — Mendapatkan semua data kebudayaan (bisa filter: `?island=bali&category=Makanan&search=rendang`)
- `GET /api/cultures/{slug}` — Mendapatkan detail kebudayaan berdasarkan slug

---

## 🗄️ 3. Database & SQL
Secara default backend sudah otomatis terisi dan siap pakai via SQLite bawaan (`backend/database/database.sqlite`).

Jika kamu ingin menggunakan **MySQL / MariaDB** (misal lewat XAMPP / Laragon / phpMyAdmin):
1. Buat database baru bernama `nusantara` di phpMyAdmin / MySQL CLI.
2. Import file **`nusantara.sql`** yang ada di root direktori atau `backend/database/nusantara.sql`.
3. Buka file `backend/.env` dan sesuaikan koneksi databasenya:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nusantara
DB_USERNAME=root
DB_PASSWORD=
```
4. Jika ingin me-reseed data via Laravel:
```bash
cd backend
php artisan migrate:fresh --seed
```
