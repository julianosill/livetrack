import type { LIVECHAT_MESSAGE_TYPE } from '@/constants'

export type GoogleAuthStateType = {
  redirect_path?: string
}

type UserType = {
  id: string
  name: string
  email: string
  avatarUrl: string
}

type TokensType = {
  refresh_token?: string
  expiry_date: number
  access_token: string
  token_type: string
  id_token: string
  scope: string
}

export type SessionType = {
  user: UserType
  tokens: TokensType
}

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

export type SheetsValueType = (string | number | undefined)[]
