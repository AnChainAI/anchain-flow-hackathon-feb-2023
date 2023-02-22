import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapUFix64(num: number) {
  return fcl.arg(num.toFixed(8), cdc.UFix64)
}
