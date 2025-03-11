import { MessageSquareQuote, MessageSquareText } from 'lucide-react'

import { ROUTES } from '@/constants'

import { NavMenuButton } from './nav-menu-button'

export function NavMenu() {
  return (
    <nav>
      <NavMenuButton href={ROUTES.livechat}>
        <MessageSquareText /> Monitorar Livechat
      </NavMenuButton>
      <NavMenuButton href={ROUTES.superchats}>
        <MessageSquareQuote />
        Exportar SuperChats
      </NavMenuButton>
    </nav>
  )
}
