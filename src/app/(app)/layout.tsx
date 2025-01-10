import { getSession } from '@/auth'
import { Footer, Header } from '@/components'

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  if (!session) return

  return (
    <div className='max-w-4xl mx-auto w-full min-h-svh flex flex-col gap-16 p-6 overflow-hidden'>
      <Header user={session.user} />
      {children}
      <Footer />
    </div>
  )
}
