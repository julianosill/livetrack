'use client'

import { Checkbox, Form, Input, Separator, Show } from '@/components'
import { BASE_URLS } from '@/constants'
import { useLivechatForm } from '@/hooks'
import { cn } from '@/lib/utils'

import { StartMonitoringButton } from './start-monitoring-button'
import { StopMonitoringButton } from './stop-monitoring-button'

export function LivechatForm({ className, ...props }: Readonly<React.HTMLAttributes<HTMLFormElement>>) {
  const { form, isMonitoring, toogleMonitoring } = useLivechatForm()

  const liveIdSample = 'a082ca9e79b'
  const liveIdPlaceholder = `Ex.: ${liveIdSample} ou ${BASE_URLS.youtubeStreaming}${liveIdSample}`

  return (
    <Form.Root {...form}>
      <Form.Wrapper onSubmit={form.handleSubmit(toogleMonitoring)} className={cn('gap-4', className)} {...props}>
        <Form.Field
          required
          name='liveId'
          control={form.control}
          render={({ field }) => (
            <Form.Item className='sm:grid grid-cols-form'>
              <Form.Label className='sm:self-center'>ID ou URL da live</Form.Label>
              <div className='relative'>
                <Form.Control>
                  <Input placeholder={liveIdPlaceholder} {...field} />
                </Form.Control>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />

        <fieldset className='sm:grid gap-3 grid-cols-form'>
          <div className='col-start-2 flex gap-x-6 gap-y-4 flex-wrap'>
            <Form.Field
              name='onlySuperChats'
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Checkbox.Wrapper className='col-start-2'>
                    <Form.Control>
                      <Checkbox.Check
                        title='Monitorar apenas Super Chats'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Form.Control>
                    <Form.Label type='checkbox'>Monitorar apenas Super Chats</Form.Label>
                  </Checkbox.Wrapper>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              name='ignorePast'
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Checkbox.Wrapper className='col-start-0'>
                    <Form.Control>
                      <Checkbox.Check
                        title='Ignorar comentários passados'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Form.Control>
                    <Form.Label type='checkbox'>Ignorar comentários passados</Form.Label>
                  </Checkbox.Wrapper>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </fieldset>

        <Separator className='my-2' />

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
          <Show when={isMonitoring} render={<StopMonitoringButton />} fallback={<StartMonitoringButton />} />
        </Form.Footer>
      </Form.Wrapper>
    </Form.Root>
  )
}
