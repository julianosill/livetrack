import { Footer } from '@/components'

export default async function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-4xl mx-auto w-full min-h-svh flex flex-col gap-16 p-6 overflow-hidden'>
      {children}
      <Footer />
    </div>
  )
}
