# TARMOC Backend (starter)

Backend lokal buat proxy API key (OpenAI, Gemini, Nano Banana, Veo 3) supaya
key tidak terekspos di frontend (`app.js`).

## Cara jalanin di Mac

1. Taruh folder `tarmoc-backend` ini di sebelah folder project TARMOC kamu.
2. Buka Terminal, masuk ke folder ini:
   ```
   cd tarmoc-backend
   npm install
   ```
3. Copy `.env.example` jadi `.env`, isi API key asli:
   ```
   cp .env.example .env
   ```
   lalu edit `.env` isi keynya.
4. Jalankan server:
   ```
   npm start
   ```
   Kalau muncul `✅ TARMOC backend jalan di http://localhost:3001` berarti sukses.
5. Test cepat di browser: buka `http://localhost:3001/api/health` → harus muncul `{"ok":true}`.

## Endpoint yang tersedia

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/chat` | POST | Chat via ChatGPT |
| `/api/gemini` | POST | Chat/teks via Gemini |
| `/api/image` | POST | Generate gambar (Nano Banana) |
| `/api/video/start` | POST | Mulai generate video (Veo 3) |
| `/api/video/status/:operationName` | GET | Cek status video |

## Cara panggil dari app.js kamu

```js
// Contoh: generate gambar
const res = await fetch('http://localhost:3001/api/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'kucing pakai jas astronot' })
});
const data = await res.json();
console.log(data.url); // -> "/outputs/img_xxxx.png"
```

## Catatan

- File gambar/video hasil generate disimpan di folder `outputs/` (bukan database, cuma folder biasa). Ini cukup buat tahap awal.
- Kalau nanti butuh nyimpen histori project/chat, baru tambahkan SQLite (`better-sqlite3`) - tidak perlu server database terpisah.
- Cek ulang dokumentasi resmi (ai.google.dev, platform.openai.com) sebelum production, karena nama model & endpoint suka berubah.
