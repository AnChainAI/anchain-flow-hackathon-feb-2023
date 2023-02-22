import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapOptionalString(s: string | null | undefined) {
  return fcl.arg(s ?? null, cdc.Optional(cdc.String))
}
