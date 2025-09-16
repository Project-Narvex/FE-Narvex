import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== 'production';

  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build CSP header following Next.js guidelines with nonces
  // In dev, allow extra sources for HMR and eval; in prod, be strict
  const cspHeader = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    script-src 'self' ${isDev ? "'unsafe-eval'" : ''} 'nonce-${nonce}' 'strict-dynamic' ${isDev ? 'http: https: ws: wss:' : ''};
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com ${isDev ? 'http: https:' : ''};
    font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
    connect-src 'self' ${isDev ? 'http: https: ws: wss:' : ''};
  `.replace(/\s{2,}/g, ' ').trim();

  // Clone request headers to inject the nonce for Next.js to pick up
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Also set the CSP on the response (some browsers rely on this)
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      // Match all paths except for specific Next.js internals and common assets,
      // and ignore prefetch requests to avoid unnecessary Middleware execution
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};