import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Footer, LiveTrackLogo, NavButton } from '@/components'
import { ROUTES } from '@/constants'

export default async function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-16 overflow-hidden p-6'>
      <header className='flex items-center justify-between gap-4 max-xs:flex-col'>
        <Link href={ROUTES.home}>
          <LiveTrackLogo className='w-36' />
          <span className='sr-only'>LiveTrack</span>
        </Link>

        <NavButton href={ROUTES.home} variant='ghost'>
          <ChevronLeft />
          Ir à página inicial
        </NavButton>
      </header>
      {children}
      <Footer />
    </div>
  )
}
