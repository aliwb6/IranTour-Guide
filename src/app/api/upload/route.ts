import { NextRequest, NextResponse } from 'next/server';

// POST /api/upload - Upload images
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement file upload handling
    return NextResponse.json({ url: '' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
