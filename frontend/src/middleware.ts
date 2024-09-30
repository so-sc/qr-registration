import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  console.log(req.cookies)
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/check-auth`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'cookie': req.headers.get('cookie') || '',
    },
    credentials: 'include',
});

  const userData = await res.json();
  console.log('Auth Response:', userData);


  if (res.status === 401) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APIHOST}/auth/google/`, req.url));
    console.log("Auth Failed..redir to login")
  } else {
    if (userData.user?.college && req.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/events', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {

  matcher: [],
  //'/events','/edit', '/register'
};


//  matcher: ['/events','/register','/profile','/edit'],