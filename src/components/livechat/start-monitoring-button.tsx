import { SearchCheck } from 'lucide-react'

import { Button } from '@/components'

export function StartMonitoringButton() {
  return (
    <Button type='submit' size='lg' className='col-start-2 w-full'>
      <SearchCheck />
      Iniciar monitoramento
    </Button>
  )
}
