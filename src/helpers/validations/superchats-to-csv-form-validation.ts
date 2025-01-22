import { z } from 'zod'

export const superchatsToCsvFormSchema = z.object({
  filename: z.string().optional(),
  includeHeader: z.boolean().optional(),
})

export type SuperchatsToCsvFormSchema = z.infer<typeof superchatsToCsvFormSchema>

export const superchatsToCsvFormDefaultValues: SuperchatsToCsvFormSchema = {
  filename: '',
  includeHeader: false,
}
