import * as cdcTypes from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function wrapAddress(addr: string) {
  return fcl.arg(fcl.withPrefix(addr), cdcTypes.Address)
}
