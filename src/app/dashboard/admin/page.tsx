import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'ADMIN') {
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
                <h1 className="text-xl font-bold">Dashboard Admin</h1>
                <p className="text-sm text-muted-foreground">
                  Manajemen Uji Kompetensi Keahlian
                </p>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">{session.user?.name}</span> | Admin
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 py-3 text-sm">
            <a href="#master-data" className="hover:text-foreground/80 transition-colors">
              Data Master
            </a>
            <a href="#guru" className="hover:text-foreground/80 transition-colors">
              Guru
            </a>
            <a href="#siswa" className="hover:text-foreground/80 transition-colors">
              Siswa
            </a>
            <a href="#kelas" className="hover:text-foreground/80 transition-colors">
              Kelas
            </a>
            <a href="#jadwal" className="hover:text-foreground/80 transition-colors">
              Jadwal Bimbingan
            </a>
            <a href="#absensi" className="hover:text-foreground/80 transition-colors">
              Absensi
            </a>
            <a href="#nilai" className="hover:text-foreground/80 transition-colors">
              Nilai
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Guru</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="text-4xl text-muted-foreground/50">👨‍🏫</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Siswa</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <div className="text-4xl text-muted-foreground/50">👨‍🎓</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Kelas</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="text-4xl text-muted-foreground/50">🏫</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Jadwal Hari Ini</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="text-4xl text-muted-foreground/50">📅</div>
              </div>
            </div>
          </div>

          {/* Master Data Section */}
          <section id="master-data" className="space-y-4">
            <h2 className="text-2xl font-bold">Data Master</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="text-5xl">👨‍🏫</div>
                  <h3 className="text-xl font-bold">Manajemen Guru</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelola data guru, status (Guru Biasa/Pembimbing), dan mata pelajaran
                  </p>
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors">
                    Kelola Guru
                  </button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="text-5xl">👨‍🎓</div>
                  <h3 className="text-xl font-bold">Manajemen Siswa</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelola data siswa, kelas, dan informasi akademik
                  </p>
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors">
                    Kelola Siswa
                  </button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="text-5xl">🏫</div>
                  <h3 className="text-xl font-bold">Manajemen Kelas</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelola data kelas, guru pembimbing, dan guru regular
                  </p>
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors">
                    Kelola Kelas
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Aktivitas Terbaru</h2>
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">Absensi tercatat - Bimbingan Kelas X</p>
                      <p className="text-sm text-muted-foreground">23 siswa hadir, 2 izin, 1 sakit</p>
                      <p className="text-xs text-muted-foreground mt-1">2 menit yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">Nilai bimbingan diinput - Kelas XII A</p>
                      <p className="text-sm text-muted-foreground">Guru Budi Santoso menginput nilai 25 siswa</p>
                      <p className="text-xs text-muted-foreground mt-1">15 menit yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">Guru baru ditambahkan</p>
                      <p className="text-sm text-muted-foreground">Guru Siti Rahayu bergabung sebagai guru pembimbing</p>
                      <p className="text-xs text-muted-foreground mt-1">1 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">Jadwal bimbingan dibuat</p>
                      <p className="text-sm text-muted-foreground">Jadwal untuk uji kompetensi minggu depan</p>
                      <p className="text-xs text-muted-foreground mt-1">3 jam yang lalu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sistem Manajemen Uji Kompetensi Keahlian</p>
            <p className="mt-1">Dibangun dengan Next.js 15 dan MySQL</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
