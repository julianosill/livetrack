'use client'

import { ArrowLeftToLine, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'

import { Avatar, DropdownMenu } from '@/components'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import type { SessionType } from '@/types'

interface AccountProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: SessionType['user']
}

export function AccountMenu({ user, className, ...props }: Readonly<AccountProps>) {
  const router = useRouter()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
          className,
        )}
        {...props}
      >
        <Avatar.Root>
          <Avatar.Image src={user.avatarUrl} />
          <Avatar.Fallback />
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end'>
        <DropdownMenu.Group>
          <DropdownMenu.Label className='grid grid-cols-[1rem_1fr] gap-x-2 gap-y-1 items-center pr-4'>
            <User className='size-4' />
            <span>{user.name}</span>
            <span className='text-xs font-normal text-muted-foreground col-start-2'>{user.email}</span>
          </DropdownMenu.Label>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />

        <DropdownMenu.Item onClick={() => router.replace(ROUTES.api.auth.signOut)} className='font-medium'>
          <ArrowLeftToLine />
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
