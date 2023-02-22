import { useLazyTransaction } from './use-lazy-transaction'
import {
  TransactionCallbacks,
  TransactionOpts,
  CreateClaimArgs,
  cadence
} from '../flow'

export const useCreateBadge = () => {
  const state = useLazyTransaction<CreateClaimArgs>()
  return {
    ...state,
    runTransaction: async (
      args: any,
      opts: Partial<TransactionOpts> = {},
      cbs: Partial<TransactionCallbacks> = {}
    ) => {
      return await state.runTransaction(
        cadence.transactions.claimer.createClaim,
        args,
        opts,
        cbs
      )
    }
  }
}
