import { useState } from 'react'
import {
  TransactionCallbacks,
  TransactionStatus,
  TransactionOpts,
  Transaction
} from '../flow'

export function useLazyTransaction<T>() {
  const [updateData, setUpdateData] = useState<TransactionStatus | null>(null)
  const [data, setData] = useState<TransactionStatus | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const resetTransferState = () => {
    setUpdateData(null)
    setLoading(false)
    setError(null)
    setData(null)
  }

  const runTransaction = async (
    tx: Transaction<T>,
    args: T,
    opts: Partial<TransactionOpts> = {},
    cbs: Partial<TransactionCallbacks> = {}
  ) => {
    return await tx.send(
      args,
      {
        ...cbs,
        onStart: async () => {
          setLoading(true)
          cbs?.onStart != null && (await cbs.onStart())
        },
        onUpdate: async (txData) => {
          setUpdateData(txData)
          cbs?.onUpdate != null && (await cbs.onUpdate(txData))
        },
        onSuccess: async (txData) => {
          setLoading(false)
          setData(txData)
          setError(null)
          cbs?.onSuccess != null && (await cbs.onSuccess(txData))
        },
        onError: async (err) => {
          setLoading(false)
          setData(null)
          setError(
            new Error('Unknown Blockchain error occurred when sending transaction')
          )
          cbs?.onError != null && (await cbs.onError(err))
        }
      },
      opts
    )
  }

  return {
    resetTransferState,
    runTransaction,
    updateData,
    loading,
    error,
    data
  }
}
