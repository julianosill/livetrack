'use client'

import { CircleCheck, CircleX } from 'lucide-react'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { Toaster, type ToasterProps } from 'sonner'

export default function Providers({ children }: { children: ReactNode }) {
  const toasterIcons: ToasterProps['icons'] = {
    success: <CircleCheck className='size-5' />,
    error: <CircleX className='size-5' />,
  }

  return (
    <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange>
      <Toaster position='top-right' icons={toasterIcons} richColors closeButton toastOptions={{ className: 'gap-3' }} />
      {children}
    </ThemeProvider>
  )
}
