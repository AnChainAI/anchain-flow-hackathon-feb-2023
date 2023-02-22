import * as fcl from '@onflow/fcl'

export function logoutOfWallet() {
  fcl.unauthenticate()
}
