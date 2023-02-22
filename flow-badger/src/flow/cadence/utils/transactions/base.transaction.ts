import { TransactionCallbacks } from '../../../interfaces/cadence/tx-callbacks.interface'
import { TransactionStatus } from '../../../interfaces/cadence/tx-status.interface'
import { TransactionOpts } from '../../../interfaces/cadence/tx-opts.interface'
import { flowConfig } from '../../../flow.config'
import { Executable } from '../executable'
import * as fcl from '@onflow/fcl'

export abstract class Transaction<T> extends Executable<T, void> {
  protected opts: Partial<TransactionOpts> = {}
  protected auth: unknown | null = null

  constructor(public readonly template: string) {
    super()
  }

  private fvsTx(txId: string, env: string) {
    return `https://flow-view-source.com/${env}/tx/${txId}`
  }

  async send(
    args: T,
    cbs: Partial<TransactionCallbacks> = {},
    opts: Partial<TransactionOpts> = {}
  ) {
    const noop = () => {}

    const callbacks: Required<TransactionCallbacks> = {
      onStart: cbs.onStart ?? noop,
      onSubmit: cbs.onSubmit ?? noop,
      onUpdate: cbs.onUpdate ?? noop,
      onSuccess: cbs.onSuccess ?? noop,
      onError: cbs.onError ?? noop,
      onComplete: cbs.onComplete ?? noop
    }

    const options: Required<TransactionOpts> = {
      payer: opts.payer ?? fcl.authz,
      proposer: opts.proposer ?? fcl.authz,
      authorizations: opts.authorizations ?? [fcl.authz],
      limit: opts.limit ?? 9999
    }

    try {
      await callbacks.onStart()
      const txId: string = await fcl.mutate({
        cadence: this.template,
        args: () => this.resolveArgs(args),
        payer: options.payer,
        proposer: options.proposer,
        authorizations: options.authorizations,
        limit: options.limit
      })

      console.info(
        `%cTX[${txId}]: ${this.fvsTx(txId, flowConfig['flow.network'])}`,
        'color:purple;font-weight:bold;font-family:Montserrat;'
      )

      await callbacks.onSubmit(txId)
      const unsub = await fcl.tx(txId).subscribe(callbacks.onUpdate)
      const txStatus: TransactionStatus = await fcl.tx(txId).onceSealed()
      await unsub()

      console.info(
        `%cTX[${txId}]: ${this.fvsTx(txId, flowConfig['flow.network'])}`,
        'color:green;font-weight:bold;font-family:Montserrat;'
      )

      await callbacks.onSuccess(txStatus)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        await callbacks.onError(err)
      } else {
        await callbacks.onError(new Error(JSON.stringify(err)))
      }
    } finally {
      await callbacks.onComplete()
    }
  }
}
