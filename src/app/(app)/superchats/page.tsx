import type { Metadata } from 'next'

import { Alert, PageHeader, SuperchatsForm } from '@/components'

export const metadata: Metadata = {
  title: 'SuperChats',
}

export default function SuperChatsPage() {
  return (
    <main>
      <PageHeader.Root>
        <PageHeader.Title>Exportar SuperChats</PageHeader.Title>
        <PageHeader.Description>
          Exporte os SuperChats enviados ao seu canal no Youtube e salve em sua planilha no Google Sheets.
        </PageHeader.Description>
      </PageHeader.Root>

      <SuperchatsForm />

      <Alert.Root className='mt-12'>
        <Alert.Title>Detalhes da exportação</Alert.Title>
        <Alert.Description as='ul' className='space-y-1'>
          <li>• Os SuperChats ficam disponíveis em seu canal no Youtube por 30 dias;</li>
          <li>• Não é possível exportar SuperChats enviados há mais tempo;</li>
          <li>• Cada SuperChat será adicionado após a última linha preenchida na planilha do Google Sheets.</li>
        </Alert.Description>
      </Alert.Root>
    </main>
  )
}
