// Note: This middleware requires NextAuth to be configured
// Uncomment and configure when NextAuth is set up

/*
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const isProfilePage = request.nextUrl.pathname.startsWith('/profile')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  // Redirect to signin if accessing profile without authentication
  if (isProfilePage && !token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  // Redirect to profile if accessing auth pages while authenticated
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*', '/organizations/dashboard/:path*']
}
*/

// Temporary: No authentication middleware until NextAuth is configured
// All profile pages will work without authentication for development
export function middleware() {
  // Pass through all requests
  return
}

export const config = {
  matcher: []
}
