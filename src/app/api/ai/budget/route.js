import { NextResponse } from 'next/server';
import { optimizeBudget } from '@/lib/ai';

export async function POST(request) {
  try {
    const tripDetails = await request.json();

    if (!tripDetails.destination || !tripDetails.duration) {
      return NextResponse.json(
        { error: 'Destination and duration are required' },
        { status: 400 }
      );
    }

    const optimization = await optimizeBudget(tripDetails);

    if (!optimization) {
      return NextResponse.json(
        { error: 'Failed to optimize budget' },
        { status: 500 }
      );
    }

    return NextResponse.json({ optimization });
  } catch (error) {
    console.error('AI budget API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
