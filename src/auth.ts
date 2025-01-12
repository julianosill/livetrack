import 'server-only'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

import { env } from '@/config'

import type { SessionType } from './types/auth'

const key = new TextEncoder().encode(env.JWT_SECRET_KEY)
const cookieExpiryDateInSeconds = 60 * 60 * 24 // 24h

async function encrypt(payload: SessionType): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('24h').sign(key)
}

async function decrypt(session: string): Promise<SessionType | null> {
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] })
    return payload as SessionType
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function createSession({ user, tokens }: SessionType): Promise<void> {
  const session = await encrypt({ user, tokens })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: cookieExpiryDateInSeconds,
  })
}

export async function getSession(): Promise<SessionType | null> {
  const cookie = cookies().get('session')?.value
  if (!cookie) return null

  const session = await decrypt(cookie)
  if (!session) return null

  return session
}

export function deleteSession(): void {
  cookies().delete('session')
}
