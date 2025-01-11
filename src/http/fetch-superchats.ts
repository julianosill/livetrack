'use server'

import { google } from 'googleapis'

import { superChatAdapter } from '@/adapters'
import { getSession } from '@/auth'
import { wait } from '@/helpers'
import { googleOAuth2Client } from '@/lib/google'
import type { SuperChatType } from '@/types'

interface FetchSuperChatsResult {
  success: boolean
  errorMessage?: string
  superchats?: SuperChatType[]
}

export async function fetchSuperchats(): Promise<FetchSuperChatsResult> {
  const session = await getSession()
  if (!session) return { success: false }

  googleOAuth2Client.setCredentials(session.tokens)
  const youtube = google.youtube({ version: 'v3', auth: googleOAuth2Client })

  try {
    // const result = await youtube.superChatEvents.list({ part: ['snippet'] })
    // console.log({ result })

    // if (result.status !== 200) {
    //   return { success: false, errorMessage: 'Não foi possível obter os SuperChats do seu canal.' }
    // }

    // const items = result.data.items ?? []
    // const superchats = items.map(superChatAdapter)

    // console.log({ superchats })

    // return { success: true, superchats }
    let superchats: SuperChatType[] = []
    let nextPageToken: string | undefined

    do {
      const result = await youtube.superChatEvents.list({
        part: ['snippet'],
        pageToken: nextPageToken,
      })

      if (result.status !== 200) {
        return { success: false, errorMessage: 'Não foi possível obter os SuperChats do seu canal.' }
      }

      const items = result.data.items ?? []
      if (items.length <= 0) break

      superchats = superchats.concat(items.map(superChatAdapter))

      nextPageToken = result.data.nextPageToken ?? undefined

      await wait(500)
    } while (nextPageToken)

    return { success: true, superchats }
  } catch (error) {
    console.error('Error in fetchSuperchats:', error)
    return { success: false, errorMessage: 'Não foi possível obter os SuperChats do seu canal.' }
  }
}
