import type React from 'react'

import { cn } from '@/lib/utils'

function PageHeaderRoot({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cn('flex flex-col gap-2 pb-12', className)} {...props} />
}

function PageTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-2xl font-semibold text-accent-foreground', className)} {...props} />
}

function PageDescription({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export const PageHeader = {
  Root: PageHeaderRoot,
  Title: PageTitle,
  Description: PageDescription,
}
