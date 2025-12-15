import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createReviewSchema = z.object({
  eventId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(100).optional(),
  comment: z.string().min(10).max(1000),
  pros: z.string().max(500).optional(),
  cons: z.string().max(500).optional(),
  images: z.array(z.string().url()).max(5).optional(),
})

// POST /api/reviews - ثبت نظر جدید
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createReviewSchema.parse(body)

    // TODO: Get userId from session
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }
    // const userId = session.user.id
    const userId = 'temp-user-id'

    // Check if user already reviewed this event
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: validatedData.eventId,
        },
      },
    })

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          error: 'شما قبلاً برای این رویداد نظر ثبت کرده‌اید',
        },
        { status: 400 }
      )
    }

    // Check if user has a confirmed booking for this event
    const booking = await prisma.booking.findFirst({
      where: {
        userId,
        eventId: validatedData.eventId,
        status: 'CONFIRMED',
      },
    })

    // Create review
    const review = await prisma.review.create({
      data: {
        userId,
        eventId: validatedData.eventId,
        rating: validatedData.rating,
        title: validatedData.title || null,
        comment: validatedData.comment,
        pros: validatedData.pros || null,
        cons: validatedData.cons || null,
        images: validatedData.images || [],
        isVerified: !!booking, // Verified if user has booking
        bookingId: booking?.id || null,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: review,
        message: 'نظر شما ثبت شد و پس از بررسی نمایش داده خواهد شد',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/reviews error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'اطلاعات وارد شده صحیح نیست',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'خطا در ثبت نظر' },
      { status: 500 }
    )
  }
}

// GET /api/reviews?eventId=xxx - نظرات یک رویداد
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'eventId is required' },
        { status: 400 }
      )
    }

    const reviews = await prisma.review.findMany({
      where: {
        eventId,
        isApproved: true,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' }, // Pinned reviews first
        { createdAt: 'desc' },
      ],
    })

    // Calculate average rating and stats
    const totalReviews = reviews.length
    const avgRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0

    // Rating distribution
    const ratingDistribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    }

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        stats: {
          total: totalReviews,
          averageRating: Number(avgRating.toFixed(1)),
          verifiedCount: reviews.filter((r) => r.isVerified).length,
          ratingDistribution,
        },
      },
    })
  } catch (error) {
    console.error('GET /api/reviews error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
