import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components'

export function StopMonitoringButton() {
  return (
    <Button type='submit' variant='secondary' size='lg' className='animate-pulse col-start-2 w-full'>
      <LoaderCircle className='animate-spin' />
      Parar monitoramento
    </Button>
  )
}
