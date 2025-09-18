import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Temporarily disable CSP to test if it's causing the prefetch issues
  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Clone request headers to inject the nonce for Next.js to pick up
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    {
      // Match all paths except for specific Next.js internals and common assets
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};