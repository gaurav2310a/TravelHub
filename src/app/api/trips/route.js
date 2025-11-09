import { NextResponse } from 'next/server';
import { getCommunityFeed, COMMUNITY_TRIPS } from '@/lib/communityTrips';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      role: searchParams.get('role') || 'all',
      category: searchParams.get('category') || 'all',
      type: searchParams.get('type') || 'all',
      query: searchParams.get('query') || '',
      sortBy: searchParams.get('sortBy') || 'recent'
    };

    const trips = getCommunityFeed(filters);
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const tripData = await request.json();
    
    const newTrip = {
      ...tripData,
      id: `trip${Date.now()}`,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      currentParticipants: 1,
      joinRequests: []
    };

    COMMUNITY_TRIPS.push(newTrip);
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
