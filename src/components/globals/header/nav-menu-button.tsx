'use client'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'

import { Button } from '@/components'

interface NavMenuButtonProps {
  href: LinkProps['href']
  children: React.ReactNode
}

export function NavMenuButton({ href, children }: Readonly<NavMenuButtonProps>) {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <Button
      variant='ghost'
      data-active={isActive}
      className='data-[active=true]:font-semibold [&_svg]:text-muted-foreground [&_svg]:data-[active=true]:text-primary'
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}
