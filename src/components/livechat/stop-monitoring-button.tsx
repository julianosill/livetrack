import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components'

export function StopMonitoringButton() {
  return (
    <Button variant='secondary' size='lg' className='animate-pulse col-start-2'>
      <LoaderCircle className='animate-spin' />
      Parar monitoramento
    </Button>
  )
}
