import { Transaction } from 'flow/cadence/utils/transactions/base.transaction'
import { wrapAddress } from 'flow/wrappers/address.wrapper'
import { wrapUInt64 } from 'flow/wrappers/uint64.wrapper'
import { flowConfig } from 'flow/flow.config'

const CODE = `
import AnChainSoulboundNFT from 0xAnChainSoulboundNFT
import SoulboundClaimer from 0xSoulboundClaimer

transaction(adminAddress: Address, claimResourceID: UInt64) {
  let claimer: &{SoulboundClaimer.ClaimerPublic}

  prepare() {
    self.claimer = getAccount(adminAddress)
      .getCapability(SoulboundClaimer.SoulboundClaimerPublicPath)
      .borrow<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerPublic}>()
      ?? panic("Could not borrow admin claimer")
  }

  execute {
    self.claimer.cleanUpClaim(id: claimResourceID)
  }
}
`

export interface CleanUpClaimArgs {
  readonly claimResourceID: string
}

export const CleanUpClaim =
  new (class CleanUpClaimTransaction extends Transaction<CleanUpClaimArgs> {
    constructor() {
      super(CODE)
    }

    protected resolveArgs(args: CleanUpClaimArgs): unknown[] {
      return [
        wrapAddress(flowConfig['0xAnChainSoulboundNFT']),
        wrapUInt64(args.claimResourceID)
      ]
    }
  })()
