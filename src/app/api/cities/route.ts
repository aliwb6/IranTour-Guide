import { NextResponse } from 'next/server'
import { CITIES } from '@/config/cities'

export async function GET() {
  try {
    const citiesWithCounts = CITIES.map((city) => ({
      ...city,
      eventCount: Math.floor(Math.random() * 50) + 5,
    }))

    return NextResponse.json({
      data: citiesWithCounts,
      error: null,
      meta: { total: citiesWithCounts.length },
    })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch cities', meta: null },
      { status: 500 }
    )
  }
}
