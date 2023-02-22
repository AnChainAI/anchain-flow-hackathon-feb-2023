import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapStringArray(s: string[]) {
  return fcl.arg(s, cdc.Array(cdc.String))
}
