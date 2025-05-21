import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { IUser } from '../models/userModel';

// Make sure to use a secure fallback if JWT_SECRET is not defined
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';
const SECRET = new TextEncoder().encode(JWT_SECRET);

type TokenPayload = {
  id: string;
  role: string;
};

export const generateToken = async (user: IUser): Promise<string> => {
  try {
    return await new SignJWT({ id: user._id.toString(), role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt() // Add issued at time
      .setExpirationTime('7d')
      .sign(SECRET);
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  // Basic validation before attempting verification
  if (!token || token === 'undefined' || token === 'null' || typeof token !== 'string') {
    console.log('Invalid token format provided to verifyToken');
    return null;
  }
  
  // Additional validation for token format
  if (!token.includes('.') || token.split('.').length !== 3) {
    console.log('Token does not have valid JWT format');
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      maxTokenAge: '7d' // Add additional verification parameter
    });
    
    // Ensure payload has required fields
    if (!payload || typeof payload !== 'object' || !payload.id || !payload.role) {
      console.error('Token payload missing required fields');
      return null;
    }
    
    return {
      id: String(payload.id),
      role: String(payload.role)
    };
  } catch (error: any) {
    // More detailed error logging to help diagnose issues
    if (error.code === 'ERR_JWS_INVALID') {
      console.error('Invalid JWT signature');
    } else if (error.code === 'ERR_JWT_EXPIRED') {
      console.error('Token expired');
    } else {
      console.error('Token verification error:', error);
    }
    return null;
  }
};

export const setTokenCookie = (res: NextResponse, token: string) => {
  // Ensure the cookie is properly set
  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
  
  return res;
};

// This function is called from server components/api routes
export const getTokenFromCookies = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token || token === 'undefined' || token === 'null') {
      return null;
    }
    return token;
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return null;
  }
};

export const getTokenFromRequest = (req: NextRequest): string | null => {
  let token: string | null = null;
  
  // Check Authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Check cookies if no token in header
  if (!token) {
    token = req.cookies.get('token')?.value || null;
  }
  
  // Validate token format
  if (token === 'undefined' || token === 'null' || !token || typeof token !== 'string') {
    return null;
  }
  
  // Additional basic validation before returning
  if (!token.includes('.') || token.split('.').length !== 3) {
    return null;
  }
  
  return token;
};

export const getUserFromToken = async (token: string | null): Promise<TokenPayload | null> => {
  if (!token) return null;
  return await verifyToken(token);
}; 