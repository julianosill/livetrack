import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { superChatsToRowsAdapter } from '@/adapters'
import {
  generateCsvFile,
  isTokenExpiringIn,
  superchatsToCsvFormDefaultValues,
  type SuperchatsToCsvFormSchema,
  superchatsToCsvFormSchema,
} from '@/helpers'
import { fetchSuperchats, refreshToken } from '@/http'

export function useSuperchatsToCsvForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<SuperchatsToCsvFormSchema>({
    resolver: zodResolver(superchatsToCsvFormSchema),
    defaultValues: superchatsToCsvFormDefaultValues,
    mode: 'onBlur',
  })

  async function exportSuperChatsToCsv({ filename, includeHeader }: SuperchatsToCsvFormSchema): Promise<void> {
    const isTokenExpiring = await isTokenExpiringIn(5)
    if (isTokenExpiring) await refreshToken()

    startTransition(async () => {
      const superchatsResult = await fetchSuperchats()

      if (!superchatsResult.success) {
        toast.error('A extração falhou!', { description: superchatsResult.errorMessage, duration: 6000 })
        return
      }

      const superchats = superchatsResult.superchats ?? []

      if (superchats.length <= 0) {
        toast.info('Nenhum SuperChat foi encontrado.')
        return
      }

      const header = includeHeader
        ? ['Autor', 'Canal do autor', 'Mensagem', 'Moeda', 'Valor', 'Data e Horário']
        : undefined

      const values = superChatsToRowsAdapter(superchats)

      generateCsvFile({ header, values, filename })

      return
    })
  }

  return { form, isPending, exportSuperChatsToCsv }
}
