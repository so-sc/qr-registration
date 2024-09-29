import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Extract cookies from the request
  console.log(req.headers)
  console.log(req)

  // Fetch the check-auth endpoint, passing the cookies explicitly
  const res = await fetch('https://devhostapi.sosc.org.in/check-auth', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('cookie') || '',
    },
    credentials: 'include',
});

  const userData = await res.json();
  console.log('Auth Response:', userData);

  // Handle authentication status
  if (res.status === 401) {
    // Redirect to Google authentication if not authenticated
    // return NextResponse.redirect(new URL('https://devhostapi.sosc.org.in/auth/google/', req.url));
    console.log("Auth Failed..redir to login")
  } else {
    // If authenticated and trying to access /register but the user has college data, redirect to /events
    if (userData.user?.college && req.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/events', req.url));
    }
  }

  // Allow request to proceed if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/events','/edit', '/register'],runtime: 'nodejs',
};
