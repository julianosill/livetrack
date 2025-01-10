'use server'

import { google, youtube_v3 } from 'googleapis'

import { livechatAdapter } from '@/adapters'
import { getSession } from '@/auth'
import { googleOAuth2Client } from '@/lib/google'
import type { LivechatItemType } from '@/types'

interface FetchStreamingLiveChatProps {
  liveId: string
  lastMessageTimestamp: string
  onlySuperChats?: boolean
}

interface FetchStreamingLivechatResult {
  success: boolean
  errorMessage?: string
  items?: LivechatItemType[]
}

export async function fetchStreamingLivechat({
  liveId,
  lastMessageTimestamp,
  onlySuperChats = false,
}: FetchStreamingLiveChatProps): Promise<FetchStreamingLivechatResult> {
  const session = await getSession()
  if (!session) return { success: false }

  googleOAuth2Client.setCredentials(session.tokens)
  const youtube = google.youtube({ version: 'v3', auth: googleOAuth2Client })
  let liveChatId = ''

  try {
    const liveDetails = await youtube.videos.list({
      part: ['liveStreamingDetails'],
      id: [liveId],
    })

    if (!liveDetails.data.items || liveDetails.data.items.length <= 0) {
      return { success: false, errorMessage: 'Live não encontrada.' }
    }

    liveChatId = liveDetails.data.items[0].liveStreamingDetails?.activeLiveChatId ?? ''
  } catch (error) {
    console.error('Error in liveStreamingDetails:', error)
    return { success: false, errorMessage: 'Live não encontrada.' }
  }

  try {
    const livechat = await youtube.liveChatMessages.list({
      part: ['snippet', 'authorDetails'],
      liveChatId,
    })

    if (!livechat.data.items || livechat.data.items.length <= 0) {
      return { success: false, errorMessage: 'Live chat não encontrado.' }
    }

    const items: LivechatItemType[] = []

    livechat.data.items.forEach((message: youtube_v3.Schema$LiveChatMessage) => {
      if (onlySuperChats && message.snippet?.type !== 'superChatEvent') return

      const publishedAt = message.snippet?.publishedAt
      if (publishedAt && new Date(publishedAt) <= new Date(lastMessageTimestamp)) return

      const messages = livechatAdapter({ message, onlySuperChats })
      items.push(messages)
    })

    return { success: true, items }
  } catch (error) {
    console.error('Error in liveChatMessages:', error)
    return { success: false, errorMessage: 'Live chat não encontrado.' }
  }

  // const liveDetails = await youtube.videos.list({
  //   part: ['liveStreamingDetails'],
  //   id: [liveId],
  // })

  // if (!liveDetails.data.items || liveDetails.data.items.length <= 0) {
  //   return { success: false, errorMessage: 'Live não encontrada.' }
  // }

  // const liveChatId =
  //   liveDetails.data.items[0].liveStreamingDetails?.activeLiveChatId ?? ''

  // const messagesResult = await youtube.liveChatMessages.list({
  //   part: ['snippet', 'authorDetails'],
  //   liveChatId,
  // })

  // if (!messagesResult.data.items || messagesResult.data.items.length <= 0) {
  //   return { success: false, errorMessage: 'Live chat não encontrado.' }
  // }

  // const items: LivechatItemType[] = []

  // messagesResult.data.items.forEach(
  //   (message: youtube_v3.Schema$LiveChatMessage) => {
  //     if (onlySuperChats && message.snippet?.type !== 'superChatEvent') return

  //     const publishedAt = message.snippet?.publishedAt
  //     if (
  //       publishedAt &&
  //       new Date(publishedAt) <= new Date(lastMessageTimestamp)
  //     )
  //       return

  //     const messageDetails = onlySuperChats
  //       ? superchatAdapter(message)
  //       : livechatMessageAdapter(message)

  //     items.push(messageDetails)
  //   },
  // )

  // return { success: true, items }
}