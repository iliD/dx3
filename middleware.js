import { NextResponse } from 'next/server';

// Pages that are publicly accessible
const PUBLIC_PATHS = [
  '/',
  '/studio',
  '/api',
];

// Check if path starts with any of the public paths
function isPublicPath(pathname) {
  return PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Block all other paths during development
  return new NextResponse(
    '<html><body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif;"><div style="text-align: center;"><h1 style="font-size: 48px; margin: 0;">¯\\_(ツ)_/¯</h1><p style="margin-top: 20px; font-size: 18px; color: #666;">This page is under construction</p></div></body></html>',
    {
      status: 403,
      headers: {
        'content-type': 'text/html',
      },
    }
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
