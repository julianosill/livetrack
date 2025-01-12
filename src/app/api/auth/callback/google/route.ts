import { type NextRequest, NextResponse } from 'next/server'

import { createSession, getSession } from '@/auth'
import { AUTH_PARAMS, ROUTES } from '@/constants'
import { googleOAuth2, googleOAuth2Client } from '@/lib/google'
import type { GoogleAuthStateType, SessionType } from '@/types/auth'

export async function GET(request: NextRequest) {
  const requestUrl = request.nextUrl
  const session = await getSession()

  if (session) {
    requestUrl.pathname = ROUTES.home
    return NextResponse.redirect(requestUrl)
  }

  const { searchParams } = requestUrl
  const authCode = searchParams.get(AUTH_PARAMS.google.code)

  if (!authCode) {
    console.error('Authorization code is missing')
    requestUrl.pathname = ROUTES.api.auth.signOut
    return NextResponse.redirect(requestUrl)
  }

  try {
    const { tokens } = await googleOAuth2Client.getToken(authCode)
    googleOAuth2Client.setCredentials(tokens)
    const { data: userInfo } = await googleOAuth2.userinfo.get()

    const user = {
      id: userInfo.id ?? '',
      name: userInfo.name ?? '',
      email: userInfo.email ?? '',
      avatarUrl: userInfo.picture ?? '',
    }

    await createSession({ user, tokens: tokens as SessionType['tokens'] })

    const authState = searchParams.get(AUTH_PARAMS.google.state) ?? '{}'
    const parsedState = JSON.parse(authState) as GoogleAuthStateType
    const redirectPath = parsedState.redirect_path

    requestUrl.pathname = redirectPath ?? ROUTES.home
    requestUrl.search = ''

    return NextResponse.redirect(requestUrl)
  } catch (error) {
    console.error('Error exchanging code for tokens:', error)
    requestUrl.pathname = ROUTES.api.auth.signOut
    return NextResponse.redirect(requestUrl)
  }
}
