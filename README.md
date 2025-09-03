Financial Records API
API ini dirancang untuk mengelola catatan keuangan, seperti pendapatan (INCOME) dan pengeluaran (EXPENSE). Dibangun menggunakan Node.js, Express.js, TypeScript, dan Prisma sebagai ORM untuk berinteraksi dengan database MySQL. Validasi input dilakukan dengan Joi, dan API ini mendukung operasi CRUD (Create, Read, Update, Delete) serta perhitungan total berdasarkan tipe transaksi.
Catatan: Nama proyek di package.json adalah "foodorderingsystem", yang kurang sesuai dengan fungsi pencatatan keuangan. Saran: Ganti nama proyek menjadi "financial-records-api" untuk konsistensi.
Fitur Utama

Create Catatan: Tambah catatan keuangan baru (INCOME atau EXPENSE) dengan tipe, jumlah, dan deskripsi.
Read Catatan: Ambil semua catatan keuangan.
Update Catatan: Perbarui catatan berdasarkan ID.
Delete Catatan: Hapus catatan berdasarkan ID.
Hitung Total: Hitung total jumlah berdasarkan tipe (INCOME atau EXPENSE).
Validasi input menggunakan Joi untuk memastikan data valid.
Koneksi ke database MySQL melalui Prisma ORM.

Teknologi yang Digunakan

Backend: Node.js, Express.js
Bahasa: TypeScript
Database: MySQL (via Prisma ORM)
Validasi: Joi
Lainnya: CORS, Nodemon, Prisma Client, JSON Web Token (JWT, belum diimplementasikan), MD5 (hashing, belum digunakan), Multer (upload file, belum digunakan), UUID (ID unik, belum digunakan).

Prasyarat

Node.js (versi >= 16)
MySQL (lokal atau cloud)
Git (untuk clone repositori)

Instalasi

Clone repositori:
git clone https://github.com/username/repo-name.git
cd repo-name


Instal dependensi:
npm install


Buat file .env di root proyek dengan isi berikut:
DATABASE_URL="mysql://root:password@localhost:3306/nama_database"
PORT=9000
SECRET="rahasia_anda"  # Untuk JWT, jika diimplementasikan

Ganti password dan nama_database sesuai konfigurasi MySQL Anda.

Jalankan migrasi Prisma untuk membuat tabel database:
npx prisma migrate dev --name init


Jalankan server dalam mode development:
npm run dev

Server akan berjalan di http://localhost:9000 (atau port yang ditentukan di .env).


Struktur Database
Berikut adalah skema database berdasarkan schema.prisma (diasumsikan):
model Catatan {
  id          Int      @id @default(autoincrement())
  type        String   // INCOME atau EXPENSE
  amount      Float    // Jumlah transaksi
  description String   // Deskripsi transaksi
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

API Endpoints
Semua endpoint berada di bawah path /catatan. Gunakan alat seperti Postman atau curl untuk menguji.
1. GET / - Ambil Semua Catatan

Deskripsi: Mengambil semua catatan keuangan.
Respons (200):{
  "status": true,
  "data": [
    {
      "id": 1,
      "type": "INCOME",
      "amount": 23456,
      "description": "Gaji Bulan Januari",
      "createdAt": "2025-03-21T08:26:19.449Z",
      "updatedAt": "2025-03-21T08:26:36.496Z"
    }
  ],
  "message": "financial records has Retrieved"
}


Error (400):{
  "status": false,
  "message": "there is an error. <error_message>"
}



2. POST / - Buat Catatan Baru

Middleware: verifyAddCatatan (validasi Joi).
Body Request:{
  "type": "INCOME",
  "amount": 5000000,
  "description": "Gaji Bulan Januari"
}


Validasi:
type: Harus "INCOME" atau "EXPENSE" (wajib).
amount: Angka positif (wajib).
description: String tidak kosong (wajib).


Respons (200):{
  "status": true,
  "data": {
    "id": 9,
    "type": "INCOME",
    "amount": 5000000,
    "description": "Gaji Bulan Januari",
    "createdAt": "2025-09-03T01:28:27.819Z",
    "updatedAt": "2025-09-03T01:28:27.819Z"
  },
  "message": "New financial records has Created"
}


Error (400):
Validasi gagal:{
  "status": false,
  "message": "\"type\" must be one of [INCOME, EXPENSE],\"amount\" must be a number"
}


Error lain:{
  "status": false,
  "message": "There is an error. <error_message>"
}





3. PUT /:id - Perbarui Catatan

Middleware: verifyEditCatatan (validasi Joi).
Params: id (ID catatan).
Body Request:{
  "type": "INCOME",
  "amount": 23456,
  "description": "Gaji Bulan Februari"
}


Validasi:
type: "INCOME" atau "EXPENSE" (opsional).
amount: Angka positif (opsional).
description: String (opsional).


Respons (200):{
  "status": true,
  "data": {
    "id": 1,
    "type": "INCOME",
    "amount": 23456,
    "description": "Gaji Bulan Februari",
    "createdAt": "2025-03-21T08:26:19.449Z",
    "updatedAt": "2025-09-03T01:28:38.506Z"
  },
  "message": "New financial records has Created"
}


Error:
Catatan tidak ditemukan (200, seharusnya 404):{
  "status": false,
  "message": "Financial records is Not found"
}


Validasi gagal (400):{
  "status": false,
  "message": "\"type\" must be one of [INCOME, EXPENSE]"
}





4. DELETE /:id - Hapus Catatan

Params: id (ID catatan).
Respons (200):{
  "status": true,
  "data": {
    "id": 1,
    "type": "INCOME",
    "amount": 23456,
    "description": "Gaji Bulan Januari",
    "createdAt": "2025-03-21T08:26:19.449Z",
    "updatedAt": "2025-03-21T08:26:36.496Z"
  },
  "message": "financial records has Deleted"
}


Error:
Catatan tidak ditemukan (200, seharusnya 404):{
  "status": false,
  "message": "is not found"
}


Error lain (400):{
  "status": false,
  "message": "there is an error. <error_message>"
}





5. GET /total?type=INCOME - Hitung Total

Query Params: type (INCOME atau EXPENSE).
Respons (200):{
  "message": "Alhamdulillah,Total Calculated Successfully.",
  "data": {
    "type": "INCOME",
    "totalAmount": 40000000
  }
}


Error:
Tipe tidak valid (400):{
  "message": "Jenis transaksi tidak valid, hanya \"INCOME\" atau \"EXPENSE\" yang diperbolehkan."
}


Tidak ada transaksi (404):{
  "message": "Astagfirullah, Tidak ada transaksi yang ditemukan untuk tipe ini."
}


Error server (500):{
  "message": "Astagfirullah, Terjadi kesalahan saat menghitung total: <error_message>"
}





Struktur Proyek
├── src/
│   ├── index.ts                 # Entry point server
│   ├── routers/
│   │   └── catatanRoute.ts      # Definisi routes
│   ├── controllers/
│   │   └── catatanController.ts # Logika bisnis
│   ├── middlewares/
│   │   └── verifyCatatan.ts     # Validasi Joi
│   └── global.ts                # Konstanta (misalnya PORT)
├── prisma/
│   └── schema.prisma            # Skema database
├── .env                         # Variabel environment
├── package.json                 # Dependensi
├── package-lock.json            # Lockfile
└── README.md                    # Dokumentasi ini

Pengujian
Uji endpoint menggunakan Postman atau curl. Contoh curl untuk membuat catatan:
curl -X POST http://localhost:9000/catatan \
  -H "Content-Type: application/json" \
  -d '{"type":"INCOME","amount":5000000,"description":"Gaji Bulan Januari"}'

Catatan dan Saran Perbaikan
Bug

Typo Pesan: Pesan di updatedCatatanKuangan salah ("New financial records has Created" seharusnya "Financial records has been Updated").
ID di Body: createCatatan menerima id dari body, padahal seharusnya otomatis oleh Prisma. Hapus id dari body request.
Status Kode: Catatan tidak ditemukan di PUT dan DELETE menggunakan status 200 (seharusnya 404).
Logika Total: Kondisi di hitungTotalCatatan (!totalAmount._sum.amount === null) salah. Ganti ke totalAmount._sum.amount === null.
Nama Fungsi: updatedCatatanKuangan seharusnya updateCatatanKeuangan untuk konsistensi.

Saran

Autentikasi: Tambahkan middleware JWT untuk melindungi endpoint.
Error Handling: Gunakan tipe error spesifik untuk membedakan error database, validasi, dll.
Konsistensi Pesan: Gunakan huruf besar untuk awal kalimat dan tata bahasa yang benar (misalnya, "Financial records have been retrieved").
Logging: Tambahkan library seperti winston untuk logging di produksi.
Optimasi Prisma: Gunakan findUnique alih-alih findFirst untuk pencarian berdasarkan ID.
Dokumentasi: Tambahkan Swagger untuk dokumentasi API interaktif.

Kontribusi

Fork repositori.
Buat branch: git checkout -b fitur-baru.
Commit: git commit -m 'Menambahkan fitur X'.
Push: git push origin fitur-baru.
Buat Pull Request.

Laporkan bug atau saran melalui issue GitHub.
Terima kasih telah menggunakan Financial Records API! Hubungi melalui issue GitHub untuk pertanyaan lebih lanjut.
