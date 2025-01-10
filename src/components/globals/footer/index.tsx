import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toogle'

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn('border-t py-8 mt-auto flex gap-2 items-center', className)} {...props}>
      <ThemeToggle />
    </footer>
  )
}
