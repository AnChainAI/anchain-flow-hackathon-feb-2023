import { useLazyTransaction } from './use-lazy-transaction'
import {
  TransactionCallbacks,
  CleanUpClaimArgs,
  TransactionOpts,
  cadence
} from '../flow'

export const useCleanUpClaim = () => {
  const state = useLazyTransaction<CleanUpClaimArgs>()
  return {
    ...state,
    runTransaction: async (
      args: CleanUpClaimArgs,
      opts: Partial<TransactionOpts> = {},
      cbs: Partial<TransactionCallbacks> = {}
    ) => {
      return await state.runTransaction(
        cadence.transactions.claimer.cleanupClaim,
        args,
        opts,
        cbs
      )
    }
  }
}
