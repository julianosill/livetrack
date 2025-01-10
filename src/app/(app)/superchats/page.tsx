import type { Metadata } from 'next'

import { PageHeader } from '@/components'

export const metadata: Metadata = {
  title: 'SuperChats',
}

export default function SuperChatsPage() {
  return (
    <main>
      <PageHeader.Root>
        <PageHeader.Title>Exportar SuperChats</PageHeader.Title>
        <PageHeader.Description>
          Exporte os super chats enviados ao seu canal do Youtube e salve em sua planilha no Google Sheets.
        </PageHeader.Description>
      </PageHeader.Root>

      <p>Em construção.</p>
    </main>
  )
}
