import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        nameEn: true,
        slug: true,
        province: true,
        description: true,
        latitude: true,
        longitude: true,
        image: true,
        eventCount: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: cities,
    })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cities',
      },
      { status: 500 }
    )
  }
}
