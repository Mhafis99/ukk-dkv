import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const scheduleId = searchParams.get('scheduleId') || ''
  const studentId = searchParams.get('studentId') || ''

  const where: any = {}
  if (scheduleId) {
    where.scheduleId = scheduleId
  }
  if (studentId) {
    where.studentId = studentId
  }

  const [grades, total] = await Promise.all([
    db.grade.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            nis: true
          }
        },
        teacher: {
          select: {
            id: true,
            name: true,
            nip: true
          }
        },
        schedule: {
          select: {
            id: true,
            title: true,
            date: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    db.grade.count({ where })
  ])

  return NextResponse.json({
    grades,
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
    const { scheduleId, studentId, teacherId, score, remarks, assessmentType } = body

    // Check if grade already exists
    const existing = await db.grade.findFirst({
      where: {
        scheduleId_studentId: {
          scheduleId,
          studentId
        }
      }
    })

    if (existing) {
      // Update existing grade
      const grade = await db.grade.update({
        where: { id: existing.id },
        data: {
          score: parseFloat(score),
          remarks,
          assessmentType
        }
      })

      return NextResponse.json(grade)
    } else {
      // Create new grade
      const grade = await db.grade.create({
        data: {
          scheduleId,
          studentId,
          teacherId,
          score: parseFloat(score),
          remarks,
          assessmentType
        }
      })

      return NextResponse.json(grade, { status: 201 })
    }
  } catch (error) {
    console.error('Error managing grades:', error)
    return NextResponse.json(
      { error: 'Gagal menginput nilai' },
      { status: 500 }
    )
  }
}
