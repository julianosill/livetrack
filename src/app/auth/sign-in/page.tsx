import { redirect } from 'next/navigation'

import { getSession } from '@/auth'
import { LiveTrackLogo, SignInGoogleButton } from '@/components'
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
  const isRedirectPathValid = redirectPath && redirectPath !== ROUTES.api.auth.signOut

  if (isRedirectPathValid) {
    signInWithGoogleUrl.searchParams.set(AUTH_PARAMS.redirectPath, redirectPath)
  }

  return (
    <div className='flex flex-1 items-center justify-center p-4'>
      <main className='max-w-md rounded-2xl border bg-card p-6 text-center xs:p-12'>
        <LiveTrackLogo className='mx-auto w-56 fill-accent-foreground pb-8' />
        <p className='pb-12 text-sm text-muted-foreground'>
          Capture comentários em lives do YouTube em tempo real e também SuperChats enviados ao seu canal.
        </p>

        <SignInGoogleButton url={signInWithGoogleUrl.toString()} />
      </main>
    </div>
  )
}
