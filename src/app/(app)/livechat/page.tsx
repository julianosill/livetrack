import type { Metadata } from 'next'

import { Alert, LivechatForm, PageHeader } from '@/components'
import { FETCH_LIVECHAT_INTERVAL_IN_SECONDS } from '@/constants'

export const metadata: Metadata = {
  title: 'Monitorar Livechat',
}

export default function LivechatPage() {
  return (
    <main>
      <PageHeader.Root>
        <PageHeader.Title>Monitorar Livechat</PageHeader.Title>
        <PageHeader.Description>
          Capture em tempo real os comentários feitos no livechat do Youtube e salve em sua planilha no Google Sheets.
        </PageHeader.Description>
      </PageHeader.Root>

      <LivechatForm />

      <Alert.Root className='mt-12'>
        <Alert.Title>Detalhes do monitoramento</Alert.Title>
        <Alert.Description as='ul' className='space-y-1'>
          <li>• A busca por novos comentários será realizada a cada {FETCH_LIVECHAT_INTERVAL_IN_SECONDS} segundos;</li>
          <li>• Cada nova mensagem será adicionada após a última linha preenchida na planilha do Google Sheets;</li>
          <li>
            • O monitoramento está disponível apenas para lives ativas, não sendo possível monitorar transmissões já
            encerradas;
          </li>
          <li>
            • Cada busca verificará os últimos 75 comentários e os filtrará de acordo com as opções selecionadas no
            formulário;
          </li>
          <li>• Ao interromper e reiniciar o monitoramento, a data da última mensagem será desconsiderada.</li>
        </Alert.Description>
      </Alert.Root>
    </main>
  )
}
