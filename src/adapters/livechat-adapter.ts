import type { youtube_v3 } from 'googleapis'

import type { LivechatItemType } from '@/types'

interface LivechatAdapterProps {
  message: youtube_v3.Schema$LiveChatMessage
  onlySuperChats?: boolean
}

export function livechatAdapter({ message, onlySuperChats }: LivechatAdapterProps): LivechatItemType {
  const messageType = message.snippet?.type ?? ''
  const comment = onlySuperChats ? message.snippet?.superChatDetails?.userComment : message.snippet?.displayMessage

  const formattedMessage: LivechatItemType = {
    type: messageType as LivechatItemType['type'],
    authorName: message.authorDetails?.displayName ?? '',
    authorChannelUrl: message.authorDetails?.channelUrl ?? '',
    comment: comment ?? '',
    currency: message.snippet?.superChatDetails?.currency ?? undefined,
    amount: undefined,
    publishedAt: message.snippet?.publishedAt ?? '',
  }

  if (onlySuperChats) {
    const amountInMicros = Number(message.snippet?.superChatDetails?.amountMicros)
    const amount = amountInMicros / 1000
    formattedMessage.amount = amount
  }

  return formattedMessage
}
