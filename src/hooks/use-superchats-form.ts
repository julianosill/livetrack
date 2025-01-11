import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { superChatsToSheetsAdapter } from '@/adapters'
import { STORAGE_KEYS } from '@/constants'
import {
  getStorageItem,
  isTokenExpiringIn,
  livechatFormDefaultValues,
  setStorageItem,
  superchatsFormDefaultValues,
  type SuperchatsFormSchema,
  superchatsFormSchema,
} from '@/helpers'
import { appendToSheets, fetchSuperchats, refreshToken } from '@/http'
import type { SheetsValueType } from '@/types'

interface AppendSuperChatsToSheets {
  spreadsheetId: string
  sheetName: string
  values: SheetsValueType[]
}

export function useSuperchatsForm() {
  const [isPending, startTransition] = useTransition()

  const spreadsheetIdStorageKey = STORAGE_KEYS.superchats.spreadsheetId
  const sheetNameStorageKey = STORAGE_KEYS.superchats.sheetName

  const form = useForm<SuperchatsFormSchema>({
    resolver: zodResolver(superchatsFormSchema),
    values: superchatsFormDefaultValues,
    mode: 'onBlur',
  })

  async function appendSuperChatsToSheets({
    spreadsheetId,
    sheetName,
    values,
  }: AppendSuperChatsToSheets): Promise<void> {
    if (!values || values.length <= 0) return

    const appendResult = await appendToSheets({ spreadsheetId, sheetName, values })

    if (!appendResult?.success) {
      toast.error('Erro ao adicionar dados à planilha!', {
        description:
          appendResult.errorMessage ??
          'Verifique se as informações estão corretas. Se o erro persistir, contate o suporte.',
        duration: 6000,
      })
      return
    }

    toast.success('Dados adicionados à planilha com sucesso!')
    return
  }

  async function handleSuperChatsExport({
    spreadsheetId,
    rememberSpreadsheetId,
    sheetName,
    rememberSheetName,
  }: SuperchatsFormSchema): Promise<void> {
    const isTokenExpiring = await isTokenExpiringIn(5)
    if (isTokenExpiring) await refreshToken()

    startTransition(async () => {
      setStorageItem(spreadsheetIdStorageKey, rememberSpreadsheetId ? spreadsheetId : null)
      setStorageItem(sheetNameStorageKey, rememberSheetName ? sheetName : null)

      const superchatsResult = await fetchSuperchats()

      if (!superchatsResult.success) {
        toast.error('A operação falhou!', { description: superchatsResult.errorMessage, duration: 6000 })
        return
      }

      const superchats = superchatsResult.superchats ?? []

      if (superchats.length <= 0) {
        toast.info('Nenhum SuperChat foi encontrado.')
        return
      }

      const values = superChatsToSheetsAdapter(superchats)
      await appendSuperChatsToSheets({ spreadsheetId, sheetName, values })

      return
    })
  }

  useEffect(() => {
    const storageSpreadsheetId = getStorageItem<string>(spreadsheetIdStorageKey)
    const storageSheetName = getStorageItem<string>(sheetNameStorageKey)

    form.reset({
      spreadsheetId: storageSpreadsheetId ?? livechatFormDefaultValues.spreadsheetId,
      rememberSpreadsheetId: storageSpreadsheetId ? true : livechatFormDefaultValues.rememberSpreadsheetId,
      sheetName: storageSheetName ?? livechatFormDefaultValues.sheetName,
      rememberSheetName: storageSheetName ? true : livechatFormDefaultValues.rememberSheetName,
    })
  }, [])

  return { form, isPending, handleSuperChatsExport }
}
