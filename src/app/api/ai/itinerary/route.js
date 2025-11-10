import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/ai';

export async function POST(request) {
  try {
    const { destination, duration, interests, budget } = await request.json();

    if (!destination || !duration) {
      return NextResponse.json(
        { error: 'Destination and duration are required' },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(destination, duration, interests, budget);

    if (!itinerary) {
      return NextResponse.json(
        { error: 'Failed to generate itinerary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('AI itinerary API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
