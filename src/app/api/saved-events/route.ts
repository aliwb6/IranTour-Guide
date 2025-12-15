import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/saved-events - ذخیره/حذف رویداد (Toggle)
export async function POST(request: NextRequest) {
  try {
    const { eventSlug } = await request.json()

    if (!eventSlug) {
      return NextResponse.json(
        { success: false, error: 'eventSlug is required' },
        { status: 400 }
      )
    }

    // TODO: Get userId from session
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }
    // const userId = session.user.id
    const userId = 'temp-user-id'

    // Get event to validate and get eventId
    const event = await prisma.event.findUnique({
      where: { slug: eventSlug },
      select: { id: true, title: true },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'رویداد یافت نشد' },
        { status: 404 }
      )
    }

    // Check if already saved
    const existing = await prisma.savedEvent.findUnique({
      where: {
        userId_eventSlug: {
          userId,
          eventSlug,
        },
      },
    })

    if (existing) {
      // Remove if already saved (toggle behavior)
      await prisma.$transaction(async (tx) => {
        await tx.savedEvent.delete({
          where: { id: existing.id },
        })

        // Decrement save count
        await tx.event.update({
          where: { id: event.id },
          data: { saveCount: { decrement: 1 } },
        })
      })

      return NextResponse.json({
        success: true,
        message: 'رویداد از لیست ذخیره شده‌ها حذف شد',
        saved: false,
      })
    }

    // Save event
    await prisma.$transaction(async (tx) => {
      await tx.savedEvent.create({
        data: {
          userId,
          eventId: event.id,
          eventSlug,
        },
      })

      // Increment save count
      await tx.event.update({
        where: { id: event.id },
        data: { saveCount: { increment: 1 } },
      })
    })

    return NextResponse.json({
      success: true,
      message: 'رویداد ذخیره شد',
      saved: true,
    })
  } catch (error) {
    console.error('POST /api/saved-events error:', error)
    return NextResponse.json(
      { success: false, error: 'خطا در ذخیره رویداد' },
      { status: 500 }
    )
  }
}

// GET /api/saved-events - لیست رویدادهای ذخیره شده
export async function GET() {
  try {
    // TODO: Get userId from session
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }
    // const userId = session.user.id
    const userId = 'temp-user-id'

    const savedEvents = await prisma.savedEvent.findMany({
      where: { userId },
      orderBy: { savedAt: 'desc' },
    })

    // Fetch events separately
    const eventIds = savedEvents.map((se) => se.eventId)
    const events = await prisma.event.findMany({
      where: { id: { in: eventIds } },
      select: {
        id: true,
        title: true,
        slug: true,
        city: true,
        type: true,
        style: true,
        startDate: true,
        endDate: true,
        featuredImage: true,
        basePrice: true,
        currency: true,
        shortDescription: true,
        isBookable: true,
        availableSpots: true,
      },
    })

    // Merge with savedAt
    const eventsWithSavedAt = savedEvents.map((se) => {
      const event = events.find((e) => e.id === se.eventId)
      return {
        ...event,
        savedAt: se.savedAt,
      }
    })

    return NextResponse.json({
      success: true,
      data: eventsWithSavedAt,
    })
  } catch (error) {
    console.error('GET /api/saved-events error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch saved events' },
      { status: 500 }
    )
  }
}

// GET /api/saved-events/check?eventSlug=xxx - بررسی وضعیت ذخیره
export async function HEAD(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventSlug = searchParams.get('eventSlug')

    if (!eventSlug) {
      return NextResponse.json(
        { success: false, error: 'eventSlug is required' },
        { status: 400 }
      )
    }

    // TODO: Get userId from session
    const userId = 'temp-user-id'

    const savedEvent = await prisma.savedEvent.findUnique({
      where: {
        userId_eventSlug: {
          userId,
          eventSlug,
        },
      },
    })

    return NextResponse.json({
      success: true,
      saved: !!savedEvent,
    })
  } catch (error) {
    console.error('HEAD /api/saved-events error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check saved status' },
      { status: 500 }
    )
  }
}
