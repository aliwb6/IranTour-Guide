import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, action, metadata } = body

    if (!action) {
      return NextResponse.json(
        { data: null, error: 'Action is required', meta: null },
        { status: 400 }
      )
    }

    console.log('Analytics event:', { eventId, action, metadata })

    return NextResponse.json({
      data: { success: true },
      error: null,
      meta: null,
    })
  } catch (error) {
    console.error('Error logging analytics:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to log analytics', meta: null },
      { status: 500 }
    )
  }
}
