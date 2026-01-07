import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''

  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { nip: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  } : {}

  const [teachers, total] = await Promise.all([
    db.teacher.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        mentoredClasses: {
          select: {
            id: true,
            name: true
          }
        },
        classes: {
          select: {
            id: true,
            name: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    db.teacher.count({ where })
  ])

  return NextResponse.json({
    teachers,
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
    const { nip, name, email, phone, status, subject, password } = body

    // Create user first
    const user = await db.user.create({
      data: {
        email,
        password, // In production, hash this with bcrypt
        name,
        role: 'GURU'
      }
    })

    // Create teacher profile
    const teacher = await db.teacher.create({
      data: {
        userId: user.id,
        nip,
        name,
        email,
        phone,
        status: status || 'GURU_BIASA',
        subject
      }
    })

    return NextResponse.json(teacher, { status: 201 })
  } catch (error) {
    console.error('Error creating teacher:', error)
    return NextResponse.json(
      { error: 'Gagal membuat data guru' },
      { status: 500 }
    )
  }
}
