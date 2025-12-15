import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// GET /api/events/[slug] - جزئیات یک رویداد
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    // Increment view count (در production باید throttle بشه)
    await prisma.event.update({
      where: { id: event.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('GET /api/events/[slug] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PUT /api/events/[slug] - بروزرسانی رویداد
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const body = await request.json()

    // TODO: Check auth & permissions
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const event = await prisma.event.update({
      where: { slug },
      data: body,
    })

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('PUT /api/events/[slug] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[slug] - حذف رویداد
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params

    // TODO: Check auth & permissions (only ADMIN)
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    await prisma.event.delete({
      where: { slug },
    })

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    console.error('DELETE /api/events/[slug] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
