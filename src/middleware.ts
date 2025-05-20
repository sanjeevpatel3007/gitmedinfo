import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from './lib/auth/jwtHelper';

export async function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request);
  const path = request.nextUrl.pathname;

  // Add console logs for debugging
  console.log(`Middleware processing path: ${path}`);
  console.log(`Auth token present: ${!!token}`);

  // Public paths - allow access
  if (
    path === '/' ||
    path.startsWith('/auth') ||
    path.startsWith('/api/auth') ||
    path.startsWith('/api/categories') || // Allow public access to categories API
    path.startsWith('/api/medicines') || // Allow public access to medicines API  
    path.startsWith('/medicines') ||
    path.startsWith('/categories') ||
    path.startsWith('/_next') ||
    path.includes('.') || // Allow access to static files
    // Skip middleware processing for admin routes - will be handled client-side
    path.startsWith('/admin')
  ) {
    console.log('Public path access granted');
    return NextResponse.next();
  }

  // Protected routes - check authentication
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      console.log('Invalid token, redirecting to login');
      // Clear the invalid token cookie
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    console.log(`User role: ${decoded.role}`);

    // Check admin access
    if (path.startsWith('/admin') && decoded.role !== 'admin') {
      console.log('Non-admin attempting to access admin route, redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }

    console.log('Access granted');
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification error:', error);
    // Clear the invalid token cookie
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /favicon.ico, /sitemap.xml (inside /public)
     * 5. All static files (those with extensions)
     */
    '/((?!api/auth|_next|fonts|favicon.ico).*)',
  ],
}; 