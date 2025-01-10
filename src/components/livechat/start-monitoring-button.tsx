import { SearchCheck } from 'lucide-react'

import { Button } from '@/components'

export function StartMonitoringButton() {
  return (
    <Button size='lg' className='col-start-2'>
      <SearchCheck />
      Iniciar monitoramento
    </Button>
  )
}
