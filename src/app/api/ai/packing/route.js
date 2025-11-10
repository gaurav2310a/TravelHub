import { NextResponse } from 'next/server';
import { generatePackingList } from '@/lib/ai';

export async function POST(request) {
  try {
    const tripDetails = await request.json();

    if (!tripDetails.destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      );
    }

    const packingList = await generatePackingList(tripDetails);

    if (!packingList) {
      return NextResponse.json(
        { error: 'Failed to generate packing list' },
        { status: 500 }
      );
    }

    return NextResponse.json({ packingList });
  } catch (error) {
    console.error('AI packing list API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
