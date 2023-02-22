import * as cdcTypes from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapUInt64(num: number | string) {
  return fcl.arg(num.toString(), cdcTypes.UInt64)
}
