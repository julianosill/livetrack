import type { youtube_v3 } from 'googleapis'

import { LIVECHAT_MESSAGE_TYPE } from '@/constants/streaming'

export type LivechatMessageFromYoutube = youtube_v3.Schema$LiveChatMessage
export type SuperChatFromYoutubeType = youtube_v3.Schema$SuperChatEvent

type LivechatMessageType = keyof typeof LIVECHAT_MESSAGE_TYPE

export type LivechatItemType = {
  type: LivechatMessageType
  authorName: string
  authorChannelUrl: string
  comment: string
  currency?: string
  amount?: number
  publishedAt: string
}

export type SuperChatType = {
  authorName: string
  authorChannelUrl: string
  comment: string
  currency: string
  amount: number
  createdAt: string
}
