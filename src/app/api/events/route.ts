import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'  // ✅ این مسیر درسته

// GET /api/events - دریافت لیست رویدادها
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const style = searchParams.get('style')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const skip = (page - 1) * limit

    // ساخت شرط where
    const where: any = {
      status: 'APPROVED',
    }

    if (city) {
      where.city = city
    }

    if (type) {
      where.type = type
    }

    if (style) {
      where.style = style
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ]
    }

    // شمارش کل
    const total = await prisma.event.count({ where })

    // دریافت رویدادها
    const events = await prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        startDate: 'asc',
      },
      include: {
        organization: {
          select: {
            name: true,
            slug: true,
            logo: true,
            isVerified: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - ایجاد رویداد جدید
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // بررسی فیلدهای الزامی
    const requiredFields = [
      'title',
      'style',
      'type',
      'city',
      'venue',
      'dateRangeText',
      'startDate',
      'endDate',
      'shortDescription',
      'description',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // ساخت slug از عنوان
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')

    // ایجاد رویداد
    const event = await prisma.event.create({
      data: {
        title: body.title,
        slug: slug,
        style: body.style,
        type: body.type,
        fixedOrVariable: body.fixedOrVariable || 'FIXED',
        country: 'Iran',
        city: body.city,
        venue: body.venue,
        address: body.address || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        dateRangeText: body.dateRangeText,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        registrationDeadline: body.registrationDeadline
          ? new Date(body.registrationDeadline)
          : null,
        durationText: body.durationText || null,
        shortDescription: body.shortDescription,
        description: body.description,
        opportunities: body.opportunities || null,
        challenges: body.challenges || null,
        featuredImage: body.featuredImage || null,
        images: body.images || [],
        videoUrl: body.videoUrl || null,
        organizerName: body.organizerName || null,
        organizerEmail: body.organizerEmail || null,
        organizerPhone: body.organizerPhone || null,
        website: body.website || null,
        registrationUrl: body.registrationUrl || null,
        keywords: body.keywords || [],
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { event, message: 'Event created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}