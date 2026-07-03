import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'];
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // If accessing auth routes and already logged in, redirect to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If accessing protected routes without token, redirect to sign in
  if (!publicRoutes.some((route) => pathname.startsWith(route)) && !pathname.startsWith('/auth')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
