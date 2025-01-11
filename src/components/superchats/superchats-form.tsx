'use client'

import { LoaderCircle, MessageSquareQuote } from 'lucide-react'

import { Button, Checkbox, Form, Input, Separator, Show } from '@/components'
import { useSuperchatsForm } from '@/hooks'
import { cn } from '@/lib/utils'

export function SuperchatsForm({ className, ...props }: Readonly<React.HTMLAttributes<HTMLFormElement>>) {
  const { form, isPending, handleSuperChatsExport } = useSuperchatsForm()

  return (
    <Form.Root {...form}>
      <Form.Wrapper onSubmit={form.handleSubmit(handleSuperChatsExport)} className={cn('gap-4', className)} {...props}>
        <Form.Field
          required
          name='spreadsheetId'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='sm:grid grid-cols-form'>
              <Form.Label className='sm:self-center'>ID ou URL da planilha</Form.Label>
              <div className='relative'>
                <Form.Control>
                  <Input placeholder='Ex: 1_vYf2yoOo-xjwj48zMdaTT9rcb0Udotm9xuaCW-FEek' {...field} />
                </Form.Control>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />

        <Form.Field
          name='rememberSpreadsheetId'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='sm:grid grid-cols-form'>
              <Checkbox.Wrapper className='col-start-2'>
                <Form.Control>
                  <Checkbox.Check
                    title='Lembrar o ID da planilha'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Form.Control>
                <Form.Label type='checkbox'>Lembrar o ID da planilha</Form.Label>
              </Checkbox.Wrapper>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Separator className='my-2' />

        <Form.Field
          required
          name='sheetName'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='sm:grid grid-cols-form'>
              <Form.Label className='sm:self-center'>Nome da planilha</Form.Label>
              <div className='relative'>
                <Form.Control>
                  <Input placeholder='Ex: Superchats' {...field} />
                </Form.Control>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />

        <Form.Field
          name='rememberSheetName'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='sm:grid grid-cols-form'>
              <Checkbox.Wrapper className='col-start-2'>
                <Form.Control>
                  <Checkbox.Check
                    title='Lembrar o nome da planilha'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Form.Control>
                <Form.Label type='checkbox'>Lembrar o nome da planilha</Form.Label>
              </Checkbox.Wrapper>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Footer className='sm:grid gap-3 grid-cols-form'>
          <Button type='submit' size='lg' className='col-start-2 w-full' disabled={isPending}>
            <Show
              when={isPending}
              render={<LoaderCircle className='animate-spin' />}
              fallback={<MessageSquareQuote />}
            />
            Exportar SuperChats
          </Button>
        </Form.Footer>
      </Form.Wrapper>
    </Form.Root>
  )
}