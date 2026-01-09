import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Mulai seeding database...')

  // Create Users
  console.log('👤 Creating users...')

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sekolah.sch.id' },
    update: {},
    create: {
      email: 'admin@sekolah.sch.id',
      password: await hash('admin123', 10),
      name: 'Administrator',
      role: 'ADMIN'
    }
  })

  const guruUser = await prisma.user.upsert({
    where: { email: 'guru@sekolah.sch.id' },
    update: {},
    create: {
      email: 'guru@sekolah.sch.id',
      password: await hash('guru123', 10),
      name: 'Guru Pembimbing',
      role: 'GURU'
    }
  })

  // Create multiple student users and store their IDs
  const siswaUsers: { [key: string]: string } = {}
  const siswaEmails = [
    'siswa1@sekolah.sch.id',
    'siswa2@sekolah.sch.id',
    'siswa3@sekolah.sch.id',
  ]

  for (const email of siswaEmails) {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: await hash('siswa123', 10),
        name: email.split('@')[0].toUpperCase(),
        role: 'SISWA'
      }
    })
    siswaUsers[email] = user.id
  }

  console.log('✅ Users created')

  // Create Teachers
  console.log('👨‍🏫 Creating teachers...')

  const guruPembimbing = await prisma.teacher.upsert({
    where: { nip: '198501012005112001' },
    update: {},
    create: {
      userId: guruUser.id,
      nip: '198501012005112001',
      name: 'Budi Santoso',
      email: 'guru@sekolah.sch.id',
      phone: '081234567890',
      status: 'GURU_PEMBIMBING',
      subject: 'Matematika'
    }
  })

  const guruRegular1 = await prisma.teacher.upsert({
    where: { nip: '198602032004123456' },
    update: {},
    create: {
      userId: (await prisma.user.create({
        data: {
          email: 'siti@sekolah.sch.id',
          password: await hash('guru123', 10),
          name: 'Siti Rahayu',
          role: 'GURU'
        }
      })).id,
      nip: '198602032004123456',
      name: 'Siti Rahayu',
      email: 'siti@sekolah.sch.id',
      phone: '081234567891',
      status: 'GURU_BIASA',
      subject: 'Bahasa Indonesia'
    }
  })

  console.log('✅ Teachers created')

  // Create Students
  console.log('👨‍🎓 Creating students...')

  const siswa1 = await prisma.student.upsert({
    where: { nis: '2024001' },
    update: {},
    create: {
      userId: siswaUsers['siswa1@sekolah.sch.id'],
      nis: '2024001',
      name: 'Ahmad Rizky',
      email: 'siswa1@sekolah.sch.id',
      phone: '081234567892',
      classId: null
    }
  })

  const siswa2 = await prisma.student.upsert({
    where: { nis: '2024002' },
    update: {},
    create: {
      userId: siswaUsers['siswa2@sekolah.sch.id'],
      nis: '2024002',
      name: 'Dewi Sartika',
      email: 'siswa2@sekolah.sch.id',
      phone: '081234567893',
      classId: null
    }
  })

  const siswa3 = await prisma.student.upsert({
    where: { nis: '2024003' },
    update: {},
    create: {
      userId: siswaUsers['siswa3@sekolah.sch.id'],
      nis: '2024003',
      name: 'Eko Pratama',
      email: 'siswa3@sekolah.sch.id',
      phone: '081234567894',
      classId: null
    }
  })

  console.log('✅ Students created')

  // Create Classes
  console.log('🏫 Creating classes...')

  const kelasXA = await prisma.class.upsert({
    where: { name: 'Kelas X A' },
    update: {},
    create: {
      name: 'Kelas X A',
      grade: 'X',
      academicYear: '2024',
      mentorTeacherId: guruPembimbing.id,
      regularTeacherId: guruRegular1.id
    }
  })

  const kelasXIA = await prisma.class.upsert({
    where: { name: 'Kelas XI A' },
    update: {},
    create: {
      name: 'Kelas XI A',
      grade: 'XI',
      academicYear: '2024',
      mentorTeacherId: guruPembimbing.id,
      regularTeacherId: guruRegular1.id
    }
  })

  const kelasXIIIPA = await prisma.class.upsert({
    where: { name: 'Kelas XII IPA' },
    update: {},
    create: {
      name: 'Kelas XII IPA',
      grade: 'XII',
      academicYear: '2024',
      mentorTeacherId: guruPembimbing.id,
      regularTeacherId: guruRegular1.id
    }
  })

  // Update students with class assignments
  await prisma.student.update({
    where: { id: siswa1.id },
    data: { classId: kelasXIIIPA.id }
  })

  await prisma.student.update({
    where: { id: siswa2.id },
    data: { classId: kelasXIA.id }
  })

  await prisma.student.update({
    where: { id: siswa3.id },
    data: { classId: kelasXA.id }
  })

  console.log('✅ Classes created and students assigned')

  // Create Schedules
  console.log('📅 Creating schedules...')

  const today = new Date()

  const jadwal1 = await prisma.schedule.create({
    data: {
      title: 'Persiapan Uji Kompetensi',
      date: today,
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0, 0),
      location: 'Ruang 301',
      description: 'Uji kompetensi untuk kelas X A',
      teacherId: guruPembimbing.id
    }
  })

  const jadwal2 = await prisma.schedule.create({
    data: {
      title: 'Latihan Soal',
      date: today,
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0, 0),
      location: 'Ruang 301',
      description: 'Latihan soal untuk kelas XI A',
      teacherId: guruPembimbing.id
    }
  })

  const jadwal3 = await prisma.schedule.create({
    data: {
      title: 'Review Materi',
      date: today,
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0, 0, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0, 0, 0),
      location: 'Lab Komputer',
      description: 'Review materi untuk kelas XII IPA',
      teacherId: guruPembimbing.id
    }
  })

  console.log('✅ Schedules created')

  // Update schedules with class IDs
  await prisma.schedule.update({
    where: { id: jadwal1.id },
    data: { classId: kelasXA.id }
  })

  await prisma.schedule.update({
    where: { id: jadwal2.id },
    data: { classId: kelasXIA.id }
  })

  await prisma.schedule.update({
    where: { id: jadwal3.id },
    data: { classId: kelasXIIIPA.id }
  })

  // Create Attendance Records
  console.log('📊 Creating attendance records...')

  // Attendance for Class X A (Persiapan)
  const attendance1 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa1.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa1.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  const attendance2 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa2.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa2.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  const attendance3 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa3.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa3.id,
      teacherId: guruPembimbing.id,
      status: 'SAKIT',
      notes: 'Sakit - berobat'
    }
  })

  // Attendance for Class XI A (Latihan Soal)
  const attendance4 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa1.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa1.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  const attendance5 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa2.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa2.id,
      teacherId: guruPembimbing.id,
      status: 'IZIN',
      notes: 'Izin - ada urusan keluarga'
    }
  })

  const attendance6 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa3.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa3.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  // Attendance for Class XII IPA (Review Materi)
  const attendance7 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal3.id,
        studentId: siswa1.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal3.id,
      studentId: siswa1.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  const attendance8 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal3.id,
        studentId: siswa2.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal3.id,
      studentId: siswa2.id,
      teacherId: guruPembimbing.id,
      status: 'HADIR',
      notes: 'Hadir tepat waktu'
    }
  })

  const attendance9 = await prisma.attendance.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal3.id,
        studentId: siswa3.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal3.id,
      studentId: siswa3.id,
      teacherId: guruPembimbing.id,
      status: 'ALPA',
      notes: 'Tidak hadir - sedang rapat keluarga'
    }
  })

  console.log('✅ Attendance records created')

  // Create Grades
  console.log('📝 Creating grades...')

  // Grades for Persiapan (Schedule 1)
  const grade1 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa1.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa1.id,
      teacherId: guruPembimbing.id,
      score: 85.0,
      remarks: 'Kompeten di semua aspek',
      assessmentType: 'Persiapan Uji Kompetensi'
    }
  })

  const grade2 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa2.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa2.id,
      teacherId: guruPembimbing.id,
      score: 78.0,
      remarks: 'Butuh peningkatan pada materi algoritma',
      assessmentType: 'Persiapan Uji Kompetensi'
    }
  })

  const grade3 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal1.id,
        studentId: siswa3.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal1.id,
      studentId: siswa3.id,
      teacherId: guruPembimbing.id,
      score: 92.0,
      remarks: 'Sangat baik dalam pengerjaan',
      assessmentType: 'Persiapan Uji Kompetensi'
    }
  })

  // Grades for Latihan Soal (Schedule 2)
  const grade4 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa1.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa1.id,
      teacherId: guruPembimbing.id,
      score: 80.0,
      remarks: 'Pengerjaan cukup baik',
      assessmentType: 'Latihan Soal'
    }
  })

  const grade5 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa2.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa2.id,
      teacherId: guruPembimbing.id,
      score: 75.0,
      remarks: 'Perlu latihan lebih',
      assessmentType: 'Latihan Soal'
    }
  })

  const grade6 = await prisma.grade.upsert({
    where: {
      scheduleId_studentId: {
        scheduleId: jadwal2.id,
        studentId: siswa3.id
      }
    },
    update: {},
    create: {
      scheduleId: jadwal2.id,
      studentId: siswa3.id,
      teacherId: guruPembimbing.id,
      score: 85.0,
      remarks: 'Pengerjaan memuaskan',
      assessmentType: 'Latihan Soal'
    }
  })

  console.log('✅ Grades created')

  console.log('🎉 Seeding database selesai!')
  console.log('\n📊 Ringkasan Data:')
  console.log(`- Users: 5 (1 Admin, 1 Guru, 3 Siswa)`)
  console.log(`- Teachers: 2 (1 Guru Pembimbing, 1 Guru Biasa)`)
  console.log(`- Students: 3 (Ahmad Rizky, Dewi Sartika, Eko Pratama)`)
  console.log(`- Classes: 3 (Kelas X A, XI A, XII IPA)`)
  console.log(`- Schedules: 3 (Persiapan, Latihan Soal, Review Materi)`)
  console.log(`- Attendance Records: 9`)
  console.log(`- Grades: 6`)
  console.log('\n🔐 Akun Demo:')
  console.log('Admin: admin@sekolah.sch.id / admin123')
  console.log('Guru: guru@sekolah.sch.id / guru123')
  console.log('Siswa: siswa1@sekolah.sch.id, siswa2@sekolah.sch.id, siswa3@sekolah.sch.id / siswa123')
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
