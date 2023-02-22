import * as cdcTypes from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapUInt64Array(nums: number[] | string[]) {
  return fcl.arg(nums.map(String), cdcTypes.Array(cdcTypes.UInt64))
}
