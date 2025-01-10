'use server'

import { redirect } from 'next/navigation'

import { createSession, getSession } from '@/auth'
import { ROUTES } from '@/constants'
import { googleOAuth2Client } from '@/lib/google'
import type { SessionType } from '@/types'

export async function refreshToken() {
  const session = await getSession()
  if (!session) return redirect(ROUTES.api.auth.signOut)

  try {
    const refreshToken = session.tokens.refresh_token
    googleOAuth2Client.setCredentials({ refresh_token: refreshToken })

    const { credentials } = await googleOAuth2Client.refreshAccessToken()
    if (!credentials) return redirect(ROUTES.api.auth.signOut)

    await createSession({
      user: session.user,
      tokens: credentials as SessionType['tokens'],
    })
  } catch (error) {
    console.error('Error refreshing tokens:', error)
    return redirect(ROUTES.api.auth.signOut)
  }
}
