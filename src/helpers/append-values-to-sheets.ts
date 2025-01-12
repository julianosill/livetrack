import { toast } from 'sonner'

import { appendToSheets } from '@/http'
import type { GoogleSheetsValueType } from '@/types/google-sheets'

interface AppendValuesToSheets {
  spreadsheetId: string
  sheetName: string
  values: GoogleSheetsValueType[]
  onError?: () => void
}

export async function appendValuesToSheets({
  spreadsheetId,
  sheetName,
  values,
  onError,
}: AppendValuesToSheets): Promise<{ success: boolean }> {
  if (!values || values.length <= 0) return { success: true }

  const appendResult = await appendToSheets({ spreadsheetId, sheetName, values })

  if (!appendResult?.success) {
    if (onError) onError()

    toast.error('Erro ao adicionar dados à planilha!', {
      description:
        appendResult.errorMessage ??
        'Verifique se as informações estão corretas. Se o erro persistir, contate o suporte.',
      duration: 6000,
    })

    return { success: false }
  }

  toast.success('Dados adicionados à planilha com sucesso!')
  return { success: true }
}
