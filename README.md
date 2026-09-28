# PANTAS: Prototipe Aplikasi

Prototipe **PANTAS (Pengendalian Antibiotik Terintegrasi Apotek dan SATUSEHAT)** untuk Lomba Esai USK Pharmacy Fair 2026.
Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa proses build).

## Struktur folder
```
pantas-prototype/
├── index.html      # halaman utama dan panel demo
├── css/style.css   # tampilan
├── js/app.js       # logika layar, Gerbang Resep, data simulasi
└── README.md
```

## Menjalankan di komputer
Buka `index.html` di browser, atau di VS Code pakai ekstensi **Live Server**.

## Deploy ke Vercel
**Cara 1 (paling cepat, tanpa GitHub)**
1. Buka https://vercel.com/new dan login.
2. Pilih opsi upload/deploy folder, lalu seret folder `pantas-prototype`.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan.
4. Klik **Deploy**.

**Cara 2 (lewat GitHub)**
1. Unggah isi folder ini ke repositori GitHub baru.
2. Di Vercel, klik **Add New > Project**, pilih repositori tersebut.
3. Framework Preset: **Other**, lalu **Deploy**.

**Cara 3 (Vercel CLI)**
```
npm i -g vercel
cd pantas-prototype
vercel
```

## Isi prototipe
Semua peran ditampilkan dalam bingkai ponsel. Di ponsel sungguhan, aplikasi memenuhi layar.

**Sisi apoteker (aplikasi kasir di ponsel)**
- Masuk dengan nomor STR apoteker penanggung jawab
- Kasir dengan Gerbang Resep: antibiotik terkunci, obat lain tetap bisa dibayar
- Pindai resep elektronik SATUSEHAT (kode demo: `ER-3573-260921-7741`)
- Verifikasi resep kertas lewat nomor SIP dokter dan foto resep
- Hasil verifikasi: valid atau "Penyerahan ditahan"
- Panduan Layani dan Rujuk untuk 5 keluhan: batuk pilek, sakit tenggorokan, sakit gigi, diare, luka
- Rujuk telekonsultasi yang menerbitkan resep elektronik
- Struk dengan cap "tercatat di SATUSEHAT" dan "Pengingat Tuntas dikirim"
- Ringkasan hari ini, termasuk omzet obat non-antibiotik

**Sisi pasien (SATUSEHAT Mobile)**
- Pengingat Tuntas: jadwal minum, progres dosis, pesan untuk menghabiskan obat
- Layar pengobatan selesai dengan cara membuang sisa obat

**Sisi pengawas (dasbor di ponsel)**
- Dasbor berbasis risiko: indikator utama, peta skematis 5 kecamatan Kota Malang, daftar apotek prioritas
- Detail apotek: grafik antibiotik dibeli dari distributor dibanding yang keluar dengan resep, tombol jadwalkan kunjungan

## Panel demo (sisi kiri layar, atau tombol "Panel demo" di ponsel)
- **Lihat sebagai**: Apoteker, Pasien, Pengawas
- **Lompat ke layar**: langsung ke layar tertentu, praktis untuk tangkapan layar Gambar 5 di esai
- **Skenario cepat**: menyiapkan keadaan tertentu dalam satu klik, misalnya "Pembeli minta antibiotik tanpa resep"
- **Mulai ulang simulasi**: mengembalikan semua data ke awal

## Catatan
- Semua nama apotek, dokter, kode resep, dan angka adalah data simulasi, dan hanya tersimpan di memori browser.
- Peta kecamatan bersifat skematis, bukan batas administrasi sebenarnya.
- Prototipe tidak benar-benar terhubung ke SATUSEHAT.
