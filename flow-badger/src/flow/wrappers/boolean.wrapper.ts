import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapBoolean(bool: boolean) {
  return fcl.arg(bool, cdc.Bool)
}
