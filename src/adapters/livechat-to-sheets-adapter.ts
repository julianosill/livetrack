import { LIVECHAT_MESSAGE_TYPE } from '@/constants'
import { formatDate } from '@/helpers'
import type { GoogleSheetsValueType } from '@/types/google-sheets'
import type { LivechatItemType } from '@/types/youtube'

interface LivechatToSheetsAdapter {
  livechat?: LivechatItemType[]
  onlySuperChats?: boolean
}

export function livechatToSheetsAdapter({
  livechat,
  onlySuperChats,
}: LivechatToSheetsAdapter): GoogleSheetsValueType[] | void {
  if (!livechat || livechat.length <= 0) return

  const messages = livechat.map(message => {
    return onlySuperChats
      ? [
          LIVECHAT_MESSAGE_TYPE[message.type],
          message.authorName,
          message.authorChannelUrl,
          message.comment,
          message.currency,
          message.amount,
          formatDate(message.publishedAt, { hour: 'numeric', minute: 'numeric' }),
        ]
      : [
          LIVECHAT_MESSAGE_TYPE[message.type],
          message.authorName,
          message.authorChannelUrl,
          message.comment,
          formatDate(message.publishedAt, { hour: 'numeric', minute: 'numeric' }),
        ]
  })

  return messages
}
