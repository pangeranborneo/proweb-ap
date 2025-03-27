# Aplikasi E-Commerce Sederhana

## Deskripsi
Aplikasi full-stack sederhana untuk manajemen produk dengan fitur CRUD (Create, Read, Update, Delete) menggunakan:
- **Frontend**: React.js + Vite + Bootstrap
- **Backend**: Express.js + PostgreSQL
- **Database**: PostgreSQL dengan tabel `produk`

---

## Fitur
✅ Tambah Produk  
✅ Lihat Daftar Produk  
✅ Edit Produk  
✅ Hapus Produk  
✅ Notifikasi Toastr  
✅ Validasi Input  
✅ Desain Responsive  

---

## Instalasi & Penggunaan

### 1. Prasyarat
- Node.js v22.13.1
- PostgreSQL
- Git

### 2. Struktur Direktori
```
ecommerce-frontend/   # Frontend React
ecommerce-backend/    # Backend Express
```

---

## Backend (Express.js)

### Instalasi
```bash
# Masuk ke folder backend
cd ecommerce-backend

# Install dependensi
npm install
```

### Konfigurasi Database
1. Buat database `ecommerce-kecil` di PostgreSQL
2. Sesuaikan konfigurasi di `db.js`:
```javascript
const pool = new Pool({
  user: 'postgres',
  password: 'codetohero000', // Ganti dengan password Anda
  host: 'localhost',
  port: 5432,
  database: 'ecommerce-kecil'
});
```

### Menjalankan Server
```bash
node index.js
# Server berjalan di http://localhost:3001
```

### Endpoint API
| Method | Endpoint          | Fungsi                  |
|--------|-------------------|-------------------------|
| GET    | /produk           | Ambil semua produk      |
| POST   | /produk           | Tambah produk baru      |
| PUT    | /produk/:id       | Update produk           |
| DELETE | /produk/:id       | Hapus produk            |

---

## Frontend (React.js)

### Instalasi
```bash
# Masuk ke folder frontend
cd ecommerce-frontend

# Install dependensi
npm install
```

### Menjalankan Aplikasi
```bash
npm run dev
# Aplikasi berjalan di http://localhost:5173
```

---

## Database Schema
**Tabel Produk**:
| Kolom  | Tipe Data | Keterangan          |
|--------|-----------|---------------------|
| id     | SERIAL    | Primary Key         |
| nama   | VARCHAR   | Nama produk         |
| harga  | INTEGER   | Harga produk        |

---

## Troubleshooting
⚠️ **CORS Error**  
Pastikan backend sudah menggunakan middleware:
```javascript
app.use(cors());
```

⚠️ **Database Connection Error**  
1. Pastikan PostgreSQL sedang berjalan
2. Cek kredensial di `db.js`
3. Pastikan database `ecommerce-kecil` sudah dibuat

---

## Dikerjakan Oleh:
Pangeran Borneo Silaen - 10231073 Backend &
Arthur Tirtajaya Jehuda - 10231019 Frontend 

---

