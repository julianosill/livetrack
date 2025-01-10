import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { livechatToSheetsAdapter } from '@/adapters'
import { FETCH_LIVECHAT_INTERVAL_IN_SECONDS, STORAGE_KEYS } from '@/constants'
import {
  getStorageItem,
  isTokenExpiringIn,
  livechatFormDefaultValues,
  type LivechatFormSchema,
  livechatFormSchema,
  setStorageItem,
} from '@/helpers'
import { appendToSheets, fetchStreamingLivechat, refreshToken } from '@/http'
import type { LivechatItemType, SheetsValueType } from '@/types'

interface FetchMessages {
  liveId: string
  onlySuperChats?: boolean
}

interface AppendMessagesToSheets {
  spreadsheetId: string
  sheetName: string
  values: SheetsValueType[]
}

export function useLivechatForm() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const spreadsheetIdStorageKey = STORAGE_KEYS.livechat.spreadsheetId
  const sheetNameStorageKey = STORAGE_KEYS.livechat.sheetName

  let livechatMessages: LivechatItemType[] = []
  let lastMessageTimestamp = ''

  const form = useForm<LivechatFormSchema>({
    resolver: zodResolver(livechatFormSchema),
    values: livechatFormDefaultValues,
    mode: 'onBlur',
  })

  async function fetchMessages({ liveId, onlySuperChats }: FetchMessages): Promise<{ success: boolean }> {
    const livechatResult = await fetchStreamingLivechat({ liveId, onlySuperChats, lastMessageTimestamp })

    if (!livechatResult.success) {
      stopMonitoring()
      toast.error('O monitoramento falhou!', { description: livechatResult.errorMessage, duration: 6000 })
      return { success: false }
    }

    const messages = livechatResult.items
    if (!messages || messages.length <= 0) return { success: true }

    const lastMessage = messages[messages.length - 1]
    lastMessageTimestamp = lastMessage.publishedAt
    livechatMessages = messages

    return { success: true }
  }

  async function appendMessagesToSheets({
    spreadsheetId,
    sheetName,
    values,
  }: AppendMessagesToSheets): Promise<{ success: boolean }> {
    if (values.length <= 0) return { success: true }

    const appendResult = await appendToSheets({ spreadsheetId, sheetName, values })

    if (!appendResult?.success) {
      stopMonitoring()
      toast.error('Erro ao adicionar dados!', {
        description: 'Verifique se as informações estão corretas. Se o erro persistir, contate o suporte.',
        duration: 6000,
      })
      return { success: false }
    }

    livechatMessages = []
    toast.success('Dados adicionados à planilha com sucesso!')
    return { success: true }
  }

  async function startMonitoring({
    liveId,
    onlySuperChats,
    ignorePast,
    spreadsheetId,
    sheetName,
  }: LivechatFormSchema): Promise<void> {
    setIsMonitoring(true)

    if (ignorePast) lastMessageTimestamp = new Date().toISOString()

    const { success: fetchSuccess } = await fetchMessages({ liveId, onlySuperChats })
    if (!fetchSuccess) return stopMonitoring()

    const values = livechatToSheetsAdapter({ livechat: livechatMessages, onlySuperChats }) as SheetsValueType[]

    const { success: appendSuccess } = await appendMessagesToSheets({ spreadsheetId, sheetName, values })
    if (!appendSuccess) return stopMonitoring()

    intervalRef.current = setInterval(async () => {
      const isTokenExpiring = await isTokenExpiringIn(30)
      if (isTokenExpiring) await refreshToken()

      await fetchMessages({ liveId, onlySuperChats })
      const values = livechatToSheetsAdapter({ livechat: livechatMessages, onlySuperChats }) as SheetsValueType[]
      await appendMessagesToSheets({ spreadsheetId, sheetName, values })
    }, FETCH_LIVECHAT_INTERVAL_IN_SECONDS * 1000)
  }

  function stopMonitoring(): void {
    setIsMonitoring(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function toogleMonitoring(data: LivechatFormSchema): void | Promise<void> {
    setStorageItem(spreadsheetIdStorageKey, data.rememberSpreadsheetId ? data.spreadsheetId : null)
    setStorageItem(sheetNameStorageKey, data.rememberSheetName ? data.sheetName : null)
    return isMonitoring ? stopMonitoring() : startMonitoring(data)
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

  return { form, isMonitoring, toogleMonitoring }
}
