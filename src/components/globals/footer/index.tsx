import { NavLink } from '@/components'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toogle'

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn('border-t py-8 mt-auto flex gap-8 items-center justify-between', className)} {...props}>
      <ThemeToggle />

      <div className='flex items-center gap-4 flex-wrap'>
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
