import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = request.cookies.has('auth_token'); // You'll need to set this cookie on login
  const isAuthPage = request.nextUrl.pathname === '/auth';

  if (!isAuthenticated && !isAuthPage) {
    // Redirect to auth page if not authenticated and not already on auth page
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isAuthenticated && isAuthPage) {
    // Redirect to home if authenticated and trying to access auth page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};