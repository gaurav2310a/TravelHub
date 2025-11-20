import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user storage
let users = [];

export async function POST(request) {
  try {
    const userData = await request.json();

    // Validate required fields
    if (!userData.email || !userData.password || !userData.name || !userData.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      profilePhoto: userData.profilePhoto || `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
      role: userData.role || 'Traveler',
      location: userData.location,
      bio: userData.bio || '',
      interests: userData.interests || [],
      languagesSpoken: userData.languagesSpoken || ['English'],
      joinedDate: new Date().toISOString(),
      verified: false,
      tripsCount: 0,
      followersCount: 0,
      followingCount: 0
    };

    // Add to users array
    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
