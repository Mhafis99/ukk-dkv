import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''

  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' } }
    ]
  } : {}

  const [classes, total] = await Promise.all([
    db.class.findMany({
      where,
      include: {
        mentorTeacher: {
          select: {
            id: true,
            name: true,
            nip: true
          }
        },
        regularTeacher: {
          select: {
            id: true,
            name: true,
            nip: true
          }
        },
        students: {
          select: {
            id: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    db.class.count({ where })
  ])

  return NextResponse.json({
    classes,
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
    const { name, grade, academicYear, mentorTeacherId, regularTeacherId } = body

    const classData = await db.class.create({
      data: {
        name,
        grade,
        academicYear,
        mentorTeacherId: mentorTeacherId || null,
        regularTeacherId: regularTeacherId || null
      }
    })

    return NextResponse.json(classData, { status: 201 })
  } catch (error) {
    console.error('Error creating class:', error)
    return NextResponse.json(
      { error: 'Gagal membuat data kelas' },
      { status: 500 }
    )
  }
}
