import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { status: 'APPROVED' },
      orderBy: [{ viewCount: 'desc' }, { saveCount: 'desc' }],
      take: 8,
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

    return NextResponse.json({
      data: events,
      error: null,
      meta: { total: events.length },
    })
  } catch (error) {
    console.error('Error fetching featured events:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch featured events', meta: null },
      { status: 500 }
    )
  }
}
