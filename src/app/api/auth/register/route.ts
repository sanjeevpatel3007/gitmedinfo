import { NextResponse } from 'next/server';
import { generateToken, setTokenCookie } from '@/lib/auth/jwtHelper';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/models/userModel';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: 'user', // Default role
    });
    
    // Generate token
    const token = generateToken(user);
    
    // Prepare response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
    
    // Set token cookie
    setTokenCookie(response, token);
    
    return response;
    
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Registration failed',
      },
      { status: 500 }
    );
  }
} 