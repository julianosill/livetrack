import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const alertVariants = cva('flex w-full flex-col gap-2 rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const AlertRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role='alert' className={cn(alertVariants({ variant }), className)} {...props} />
))
AlertRoot.displayName = 'AlertRoot'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h5 ref={ref} className={cn('font-medium leading-tight', className)} {...props} />,
)
AlertTitle.displayName = 'AlertTitle'

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ as: Component = 'p', className, ...props }, ref) => (
    <Component ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
)
AlertDescription.displayName = 'AlertDescription'

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
}
