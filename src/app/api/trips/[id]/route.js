import { NextResponse } from 'next/server';
import { getTripById, likeTrip, joinTrip } from '@/lib/communityTrips';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const trip = getTripById(id);
    
    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, userId } = body;

    if (action === 'like') {
      const trip = likeTrip(id);
      return NextResponse.json(trip);
    }

    if (action === 'join') {
      const trip = joinTrip(id, userId);
      return NextResponse.json(trip);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
