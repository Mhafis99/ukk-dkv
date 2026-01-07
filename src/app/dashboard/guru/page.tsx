import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function GuruDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user?.role !== 'GURU')) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">UK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Dashboard Guru</h1>
                <p className="text-sm text-muted-foreground">
                  Manajemen Uji Kompetensi Keahlian
                </p>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">{session.user?.name}</span> | Guru
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 py-3 text-sm">
            <a href="#kelas" className="hover:text-foreground/80 transition-colors">
              Kelas Saya
            </a>
            <a href="#jadwal" className="hover:text-foreground/80 transition-colors">
              Jadwal Bimbingan
            </a>
            <a href="#absensi" className="hover:text-foreground/80 transition-colors">
              Absensi
            </a>
            <a href="#nilai" className="hover:text-foreground/80 transition-colors">
              Nilai Siswa
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Teacher Info Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl">
                👨‍🏫
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-lg font-bold">Budi Santoso, S.Pd</h3>
                  <p className="text-sm text-muted-foreground">NIP: 198501012005112001</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Status: Guru Pembimbing
                  </span>
                  <span className="text-muted-foreground">
                    Mata Pelajaran: Matematika
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">🏫</div>
              <p className="text-sm text-muted-foreground">Kelas Dibimbing</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">👨‍🎓</div>
              <p className="text-sm text-muted-foreground">Total Siswa</p>
              <p className="text-3xl font-bold mt-1">78</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-sm text-muted-foreground">Jadwal Bulan Ini</p>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
          </div>

          {/* Classes Section */}
          <section id="kelas" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Kelas Saya</h2>
            </div>
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Kelas X A</h3>
                      <p className="text-sm text-muted-foreground">Matematika • 25 siswa</p>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                      Detail
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Kelas XI A</h3>
                      <p className="text-sm text-muted-foreground">Matematika • 28 siswa</p>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                      Detail
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Kelas XII IPA</h3>
                      <p className="text-sm text-muted-foreground">Matematika • 25 siswa</p>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Today's Schedule */}
          <section id="jadwal" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Jadwal Hari Ini</h2>
            </div>
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-l-green-500 p-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">08:00</p>
                      <p className="text-sm text-muted-foreground">10:00</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Bimbingan - Persiapan Uji Kompetensi</h3>
                      <p className="text-sm text-muted-foreground">Kelas X A • Ruang 301</p>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm">
                      Hari Ini
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-l-blue-500 p-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">10:00</p>
                      <p className="text-sm text-muted-foreground">12:00</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Bimbingan - Latihan Soal</h3>
                      <p className="text-sm text-muted-foreground">Kelas XI A • Ruang 301</p>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm">
                      Hari Ini
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border-l-4 border-l-purple-500 p-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">13:00</p>
                      <p className="text-sm text-muted-foreground">15:00</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Bimbingan - Review Materi</h3>
                      <p className="text-sm text-muted-foreground">Kelas XII IPA • Lab Komputer</p>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-sm">
                      Hari Ini
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="rounded-lg border bg-card p-6 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📋</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Input Absensi</h3>
                    <p className="text-sm text-muted-foreground">
                      Catat kehadiran siswa di kelas
                    </p>
                  </div>
                </div>
              </button>
              <button className="rounded-lg border bg-card p-6 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📝</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Input Nilai</h3>
                    <p className="text-sm text-muted-foreground">
                      Input nilai uji kompetensi siswa
                    </p>
                  </div>
                </div>
              </button>
              <button className="rounded-lg border bg-card p-6 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📊</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Lihat Laporan</h3>
                    <p className="text-sm text-muted-foreground">
                      Lihat rekap absensi dan nilai siswa
                    </p>
                  </div>
                </div>
              </button>
              <button className="rounded-lg border bg-card p-6 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📅</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Buat Jadwal</h3>
                    <p className="text-sm text-muted-foreground">
                      Jadwalkan bimbingan untuk siswa
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sistem Manajemen Uji Kompetensi Keahlian</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
