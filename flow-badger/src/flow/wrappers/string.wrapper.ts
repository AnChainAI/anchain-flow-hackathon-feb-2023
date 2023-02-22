import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapString(str: string) {
  return fcl.arg(str, cdc.String)
}
