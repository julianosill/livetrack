import { BASE_URLS } from '@/constants'

export function extractId(input: string) {
  const { spreadsheet, youtubeStreaming } = BASE_URLS

  if (input.startsWith(youtubeStreaming)) {
    const urlParts = input.split(youtubeStreaming)
    return urlParts[1].substring(0, 11)
  }

  if (input.startsWith(spreadsheet)) {
    const urlParts = input.split(spreadsheet)
    return urlParts[1].substring(0, 44)
  }

  return input
}
