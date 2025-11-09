import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user database - In production, use a real database
const users = [
  {
    id: 1,
    name: 'Rahul Kapoor',
    email: 'rahul.kapoor@example.com',
    password: '$2a$10$XqwSfKz.KJxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', // hashed_password
    profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'traveler',
    location: 'Mumbai, India',
    bio: 'Adventure seeker and food enthusiast',
    interests: ['Backpacking', 'Photography', 'Food'],
    languagesSpoken: ['English', 'Hindi'],
    verified: true
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: '$2a$10$XqwSfKz.KJxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx',
    profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'traveler',
    location: 'Delhi, India',
    bio: 'Solo traveler exploring the world',
    interests: ['Solo Travel', 'Culture', 'History'],
    languagesSpoken: ['English', 'Hindi', 'Spanish'],
    verified: true
  }
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For demo purposes, accept any password
    // In production, use: const isValid = await bcrypt.compare(password, user.password);
    const isValid = true;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
