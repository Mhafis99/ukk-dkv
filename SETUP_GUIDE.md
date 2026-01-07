# Panduan Setup Proyek Uji Kompetensi Keahlian

## Langkah 1: Setup Database MySQL

### 1.1. Buat Database MySQL

Login ke MySQL sebagai root dan jalankan:

```sql
CREATE DATABASE manajemen_uji_kompetensi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 1.2. Setup Environment Variables

Copy file `.env.example` dan rename ke `.env`:

```bash
cp .env.example .env
```

Edit file `.env` sesua dengan kredensial database Anda:

```env
DATABASE_URL="mysql://root:PASSWORD_ANDA@localhost:3306/manajemen_uji_kompetensi"
NEXTAUTH_SECRET="r4nd0m-s3cr3t-k3y-h3r"
NEXTAUTH_URL="http://localhost:3000"
```

⚠️ **PENTING**: Ganti `PASSWORD_ANDA` dengan password MySQL Anda yang sebenarnya!

## Langkah 2: Install Dependencies

### 2.1. Install Dependencies Utama

```bash
# Install NextAuth dan provider credentials
npm install next-auth@beta @prisma/client

# Install Prisma dan adapter MySQL
npm install -D prisma
npm install -D @prisma/adapter-mysql

# Install bcrypt untuk hashing password (production)
npm install bcryptjs

# Install tipe untuk NextAuth
npm install -D @types/bcryptjs
```

### 2.2. Verify Installation

Pastikan semua dependencies terinstall dengan benar:

```bash
npm list next-auth @prisma/client @prisma/adapter-mysql bcryptjs
```

## Langkah 3: Setup Prisma

### 3.1. Generate Prisma Client

```bash
npx prisma generate
```

### 3.2. Push Schema ke Database

```bash
npx prisma db push
```

Perintah ini akan:
- Membuat semua tabel di database MySQL
- Membuat relasi antar tabel
- Setup foreign keys dan constraints

### 3.3. Verify Database Setup

Pastikan schema sudah terpush dengan benar. Anda harus melihat output seperti:

```
Environment variables loaded from .env
Drizzle Kit ORM: ... initialized
Running migration...

Your database is now in sync with your schema.
```

## Langkah 4: Seed Database dengan Data Sample

### 4.1. Jalankan Seed Script

```bash
# Seed database dengan data sample
npx tsx prisma/seed.ts
```

### 4.2. Verify Data di Database

Setelah seeding, database Anda akan berisi:

**Users (5):**
- 1 Admin
- 1 Guru Pembimbing
- 3 Siswa

**Teachers (2):**
- Budi Santoso (Guru Pembimbing - Matematika)
- Siti Rahayu (Guru Biasa - Bahasa Indonesia)

**Classes (3):**
- Kelas X A
- Kelas XI A
- Kelas XII IPA 1

**Students (3):**
- Ahmad Rizky (Kelas XII IPA 1)
- Dewi Sartika (Kelas XI A)
- Eko Pratama (Kelas X A)

**Schedules (3) untuk hari ini):**
- Persiapan Uji Kompetensi (08:00-10:00)
- Latihan Soal (10:00-12:00)
- Review Materi (13:00-15:00)

**Attendance Records (9):**
- 3 hadir, 1 sakit, 1 izin untuk jadwal pertama
- 2 hadir, 1 izin untuk jadwal kedua
- 2 hadir, 1 alpa untuk jadwal ketiga

**Grades (6):**
- 3 grades untuk uji kompetensi (Persiapan)
- 3 grades untuk latihan soal

## Langkah 5: Jalankan Development Server

### 5.1. Start Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

### 5.2. Verify Server Running

Buka browser dan akses: `http://localhost:3000`

Anda harus melihat halaman login dengan logo "UK" dan judul "Manajemen Uji Kompetensi Keahlian"

## Langkah 6: Testing Aplikasi

### 6.1. Login sebagai Admin

1. Buka `http://localhost:3000`
2. Masukkan kredensial:
   - **Email**: `admin@sekolah.sch.id`
   - **Password**: `admin123`
3. Klik tombol "Masuk"

Anda akan diarahkan ke Dashboard Admin di: `http://localhost:3000/dashboard/admin`

### 6.2. Cek Dashboard Admin

Di Dashboard Admin, pastikan Anda melihat:

**Ringkasan Statistik:**
- Total Guru: 24 (angka sample)
- Total Siswa: 156 (angka sample)
- Total Kelas: 12 (angka sample)
- Jadwal Hari Ini: 8 (angka sample)

**Menu Navigasi:**
- Data Master
- Guru
- Siswa
- Kelas
- Jadwal Bimbingan
- Absensi
- Nilai

**Kartu Data Master:**
- Manajemen Guru
- Manajemen Siswa
- Manajemen Kelas

### 6.3. Login sebagai Guru

1. Logout dari akun admin
2. Kembali ke halaman login: `http://localhost:3000`
3. Masukkan kredensial guru:
   - **Email**: `guru@sekolah.sch.id`
   - **Password**: `guru123`
4. Klik tombol "Masuk"

Anda akan diarahkan ke Dashboard Guru di: `http://localhost:3000/dashboard/guru`

### 6.4. Cek Dashboard Guru

Di Dashboard Guru, pastikan Anda melihat:

**Informasi Guru:**
- Nama: Budi Santoso, S.Pd
- NIP: 198501012005112001
- Status: Guru Pembimbing
- Mata Pelajaran: Matematika

**Ringkasan Statistik:**
- Kelas Dibimbing: 3
- Total Siswa: 78
- Jadwal Bulan Ini: 12

**Menu Navigasi:**
- Kelas Saya
- Jadwal Bimbingan
- Absensi
- Nilai Siswa

**Daftar Kelas:**
- Kelas X A (25 siswa)
- Kelas XI A (28 siswa)
- Kelas XII IPA (25 siswa)

**Jadwal Hari Ini:**
- 08:00-10:00: Persiapan Uji Kompetensi (Kelas X A)
- 10:00-12:00: Latihan Soal (Kelas XI A)
- 13:00-15:00: Review Materi (Kelas XII IPA)

**Aksi Cepat:**
- Input Absensi
- Input Nilai
- Lihat Laporan
- Buat Jadwal

### 6.5. Login sebagai Siswa

1. Logout dari akun guru
2. Kembali ke halaman login: `http://localhost:3000`
3. Masukkan kredensial siswa:
   - **Email**: `siswa1@sekolah.sch.id` (atau siswa2, siswa3)
   - **Password**: `siswa123`
4. Klik tombol "Masuk"

Anda akan diarahkan ke Dashboard Siswa di: `http://localhost:3000/dashboard/siswa`

### 6.6. Cek Dashboard Siswa

Di Dashboard Siswa, pastikan Anda melihat:

**Informasi Siswa:**
- Nama: Ahmad Rizky, S.Kom
- NIS: 2024001
- Kelas: XII IPA 1
- Wali Kelas: Bapak Santoso

**Ringkasan Statistik:**
- Jadwal Hari Ini: 3
- Jumlah Jadwal Bulan Ini: 8
- Total Absensi: 24 (angka sample)

**Jadwal Hari Ini:**
Untuk hari ini, siswa harus melihat 3 jadwal:
- 08:00-10:00: Persiapan Uji Kompetensi
- 10:00-12:00: Latihan Soal
- 13:00-15:00: Review Materi

Untuk setiap jadwal, siswa dapat melihat:
- Status (Hari Ini / Hadir)
- Status Absensi untuk jadwal pertama: Hadir

**Nilai Uji Kompetensi:**
Siswa dapat melihat rekap nilai:
- Matematika Dasar: 85 (Kompeten)
- Algoritma & Struktur Data: 78 (Sedang Dikembangkan)
- Basis Data: 92 (Kompeten)
- Pemrograman Web: 88 (Kompeten)

## Langkah 7: Testing API Endpoints

### 7.1. Test API Guru

```bash
# Get semua guru
curl http://localhost:3000/api/guru

# Create guru baru
curl -X POST http://localhost:3000/api/guru \
  -H "Content-Type: application/json" \
  -d '{
    "nip": "198701012006112002",
    "name": "Guru Baru",
    "email": "gurubaru@sekolah.sch.id",
    "phone": "081234567895",
    "status": "GURU_BIASA",
    "subject": "Fisika",
    "password": "password123"
  }'
```

### 7.2. Test API Siswa

```bash
# Get semua siswa
curl http://localhost:3000/api/siswa

# Get siswa by kelas
curl "http://localhost:3000/api/siswa?classId=kelas-x-a-id"

# Create siswa baru
curl -X POST http://localhost:3000/api/siswa \
  -H "Content-Type: application/json" \
  -d '{
    "nis": "2024004",
    "name": "Siswa Baru",
    "email": "siswabaru@sekolah.sch.id",
    "phone": "081234567896",
    "classId": "kelas-x-a-id",
    "password": "password123"
  }'
```

### 7.3. Test API Kelas

```bash
# Get semua kelas
curl http://localhost:3000/api/kelas

# Create kelas baru
curl -X POST http://localhost:3000/api/kelas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kelas XB",
    "grade": "XI",
    "academicYear": "2024",
    "mentorTeacherId": "guru-pembimbing-id",
    "regularTeacherId": "guru-regular-id"
  }'
```

### 7.4. Test API Jadwal

```bash
# Get semua jadwal
curl http://localhost:3000/api/jadwal

# Get jadwal by teacher
curl "http://localhost:3000/api/jadwal?teacherId=guru-id"

# Create jadwal baru
curl -X POST http://localhost:3000/api/jadwal \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Uji Kompetensi Teknik Komputer",
    "date": "2024-01-25T08:00:00.000Z",
    "startTime": "2024-01-25T08:00:00.000Z",
    "endTime": "2024-01-25T10:00:00.000Z",
    "location": "Lab Komputer 1",
    "description": "Uji kompetensi untuk kelas XI",
    "teacherId": "guru-pembimbing-id",
    "classId": "kelas-xi-a-id"
  }'
```

### 7.5. Test API Absensi

```bash
# Get absensi by jadwal
curl "http://localhost:3000/api/absensi?scheduleId=jadwal-id"

# Catat absensi
curl -X POST http://localhost:3000/api/absensi \
  -H "Content-Type: application/json" \
  -d '{
    "scheduleId": "jadwal-id",
    "studentId": "siswa-id",
    "teacherId": "guru-id",
    "status": "HADIR",
    "notes": "Hadir tepat waktu"
  }'
```

### 7.6. Test API Nilai

```bash
# Get nilai by siswa
curl "http://localhost:3000/api/nilai?studentId=siswa-id"

# Input nilai
curl -X POST http://localhost:3000/api/nilai \
  -H "Content-Type: application/json" \
  -d '{
    "scheduleId": "jadwal-id",
    "studentId": "siswa-id",
    "teacherId": "guru-id",
    "score": 85,
    "remarks": "Kompeten di semua aspek",
    "assessmentType": "Uji Kompetensi"
  }'
```

## Langkah 8: Troubleshooting

### 8.1. Error: "Access denied for user 'root'@'localhost'"

**Solusi**: Cek password MySQL di `.env` file. Pastikan password benar.

### 8.2. Error: "Can't reach database server at localhost:3306"

**Solusi**: Pastikan MySQL server running.

```bash
# Cek status MySQL
sudo systemctl status mysql

# Atau jalankan MySQL manual
sudo mysql
```

### 8.3. Error: "Foreign key constraint failed"

**Solusi**: Jalankan migrasi Prisma dengan benar.

```bash
# Reset dan ulangi migrasi
npx prisma migrate reset
npx prisma db push
```

### 8.4. Error: "Module not found: Can't resolve 'next-auth'"

**Solusi**: Install NextAuth.

```bash
npm install next-auth@beta
```

### 8.5. Halaman tidak load

**Solusi**: Check browser console untuk error JavaScript.

```bash
# Cek development server logs
cat dev.log
```

### 8.6. Login tidak berhasil

**Solusi**:
1. Cek email dan password di README.md
2. Pastikan password tidak ada spasi
3. Pastikan kredensial sudah benar

### 8.7. Data tidak muncul di dashboard

**Solusi**:
1. Jalankan seed script: `npx tsx prisma/seed.ts`
2. Cek data di database MySQL
3. Refresh dashboard

## Langkah 9: Fitur Tambahan yang Bisa Dikembangkan

### 9.1. Export ke Excel/PDF

Tambah fitur untuk ekspor data:
- Daftar siswa
- Rekap absensi
- Laporan nilai

### 9.2. Notifications

Tambah fitur notifikasi:
- Notifikasi jadwal baru untuk siswa
- Notifikasi absensi belum diinput
- Notifikasi nilai sudah keluar

### 9.3. Analytics Dashboard

Tambahkan statistik:
- Grafik kehadiran siswa per bulan
- Rata-rata nilai per kelas
- Perbandingan nilai antar kelas

### 9.4. Calendar Integration

Integrasikan dengan:
- Google Calendar
- Microsoft Outlook
- iCal format

### 9.5. Mobile App

Buat aplikasi mobile:
- Push notification untuk jadwal
- Quick attendance check
- View grades on mobile

## Langkah 10: Deployment

### 10.1. Build untuk Production

```bash
# Build aplikasi
npm run build
```

### 10.2. Setup Environment Production

Buat `.env.production`:

```env
DATABASE_URL="mysql://root:PRODUCTION_PASSWORD@prod-db-host:3306/manajemen_uji_kompetensi"
NEXTAUTH_SECRET="production-secret-key-must-be-long-and-random"
NEXTAUTH_URL="https://domain-anda.com"
```

### 10.3. Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables di Vercel dashboard
# DATABASE_URL
# NEXTAUTH_SECRET
```

## Ringkasan Struktur Project

```
my-project/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Seed data sample
├── src/
│   ├── app/
│   │   ├── page.tsx          # Login page
│   │   ├── layout.tsx        # Root layout dengan SessionProvider
│   │   ├── dashboard/
│   │   │   ├── admin/     # Admin dashboard
│   │   │   ├── guru/      # Guru dashboard
│   │   │   └── siswa/     # Siswa dashboard
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │       │   └── session/route.ts         # Session API
│   │       ├── guru/route.ts  # Guru CRUD API
│   │       ├── siswa/route.ts # Siswa CRUD API
│   │       ├── kelas/route.ts # Kelas CRUD API
│   │       ├── jadwal/route.ts     # Jadwal CRUD API
│   │       ├── absensi/route.ts  # Absensi API
│   │       └── nilai/route.ts  # Nilai API
│   ├── components/
│   │   ├── auth-provider.tsx # NextAuth SessionProvider
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts            # Prisma client
│   │   ├── auth.ts          # NextAuth configuration
│   │   └── utils.ts         # Utility functions
│   └── types/
│       └── next-auth.d.ts   # NextAuth type definitions
├── public/
│   ├── logo.svg
│   └── robots.txt
├── .env.example              # Environment variables template
├── .env                     # Environment variables (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md                 # Dokumentasi project
```

## Catatan Penting

### 🔐 Keamanan

1. **Password Hashing**: Di production, gunakan bcrypt untuk hash password
2. **Environment Variables**: Jangan commit `.env` ke Git
3. **SQL Injection**: Prisma ORM mencegah SQL injection
4. **Input Validation**: Validasi semua input di server-side
5. **HTTPS**: Gunakan HTTPS di production
6. **Session Management**: Set `NEXTAUTH_SECRET` dengan random string yang kuat

### ⚠️ Best Practices

1. **Database Backup**: Backup database MySQL secara regular
2. **Error Logging**: Log semua error dengan jelas
3. **API Rate Limiting**: Batasi request API untuk mencegah abuse
4. **CORS Configuration**: Konfigurasi CORS dengan benar
5. **User Experience**: Berikan feedback yang jelas untuk semua action

### 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Dibuat dengan ❤️ untuk pendidikan Indonesia**
