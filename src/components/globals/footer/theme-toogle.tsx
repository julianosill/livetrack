'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button, type ButtonProps, DropdownMenu } from '@/components'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className, ...props }: ButtonProps) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant='outline' className={cn('size-9 p-0', className)} {...props}>
          <Sun className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Alterar tema</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='start'>
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          <Sun />
          Claro
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          <Moon />
          Escuro
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          <Monitor />
          Sistema
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
