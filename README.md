# Toko Nusa AI — Starter Episode 01

React + Vite dan Express dalam satu folder, satu package.json, satu npm install.

## Mulai

Gunakan Node.js 22.12+ (atau Node 24).

```bash
npm ci
npm run dev
```

Buka http://localhost:5173. Express berjalan di 127.0.0.1:3001. Vite meneruskan /api ke Express, jadi frontend cukup memakai fetch('/api/chat').

Starter bisa dijalankan tanpa .env dan tanpa akun model. Responsnya **demo lokal, bukan AI**. Label setiap pesan menunjukkan sumbernya.

## Struktur

- client/src/App.jsx: UI chat, loading, error, submit; sudah terhubung ke API.
- server/app.js: endpoint /api/chat, validasi dan penanganan error.
- server/ai.js: satu fungsi yang diganti dengan panggilan AI saat rekaman.
- server/index.js: menjalankan Express dan menyajikan dist setelah build.
- vite.config.js: frontend dan proxy development.

## Saat video: hanya bagian AI

1. Pasang SDK provider yang dipilih dan catat versi tetapnya.
2. Salin .env.example menjadi .env; isi key dan model di luar rekaman.
3. Ganti isi generateReply(message) di server/ai.js. Fungsi menerima satu string dan mengembalikan { reply: teksModel, source: 'ai' }.
4. Periksa key, panggil model, ambil teks output, dan lempar error bila konfigurasi/output tidak valid.
5. Restart server setelah mengubah .env.
6. Kirim pertanyaan yang sama; label hasil harus MODEL AI, bukan DEMO LOKAL.

Jangan ubah source menjadi 'ai' jika masih memakai balasan demo. UI, proxy, endpoint dan kontrak respons sudah siap sehingga tidak perlu dibuat ulang saat rekaman. Pilihan SDK/model belum diimplementasikan pada starter ini.

## Cek sebelum rekaman

- GET /api/health menghasilkan { status: 'ok' }.
- POST /api/chat dengan { message: 'Halo' } menghasilkan reply dan source demo.
- Input kosong/whitespace ditolak UI dan server.
- Request manual dengan message bukan string mendapat status 400.
- Matikan backend: UI menampilkan error dan loading berhenti.
- Setelah menambahkan AI: key kosong harus gagal, lalu key valid harus menghasilkan reply nyata.

## Build lokal

```bash
npm run build
npm start
```

Buka http://localhost:3001. Express menyajikan frontend hasil build dan API pada origin yang sama. Vite proxy hanya dipakai ketika development. Server sengaja bind ke loopback untuk demo lokal.

## Batas

State pesan hilang saat refresh. Hanya pesan terbaru dikirim ke backend. Tidak ada persona toko, streaming, knowledge, memory, auth, atau rate limit. Timeout UI 30 detik tidak otomatis menghentikan pekerjaan provider; saat menambahkan SDK, atur timeout provider juga. Ini starter rekaman lokal.

Versi awal dipatok dalam package.json, transitive dependency dipatok package-lock.json. Referensi: https://vite.dev/config/server-options dan https://expressjs.com/en/5x/api/ .

## Verifikasi starter

Build berhasil. Health endpoint, respons demo, lima input invalid, malformed JSON, endpoint tidak ditemukan, Vite proxy ke Express dan serving hasil build telah diperiksa. Integrasi provider AI belum ditulis atau diuji. Versi: Vite 8.3.2, React/React DOM 19.3.0, Express 5.2.1, concurrently 10.0.5.
