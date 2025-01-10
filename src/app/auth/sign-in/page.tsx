import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSession } from '@/auth'
import { env } from '@/config'
import { AUTH_PARAMS, ROUTES } from '@/constants'

interface SignInPageProps {
  searchParams: {
    redirect_path?: string
  }
}

export default async function SignInPage({ searchParams }: Readonly<SignInPageProps>) {
  const session = await getSession()
  if (session) return redirect('/')

  const signInWithGoogleUrl = new URL(ROUTES.api.auth.signInWithGoogle, env.NEXT_PUBLIC_APP_BASE_URL)
  const redirectPath = searchParams.redirect_path

  if (redirectPath) {
    signInWithGoogleUrl.searchParams.set(AUTH_PARAMS.redirectPath, redirectPath)
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      <Link href={signInWithGoogleUrl.toString()}>sign-in</Link>
    </div>
  )
}
