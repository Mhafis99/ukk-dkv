import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const scheduleId = searchParams.get('scheduleId') || ''
  const studentId = searchParams.get('studentId') || ''
  const status = searchParams.get('status') || ''

  const where: any = {}
  if (scheduleId) {
    where.scheduleId = scheduleId
  }
  if (studentId) {
    where.studentId = studentId
  }
  if (status) {
    where.status = status as any
  }

  const [attendances, total] = await Promise.all([
    db.attendance.findMany({
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
            name: true
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
    db.attendance.count({ where })
  ])

  return NextResponse.json({
    attendances,
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
    const { scheduleId, studentId, teacherId, status, notes } = body

    // Check if attendance already exists
    const existing = await db.attendance.findFirst({
      where: {
        scheduleId_studentId: {
          scheduleId,
          studentId
        }
      }
    })

    if (existing) {
      // Update existing attendance
      const attendance = await db.attendance.update({
        where: { id: existing.id },
        data: {
          status: status,
          notes
        }
      })

      return NextResponse.json(attendance)
    } else {
      // Create new attendance
      const attendance = await db.attendance.create({
        data: {
          scheduleId,
          studentId,
          teacherId,
          status,
          notes
        }
      })

      return NextResponse.json(attendance, { status: 201 })
    }
  } catch (error) {
    console.error('Error managing attendance:', error)
    return NextResponse.json(
      { error: 'Gagal mencatat absensi' },
      { status: 500 }
    )
  }
}
