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
