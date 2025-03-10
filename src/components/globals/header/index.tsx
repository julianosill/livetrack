import Link from 'next/link'
import type React from 'react'

import { LiveTrackLogo } from '@/components'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import type { SessionType } from '@/types/auth'

import { AccountMenu } from './account-menu'
import { NavMenu } from './nav-menu'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SessionType['user']
}

export function Header({ user, className, ...props }: Readonly<HeaderProps>) {
  return (
    <header className={cn('flex items-center gap-8', className)} {...props}>
      <Link href={ROUTES.home}>
        <LiveTrackLogo className='w-36' />
        <span className='sr-only'>LiveTrack</span>
      </Link>

      <NavMenu />

      <AccountMenu user={user} className='ml-auto' />
    </header>
  )
}
