import type { Metadata } from 'next'

import { Alert, PageHeader, SuperchatsFormSelector } from '@/components'

export const metadata: Metadata = {
  title: 'SuperChats',
}

export default function SuperChatsPage() {
  return (
    <main>
      <PageHeader.Root>
        <PageHeader.Title>Exportar SuperChats</PageHeader.Title>
        <PageHeader.Description>
          Extraia os SuperChats enviados ao seu canal no Youtube e salve em planilha no Google Sheets ou em arquivo
          <span className='ml-1 rounded-md bg-muted p-1 font-mono text-xs leading-none'>.CSV</span>.
        </PageHeader.Description>
      </PageHeader.Root>

      <SuperchatsFormSelector />

      <Alert.Root className='mt-12'>
        <Alert.Title>Detalhes da exportação</Alert.Title>
        <Alert.Description as='ul' className='space-y-1'>
          <li>• Serão extraídos os SuperChats enviados no momento da solicitação até 30 dias anteriores;</li>
          <li>• Não é possível extrair SuperChats enviados ao seu canal do Youtube há mais de 30 dias;</li>
          <li>
            • Ao salvar no Google Sheets, a lista de SuperChats será adicionada após a última linha preenchida da
            planilha.
          </li>
        </Alert.Description>
      </Alert.Root>
    </main>
  )
}
