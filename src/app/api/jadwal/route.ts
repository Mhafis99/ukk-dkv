import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const teacherId = searchParams.get('teacherId') || ''
  const classId = searchParams.get('classId') || ''
  const date = searchParams.get('date') || ''

  const where: any = {}
  if (teacherId) {
    where.teacherId = teacherId
  }
  if (classId) {
    where.classId = classId
  }
  if (date) {
    where.date = {
      gte: new Date(date),
      lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
    }
  }

  const [schedules, total] = await Promise.all([
    db.schedule.findMany({
      where,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            nip: true,
            status: true
          }
        },
        class: {
          select: {
            id: true,
            name: true
          }
        },
        attendances: {
          select: {
            id: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { date: 'asc' }
    }),
    db.schedule.count({ where })
  ])

  return NextResponse.json({
    schedules,
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
    const { title, date, startTime, endTime, location, description, teacherId, classId } = body

    const schedule = await db.schedule.create({
      data: {
        title,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        description,
        teacherId,
        classId
      }
    })

    return NextResponse.json(schedule, { status: 201 })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Gagal membuat jadwal' },
      { status: 500 }
    )
  }
}
