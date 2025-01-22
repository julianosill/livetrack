import { csvAdapter } from '@/adapters'

import { generateCsvFilename } from './generate-csv-filename'

type RowType = (string | number | undefined)[]

interface GenerateCsvFileProps {
  header?: string[]
  values: RowType[]
  filename?: string
}

interface GenerateCsvFileResult {
  success: boolean
  errorMessage?: string
}

export function generateCsvFile({ header, values, filename }: GenerateCsvFileProps): GenerateCsvFileResult {
  if (!values || values.length <= 0) {
    return { success: false, errorMessage: 'Nenhum dado para gerar o arquivo CSV foi encontrado.' }
  }

  const csvContent = [
    header ? header.map(csvAdapter).join(',') : '',
    ...values.map(row => row.map(csvAdapter).join(',')),
  ]

  if (!header) csvContent.shift()

  const csvInString = csvContent.join('\n')
  const blob = new Blob([csvInString], { type: 'text/csv;charset=utf-8;' })

  const placeholderName = generateCsvFilename(filename)
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.href = url
  link.download = placeholderName
  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return { success: true }
}
