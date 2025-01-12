import { formatDate } from '@/helpers'
import type { GoogleSheetsValueType } from '@/types/google-sheets'
import type { SuperChatType } from '@/types/youtube'

export function superChatsToSheetsAdapter(superchats: SuperChatType[]): GoogleSheetsValueType[] {
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
