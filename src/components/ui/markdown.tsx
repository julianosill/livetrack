import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface MarkdownProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof markdownVariants> {
  as?: React.ElementType
}

const markdownVariants = cva(
  'prose text-foreground prose-headings:text-accent-foreground prose-strong:text-foreground prose-headings:font-semibold leading-normal max-w-full',
  {
    variants: {
      variant: {
        docs: 'prose-h1:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-xl',
      },
    },
    defaultVariants: { variant: 'docs' },
  },
)

export function Markdown({ as: Component = 'div', variant, className, ...props }: MarkdownProps) {
  return <Component className={cn(markdownVariants({ variant, className }))} {...props} />
}
