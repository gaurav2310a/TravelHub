import { NextResponse } from 'next/server';
import { generateTravelTips } from '@/lib/ai';

export async function POST(request) {
  try {
    const { destination, travelDates, travelers } = await request.json();

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      );
    }

    const tips = await generateTravelTips(destination, travelDates, travelers);

    if (!tips) {
      return NextResponse.json(
        { error: 'Failed to generate travel tips' },
        { status: 500 }
      );
    }

    return NextResponse.json({ tips });
  } catch (error) {
    console.error('AI tips API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
