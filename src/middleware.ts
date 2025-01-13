import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/auth'
import { AUTH_PARAMS, ROUTES } from '@/constants'

export async function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl
  const { pathname, searchParams } = requestUrl
  const hasRedirectPath = pathname !== '/'

  const session = await getSession()

  if (!session || !session.tokens.refresh_token) {
    requestUrl.pathname = ROUTES.api.auth.signOut
    if (hasRedirectPath) searchParams.set(AUTH_PARAMS.redirectPath, pathname)

    return NextResponse.redirect(requestUrl)
  }

  const refreshToken = session.tokens.refresh_token
  const tokenExpiryDate = session.tokens.expiry_date
  const isTokenExpired = tokenExpiryDate < Date.now()

  if (refreshToken && isTokenExpired) {
    requestUrl.pathname = ROUTES.api.auth.refreshToken
    if (hasRedirectPath) searchParams.set(AUTH_PARAMS.redirectPath, pathname)

    return NextResponse.redirect(requestUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (Auth routes)
     * - api/auth (Api auth routes)
     * - icons (public icon files)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!auth|api/auth|icons|_next/static|_next/image|favicon.ico).*)',
  ],
}
