import { getSession } from '@/auth'
import { Footer, Header } from '@/components'

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  if (!session) return

  return (
    <div className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-16 overflow-hidden p-6'>
      <Header user={session.user} />
      {children}
      <Footer />
    </div>
  )
}
