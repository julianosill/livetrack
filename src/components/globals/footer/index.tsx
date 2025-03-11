import { Link, NavLink } from '@/components'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toogle'

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn('mt-auto flex flex-wrap items-center justify-between gap-x-12 gap-y-6 border-t py-8', className)}
      {...props}
    >
      <ThemeToggle />

      <div className='flex flex-wrap items-center gap-4 text-sm'>
        <NavLink href={ROUTES.docs.terms}>Termos de Uso</NavLink>
        <NavLink href={ROUTES.docs.privacy}>Políticas de Privacidade</NavLink>
      </div>

      <div className='ml-auto flex gap-1 text-xs text-muted-foreground'>
        <span>Desenvolvido por</span>
        <Link className='font-medium' href='https://julianosill.com.br'>
          Juliano Sill
        </Link>
      </div>
    </footer>
  )
}
