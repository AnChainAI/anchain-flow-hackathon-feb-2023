import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import { FlowUser } from 'flow'

export function useGetFlowUser() {
  const [flowUser, setFlowUser] = useState<FlowUser>()

  useEffect(() => {
    fcl.currentUser().subscribe(setFlowUser)
  }, [])

  return { flowUser }
}
