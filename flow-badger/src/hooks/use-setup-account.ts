import { useLazyTransaction } from './use-lazy-transaction'
import {
  NoArgTransactionArgs,
  TransactionCallbacks,
  TransactionOpts,
  cadence
} from '../flow'

export const useSetupAccount = () => {
  const state = useLazyTransaction<NoArgTransactionArgs>()
  return {
    ...state,
    runTransaction: async (
      opts: Partial<TransactionOpts> = {},
      cbs: Partial<TransactionCallbacks> = {}
    ) => {
      return await state.runTransaction(
        cadence.transactions.soulbound.setup,
        {},
        opts,
        cbs
      )
    }
  }
}
