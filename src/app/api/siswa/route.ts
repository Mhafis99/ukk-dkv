import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''
  const classId = searchParams.get('classId') || ''

  const where: any = {}
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { nis: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (classId) {
    where.classId = classId
  }

  const [students, total] = await Promise.all([
    db.student.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        class: {
          select: {
            id: true,
            name: true,
            grade: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    db.student.count({ where })
  ])

  return NextResponse.json({
    students,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nis, name, email, phone, classId, password } = body

    // Create user first
    const user = await db.user.create({
      data: {
        email,
        password, // In production, hash this with bcrypt
        name,
        role: 'SISWA'
      }
    })

    // Create student profile
    const student = await db.student.create({
      data: {
        userId: user.id,
        nis,
        name,
        email,
        phone,
        classId: classId || null
      }
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Gagal membuat data siswa' },
      { status: 500 }
    )
  }
}
