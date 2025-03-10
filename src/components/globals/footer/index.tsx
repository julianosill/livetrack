import { NavLink } from '@/components'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toogle'

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn('mt-auto flex items-center justify-between gap-8 border-t py-8', className)} {...props}>
      <ThemeToggle />

      <div className='flex flex-wrap items-center gap-4'>
        <NavLink size='sm' href={ROUTES.docs.terms}>
          Termos de Uso
        </NavLink>
        <NavLink size='sm' href={ROUTES.docs.privacy}>
          Políticas de Privacidade
        </NavLink>
      </div>
    </footer>
  )
}
