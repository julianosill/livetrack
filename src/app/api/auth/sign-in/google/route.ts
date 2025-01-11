import { type NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/auth'
import { AUTH_PARAMS, ROUTES } from '@/constants'
import { googleOAuth2Client } from '@/lib/google'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = request.nextUrl
  const session = await getSession()

  if (session) {
    requestUrl.pathname = ROUTES.home
    return NextResponse.redirect(requestUrl)
  }

  const redirectPath = requestUrl.searchParams.get(AUTH_PARAMS.redirectPath)

  const authUrl = googleOAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
    prompt: 'consent',
    state: redirectPath ? JSON.stringify({ [AUTH_PARAMS.redirectPath]: redirectPath }) : undefined,
  })

  return NextResponse.redirect(authUrl)
}
