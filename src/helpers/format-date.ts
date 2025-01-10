export function formatDate(input: Date | string | number, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(input)

  return date.toLocaleDateString('pt-BR', options)
}
