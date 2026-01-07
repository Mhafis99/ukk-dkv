# Sistem Manajemen Uji Kompetensi Keahlian
## Ringkasan Proyek

Aplikasi web lengkap untuk manajemen uji kompetensi keahlian dengan fitur autentikasi multi-role, manajemen data guru, siswa, dan kelas, serta pencatatan absensi dan penilaian.

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi
- ✅ Login multi-role (Admin, Guru, Siswa)
- ✅ Session management dengan NextAuth v5
- ✅ Role-based access control (RBAC)
- ✅ Protect route untuk semua dashboard berdasarkan peran

### 👨‍🏫 Manajemen Guru (2 Status)
- ✅ CRUD Guru Lengkap (Create, Read, Update, Delete)
- ✅ Dua status guru:
  - **Guru Pembimbing**: Guru yang membimbing kelas
  - **Guru Biasa**: Guru reguler untuk pengajaran
  - **Guru Edukasi**: Status non-aktif (opsional)
- ✅ Informasi lengkap:
  - Nomor Induk Pegawai (NIP) - Unique
  - Nama lengkap
  - Email
  - Telepon
  - Mata pelajaran
- ✅ Pencarian guru dengan pagination
- ✅ Filter berdasarkan status dan pencarian

### 👨‍🎓 Manajemen Siswa
- ✅ CRUD Siswa Lengkap (Create, Read, Update, Delete)
- ✅ Informasi lengkap:
  - Nomor Induk Siswa (NIS) - Unique
  - Nama lengkap
  - Email
  - Telepon
  - Kelas (linked ke data kelas)
- ✅ Pencarian siswa dengan pagination
- ✅ Filter berdasarkan kelas dan pencarian

### 🏫 Manajemen Kelas
- ✅ CRUD Kelas Lengkap (Create, Read, Update, Delete)
- ✅ Informasi kelas:
  - Nama kelas (Unique)
  - Tingkat/Kelas (X, XI, XII)
  - Tahun ajaran
- ✅ Guru pembimbing dan guru regular per kelas
- ✅ Daftar siswa otomatis dari data siswa
- ✅ Pencarian kelas dengan pagination

### 📅 Jadwal Bimbingan
- ✅ CRUD Jadwal Lengkap (Create, Read, Update, Delete)
- ✅ Informasi jadwal:
  - Judul bimbingan
  - Tanggal dan waktu (start/end time)
  - Lokasi (opsional)
  - Deskripsi (opsional)
- ✅ Asosiasi dengan guru dan kelas
- ✅ Filter jadwal berdasarkan:
  - Guru
  - Kelas
  - Tanggal
  - Status (Hari Ini / Mendatang)
- ✅ Status visual untuk jadwal hari ini

### 📊 Absensi Siswa
- ✅ Catat absensi untuk setiap siswa di setiap jadwal
- ✅ Status absensi:
  - **Hadir**: Siswa hadir tepat waktu
  - **Sakit**: Siswa sakit dengan alasan
  - **Izin**: Siswa izin dengan alasan
  - **Alpa**: Siswa tidak hadir dengan alasan
- ✅ Catatan dan alasan ketidakhiran
- ✅ Satu absensi per siswa per jadwal (mencegah duplikasi)
- ✅ Filter absensi berdasarkan:
  - Jadwal
  - Siswa
  - Guru
  - Status absensi
- ✅ Rekap absensi per jadwal dan siswa

### 📝 Penilaian & Nilai
- ✅ Input nilai uji kompetensi untuk setiap siswa per jadwal
- ✅ Berbagai tipe penilaian:
  - Uji Kompetensi
  - Latihan Soal
  - Tugas
- ✅ Skor fleksibel (0-100 atau sesuai skala)
- ✅ Catatan dan feedback untuk setiap nilai
- ✅ Tipe penilaian yang dapat dikustomisasi
- ✅ Satu nilai per siswa per jadwal (mencegah duplikasi)
- ✅ Filter nilai berdasarkan:
  - Jadwal
  - Siswa
  - Guru
  - Tipe penilaian
- ✅ Rekap nilai per siswa dan jadwal

### 📊 Dashboard Admin
- ✅ Ringkasan statistik:
  - Total Guru
  - Total Siswa
  - Total Kelas
  - Jadwal hari ini
  - Total absensi hari ini
  - Total nilai yang belum diinput
- ✅ Aktivitas terbaru dengan timeline
- ✅ Akses cepat ke semua fitur manajemen
- ✅ Visualisasi data dengan kartu statistik
- ✅ Indikator warna untuk status dan kategori

### 📊 Dashboard Guru
- ✅ Profil guru dengan status dan mata pelajaran
- ✅ Daftar kelas yang diampu (Guru Pembimbing)
- ✅ Daftar kelas yang diajar (Guru Biasa)
- ✅ Jadwal bimbingan hari ini dan mendatang
- ✅ Daftar siswa per kelas dengan statistik
- ✅ Aksi cepat:
  - Input absensi
  - Input nilai
  - Lihat laporan
  - Buat jadwal baru
- ✅ Statistik mengajar (total siswa, total jadwal)

### 📊 Dashboard Siswa
- ✅ Profil siswa dengan kelas dan wali kelas
- ✅ Jadwal bimbingan hari ini dan mendatang
- ✅ Status kehadiran untuk setiap jadwal
- ✅ Rekap nilai uji kompetensi lengkap
- ✅ Statistik pribadi:
  - Total jadwal bulan ini
  - Total absensi
  - Rata-rata nilai
- ✅ Visualisasi data dengan tabel dan kartu

## 🏗️ Teknologi

### Frontend Stack
- **Framework**: Next.js 15.5 dengan App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks (useState, useEffect)
- **Type Safety**: TypeScript 5.3
- **Icons**: Lucide React (via shadcn/ui)

### Backend Stack
- **API Routes**: Next.js API Routes (Server Actions)
- **ORM**: Prisma ORM 5.22
- **Database**: MySQL 8.0+
- **Authentication**: NextAuth v5 (beta)
- **Validation**: Server-side validation

### Database Schema
- **Relational Database**: MySQL dengan relasi foreign key
- **Normalization**: Schema ternormalisasi (3NF)
- **Indexes**: Index pada kolom yang sering dicari
- **Constraints**: Foreign key dan unique constraints

### Security Features
- **Password Hashing**: bcryptjs (implementasi production)
- **Session Management**: JWT token via NextAuth
- **CSRF Protection**: Bawaan dari NextAuth
- **SQL Injection Prevention**: Prisma ORM
- **Input Validation**: Server-side validation
- **Rate Limiting**: Ready untuk implementasi
- **HTTPS/SSL**: Ready untuk production deployment

## 📁 Struktur Project

```
my-project/
├── prisma/
│   ├── schema.prisma          # Database schema (MySQL)
│   ├── seed.ts                # Seed data sample (users, teachers, students, classes, schedules, attendance, grades)
│   └── test-connection.ts    # Database connection test
├── src/
│   ├── app/
│   │   ├── page.tsx              # Login page (/)
│   │   ├── layout.tsx            # Root layout dengan SessionProvider
│   │   ├── globals.css            # Global styles
│   │   └── dashboard/
│   │       ├── admin/            # Admin dashboard (/dashboard/admin)
│   │       ├── guru/             # Guru dashboard (/dashboard/guru)
│   │       └── siswa/            # Siswa dashboard (/dashboard/siswa)
│   │       └── api/               # API Routes
│   │           ├── auth/
│   │           │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │           │   └── session/route.ts          # Session API
│   │           ├── guru/route.ts                 # Guru CRUD API
│   │           ├── siswa/route.ts               # Siswa CRUD API
│   │           ├── kelas/route.ts               # Kelas CRUD API
│   │           ├── jadwal/route.ts             # Jadwal CRUD API
│   │           ├── absensi/route.ts            # Absensi API
│   │           └── nilai/route.ts              # Nilai API
│   ├── components/
│   │   ├── auth-provider.tsx      # NextAuth Session Provider
│   │   └── ui/                 # shadcn/ui components (buttons, cards, tables, etc.)
│   ├── lib/
│   │   ├── db.ts                 # Prisma client singleton
│   │   ├── auth.ts               # NextAuth configuration
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   └── next-auth.d.ts       # TypeScript definitions for NextAuth
│   ├── hooks/
│   │   ├── use-mobile.ts         # Mobile responsive hook
│   │   └── use-toast.ts         # Toast notification hook
│   └── app/
│       └── api/route.ts         # Catch-all API route
├── public/
│   ├── logo.svg                 # Logo aplikasi
│   └── robots.txt               # SEO robots.txt
├── .env.example                # Environment variables template
├── .env                       # Environment variables (gitignored)
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── README.md                  # Project documentation
```

## 🗄️ Entitas Database

### Users (Tabel User)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole      // ADMIN, GURU, SISWA
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Teachers (Tabel Guru)
```prisma
model Teacher {
  id              String        @id @default(cuid())
  userId          String        @unique  // FK ke User
  nip             String        @unique  // Nomor Induk Pegawai
  name            String
  email           String?
  phone           String?
  status          GuruStatus   // GURU_BIASA, GURU_PEMBIMBING, KEDUANYA
  subject         String?       // Mata pelajaran
  mentoredClasses Class[]      @relation("MentorTeacher")
  classes        Class[]      @relation("RegularTeacher")
  schedules      Schedule[]
  attendances    Attendance[]
  grades         Grade[]
}
```

### Students (Tabel Siswa)
```prisma
model Student {
  id          String   @id @default(cuid())
  userId      String   @unique  // FK ke User
  nis         String   @unique  // Nomor Induk Siswa
  name        String
  email       String?
  phone       String?
  classId     String?  // FK ke Kelas
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user       User     @relation(fields: [userId])
  class      Class?    @relation(fields: [classId])
  attendances Attendance[]
  grades     Grade[]
  mentorings  Mentoring[]
}
```

### Classes (Tabel Kelas)
```prisma
model Class {
  id                String   @id @default(cuid())
  name              String   @unique
  grade             String   // X, XI, XII
  academicYear      String   // Tahun ajaran
  mentorTeacherId   String?  // FK ke Teacher (Guru Pembimbing)
  regularTeacherId  String?  // FK ke Teacher (Guru Biasa)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  mentorTeacher   Teacher  @relation("MentorTeacher", fields: [mentorTeacherId])
  regularTeacher  Teacher  @relation("RegularTeacher", fields: [regularTeacherId])
  students          Student[]  @relation
  schedules        Schedule[]
}
```

### Schedules (Tabel Jadwal)
```prisma
model Schedule {
  id          String   @id @default(cuid())
  title       String
  date        DateTime // Tanggal jadwal
  startTime   DateTime // Waktu mulai
  endTime     DateTime // Waktu selesai
  location    String?   // Lokasi (opsional)
  description String?   // Deskripsi (opsional)
  teacherId   String   // FK ke Teacher
  classId     String   // FK ke Kelas
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  teacher     Teacher     @relation(fields: [teacherId])
  class       Class       @relation(fields: [classId])
  attendances Attendance[]
  grades      Grade[]
}
```

### Attendance (Tabel Absensi)
```prisma
model Attendance {
  id          String   @id @default(cuid())
  scheduleId   String   // FK ke Schedule
  studentId   String   // FK ke Student
  teacherId   String   // FK ke Teacher
  status      AttendanceStatus   // HADIR, SAKIT, IZIN, ALPA
  notes       String?   // Catatan (opsional)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  schedule    Schedule  @relation(fields: [scheduleId])
  student     Student     @relation(fields: [studentId])
  teacher     Teacher     @relation(fields: [teacherId])

  @@unique([scheduleId, studentId])  // Satu absensi per siswa per jadwal
}
```

### Grades (Tabel Nilai)
```prisma
model Grade {
  id             String   @id @default(cuid())
  scheduleId     String   // FK ke Schedule
  studentId      String   // FK ke Student
  teacherId      String   // FK ke Teacher
  score          Float    // Nilai (0-100)
  remarks        String?   // Catatan (opsional)
  assessmentType String?   // Tipe penilaian (opsional)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  schedule       Schedule  @relation(fields: [scheduleId])
  student        Student     @relation(fields: [studentId])
  teacher        Teacher     @relation(fields: [teacherId])

  @@unique([scheduleId, studentId])  // Satu nilai per siswa per jadwal
}
```

## 🔌 API Endpoints

### Autentikasi
| Method | Endpoint | Deskripsi |
|---------|-----------|------------|
| GET | `/api/auth/session` | Mendapatkan session saat ini |
| POST | `/api/auth/[...nextauth]` | Handle login/logout (NextAuth) |

### Master Data
| Method | Endpoint | Deskripsi | Parameters |
|---------|-----------|------------|------------|
| GET | `/api/guru` | List semua guru (paginasi) | page, limit, search |
| POST | `/api/guru` | Buat guru baru | nip, name, email, phone, status, subject, password |
| GET | `/api/siswa` | List semua siswa (paginasi) | page, limit, search, classId |
| POST | `/api/siswa` | Buat siswa baru | nis, name, email, phone, classId, password |
| GET | `/api/kelas` | List semua kelas (paginasi) | page, limit, search |
| POST | `/api/kelas` | Buat kelas baru | name, grade, academicYear, mentorTeacherId, regularTeacherId |

### Operasional
| Method | Endpoint | Deskripsi | Parameters |
|---------|-----------|------------|------------|
| GET | `/api/jadwal` | List semua jadwal (filter) | page, limit, search, teacherId, classId, date |
| POST | `/api/jadwal` | Buat jadwal baru | title, date, startTime, endTime, location, description, teacherId, classId |
| GET | `/api/absensi` | List absensi (filter) | page, limit, scheduleId, studentId, status |
| POST | `/api/absensi` | Catat/update absensi | scheduleId, studentId, teacherId, status, notes |
| GET | `/api/nilai` | List semua nilai (filter) | page, limit, scheduleId, studentId |
| POST | `/api/nilai` | Input/update nilai | scheduleId, studentId, teacherId, score, remarks, assessmentType |

## 📱 Pages & Routing

| Route | Deskripsi | Akses |
|--------|-----------|--------|
| `/` | Login page | Semua user (tanpa session) |
| `/dashboard/admin` | Dashboard Admin | Hanya Admin |
| `/dashboard/guru` | Dashboard Guru | Hanya Guru |
| `/dashboard/siswa` | Dashboard Siswa | Hanya Siswa |

## 👤 Akun Demo

### Admin
- **Email**: `admin@sekolah.sch.id`
- **Password**: `admin123`
- **Role**: ADMIN
- **Fitur**: Akses penuh ke semua manajemen

### Guru (Guru Pembimbing)
- **Email**: `guru@sekolah.sch.id`
- **Password**: `guru123`
- **NIP**: `198501012005112001`
- **Nama**: Budi Santoso, S.Pd
- **Status**: Guru Pembimbing
- **Mata Pelajaran**: Matematika
- **Kelas Dibimbing**: Kelas X A, XI A, XII IPA 1

### Siswa (Ahmad Rizky)
- **Email**: `siswa1@sekolah.sch.id`
- **Password**: `siswa123`
- **NIS**: `2024001`
- **Nama**: Ahmad Rizky, S.Kom
- **Kelas**: XII IPA 1
- **Wali Kelas**: Bapak Santoso

## 🚀 Cara Mulai

### 1. Setup Database MySQL
```bash
mysql -u root -p
CREATE DATABASE manajemen_uji_kompetensi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Install Dependencies
```bash
npm install next-auth@beta @prisma/client bcryptjs @prisma/adapter-mysql
npm install -D prisma
npm install -D @types/bcryptjs
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env dengan kredensial database Anda
```

### 4. Setup Prisma
```bash
npx prisma generate
npx prisma db push
```

### 5. Seed Database
```bash
npx tsx prisma/seed.ts
```

### 6. Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

## 📊 Data Sample

Setelah seeding, database akan berisi:

- **5 Users**: 1 Admin, 1 Guru, 3 Siswa
- **2 Teachers**: 1 Guru Pembimbing, 1 Guru Biasa
- **3 Students**: 3 siswa dengan assignment kelas
- **3 Classes**: Kelas X A, XI A, XII IPA 1
- **3 Schedules**: 3 jadwal untuk hari ini (Persiapan, Latihan, Review)
- **9 Attendance Records**: 9 absensi untuk 3 jadwal
- **6 Grades**: 6 nilai untuk uji kompetensi dan latihan

## 🎨 Fitur UI/UX

### Design Modern
- Tailwind CSS untuk styling
- shadcn/ui components untuk UI
- Gradient background
- Shadow cards untuk depth
- Hover effects untuk interaksi
- Responsive design untuk mobile

### User Experience
- Loading states untuk semua operasi
- Error messages yang jelas
- Success feedback untuk aksi
- Navigation yang intuitif
- Search dan filter yang cepat

### Accessibility
- Semantic HTML tags
- ARIA labels
- Keyboard navigation support
- Color contrast yang baik
- Screen reader friendly

## 🔐 Keamanan

### Implementasi
- ✅ Password hashing dengan bcryptjs
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Session management (NextAuth JWT)
- ✅ CSRF protection (NextAuth)
- ✅ Input validation (server-side)
- ✅ Role-based access control

### Best Practices
- Gunakan HTTPS di production
- Set `NEXTAUTH_SECRET` dengan random string yang kuat
- Validasi semua input di server
- Rate limiting untuk API endpoints
- Database backups secara regular
- Log semua error untuk monitoring

## 📈 Skalabilitas

### Horizontal Scaling
- Stateless API routes
- Database connection pooling (Prisma)
- Caching (ready untuk implementasi)
- Load balancing (ready untuk implementasi)

### Vertical Scaling
- Pagination untuk data yang besar
- Lazy loading untuk komponen
- Virtual scrolling untuk list yang panjang
- Optimistic updates untuk better UX

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Platform
- Vercel (recommended untuk Next.js)
- Railway (database hosting)
- AWS EC2 (full control)
- DigitalOcean (affordable)

## 📚 Lisensi & Kontribusi

### Lisensi
- MIT License
- Bebas untuk penggunaan komersial dan pribadi

### Kontribusi
- Pull requests welcome
- Issue reports appreciated
- Follow code style guidelines

## 🎉 Ringkasan

Sistem Manajemen Uji Kompetensi Keahlian ini adalah solusi lengkap untuk pendidikan vokasi Indonesia dengan fitur-fitur modern:

✅ **Autentikasi Multi-Role**: Login untuk Admin, Guru, dan Siswa
✅ **Manajemen Master Data**: CRUD lengkap untuk Guru, Siswa, dan Kelas
✅ **Jadwal Bimbingan**: Manajemen jadwal dengan filter dan status
✅ **Absensi Siswa**: Pencatatan absensi dengan 4 status dan catatan
✅ **Penilaian**: Input nilai uji kompetensi dengan berbagai tipe penilaian
✅ **Dashboard Spesifik**: Dashboard terpisah untuk setiap peran dengan statistik
✅ **MySQL Database**: Relational database dengan schema ternormalisasi
✅ **TypeScript**: Type safety untuk aplikasi yang skalabel
✅ **Next.js 15**: Framework modern dengan App Router dan Server Actions
✅ **Responsive Design**: Tailwind CSS + shadcn/ui components
✅ **Security**: Password hashing, SQL injection prevention, session management

Aplikasi ini siap untuk digunakan dalam lingkungan pendidikan vokasi untuk mengelola uji kompetensi keahlian dengan efisien dan profesional.

---

**Dibuat dengan ❤️ untuk pendidikan Indonesia**
