import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapOptionalAddress(a: string | null | undefined) {
  return fcl.arg(a ?? null, cdc.Optional(cdc.Address))
}
