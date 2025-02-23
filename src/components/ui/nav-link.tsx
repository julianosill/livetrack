import { cva, type VariantProps } from 'class-variance-authority'
import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

const navLinkVariants = cva('border-b hover:text-primary hover:border-primary transition-colors', {
  variants: {
    size: {
      default: 'text-base',
      sm: 'text-sm font-light',
    },
  },
  defaultVariants: { size: 'default' },
})

type NavLinkProps = LinkProps & Omit<React.ComponentProps<'a'>, 'href'> & VariantProps<typeof navLinkVariants>

export function NavLink({ size, className, ...props }: NavLinkProps) {
  return <Link className={cn(navLinkVariants({ size, className }))} {...props} />
}
