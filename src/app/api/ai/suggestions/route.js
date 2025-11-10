import { NextResponse } from 'next/server';
import { generateDestinationSuggestions, generateSearchSuggestions } from '@/lib/ai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, ...params } = body;

    let result;

    switch (type) {
      case 'destinations':
        result = await generateDestinationSuggestions(params);
        break;
      case 'search':
        result = await generateSearchSuggestions(params.query, params.context);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid suggestion type' },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to generate suggestions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ suggestions: result });
  } catch (error) {
    console.error('AI suggestions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
