import { NextResponse } from 'next/server';
import { getUserById } from '@/lib/community';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = getUserById(id);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
