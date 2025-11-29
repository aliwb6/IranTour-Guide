import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic';

// POST /api/ai-chat - AI chatbot for tour recommendations
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // TODO: Implement AI chat with context about Iranian tours
    return NextResponse.json({ reply: 'AI response here' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
