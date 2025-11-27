import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET /api/reviews - Get reviews for a tour
export async function GET(request: NextRequest) {
  try {
    const tourId = request.nextUrl.searchParams.get('tourId');
    // TODO: Implement get reviews
    return NextResponse.json({ reviews: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement review creation
    return NextResponse.json({ message: 'Review created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
