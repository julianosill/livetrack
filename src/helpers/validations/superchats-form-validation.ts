import { z } from 'zod'

import { extractId } from '@/helpers'

export const superchatsFormSchema = z.object({
  spreadsheetId: z
    .string()
    .min(44, 'Insira um ID ou URL válida da sua planilha')
    .transform(input => extractId(input)),
  rememberSpreadsheetId: z.boolean(),
  sheetName: z.string().min(1, 'Insira o nome da planilha'),
  rememberSheetName: z.boolean(),
})

export type SuperchatsFormSchema = z.infer<typeof superchatsFormSchema>

export const superchatsFormDefaultValues: SuperchatsFormSchema = {
  spreadsheetId: '',
  rememberSpreadsheetId: false,
  sheetName: '',
  rememberSheetName: false,
}
