import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/models/userModel';
import { getTokenFromRequest, verifyToken } from '@/lib/auth/jwtHelper';

export async function GET(req: NextRequest) {
  try {
    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Return unauthorized but don't crash the app
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection error, please try again later',
          error: 'database_connection_failed'
        },
        { status: 503 }
      );
    }
    
    // Get token from request
    const token = getTokenFromRequest(req);
    
    // If no token, return unauthorized
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized', error: 'no_token' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token', error: 'invalid_token' },
        { status: 401 }
      );
    }
    
    try {
      // Find user by ID
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found', error: 'user_not_found' },
          { status: 404 }
        );
      }
      
      // Return user data
      return NextResponse.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (userError) {
      console.error('Error finding user:', userError);
      return NextResponse.json(
        { success: false, message: 'Error fetching user data', error: 'database_query_failed' },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Error getting current user:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to get user',
        error: 'internal_error'
      },
      { status: 500 }
    );
  }
} 