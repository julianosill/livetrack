import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

type NavLinkProps = LinkProps & Omit<React.ComponentProps<'a'>, 'href'>

export function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn('border-b transition-colors hover:border-primary hover:text-accent-foreground', className)}
      {...props}
    />
  )
}
