import '@/styles/globals.css'

import type { Metadata } from 'next'

import Providers from '@/app/providers'
import { inter } from '@/lib/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | LiveTrack',
    default: 'LiveTrack',
  },
  description: 'Capture e salve comentários e SuperChats de lives do YouTube em tempo real no Google Sheets.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR' className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}