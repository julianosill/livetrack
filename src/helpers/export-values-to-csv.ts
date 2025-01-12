type LineType = (string | number | undefined)[]

interface ExportToCSVProps {
  header?: string[]
  values: LineType[]
  fileName?: string
}

interface ExportToCSVResult {
  success: boolean
  errorMessage?: string
}

export function exportToCSV({ header, values, fileName }: ExportToCSVProps): ExportToCSVResult {
  if (!values || values.length <= 0) {
    return { success: false, errorMessage: 'Nenhum dado para gerar o arquivo CSV foi encontrado.' }
  }

  const csvContent = [
    header ? header.map(escapeValueToCSV).join(',') : '',
    ...values.map(row => row.map(escapeValueToCSV).join(',')),
  ]

  if (!header) csvContent.shift()

  const csvInString = csvContent.join('\n')
  const blob = new Blob([csvInString], { type: 'text/csv;charset=utf-8;' })

  const placeholderName = fileName ?? createFileName(new Date())
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

function escapeValueToCSV(value?: string | number): string {
  if (!value) return ''
  const valueInString = String(value).replace(/"/g, '""')
  return `"${valueInString}"`
}

function createFileName(date: Date) {
  const pad = (n: number): string => String(n).padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`
}
