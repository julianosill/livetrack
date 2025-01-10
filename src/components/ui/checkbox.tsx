'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const CheckboxWrapper = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />,
)
CheckboxWrapper.displayName = 'CheckboxWrapper'

export interface CheckboxCheckProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  title: string
}

const CheckboxCheck = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxCheckProps>(
  ({ title, className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer size-5 shrink-0 rounded border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className='size-3.5' strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
      <span className='sr-only'>{title}</span>
    </CheckboxPrimitive.Root>
  ),
)
CheckboxCheck.displayName = CheckboxPrimitive.Root.displayName

const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className)}
    {...props}
  />
))
CheckboxLabel.displayName = LabelPrimitive.Root.displayName

export const Checkbox = {
  Wrapper: CheckboxWrapper,
  Check: CheckboxCheck,
  Label: CheckboxLabel,
}

/* USAGE

  <Checkbox.Wrapper>
    <Checkbox.Check />
    <Checkbox.Label />
  </Checkbox.Wrapper>

*/
