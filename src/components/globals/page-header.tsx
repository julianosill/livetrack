import type React from 'react'

import { cn } from '@/lib/utils'

function PageHeaderRoot({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cn('pb-12 flex flex-col gap-2', className)} {...props} />
}

function PageTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('font-semibold text-2xl text-accent-foreground', className)} {...props} />
}

function PageDescription({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <p className={cn('text-muted-foreground text-sm', className)} {...props} />
}

export const PageHeader = {
  Root: PageHeaderRoot,
  Title: PageTitle,
  Description: PageDescription,
}
