'use server'

import { google } from 'googleapis'

import { getSession } from '@/auth'
import { googleOAuth2Client } from '@/lib/google'
import type { SheetsValueType } from '@/types'

interface AppendToSheetsProps {
  spreadsheetId: string
  sheetName: string
  values: SheetsValueType[]
}

interface AppendToSheetsResult {
  success: boolean
  errorMessage?: string
}

export async function appendToSheets({
  spreadsheetId,
  sheetName,
  values,
}: AppendToSheetsProps): Promise<AppendToSheetsResult> {
  const session = await getSession()
  if (!session) return { success: false }

  googleOAuth2Client.setCredentials(session?.tokens)
  const sheets = google.sheets({ version: 'v4', auth: googleOAuth2Client })

  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
    const sheetExists = spreadsheet.data.sheets?.some(sheet => sheet.properties?.title === sheetName)

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: sheetName } } }] },
      })
    }

    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values },
    })

    if (appendResult.status !== 200) return { success: false }

    return { success: true }
  } catch (error) {
    console.error('Error in appendToSheets:', error)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorCode = (error as any).code ?? 0
    const errorMessage =
      errorCode === 403
        ? 'Você não autorizou a manipulação do Google Sheets. Por favor, saia e entre novamente em sua conta e autorize.'
        : undefined

    return { success: false, errorMessage }
  }
}