import AnChainSoulboundNFT from "../../contracts/custom/AnChainSoulboundNFT.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import SoulboundClaimer from "../../contracts/custom/SoulboundClaimer.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"

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