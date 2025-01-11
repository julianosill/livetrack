import type { youtube_v3 } from 'googleapis'

import type { SuperChatType } from '@/types'

export function superChatAdapter(superchat: youtube_v3.Schema$SuperChatEvent) {
  const amountInMicros = Number(superchat.snippet?.amountMicros ?? 0)
  const amount = amountInMicros > 0 ? amountInMicros / 1000 : 0

  const formattedSuperchat: SuperChatType = {
    authorName: superchat.snippet?.supporterDetails?.displayName ?? '',
    authorChannelUrl: superchat.snippet?.supporterDetails?.channelUrl ?? '',
    message: superchat.snippet?.commentText ?? '',
    currency: superchat.snippet?.currency ?? '',
    amount,
    createdAt: superchat.snippet?.createdAt ?? '',
  }

  return formattedSuperchat
}
