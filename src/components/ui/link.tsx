import { cn } from '@/lib/utils'

export function Link({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'border-b text-foreground transition-colors hover:border-primary hover:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}
