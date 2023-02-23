import { useLazyTransaction } from './use-lazy-transaction'
import {
  TransactionCallbacks,
  TransactionOpts,
  ClaimBadgeArgs,
  cadence
} from '../flow'

export const useClaimBadge = () => {
  const state = useLazyTransaction<ClaimBadgeArgs>()
  return {
    ...state,
    runTransaction: async (
      args: ClaimBadgeArgs,
      opts: Partial<TransactionOpts> = {},
      cbs: Partial<TransactionCallbacks> = {}
    ) => {
      return await state.runTransaction(
        cadence.transactions.claimer.claimBadge,
        args,
        opts,
        cbs
      )
    }
  }
}
