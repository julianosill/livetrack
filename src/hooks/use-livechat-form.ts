import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { livechatToSheetsAdapter } from '@/adapters'
import { FETCH_LIVECHAT_INTERVAL_IN_SECONDS, STORAGE_KEYS } from '@/constants'
import {
  appendValuesToSheets,
  getStorageItem,
  isTokenExpiringIn,
  livechatFormDefaultValues,
  type LivechatFormSchema,
  livechatFormSchema,
  setStorageItem,
} from '@/helpers'
import { fetchStreamingLivechat, refreshToken } from '@/http'
import type { LivechatItemType, SheetsValueType } from '@/types'

interface FetchLivechatProps {
  liveId: string
  onlySuperChats?: boolean
}

interface FetchLivechatResult {
  success: boolean
  messages?: LivechatItemType[]
}

export function useLivechatForm() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const spreadsheetIdStorageKey = STORAGE_KEYS.livechat.spreadsheetId
  const sheetNameStorageKey = STORAGE_KEYS.livechat.sheetName

  let lastMessageTimestamp = ''

  const form = useForm<LivechatFormSchema>({
    resolver: zodResolver(livechatFormSchema),
    values: livechatFormDefaultValues,
    mode: 'onBlur',
  })

  async function fetchLivechat({ liveId, onlySuperChats }: FetchLivechatProps): Promise<FetchLivechatResult> {
    const livechatResult = await fetchStreamingLivechat({ liveId, onlySuperChats, lastMessageTimestamp })

    if (!livechatResult.success) {
      stopMonitoring()
      toast.error('O monitoramento falhou!', { description: livechatResult.errorMessage, duration: 6000 })
      return { success: false }
    }

    const messages = livechatResult.items ?? []
    const lastMessage = messages[messages.length - 1]
    lastMessageTimestamp = lastMessage?.publishedAt ?? ''

    return { success: true, messages }
  }

  async function startMonitoring({
    liveId,
    onlySuperChats,
    ignorePast,
    spreadsheetId,
    sheetName,
  }: LivechatFormSchema): Promise<void> {
    const isTokenExpiring = await isTokenExpiringIn(5)
    if (isTokenExpiring) await refreshToken()

    setIsMonitoring(true)
    if (ignorePast) lastMessageTimestamp = new Date().toISOString()

    const fetchResult = await fetchLivechat({ liveId, onlySuperChats })
    if (!fetchResult.success) return stopMonitoring()

    const values = livechatToSheetsAdapter({ livechat: fetchResult.messages, onlySuperChats }) as SheetsValueType[]
    const appendResult = await appendValuesToSheets({ spreadsheetId, sheetName, values, onError: stopMonitoring })
    if (!appendResult.success) return stopMonitoring()

    intervalRef.current = setInterval(async () => {
      const isTokenExpiring = await isTokenExpiringIn(5)
      if (isTokenExpiring) await refreshToken()

      const fetchResult = await fetchLivechat({ liveId, onlySuperChats })
      if (!fetchResult.success) return stopMonitoring()

      const values = livechatToSheetsAdapter({ livechat: fetchResult.messages, onlySuperChats }) as SheetsValueType[]
      const appendResult = await appendValuesToSheets({ spreadsheetId, sheetName, values, onError: stopMonitoring })
      if (!appendResult.success) return stopMonitoring()
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
