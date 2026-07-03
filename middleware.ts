import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'];
const authRoutes = ['/auth'];
const protectedRoutes = ['/dashboard', '/deals', '/documents', '/chat', '/notifications', '/parties', '/reports', '/settings', '/tasks', '/templates', '/help'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken')?.value;

  // If accessing protected routes without token, redirect to sign in
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !authToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If accessing auth routes and already logged in, redirect to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route)) && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
