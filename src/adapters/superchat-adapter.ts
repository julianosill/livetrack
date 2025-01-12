import type { SuperChatFromYoutubeType, SuperChatType } from '@/types/youtube'

export function superChatAdapter(superchat: SuperChatFromYoutubeType) {
  const amountInMicros = Number(superchat.snippet?.amountMicros ?? 0)
  const amount = amountInMicros > 0 ? amountInMicros / 1000 : 0

  const formattedSuperchat: SuperChatType = {
    authorName: superchat.snippet?.supporterDetails?.displayName ?? '',
    authorChannelUrl: superchat.snippet?.supporterDetails?.channelUrl ?? '',
    comment: superchat.snippet?.commentText ?? '',
    currency: superchat.snippet?.currency ?? '',
    amount,
    createdAt: superchat.snippet?.createdAt ?? '',
  }

  return formattedSuperchat
}
