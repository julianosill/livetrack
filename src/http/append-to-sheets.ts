'use server'

import { getSession } from '@/auth'
import { googleOAuth2Client, googleSheets } from '@/lib/google'
import type { GoogleSheetsRowsType } from '@/types/google-sheets'

interface AppendToSheetsProps {
  spreadsheetId: string
  sheetName: string
  values: GoogleSheetsRowsType[]
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
  const googleSheetsClient = googleSheets(googleOAuth2Client)

  try {
    const spreadsheet = await googleSheetsClient.spreadsheets.get({ spreadsheetId })
    const sheetExists = spreadsheet.data.sheets?.some(sheet => sheet.properties?.title === sheetName)

    if (!sheetExists) {
      await googleSheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: sheetName } } }] },
      })
    }

    const appendResult = await googleSheetsClient.spreadsheets.values.append({
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
