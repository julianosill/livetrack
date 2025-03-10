import { NextRequest, NextResponse } from 'next/server'

import { AUTH_PARAMS, ROUTES } from '@/constants'

export async function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl
  const { pathname, searchParams } = requestUrl
  const hasRedirectPath = pathname !== '/' || ROUTES.api.auth.signOut

  const cookies = request.cookies
  const session = cookies.get('session')

  if (!session) {
    requestUrl.pathname = ROUTES.api.auth.signOut

    if (hasRedirectPath) {
      searchParams.set(AUTH_PARAMS.redirectPath, pathname)
    }

    return NextResponse.redirect(requestUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (Auth routes)
     * - docs (Docs routes)
     * - api/auth (Api auth routes)
     * - icons (public icon files)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!auth|docs|api/auth|icons|_next/static|_next/image|favicon.ico).*)',
  ],
}
