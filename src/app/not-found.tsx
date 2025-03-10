import { FileX2 } from 'lucide-react'
import type { Metadata } from 'next'

import { getSession } from '@/auth'
import { Footer, Header, NavButton } from '@/components'
import { ROUTES } from '@/constants'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default async function NotFound() {
  const session = await getSession()
  if (!session) return

  return (
    <div className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-8 overflow-hidden p-6'>
      <Header user={session.user} className='pb-12' />

      <FileX2 className='mx-auto size-20 animate-pulse text-primary' strokeWidth={1} />

      <div className='text-center'>
        <h1 className='text-2xl font-semibold text-accent-foreground'>Página não encontrada</h1>
        <p className='pt-4 text-sm text-muted-foreground'>A página que você estou acessar não existe.</p>
      </div>

      <NavButton href={ROUTES.home} variant='link' className='mx-auto w-fit'>
        Ir à página inicial
      </NavButton>

      <Footer />
    </div>
  )
}
