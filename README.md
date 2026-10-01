# 🚀 Global User Directory App

Aplikasi web modern untuk mencari dan melihat detail direktori pengguna global. Dibangun dengan fokus pada performa, responsivitas, dan pengalaman pengguna (UX) yang bersih.

🔗 **Live Demo:** [https://link-deployment-anda.vercel.app](https://link-deployment-anda.vercel.app) *(Akan diupdate setelah deployment)*

## ✨ Fitur Utama
- 🔍 **Real-time Search**: Menyaring pengguna berdasarkan nama atau email secara instan tanpa reload halaman.
- 📱 **Fully Responsive**: Tampilan grid yang beradaptasi sempurna di Mobile, Tablet, dan Desktop menggunakan Tailwind CSS.
- ⚡ **Dynamic Routing**: Navigasi halaman detail pengguna yang mulus (SPA) dengan React Router.
- 🛡️ **Robust Error Handling**: Penanganan status Loading, Error, dan Empty State (Data tidak ditemukan) yang ramah pengguna.
- 🔒 **Environment Variables**: Konfigurasi API URL yang aman dan terpisah menggunakan `.env`.

## 🛠️ Tech Stack
- **Frontend Framework**: React.js 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Data Fetching**: Native Fetch API (Async/Await)

## 📂 Struktur Proyek
```text
src/
├── components/       # Komponen UI yang dapat digunakan kembali (Reusable)
├── pages/            # Komponen halaman utama (Home, Detail)
├── App.jsx           # Konfigurasi Routing utama
├── main.jsx          # Entry point aplikasi
└── index.css         # Konfigurasi global Tailwind CSS

🚀 Cara Menjalankan Secara Lokal
Ikuti langkah-langkah ini untuk menjalankan proyek di mesin Anda:
1. Clone repositori ini:


   git clone https://github.com/username-anda/nama-repo.git
   cd nama-repo

2. Instal dependensi:

   npm install

3. Konfigurasi Environment Variables:
    Buat file .env di root folder dan tambahkan:

       VITE_API_URL=https://jsonplaceholder.typicode.com
  
4. Jalankan server development:

   npm run dev

Buka http://localhost:5173 di browser Anda.

👨‍💻 Author
Dibuat dengan ❤️ oleh Anas - Calon Remote Front-End Developer.


