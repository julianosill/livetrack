import { Footer } from '@/components'

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='mx-auto flex min-h-svh w-full max-w-4xl flex-col gap-16 overflow-hidden p-6'>
      {children}
      <Footer />
    </div>
  )
}
