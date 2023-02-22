import { useEffect, useState } from 'react'
import { useScript } from './use-script'
import { cadence } from '../flow'

export const useGetClaimableBadges = () => {
  const [hasCollection, setHasCollection] = useState<boolean | null>()
  const scriptState = useScript(cadence.scripts.claimer.getClaims)

  useEffect(() => {
    if (scriptState.error instanceof Error) {
      setHasCollection(false)
    } else if (scriptState.data) {
      setHasCollection(true)
    }
  }, [scriptState.error, scriptState.data])

  return { hasCollection, ...scriptState }
}
