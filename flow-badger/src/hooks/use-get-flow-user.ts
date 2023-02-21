import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'

export function useGetFlowUser() {
  const [flowUser, setFlowUser] = useState<any>()

  useEffect(() => {
    fcl.currentUser().subscribe(setFlowUser)
  }, [])

  return { flowUser }
}
