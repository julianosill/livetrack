import { MessageSquareQuote, MessageSquareText } from 'lucide-react'
import Link from 'next/link'

import { Card } from '@/components'
import { ROUTES } from '@/constants'

export default function HomePage() {
  return (
    <main className='flex gap-8 text-center max-sm:flex-col'>
      <Link href={ROUTES.livechat} className='w-full'>
        <Card.Root className='h-full transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md'>
          <Card.Header>
            <MessageSquareText className='mx-auto size-8 text-primary' />
            <Card.Title>Monitorar Livechat</Card.Title>
            <Card.Description>
              Capture, em tempo real, os comentários feitos em lives do Youtube e salve-os em sua planilha do Google
              Sheets.
            </Card.Description>
          </Card.Header>
        </Card.Root>
      </Link>
      <Link href={ROUTES.superchats} className='w-full'>
        <Card.Root className='h-full transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md'>
          <Card.Header>
            <MessageSquareQuote className='mx-auto size-8 text-primary' />
            <Card.Title>Exportar SuperChats</Card.Title>
            <Card.Description>
              Extraia todos os SuperChats enviados ao seu canal do Youtube e salve-os em sua planilha do Google Sheets
              ou exporte-os em formato{' '}
              <span className='rounded bg-foreground/5 px-1 py-0.5 font-mono text-xs'>.csv</span>.
            </Card.Description>
          </Card.Header>
        </Card.Root>
      </Link>
    </main>
  )
}
