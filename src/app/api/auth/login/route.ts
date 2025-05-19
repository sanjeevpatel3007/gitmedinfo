import { NextResponse } from 'next/server';
import { generateToken, setTokenCookie } from '@/lib/auth/jwtHelper';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/models/userModel';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }
    
    // Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log('User authenticated successfully:', user.email, 'Role:', user.role);
    
    // Generate token
    const token = generateToken(user);
    
    // Prepare response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
    // Set token cookie
    setTokenCookie(response, token);
    
    return response;
    
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Login failed',
      },
      { status: 500 }
    );
  }
} 