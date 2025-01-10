'use server'

import { getSession } from '@/auth'

export async function isTokenExpiringIn(minutes: number): Promise<boolean> {
  const session = await getSession()
  if (!session) return true

  const currentTime = Date.now()
  const referenceTime = minutes * 60 * 1000

  return currentTime + referenceTime > session.tokens.expiry_date
}
