import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET /api/bookings/[id] - جزئیات یک رزرو
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            title: true,
            slug: true,
            startDate: true,
            endDate: true,
            city: true,
            venue: true,
            address: true,
            featuredImage: true,
            organizerName: true,
            organizerPhone: true,
            organizerEmail: true,
          },
        },
        payment: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // TODO: Check if user owns this booking
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.id !== booking.userId) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error('GET /api/bookings/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - کنسل کردن رزرو
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        event: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // TODO: Check if user owns this booking
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.id !== booking.userId) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    // Check if can be cancelled
    if (booking.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'رزرو تکمیل شده قابل کنسل نیست' },
        { status: 400 }
      )
    }

    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { success: false, error: 'رزرو قبلاً کنسل شده است' },
        { status: 400 }
      )
    }

    // Cancel booking with transaction
    await prisma.$transaction(async (tx) => {
      // Update booking status
      await tx.booking.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
        },
      })

      // Return available spots
      if (booking.event.availableSpots !== null) {
        await tx.event.update({
          where: { id: booking.eventId },
          data: {
            availableSpots: { increment: booking.totalParticipants },
          },
        })
      }

      // Update booking count
      await tx.event.update({
        where: { id: booking.eventId },
        data: {
          bookingCount: { decrement: 1 },
        },
      })
    })

    return NextResponse.json({
      success: true,
      message: 'رزرو با موفقیت کنسل شد',
    })
  } catch (error) {
    console.error('DELETE /api/bookings/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}

// PATCH /api/bookings/[id] - بروزرسانی رزرو
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // TODO: Check if user owns this booking
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.id !== booking.userId) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    // Only allow updating certain fields
    const allowedFields = [
      'phone',
      'email',
      'specialRequests',
      'notes',
    ]

    const updateData: any = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: updatedBooking,
    })
  } catch (error) {
    console.error('PATCH /api/bookings/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}
