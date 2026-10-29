# 🍔 TasteCraft Studio - F&B Visual & Promo Studio

> **Aplikasi Studio Visual Promosi F&B Modern & Powerful** untuk Restoran, Kafe, Brand Kuliner, dan Bisnis Makanan & Minuman. Buat banner promosi memikat, poster diskon, katalog menu digital, dan copywriting otomatis dalam hitungan detik.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)
![Vite](https://img.shields.io/badge/Vite-v8-646CFF.svg)

---

## ✨ Fitur Unggulan (Lebih Powerful dari Versi Standar)

### 1. 📐 Multi-Format Aspect Ratio Switcher
Ubah rasio desain secara instan tanpa perlu mendesain ulang dari nol:
* **1:1 (Square)**: Format utama untuk Instagram Feed, WhatsApp Post, dan Facebook.
* **9:16 (Story/Vertical)**: Disesuaikan untuk Instagram Story, TikTok, WhatsApp Status, dan Reels.
* **4:5 (Portrait)**: Format rasio emas feed Instagram untuk visibilitas maksimal di layar smartphone.
* **16:9 (Landscape Banner)**: Cocok untuk header website, LED TV Menu Board, dan banner desktop.
* **3:4 (Table Tent)**: Format cetak akrilik promosi meja makan atau kasir.

### 2. 🎨 7 Skema Tema Visual Kuliner Teruji
* **Fiery Red**: Energi tinggi untuk Fast Food, Burger, & Gorengan.
* **Vibrant Orange**: Segar & menggugah selera untuk Boba, Minuman Buah, & Street Food.
* **Dark Luxury**: Nuansa eksklusif untuk Steakhouse, Japanese Mentai, & Bistro Gourmet.
* **Warm Cafe**: Hangat & estetik untuk Roastery, Coffee Shop, & Bakery Croissant.
* **Matcha Zen**: Nuansa alami untuk masakan Jepang, Healthy Food, & Matcha.
* **Neon Night**: Gaya neon modern untuk kuliner malam, Angkringan, & Taichan.
* **Sweet Pastel**: Manis & playful untuk Es Krim, Donat, Cake, & Dessert.

### 3. 💸 Kalkulator Diskon & Stempel Harga Otomatis
* Cukup masukkan **Harga Normal** dan **Harga Promo**, sistem otomatis menghitung persentase diskon (`HEMAT 50%!`) dan nominal penghematan pelanggan.
* Mendukung 6 skema promo: **Buy 1 Get 1 Free (BOGO)**, **Flash Sale**, **Paket Combo Kenyang**, **Diskon Persen**, **Potongan Harga Langsung**, dan **Peluncuran Menu Baru**.

### 4. 📸 Galeri Aset Kuliner Realistis + Upload Custom
* Dilengkapi dengan koleksi foto kuliner HD (Burger, Boba, Iced Coffee, Ramen, Pizza, Crispy Chicken, Mentai, Croissant, dll).
* Fitur **Upload Foto Produk Sendiri** dengan slider ukuran (*scale*), efek bayangan (*shadow*), dan pendaran cahaya (*glow*).
* Stiker & Badge Promosi instan: `100% Halal`, `Best Seller ⭐`, `Chef's Pick 👨‍🍳`, `Extra Pedas 🌶️`, `Hanya Hari Ini ⏳`, `Free Ongkir 🛵`.

### 5. 🤖 Smart AI Copywriter & Caption Generator
* Menghasilkan teks caption media sosial dan pesan siaran WhatsApp secara otomatis berdasarkan nama menu, harga promo, dan identitas resto Anda.
* Generator Hook & Headline dengan 5 gaya emosional: *FOMO/Mendesak*, *Foodie Menggugah Selera*, *Gen-Z Santai*, *Paket Hemat Ramean*, dan *Cozy Cafe*.

### 6. 📱 QR Code Menu & Badge Pesan Antar
* Integrasi QR Code dinamis untuk scan menu meja / WhatsApp order langsung.
* Badge resmi layanan pesan antar: **GoFood**, **GrabFood**, dan **ShopeeFood**.

### 7. 🚀 Ekspor Visual HD & Fitur Simpan
* **Ultra HD PNG (2.5x Retina Quality)**: Sangat tajam untuk cetak dan media sosial.
* **Standar JPEG**: Ukuran file ringan.
* **Salin ke Clipboard**: Langsung tempel (*Ctrl+V*) ke WhatsApp Web atau Telegram.
* **Penyimpanan Lokal**: Simpan berbagai rancangan kampanye promo ke browser (*Local Storage*) dan ekspor/impor file cadangan JSON.

---

## 🛠️ Panduan Menghubungkan ke GitHub

Jalankan perintah berikut di terminal:

```bash
cd c:\Users\UC\Projects\fnb-promo-studio

# 1. Pastikan semua file sudah di-commit
git add .
git commit -m "feat: initial release of TasteCraft F&B Visual Studio"
git branch -M main

# 2. Hubungkan ke repository GitHub Anda (ganti USERNAME_ANDA dengan akun GitHub Anda)
git remote add origin https://github.com/USERNAME_ANDA/fnb-promo-studio.git

# 3. Push ke GitHub
git push -u origin main
```

---

## ⚡ Panduan Deploy Otomatis ke Vercel (1-Click)

Project ini sudah dilengkapi dengan konfigurasi `vercel.json` dan Vite standar:

### Cara 1: Lewat Web Dashboard Vercel (Paling Mudah)
1. Buka [vercel.com/new](https://vercel.com/new).
2. Masuk dengan akun GitHub Anda.
3. Pilih repository **`fnb-promo-studio`** yang baru Anda push.
4. Vercel akan otomatis mendeteksi:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Klik **Deploy**! Dalam 30 detik, website visual promosi F&B Anda sudah live dengan URL HTTPS gratis (`https://fnb-promo-studio.vercel.app`).
6. Setiap kali Anda melakukan `git push`, Vercel akan otomatis memperbarui situs secara langsung!

### Cara 2: Lewat Vercel CLI
```bash
cd c:\Users\UC\Projects\fnb-promo-studio
npx vercel --prod
```

---

## 💻 Menjalankan di Lokal (Development)

```bash
# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Pratinjau hasil build
npm run preview
```

---

## 📂 Struktur Project

```
fnb-promo-studio/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── CanvasPreview.tsx       # Live Canvas WYSIWYG & Render Engine
│   │   ├── EditorSidebar.tsx       # Panel Kontrol (Harga, Visual, Branding, Tema, AI)
│   │   ├── Navbar.tsx              # Top bar, Ratio switcher, Preset picker
│   │   ├── ExportModal.tsx         # Ekspor Ultra HD PNG, JPG & Clipboard
│   │   ├── DeployGuideModal.tsx    # Panduan interaktif koneksi GitHub & Vercel
│   │   └── SavedDesignsDrawer.tsx  # Manajemen desain tersimpan (Local Storage)
│   ├── data/
│   │   └── presets.ts              # Aset makanan HD, template promo, AI copy library
│   ├── types/
│   │   └── index.ts                # TypeScript definition models
│   ├── App.tsx                     # Main application layout & state
│   ├── index.css                   # Tailwind CSS v4 styling & fonts
│   └── main.tsx                    # React DOM entry
├── vercel.json             # Konfigurasi deployment Vercel
├── vite.config.ts          # Vite bundler configuration
└── package.json            # Dependencies & scripts
```

---

**TasteCraft Studio** — *Bikin visual promosi kuliner lezat, tingkatkan pesanan resto Anda!* 🍕🔥
