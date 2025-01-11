import { google } from 'googleapis'
import { NextResponse } from 'next/server'

import { superChatAdapter } from '@/adapters'
import { getSession } from '@/auth'
import { ROUTES } from '@/constants'
import { wait } from '@/helpers'
import { googleOAuth2Client } from '@/lib/google'
import type { SuperChatType } from '@/types'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.redirect(ROUTES.api.auth.signOut)

  googleOAuth2Client.setCredentials(session.tokens)
  const youtube = google.youtube({ version: 'v3', auth: googleOAuth2Client })

  try {
    let tries = 0
    let firstResult
    let superchats: SuperChatType[] = []
    let nextPageToken: string = ''

    do {
      const result = await youtube.superChatEvents.list({ part: ['snippet'], pageToken: nextPageToken })

      if (result.status !== 200) return NextResponse.json({ error: 'Requisição falhou' })

      if (tries <= 0) firstResult = result.data
      tries++

      const items = result.data.items ?? []
      if (items.length <= 0) break

      superchats = superchats.concat(items.map(superChatAdapter))
      nextPageToken = result.data.nextPageToken ?? ''

      await wait(250)
    } while (nextPageToken)

    return NextResponse.json({ firstResult, superchats })
  } catch (error) {
    return NextResponse.json(error)
  }
}
