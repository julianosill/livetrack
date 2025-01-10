import { LIVECHAT_MESSAGE_TYPE } from '@/constants'
import { formatDate } from '@/helpers'
import type { LivechatItemType, SheetsValueType } from '@/types'

interface LivechatToSheetsAdapter {
  livechat: LivechatItemType[]
  onlySuperChats?: boolean
}

export function livechatToSheetsAdapter({ livechat, onlySuperChats }: LivechatToSheetsAdapter): SheetsValueType[] {
  const messages = livechat.map(message => {
    return onlySuperChats
      ? [
          LIVECHAT_MESSAGE_TYPE[message.type],
          message.authorName,
          message.authorChannelUrl,
          message.message,
          message.currency,
          message.amount,
          formatDate(message.publishedAt, { hour: 'numeric', minute: 'numeric' }),
        ]
      : [
          LIVECHAT_MESSAGE_TYPE[message.type],
          message.authorName,
          message.authorChannelUrl,
          message.message,
          formatDate(message.publishedAt, { hour: 'numeric', minute: 'numeric' }),
        ]
  })

  return messages
}
