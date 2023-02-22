import { Transaction } from './base.transaction'

export type NoArgTransactionArgs = Record<string, never>

export class NoArgTransaction extends Transaction<NoArgTransactionArgs> {
  protected resolveArgs(): unknown[] {
    return []
  }
}
