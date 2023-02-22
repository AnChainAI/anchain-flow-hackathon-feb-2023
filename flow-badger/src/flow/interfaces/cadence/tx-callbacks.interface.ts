import { TransactionStatus } from './tx-status.interface'

export interface TransactionCallbacks {
  readonly onStart: () => Promise<void> | void
  readonly onSubmit: (txId: string) => Promise<void> | void
  readonly onUpdate: (tx: TransactionStatus) => Promise<void> | void
  readonly onSuccess: (tx: TransactionStatus) => Promise<void> | void
  readonly onError: (err: Error) => Promise<void> | void
  readonly onComplete: () => Promise<void> | void
}
