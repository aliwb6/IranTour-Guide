import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/events - لیست رویدادها با فیلتر
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query params
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const style = searchParams.get('style')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const search = searchParams.get('search')
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '12')
    const sortBy = searchParams.get('sortBy') || 'startDate' // startDate, viewCount, basePrice
    const sortOrder = searchParams.get('sortOrder') || 'asc' // asc, desc

    // Build where clause
    const where: any = {
      status: 'APPROVED',
      isBookable: true,
    }

    if (city && city !== 'همه شهرها') where.city = city
    if (type && type !== 'همه') where.type = type
    if (style) where.style = style

    if (startDate || endDate) {
      where.startDate = {}
      if (startDate) where.startDate.gte = new Date(startDate)
      if (endDate) where.startDate.lte = new Date(endDate)
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Count total
    const total = await prisma.event.count({ where })

    // Fetch events
    const events = await prisma.event.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        city: true,
        type: true,
        style: true,
        startDate: true,
        endDate: true,
        dateRangeText: true,
        shortDescription: true,
        featuredImage: true,
        basePrice: true,
        currency: true,
        availableSpots: true,
        maxCapacity: true,
        viewCount: true,
        bookingCount: true,
        isBookable: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/events error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - ایجاد رویداد جدید (فقط برای ADMIN/ORGANIZER)
export async function POST(request: NextRequest) {
  try {
    // TODO: Check authentication & authorization
    // const session = await getServerSession(authOptions)
    // if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'ORGANIZER')) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()

    // Validate with Zod
    const eventSchema = z.object({
      title: z.string().min(5).max(200),
      slug: z.string().min(3).max(200),
      style: z.enum([
        'EXHIBITION',
        'FESTIVAL',
        'CONFERENCE',
        'RELIGIOUS',
        'TOURISM',
        'SPORTS',
        'EDUCATIONAL',
        'OTHER',
      ]),
      type: z.enum([
        'NATIONAL',
        'RELIGIOUS',
        'ECONOMIC',
        'ARTISTIC',
        'SCIENTIFIC',
        'TOURISM',
        'SPORTS',
      ]),
      fixedOrVariable: z.enum(['FIXED', 'VARIABLE']),
      city: z.string().min(2),
      venue: z.string().min(3),
      address: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      dateRangeText: z.string(),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      basePrice: z.number().optional(),
      maxCapacity: z.number().optional(),
      shortDescription: z.string().min(50).max(500),
      description: z.string().min(100),
      opportunities: z.string().optional(),
      challenges: z.string().optional(),
      featuredImage: z.string().optional(),
      images: z.array(z.string()).optional(),
      organizerName: z.string().optional(),
      organizerEmail: z.string().email().optional(),
      organizerPhone: z.string().optional(),
      website: z.string().url().optional(),
      keywords: z.array(z.string()).optional(),
    })

    const validatedData = eventSchema.parse(body)

    // Create event
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        availableSpots: validatedData.maxCapacity,
        images: validatedData.images || [],
        keywords: validatedData.keywords || [],
      },
    })

    return NextResponse.json(
      { success: true, data: event },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/events error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
