# ClassKas - Sistem Keuangan dan Pengingat Kelas

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479a1.svg)](https://www.mysql.com/)

Aplikasi web full-stack MVP untuk mengelola dana kelas dan pengingat, dibangun dengan React, Node.js, Express, MySQL, dan lainnya.

## ✨ Fitur Utama

- 🔐 Autentikasi pengguna (JWT) dengan peran (Bendahara/Murid)
- 💰 Manajemen transaksi (Pemasukan/Pengeluaran)
- ⏰ Sistem pengingat untuk tugas dan pembayaran
- 📊 Dashboard dengan grafik dan ringkasan
- 📄 Laporan dengan ekspor PDF
- 📱 UI responsif dengan Tailwind CSS

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React** - Library JavaScript untuk UI
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - HTTP client untuk API calls
- **Chart.js** - Library untuk grafik dan chart
- **jsPDF** - Library untuk generate PDF

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web untuk Node.js
- **Sequelize ORM** - ORM untuk database
- **MySQL** - Database relasional
- **JWT** - JSON Web Token untuk autentikasi
- **bcrypt** - Hashing password

## 🚀 Panduan Instalasi

### Persyaratan Sistem
- Node.js (v18+)
- MySQL (instalasi lokal)
- npm atau yarn

### 1. Clone Repository dan Install Dependencies

```bash
# Clone repository
git clone https://github.com/username/classkas.git
cd classkas

# Install dependencies backend
cd server
npm install

# Install dependencies frontend
cd ../client
npm install
```

### 2. Setup Database MySQL

Buat database lokal MySQL dengan nama `classkas`:

```sql
CREATE DATABASE classkas;
```

Update file `.env` dengan kredensial MySQL Anda jika berbeda.

### 3. Jalankan Aplikasi

```bash
# Start server backend (dari folder /server)
npm start

# Start frontend (dari folder /client di terminal terpisah)
npm start
```

Aplikasi akan berjalan di:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001

### 4. Inisialisasi Database

Model Sequelize akan otomatis membuat tabel pada saat pertama kali dijalankan melalui `sequelize.sync()`.

## 📁 Struktur Proyek

```
📦 classkas
├── 📁 client/                 # Frontend React
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/     # Komponen reusable
│   │   ├── 📁 pages/          # Halaman aplikasi
│   │   ├── 📁 context/        # Context API
│   │   └── 📁 utils/          # Utilities
│   └── 📄 package.json
├── 📁 server/                 # Backend Express
│   ├── 📁 config/             # Konfigurasi database
│   ├── 📁 controllers/        # Logic bisnis
│   ├── 📁 middleware/         # Middleware autentikasi
│   ├── 📁 models/             # Model Sequelize
│   ├── 📁 routes/             # API routes
│   └── 📄 package.json
├── 📄 .env                    # Environment variables
├── 📄 .gitignore
└── 📄 README.md
```

## 🔌 API Endpoints

### Autentikasi
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/register` | Registrasi pengguna baru |
| POST | `/api/auth/login` | Login pengguna |

### Transaksi
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/transactions` | Ambil semua transaksi |
| GET | `/api/transactions/stats` | Ambil statistik dashboard |
| GET | `/api/transactions/chart` | Ambil data chart bulanan |
| POST | `/api/transactions` | Buat transaksi baru |
| PUT | `/api/transactions/:id` | Update transaksi |
| DELETE | `/api/transactions/:id` | Hapus transaksi |

### Pengingat
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/reminders` | Ambil semua pengingat |
| POST | `/api/reminders` | Buat pengingat baru |
| PUT | `/api/reminders/:id` | Update pengingat |
| DELETE | `/api/reminders/:id` | Hapus pengingat |

### Admin (Hanya Administrator)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/admin/users` | Ambil semua pengguna |
| POST | `/api/admin/users` | Buat pengguna baru |
| PUT | `/api/admin/users/:id` | Update pengguna |
| DELETE | `/api/admin/users/:id` | Hapus pengguna |
| GET | `/api/admin/roles` | Ambil peran yang tersedia |

## 📖 Cara Penggunaan

### 1. Buat Akun Admin
```sql
INSERT INTO users (name, email, password, role, createdAt, updatedAt)
VALUES ('Admin', 'admin@classkas.com', 'admin123', 'administrator', NOW(), NOW());
```
*Catatan: Password disimpan sebagai plain text untuk kemudahan admin melihatnya*

### 2. Login sebagai Administrator
- Login untuk membuat pengguna lain (Bendahara/Murid)

### 3. Gunakan Aplikasi
- Login untuk mengakses dashboard
- Tambahkan transaksi dan pengingat
- Lihat laporan dan ekspor ke PDF

## 👥 Peran Pengguna

| Peran | Deskripsi | Akses |
|-------|-----------|-------|
| **Administrator** | Akses penuh manajemen pengguna | Bisa buat/edit/hapus pengguna |
| **Bendahara** | Mengelola keuangan kelas | Bisa kelola transaksi dan pengingat |
| **Murid** | Akses terbatas | Hanya bisa lihat dashboard dan laporan |

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini menggunakan lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 📞 Kontak

- **Email:** ahnafzakhy@gmail.com
- **GitHub:** [AhnafZakhy3](https://github.com/AhnafZakhy3)

---

⭐ Jika Anda menyukai proyek ini, berikan bintang di GitHub!
