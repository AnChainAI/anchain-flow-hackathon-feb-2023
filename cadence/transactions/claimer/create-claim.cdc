import AnChainSoulboundNFT from "../../contracts/custom/AnChainSoulboundNFT.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import SoulboundClaimer from "../../contracts/custom/SoulboundClaimer.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"

transaction(
  receiverAddress: Address,
  senderAddress: Address,
  ipfsCID: String,
  fileExt: String,
  metadata: {String:String}
) {
  let claimer: &{SoulboundClaimer.ClaimerAdmin}

  prepare(userAccount: AuthAccount, adminAccount: AuthAccount) {
    if userAccount.borrow<&AnChainSoulboundNFT.Collection>(from: AnChainSoulboundNFT.CollectionStoragePath) == nil {
      let collection <-AnChainSoulboundNFT.createEmptyCollection()
      userAccount.save(<-collection, to: AnChainSoulboundNFT.CollectionStoragePath)
    }

    userAccount.unlink(AnChainSoulboundNFT.CollectionPublicPath)
    userAccount.link<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(
      AnChainSoulboundNFT.CollectionPublicPath,
      target: AnChainSoulboundNFT.CollectionStoragePath
    )

    self.claimer = adminAccount.borrow<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerAdmin}>(
      from: SoulboundClaimer.SoulboundClaimerStoragePath
    ) ?? panic("Could not borrow admin claimer")
  }

  execute {
    self.claimer.createClaim(
      receiverAddress: receiverAddress, 
      senderAddress: senderAddress, 
      ipfsCID: ipfsCID, 
      fileExt: fileExt,
      metadata: metadata
    )
  }
}