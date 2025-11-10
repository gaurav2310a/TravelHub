import { NextResponse } from 'next/server';
import { travelAssistant } from '@/lib/ai';

export async function POST(request) {
  try {
    const { question, conversationHistory } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const answer = await travelAssistant(question, conversationHistory);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI assistant API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
