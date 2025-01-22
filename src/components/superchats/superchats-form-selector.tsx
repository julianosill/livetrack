'use client'

import { SuperchatsToCsvForm, SuperchatsToSheetsForm, Tabs } from '@/components'

export function SuperchatsFormSelector() {
  return (
    <Tabs.Root defaultValue='google-sheets'>
      <Tabs.List className='mb-8 grid grid-cols-1 xs:grid-cols-2'>
        <Tabs.Trigger value='google-sheets'>Adicionar ao Google Sheets</Tabs.Trigger>
        <Tabs.Trigger value='csv'>
          Exportar em <span className='ml-1 rounded-md bg-muted p-1 font-mono text-xs leading-none'>.CSV</span>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value='google-sheets'>
        <SuperchatsToSheetsForm />
      </Tabs.Content>

      <Tabs.Content value='csv'>
        <SuperchatsToCsvForm />
      </Tabs.Content>
    </Tabs.Root>
  )
}
