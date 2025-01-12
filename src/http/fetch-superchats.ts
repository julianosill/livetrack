'use server'

import { superChatAdapter } from '@/adapters'
import { getSession } from '@/auth'
import { wait } from '@/helpers'
import { googleOAuth2Client, youtube } from '@/lib/google'
import type { SuperChatType } from '@/types/youtube'

interface FetchSuperChatsResult {
  success: boolean
  errorMessage?: string
  superchats?: SuperChatType[]
}

export async function fetchSuperchats(): Promise<FetchSuperChatsResult> {
  const session = await getSession()
  if (!session) return { success: false }

  googleOAuth2Client.setCredentials(session.tokens)
  const youtubeClient = youtube(googleOAuth2Client)

  try {
    let superchats: SuperChatType[] = []
    let nextPageToken: string | undefined

    do {
      const result = await youtubeClient.superChatEvents.list({ part: ['snippet'], pageToken: nextPageToken })

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
