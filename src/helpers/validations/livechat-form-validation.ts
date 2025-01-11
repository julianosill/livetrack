import { z } from 'zod'

import { extractId } from '@/helpers'

export const livechatFormSchema = z.object({
  liveId: z
    .string()
    .min(11, 'Insira o ID ou endereço da live')
    .transform(input => extractId(input)),
  onlySuperChats: z.boolean(),
  ignorePast: z.boolean(),
  spreadsheetId: z
    .string()
    .min(44, 'Insira um ID ou URL válida da sua planilha')
    .transform(input => extractId(input)),
  rememberSpreadsheetId: z.boolean(),
  sheetName: z.string().min(1, 'Insira o nome da planilha'),
  rememberSheetName: z.boolean(),
})

export type LivechatFormSchema = z.infer<typeof livechatFormSchema>

export const livechatFormDefaultValues: LivechatFormSchema = {
  liveId: '',
  onlySuperChats: false,
  ignorePast: false,
  spreadsheetId: '',
  rememberSpreadsheetId: false,
  sheetName: '',
  rememberSheetName: false,
}
