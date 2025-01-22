export function generateCsvFilename(filename?: string) {
  if (filename) return filename

  const date = new Date()

  const pad = (n: number): string => String(n).padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`
}
