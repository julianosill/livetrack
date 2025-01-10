'use client'

import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import googleIcon from '@/assets/icons/google.svg'
import { Button, Show } from '@/components'

interface SignInGoogleButtonProps {
  url: string
}

export function SignInGoogleButton({ url }: Readonly<SignInGoogleButtonProps>) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  function handleSignIn() {
    setIsPending(true)
    router.replace(url)
  }

  return (
    <Button onClick={handleSignIn} variant='outline' size='lg' className='gap-3' disabled={isPending}>
      <Show
        when={isPending}
        render={<LoaderCircle className='animate-spin' />}
        fallback={<Image src={googleIcon} alt='Google' className='size-5' />}
      />
      Entrar com sua conta do Google
    </Button>
  )
}
