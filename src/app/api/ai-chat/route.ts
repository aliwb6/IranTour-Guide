import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai-chat - AI chatbot for tour recommendations
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // TODO: Implement AI chat with context about Iranian tours
    return NextResponse.json({ reply: 'AI response here' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
