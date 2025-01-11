import { formatDate } from '@/helpers'
import type { SheetsValueType, SuperChatType } from '@/types'

export function superChatsToSheetsAdapter(superchats: SuperChatType[]): SheetsValueType[] {
  if (!superchats || superchats.length <= 0) return []

  const formattedSuperchats = superchats.map(superchat => {
    return [
      superchat.authorName,
      superchat.authorChannelUrl,
      superchat.comment,
      superchat.currency,
      superchat.amount,
      formatDate(superchat.createdAt, { hour: 'numeric', minute: 'numeric' }),
    ]
  })

  return formattedSuperchats
}
