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
  return await new SignJWT({ id: user._id.toString(), role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
};

export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  if (!token || token === 'undefined' || token === 'null') {
    console.log('Invalid token provided to verifyToken');
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (!payload.id || !payload.role) {
      console.error('Token payload missing required fields');
      return null;
    }
    return payload as unknown as TokenPayload;
  } catch (error) {
    console.error('Token verification error:', error);
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
  if (token === 'undefined' || token === 'null' || !token) {
    return null;
  }
  
  return token;
};

export const getUserFromToken = async (token: string | null): Promise<TokenPayload | null> => {
  if (!token) return null;
  return await verifyToken(token);
}; 