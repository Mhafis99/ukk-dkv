import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function SiswaDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'SISWA') {
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
                <h1 className="text-xl font-bold">Dashboard Siswa</h1>
                <p className="text-sm text-muted-foreground">
                  Sistem Informasi Uji Kompetensi
                </p>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">{session.user?.name}</span> | Siswa
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Student Info Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl">
                🎓
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Ahmad Rizky, S.Kom</h3>
                  <p className="text-sm text-muted-foreground">NIS: 2024001</p>
                  <p className="text-sm text-muted-foreground">Kelas: XII IPA 1</p>
                  <p className="text-sm text-muted-foreground">Wali Kelas: Bapak Santoso</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Status Siswa</p>
                      <p className="text-xs text-muted-foreground">Aktif</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Kelas Pembimbing</p>
                      <p className="text-xs text-muted-foreground">XII IPA 1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-sm text-muted-foreground">Jadwal Hari Ini</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm text-muted-foreground">Jumlah Jadwal Bulan Ini</p>
              <p className="text-3xl font-bold mt-1">8</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm text-muted-foreground">Total Absensi</p>
              <p className="text-3xl font-bold mt-1">24</p>
            </div>
          </div>

          {/* Today's Schedule */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Jadwal Hari Ini</h2>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="divide-y">
              <div className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-20">
                    <p className="text-lg font-bold">08:00</p>
                    <p className="text-sm text-muted-foreground">10:00</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Persiapan Uji Kompetensi</h3>
                    <p className="text-sm text-muted-foreground">Kelas XII IPA 1 • Ruang 301</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                        Hari Ini
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium">
                        Hadir
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-20">
                    <p className="text-lg font-bold">10:00</p>
                    <p className="text-sm text-muted-foreground">12:00</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Latihan Soal</h3>
                    <p className="text-sm text-muted-foreground">Kelas XII IPA 1 • Ruang 301</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-sm font-medium">
                        Hari Ini
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-20">
                    <p className="text-lg font-bold">13:00</p>
                    <p className="text-sm text-muted-foreground">15:00</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Review Materi</h3>
                    <p className="text-sm text-muted-foreground">Kelas XII IPA 1 • Lab Komputer</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-sm font-medium">
                        Hari Ini
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grades Overview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nilai Uji Kompetensi</h2>
          </div>
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="p-4 text-left font-semibold">Kompetensi</th>
                    <th className="p-4 text-center font-semibold">Nilai</th>
                    <th className="p-4 text-center font-semibold">Status</th>
                    <th className="p-4 text-center font-semibold">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">Matematika Dasar</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-green-600">85</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                        Kompeten
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">15 Jan 2024</td>
                  </tr>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">Algoritma & Struktur Data</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-blue-600">78</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-sm font-medium">
                        Sedang Dikembangkan
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">Basis Data</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-green-600">92</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                        Kompeten
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">20 Jan 2024</td>
                  </tr>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">Pemrograman Web</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-green-600">88</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
                        Kompeten
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">22 Jan 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
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
