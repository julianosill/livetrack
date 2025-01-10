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
    <div className='max-w-4xl mx-auto w-full min-h-svh flex flex-col gap-8 p-6 overflow-hidden'>
      <Header user={session.user} className='pb-12' />

      <FileX2 className='size-20 animate-pulse mx-auto text-primary' strokeWidth={1} />

      <div className='text-center'>
        <h1 className='font-semibold text-2xl text-accent-foreground'>Página não encontrada</h1>
        <p className='pt-4 text-sm text-muted-foreground'>A página que você estou acessar não existe.</p>
      </div>

      <NavButton href={ROUTES.home} variant='link' className='w-fit mx-auto'>
        Ir à página inicial
      </NavButton>

      <Footer />
    </div>
  )
}
