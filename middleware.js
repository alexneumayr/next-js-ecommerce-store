// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // If no token is found, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token.role !== 'admin') {
    return NextResponse.redirect(new URL('/no-access', req.url));
  }

  // If everything checks out, proceed
  return NextResponse.next();
}

// Specify the routes that require the middleware
export const config = {
  matcher: ['/admin/:path*'],
};
