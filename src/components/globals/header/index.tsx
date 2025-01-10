import type React from 'react'

import { cn } from '@/lib/utils'
import type { SessionType } from '@/types'

import { AccountMenu } from './account-menu'
import { NavMenu } from './nav-menu'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SessionType['user']
}

export function Header({ user, className, ...props }: Readonly<HeaderProps>) {
  return (
    <header className={cn('flex gap-2 items-center', className)} {...props}>
      <NavMenu />

      <AccountMenu user={user} className='ml-auto' />
    </header>
  )
}
