import { NextResponse } from 'next/server';

// In-memory store for rate limiting
// IMPORTANT: For production, especially with multiple server instances,
// use a distributed store like Redis instead of this in-memory solution.
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per IP per minute for API routes

export async function middleware(request) {
  const { ip } = request; // Next.js provides the IP address

  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Bypass for auth routes if they have different needs or are handled by NextAuth internally for some aspects
  // or if you want a more lenient limit for them. For now, we'll include them.
  // if (request.nextUrl.pathname.startsWith('/api/auth')) {
  //   return NextResponse.next();
  // }

  if (!ip) {
    // If IP is not available (e.g., during build or specific server setups),
    // you might want to allow the request or handle it differently.
    // For now, we'll allow it, but this should be reviewed for your specific deployment.
    console.warn('Rate limiting bypassed: IP address not found for a request to', request.nextUrl.pathname);
    return NextResponse.next();
  }

  const now = Date.now();
  const ipData = ipRequestCounts.get(ip) || { count: 0, windowStart: now };

  // Reset count if window has passed
  if (now - ipData.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipData.count = 0;
    ipData.windowStart = now;
  }

  ipData.count += 1;
  ipRequestCounts.set(ip, ipData);

  if (ipData.count > MAX_REQUESTS_PER_WINDOW) {
    console.warn(`Rate limit exceeded for IP: ${ip} on path: ${request.nextUrl.pathname}`);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Too Many Requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(RATE_LIMIT_WINDOW_MS / 1000).toString(), // Inform client how long to wait
        },
      }
    );
  }

  // Periodically clean up old entries from the map to prevent memory leaks
  // This is a simple cleanup; a more robust solution might use TTLs if supported by the store.
  if (ipRequestCounts.size > 10000) { // Arbitrary limit to trigger cleanup
    for (const [keyIp, data] of ipRequestCounts.entries()) {
      if (now - data.windowStart > RATE_LIMIT_WINDOW_MS * 2) { // Clean if older than 2 windows
        ipRequestCounts.delete(keyIp);
      }
    }
  }

  return NextResponse.next();
}

// Matcher to specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (the root path, if you want to exclude pages, not just API)
     * This ensures it primarily targets API routes and other server-side executed paths.
     * Adjust if you want to include/exclude pages.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
