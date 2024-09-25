// src/middleware.ts
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const res = await fetch('http://localhost:8079/check-auth', {
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });

  if (res.status === 401) {
    return NextResponse.redirect(new URL('http://localhost:8079/auth/google/', req.url));
  }

  return NextResponse.next();
}

// Apply this middleware to the /register route
export const config = {
  matcher: ['/register'],
};
