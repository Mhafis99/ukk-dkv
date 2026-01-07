import { type Class } from '@prisma/client'

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'X':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    case 'XI':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'XII':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'HADIR':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'SAKIT':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    case 'IZIN':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    case 'ALPA':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    case 'GURU_BIASA':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    case 'GURU_PEMBIMBING':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case 'HADIR':
      return 'Hadir'
    case 'SAKIT':
      return 'Sakit'
    case 'IZIN':
      return 'Izin'
    case 'ALPA':
      return 'Tidak Hadir'
    case 'GURU_BIASA':
      return 'Guru Biasa'
    case 'GURU_PEMBIMBING':
      return 'Guru Pembimbing'
    default:
      return status
  }
}

export function getTeacherStatusText(status: string): string {
  switch (status) {
    case 'GURU_BIASA':
      return 'Guru Biasa'
    case 'GURU_PEMBIMBING':
      return 'Guru Pembimbing'
    case 'KEDUANYA':
      return 'Non-aktif'
    default:
      return status
  }
}

export function calculateAttendanceRate(attendances: any[]): number {
  if (attendances.length === 0) return 0
  const present = attendances.filter((a: any) => a.status === 'HADIR').length
  return Math.round((present / attendances.length) * 100)
}

export function calculateAverageScore(grades: any[]): number {
  if (grades.length === 0) return 0
  const total = grades.reduce((sum: number, g: any) => sum + (g.score || 0), 0)
  return Math.round(total / grades.length)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function generateClassCode(grade: string, className: string): string {
  const gradeCode = grade.replace('X', '10').replace('XI', '11').replace('XII', '12')
  const classNameCode = className.replace(/\s+/g, '-').toLowerCase()
  return `${gradeCode}${classNameCode}`.toUpperCase()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateNIP(nip: string): boolean {
  const nipRegex = /^\d{18}$/
  return nipRegex.test(nip)
}

export function validateNIS(nis: string): boolean {
  const nisRegex = /^\d{7}$/
  return nisRegex.test(nis)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^0[1-9]\d{9,11}$/
  return phoneRegex.test(phone)
}

export function validateScore(score: number): boolean {
  return score >= 0 && score <= 100
}

export function getAttendanceBadge(status: string): string {
  switch (status) {
    case 'HADIR':
      return '✅'
    case 'SAKIT':
      return '🤒'
    case 'IZIN':
      return '📝'
    case 'ALPA':
      return '❌'
    default:
      return ''
  }
}
