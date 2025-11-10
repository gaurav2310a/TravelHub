import { NextResponse } from 'next/server';
import { generateActivitySuggestions } from '@/lib/ai';

export async function POST(request) {
  try {
    const { destination, preferences } = await request.json();

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      );
    }

    const activities = await generateActivitySuggestions(destination, preferences || {});

    if (!activities) {
      return NextResponse.json(
        { error: 'Failed to generate activity suggestions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('AI activities API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
