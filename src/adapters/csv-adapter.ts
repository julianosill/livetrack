export function csvAdapter(value?: string | number): string {
  if (!value) return ''

  const valueInString = String(value).replace(/"/g, '""')

  return `"${valueInString}"`
}
