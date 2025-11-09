import { NextResponse } from 'next/server';
import { getCommentsByTripId, addComment } from '@/lib/communityTrips';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');

    if (!tripId) {
      return NextResponse.json({ error: 'Trip ID required' }, { status: 400 });
    }

    const comments = getCommentsByTripId(tripId);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { tripId, userId, content } = await request.json();
    
    if (!tripId || !userId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = addComment(tripId, userId, content);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
