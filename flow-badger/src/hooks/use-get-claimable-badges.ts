import { useScript } from './use-script'
import { cadence } from '../flow'

export const useGetClaimableBadges = () =>
  useScript(cadence.scripts.claimer.getClaims)
