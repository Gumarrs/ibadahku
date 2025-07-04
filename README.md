# 🕌 Ibadahku – Aplikasi Muslim Harian Modern

**Ibadahku** adalah aplikasi web yang membantu umat Muslim dalam menunaikan ibadah harian dengan lebih mudah dan interaktif. Mulai dari melihat jadwal sholat, menentukan arah kiblat, membaca doa-doa harian, hingga mencari masjid terdekat — semua tersedia dalam satu aplikasi ringan, responsif, dan mudah digunakan.

---

## 🌟 Fitur Utama

### 📅 Jadwal Sholat Otomatis
- Menampilkan waktu sholat sesuai lokasi pengguna
- Menggunakan API dari Aladhan.com
- Highlight waktu sholat yang sedang berlangsung

### 🗓️ Kalender Hijriyah & Masehi
- Menampilkan tanggal Hijriyah dan Masehi hari ini
- Dilengkapi nama hari, bulan, dan tahun

### 🧭 Arah Kiblat
- Menentukan arah kiblat berdasarkan kompas digital (jika perangkat mendukung)
- Menyertakan jarak dan derajat kiblat

### 🕌 Masjid Terdekat
- Deteksi lokasi otomatis menggunakan geolocation
- Tampilkan daftar masjid dalam radius 2km
- Integrasi dengan Overpass API (OpenStreetMap)

### 📖 Doa & Dzikir Harian
- Kategori: Doa Pagi & Petang, Niat Sholat, Dzikir Sesudah Sholat
- Tersedia dalam 3 format: Arab, Latin, dan Arti
- Fitur: 🔍 pencarian, 📋 salin teks, dan 🔽 tampil/sembunyi terjemah

---


## 🛠️ Teknologi yang Digunakan

| Teknologi         | Fungsi                            |
|-------------------|------------------------------------|
| Vue 3             | Framework Frontend                |
| Vite              | Tools Build & Dev Server          |
| Tailwind CSS      | Desain UI responsif & modern      |
| Aladhan API       | Jadwal sholat & kalender Hijriyah |
| Overpass API      | Data lokasi masjid                |
| Geolocation API   | Deteksi lokasi pengguna           |
| Clipboard API     | Menyalin teks doa                 |

---

## 📦 Cara Instalasi & Menjalankan


```bash
git clone https://github.com/Gumarrs/ibadahku.git
cd ibadahku
2. Instal Dependensi
bash
Salin
Edit
npm install
3. Jalankan Server Lokal
bash
Salin
Edit
npm run dev
Aplikasi akan tersedia di: http://localhost:5173

🚀 Build Production
Untuk membuat versi siap-deploy:

bash
Salin
Edit
npm run build
Hasilnya ada di folder /dist
