'use client'

import { FileDown, LoaderCircle } from 'lucide-react'

import { Button, Checkbox, Form, Input, Separator, Show } from '@/components'
import { useSuperchatsToCsvForm } from '@/hooks'
import { cn } from '@/lib/utils'

export function SuperchatsToCsvForm({ className, ...props }: Readonly<React.HTMLAttributes<HTMLFormElement>>) {
  const { form, isPending, exportSuperChatsToCsv } = useSuperchatsToCsvForm()

  return (
    <Form.Root {...form}>
      <Form.Wrapper onSubmit={form.handleSubmit(exportSuperChatsToCsv)} className={cn('gap-4', className)} {...props}>
        <Form.Field
          name='filename'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='grid-cols-form sm:grid'>
              <Form.Label className='sm:self-center'>Nome do arquivo</Form.Label>
              <div className='relative'>
                <Form.Control>
                  <Input
                    placeholder='Insira um nome para o arquivo ou deixe a aplicação gerar automaticamente'
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />

        <Separator className='my-2' />

        <Form.Field
          name='includeHeader'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='grid-cols-form sm:grid'>
              <Checkbox.Wrapper className='col-start-2'>
                <Form.Control>
                  <Checkbox.Check title='Incluir cabeçalho' checked={field.value} onCheckedChange={field.onChange} />
                </Form.Control>
                <Form.Label type='checkbox'>Incluir cabeçalho descritivo de cada campo</Form.Label>
              </Checkbox.Wrapper>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Footer className='grid-cols-form gap-3 sm:grid'>
          <Button type='submit' size='lg' className='col-start-2 w-full' disabled={isPending}>
            <Show when={isPending} render={<LoaderCircle className='animate-spin' />} fallback={<FileDown />} />
            Exportar SuperChats
          </Button>
        </Form.Footer>
      </Form.Wrapper>
    </Form.Root>
  )
}
