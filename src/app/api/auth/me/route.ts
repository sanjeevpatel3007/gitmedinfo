import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/models/userModel';
import { getTokenFromRequest, verifyToken } from '@/lib/auth/jwtHelper';

export async function GET(req: NextRequest) {
  try {
    // Get token from request
    const token = getTokenFromRequest(req);
    
    // If no token, return unauthorized early
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized', error: 'no_token' },
        { status: 401 }
      );
    }
    
    // Verify token before connecting to database to save resources
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      // Clear invalid token
      const response = NextResponse.json(
        { success: false, message: 'Invalid token', error: 'invalid_token' },
        { status: 401 }
      );
      response.cookies.delete('token');
      return response;
    }

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
    
    try {
      // Find user by ID using the decoded token payload
      const userId = decoded.id;
      const user = await User.findById(userId);
      
      if (!user) {
        // User not found but token was valid - clear the token
        const response = NextResponse.json(
          { success: false, message: 'User not found', error: 'user_not_found' },
          { status: 404 }
        );
        response.cookies.delete('token');
        return response;
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
    
    // Return appropriate error and clear token if it seems to be corrupted
    const response = NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to get user',
        error: 'internal_error'
      },
      { status: 500 }
    );
    
    if (error.code === 'ERR_JWS_INVALID') {
      response.cookies.delete('token');
    }
    
    return response;
  }
} 