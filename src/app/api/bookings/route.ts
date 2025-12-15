import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createBookingSchema } from '@/lib/validators/booking'
import {
  generateBookingCode,
  calculateExpiryTime,
  calculateTotalPrice,
  canBook,
} from '@/lib/utils/booking'

// POST /api/bookings - ایجاد رزرو جدید
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const validatedData = createBookingSchema.parse(body)

    // Get event
    const event = await prisma.event.findUnique({
      where: { id: validatedData.eventId },
      select: {
        id: true,
        title: true,
        startDate: true,
        basePrice: true,
        currency: true,
        availableSpots: true,
        maxCapacity: true,
        isBookable: true,
        status: true,
      },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'رویداد یافت نشد' },
        { status: 404 }
      )
    }

    // Check if bookable
    if (!event.isBookable || event.status !== 'APPROVED') {
      return NextResponse.json(
        { success: false, error: 'امکان رزرو این رویداد وجود ندارد' },
        { status: 400 }
      )
    }

    // Calculate total participants
    const totalParticipants =
      validatedData.numberOfAdults + (validatedData.numberOfChildren || 0)

    // Check availability
    if (!canBook(event.availableSpots, totalParticipants)) {
      return NextResponse.json(
        {
          success: false,
          error: `ظرفیت کافی وجود ندارد. ظرفیت باقیمانده: ${event.availableSpots || 0}`,
        },
        { status: 400 }
      )
    }

    // Calculate pricing
    const pricePerPerson = event.basePrice || 0
    const childrenPrice = validatedData.childrenPrice || pricePerPerson * 0.5 // Default: 50% for children
    const discount = validatedData.discount || 0

    const pricing = calculateTotalPrice(
      pricePerPerson,
      validatedData.numberOfAdults,
      validatedData.numberOfChildren || 0,
      childrenPrice,
      discount
    )

    // TODO: Get userId from session
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }
    // const userId = session.user.id
    const userId = 'temp-user-id' // موقتاً از یک userId استاتیک استفاده می‌کنیم

    // Generate booking code
    const bookingCode = generateBookingCode()

    // Create booking with transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Create booking
      const newBooking = await tx.booking.create({
        data: {
          bookingCode,
          userId,
          eventId: validatedData.eventId,
          eventTitle: event.title,
          eventDate: event.startDate,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          nationalId: validatedData.nationalId || null,
          numberOfAdults: validatedData.numberOfAdults,
          numberOfChildren: validatedData.numberOfChildren || 0,
          totalParticipants,
          specialRequests: validatedData.specialRequests || null,
          pricePerPerson,
          childrenPrice,
          totalPrice: pricing.totalPrice,
          discount: pricing.discount,
          finalPrice: pricing.finalPrice,
          expiresAt: calculateExpiryTime(15), // 15 minutes
        },
        include: {
          event: {
            select: {
              title: true,
              startDate: true,
              city: true,
              venue: true,
              featuredImage: true,
            },
          },
        },
      })

      // Update available spots
      if (event.availableSpots !== null) {
        await tx.event.update({
          where: { id: validatedData.eventId },
          data: {
            availableSpots: { decrement: totalParticipants },
          },
        })
      }

      return newBooking
    })

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'رزرو با موفقیت ثبت شد. لطفاً ظرف 15 دقیقه پرداخت کنید.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/bookings error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'اطلاعات وارد شده صحیح نیست',
          details: error,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'خطا در ثبت رزرو' },
      { status: 500 }
    )
  }
}

// GET /api/bookings - لیست رزروهای کاربر
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }
    // const userId = session.user.id
    const userId = 'temp-user-id'

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            title: true,
            slug: true,
            startDate: true,
            city: true,
            featuredImage: true,
          },
        },
        payment: {
          select: {
            status: true,
            amount: true,
            paidAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    console.error('GET /api/bookings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
