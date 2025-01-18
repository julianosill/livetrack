import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Footer, LiveTrackLogo, NavButton } from '@/components'
import { ROUTES } from '@/constants'

export default async function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-4xl mx-auto w-full min-h-svh flex flex-col gap-16 p-6 overflow-hidden'>
      <header className='flex justify-between max-xs:flex-col gap-4 items-center'>
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
