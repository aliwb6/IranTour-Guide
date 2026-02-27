import { prisma } from '@/lib/prisma'

interface GetEventsParams {
  city?: string
  type?: string
  style?: string
  category?: string
  startDate?: string
  endDate?: string
  search?: string
  page?: number
  limit?: number
  status?: string
}

export async function getEvents(params: GetEventsParams = {}) {
  const {
    city,
    type,
    style,
    category,
    startDate,
    endDate,
    search,
    page = 1,
    limit = 12,
    status = 'APPROVED',
  } = params

  const where: Record<string, unknown> = {}

  if (status) where.status = status
  if (city) where.city = city
  if (type) where.type = type
  if (style) where.style = style
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { shortDescription: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
    ]
  }
  if (startDate || endDate) {
    where.startDate = {}
    if (startDate) (where.startDate as Record<string, unknown>).gte = new Date(startDate)
    if (endDate) (where.startDate as Record<string, unknown>).lte = new Date(endDate)
  }

  const skip = (page - 1) * limit

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        organization: {
          select: {
            id: true,
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
      orderBy: { startDate: 'asc' },
      skip,
      take: limit,
    }),
    prisma.event.count({ where }),
  ])

  return {
    events,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          isVerified: true,
          website: true,
          email: true,
          phone: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  })
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          isVerified: true,
          website: true,
          email: true,
          phone: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  })
}

export async function createEvent(data: Record<string, unknown>) {
  return prisma.event.create({
    data: {
      ...(data as any),
      status: 'PENDING',
    },
  })
}

export async function updateEvent(id: string, data: Record<string, unknown>) {
  return prisma.event.update({
    where: { id },
    data: data as any,
  })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({
    where: { id },
  })
}

export async function incrementViewCount(id: string) {
  return prisma.event.update({
    where: { id },
    data: {
      viewCount: { increment: 1 },
    },
  })
}

export async function getFeaturedEvents(limit = 8) {
  return prisma.event.findMany({
    where: { status: 'APPROVED' },
    orderBy: [{ viewCount: 'desc' }, { saveCount: 'desc' }],
    take: limit,
    include: {
      organization: {
        select: {
          id: true,
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
}

export async function getRelatedEvents(eventId: string, city: string, limit = 3) {
  return prisma.event.findMany({
    where: {
      status: 'APPROVED',
      city,
      id: { not: eventId },
    },
    take: limit,
    orderBy: { viewCount: 'desc' },
  })
}
