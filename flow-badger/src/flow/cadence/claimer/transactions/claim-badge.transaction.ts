import { Transaction } from 'flow/cadence/utils/transactions/base.transaction'
import { wrapAddress } from 'flow/wrappers/address.wrapper'
import { wrapUInt64 } from 'flow/wrappers/uint64.wrapper'

const CODE = `
import AnChainSoulboundNFT from 0xAnChainSoulboundNFT
import NonFungibleToken from 0xNonFungibleToken
import SoulboundClaimer from 0xSoulboundClaimer
import MetadataViews from 0xMetadataViews

transaction(adminAddress: Address, claimResourceID: UInt64) {
  let claimer: &{SoulboundClaimer.ClaimerPublic}

  prepare(userAccount: AuthAccount) {
    if userAccount.borrow<&AnChainSoulboundNFT.Collection>(from: AnChainSoulboundNFT.CollectionStoragePath) == nil {
      let collection <-AnChainSoulboundNFT.createEmptyCollection()
      userAccount.save(<-collection, to: AnChainSoulboundNFT.CollectionStoragePath)
    }

    userAccount.unlink(AnChainSoulboundNFT.CollectionPublicPath)
    userAccount.link<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(
      AnChainSoulboundNFT.CollectionPublicPath,
      target: AnChainSoulboundNFT.CollectionStoragePath
    )

    self.claimer = getAccount(adminAddress)
      .getCapability(SoulboundClaimer.SoulboundClaimerPublicPath)
      .borrow<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerPublic}>()
      ?? panic("Could not borrow admin claimer")
  }

  execute {
    if let claim = self.claimer.borrowClaim(id: claimResourceID) {
      claim.claim()
    }
  }
}
`

export interface ClaimBadgeArgs {
  readonly adminAddress: string
  readonly claimResourceID: string
}

export const ClaimBadge =
  new (class ClaimBadgeTransaction extends Transaction<ClaimBadgeArgs> {
    constructor() {
      super(CODE)
    }

    protected resolveArgs(args: ClaimBadgeArgs): unknown[] {
      return [wrapAddress(args.adminAddress), wrapUInt64(args.claimResourceID)]
    }
  })()
