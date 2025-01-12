import { type NextRequest, NextResponse } from 'next/server'

import { createSession, getSession } from '@/auth'
import { ROUTES } from '@/constants'
import { googleOAuth2Client } from '@/lib/google'
import type { SessionType } from '@/types/auth'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = request.nextUrl
  const session = await getSession()

  if (!session) {
    requestUrl.pathname = ROUTES.api.auth.signOut
    return NextResponse.redirect(requestUrl)
  }

  try {
    const { origin, searchParams } = requestUrl
    const refreshToken = session.tokens.refresh_token

    googleOAuth2Client.setCredentials({ refresh_token: refreshToken })
    const { credentials } = await googleOAuth2Client.refreshAccessToken()

    if (!credentials) {
      requestUrl.pathname = ROUTES.api.auth.signOut
      return NextResponse.redirect(requestUrl)
    }

    await createSession({
      user: session.user,
      tokens: credentials as SessionType['tokens'],
    })

    const redirectUrl = searchParams.get('redirect_url') ?? origin
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Error refreshing tokens:', error)
    requestUrl.pathname = ROUTES.api.auth.signOut
    return NextResponse.redirect(requestUrl)
  }
}
