'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email atau password salah')
      } else if (result?.ok) {
        // Fetch user session to get role
        const response = await fetch('/api/auth/session')
        const session = await response.json()

        // Redirect based on role
        switch (session?.user?.role) {
          case 'ADMIN':
            router.push('/dashboard/admin')
            break
          case 'GURU':
            router.push('/dashboard/guru')
            break
          case 'SISWA':
            router.push('/dashboard/siswa')
            break
          default:
            router.push('/dashboard/admin')
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">UK</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            Manajemen Uji Kompetensi Keahlian
          </CardTitle>
          <CardDescription>
            Masuk untuk mengelola sistem uji kompetensi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sekolah.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Akun Demo:</p>
            <div className="grid gap-2 text-xs">
              <div className="text-left">
                <span className="font-medium">Admin:</span> admin@sekolah.sch.id / admin123
              </div>
              <div className="text-left">
                <span className="font-medium">Guru:</span> guru@sekolah.sch.id / guru123
              </div>
              <div className="text-left">
                <span className="font-medium">Siswa:</span> siswa@sekolah.sch.id / siswa123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
