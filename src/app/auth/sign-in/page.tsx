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

  if (redirectPath) {
    signInWithGoogleUrl.searchParams.set(AUTH_PARAMS.redirectPath, redirectPath)
  }

  return (
    <div className='flex items-center justify-center min-h-svh p-4'>
      <main className='bg-card p-6 xs:p-12 border rounded-2xl max-w-md text-center'>
        <LiveTrackLogo className='fill-accent-foreground w-56 mx-auto pb-8' />
        <p className='pb-12 text-muted-foreground text-sm'>
          Capture comentários em lives do YouTube em tempo real e também SuperChats enviados ao seu canal.
        </p>

        <SignInGoogleButton url={signInWithGoogleUrl.toString()} />
      </main>
    </div>
  )
}
