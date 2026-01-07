# Sistem Manajemen Uji Kompetensi Keahlian

Sistem manajemen uji kompetensi keahlian yang dikembangkan dengan Next.js 15, TypeScript, Prisma, dan MySQL.

## Fitur Utama

### 🔐 Autentikasi & Otorisasi
- Login untuk Admin, Guru, dan Siswa
- Session management dengan NextAuth
- Role-based access control (RBAC)

### 👨‍🏫 Manajemen Guru
- CRUD Guru (Create, Read, Update, Delete)
- Dua status guru: Guru Biasa dan Guru Pembimbing
- Informasi NIP, nama, email, telepon, mata pelajaran

### 👨‍🎓 Manajemen Siswa
- CRUD Siswa (Create, Read, Update, Delete)
- Informasi NIS, nama, email, telepon, kelas
- Data akademik siswa

### 🏫 Manajemen Kelas
- CRUD Kelas (Create, Read, Update, Delete)
- Informasi nama kelas, tingkat, tahun ajaran
- Guru pembimbing dan guru regular per kelas
- Daftar siswa per kelas

### 📅 Jadwal Bimbingan
- CRUD Jadwal Bimbingan (Create, Read, Update, Delete)
- Informasi judul, tanggal, waktu, lokasi
- Asosiasi guru dan kelas
- Status jadwal (Hari Ini / Mendatang)

### 📊 Absensi Siswa
- Catat kehadiran siswa di sesi bimbingan
- Status: Hadir, Sakit, Izin, Alpa
- Catatan dan alasan ketidakhiran
- Rekap absensi per jadwal dan siswa

### 📝 Penilaian & Nilai
- Input nilai uji kompetensi
- Berbagai tipe penilaian
- Skor (0-100 atau sesuai skala)
- Catatan dan feedback
- Rekap nilai per siswa dan jadwal

### 📊 Dashboard
- **Dashboard Admin**: Ringkasan statistik, aktivitas terbaru, akses cepat ke semua fitur
- **Dashboard Guru**: Jadwal mengajar, daftar siswa, input absensi dan nilai
- **Dashboard Siswa**: Jadwal bimbingan, nilai uji kompetensi, riwayat absensi

## Teknologi

- **Frontend**: Next.js 15 dengan App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Prisma ORM
- **Autentikasi**: NextAuth v5
- **Type Safety**: TypeScript
- **Styling**: CSS Modules + Tailwind

## Struktur Database

### Users
- `id`: Unique identifier
- `email`: Email address (unique)
- `password`: Password (should be hashed in production)
- `name`: Full name
- `role`: UserRole (ADMIN, GURU, SISWA)

### Teachers
- `id`: Unique identifier
- `userId`: Foreign key to Users table
- `nip`: Nomor Induk Pegawai (unique)
- `name`: Full name
- `email`: Email address
- `phone`: Phone number
- `status`: GuruStatus (GURU_BIASA, GURU_PEMBIMBING, KEDUANYA)
- `subject`: Subject/teaching subject

### Students
- `id`: Unique identifier
- `userId`: Foreign key to Users table
- `nis`: Nomor Induk Siswa (unique)
- `name`: Full name
- `email`: Email address
- `phone`: Phone number
- `classId`: Foreign key to Classes table (nullable)

### Classes
- `id`: Unique identifier
- `name`: Class name (unique)
- `grade`: Grade/level (X, XI, XII)
- `academicYear`: Academic year
- `mentorTeacherId`: Foreign key to Teachers (nullable)
- `regularTeacherId`: Foreign key to Teachers (nullable)

### Schedules
- `id`: Unique identifier
- `title`: Schedule title
- `date`: Date of schedule
- `startTime`: Start time
- `endTime`: End time
- `location`: Location (optional)
- `description`: Description (optional)
- `teacherId`: Foreign key to Teachers
- `classId`: Foreign key to Classes

### Attendance
- `id`: Unique identifier
- `scheduleId`: Foreign key to Schedules
- `studentId`: Foreign key to Students
- `teacherId`: Foreign key to Teachers
- `status`: AttendanceStatus (HADIR, SAKIT, IZIN, ALPA)
- `notes`: Notes (optional)

### Grades
- `id`: Unique identifier
- `scheduleId`: Foreign key to Schedules
- `studentId`: Foreign key to Students
- `teacherId`: Foreign key to Teachers
- `score`: Score (Float)
- `remarks`: Remarks (optional)
- `assessmentType`: Assessment type (optional)

### Mentoring
- `id`: Unique identifier
- `studentId`: Foreign key to Students
- `teacherId`: Foreign key to Teachers
- `title`: Mentoring title
- `description`: Description (optional)
- `mentoringDate`: Date of mentoring
- `notes`: Notes (optional)

## Cara Setup

### 1. Clone & Install Dependencies

```bash
# Install dependencies
npm install next-auth@beta @prisma/client bcryptjs

# Install Prisma CLI
npm install -D prisma

# Install MySQL driver
npm install -D @prisma/adapter-mysql
```

### 2. Configure Database

Buat database MySQL:

```sql
CREATE DATABASE manajemen_uji_kompetensi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update `.env.example` dengan konfigurasi database:

```env
DATABASE_URL="mysql://root:password@localhost:3306/manajemen_uji_kompetensi"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Copy file example:

```bash
cp .env.example .env
```

### 3. Setup Prisma

Jalankan migrasi Prisma:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:3000`

## API Endpoints

### Autentikasi
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `GET /api/auth/session` - Get current session

### Guru
- `GET /api/guru` - List teachers with pagination
- `POST /api/guru` - Create new teacher

### Siswa
- `GET /api/siswa` - List students with pagination
- `POST /api/siswa` - Create new student

### Kelas
- `GET /api/kelas` - List classes with pagination
- `POST /api/kelas` - Create new class

### Jadwal
- `GET /api/jadwal` - List schedules with filters
- `POST /api/jadwal` - Create new schedule

### Absensi
- `GET /api/absensi` - List attendance records
- `POST /api/absensi` - Create/update attendance

### Nilai
- `GET /api/nilai` - List grades
- `POST /api/nilai` - Create/update grade

## Pages

### `/` - Login page
### `/dashboard/admin` - Admin dashboard
### `/dashboard/guru` - Teacher dashboard
### `/dashboard/siswa` - Student dashboard

## Akun Demo

### Admin
- Email: `admin@sekolah.sch.id`
- Password: `admin123`

### Guru
- Email: `guru@sekolah.sch.id`
- Password: `guru123`
- NIP: `198501012005112001`
- Status: Guru Pembimbing

### Siswa
- Email: `siswa@sekolah.sch.id`
- Password: `siswa123`
- NIS: `2024001`

## Keamanan

⚠️ **PRODUCTION NOTES**:

1. **Password Hashing**: Gunakan bcrypt untuk hash password di production
2. **Environment Variables**: Jangan commit file `.env` ke version control
3. **SQL Injection**: Prisma ORM secara otomatis mencegah SQL injection
4. **Input Validation**: Validasi semua input di server-side
5. **Rate Limiting**: Implementasi rate limiting untuk API
6. **HTTPS**: Gunakan HTTPS di production
7. **CORS**: Konfigurasi CORS dengan benar jika perlu
8. **Session Security**: Set `NEXTAUTH_SECRET` dengan random string yang kuat

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
# DATABASE_URL
# NEXTAUTH_SECRET
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL="mysql://root:password@db:3306/manajemen_uji_kompetensi"

CMD ["npm", "run", "start"]
```

## Troubleshooting

### Prisma Error: "Foreign key constraint failed"
- Pastikan relasi antar tabel sudah benar
- Cek urutan migrasi

### NextAuth Session Expired
- Periksa konfigurasi `NEXTAUTH_SECRET`
- Pastikan cookie domain benar

### Database Connection Failed
- Pastikan MySQL server running
- Cek connection string di `.env`
- Pastikan database sudah dibuat

## Lisensi

MIT License - Selamat digunakan untuk komersial dan pribadi.

## Support

Untuk dukungan atau pertanyaan, silakan hubungi tim pengembang.

---

**Dibuat dengan ❤️ untuk pendidikan Indonesia**
