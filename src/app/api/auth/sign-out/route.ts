import { type NextRequest, NextResponse } from 'next/server'

import { deleteSession } from '@/auth'
import { ROUTES } from '@/constants'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = request.nextUrl
  requestUrl.pathname = ROUTES.auth.signIn

  deleteSession()

  return NextResponse.redirect(requestUrl)
}
