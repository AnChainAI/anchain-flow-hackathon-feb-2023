import AnChainSoulboundNFT from "../../contracts/custom/AnChainSoulboundNFT.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"

transaction {
  prepare(signer: AuthAccount) {
    if signer.borrow<&AnChainSoulboundNFT.Collection>(from: AnChainSoulboundNFT.CollectionStoragePath) == nil {
      let collection <-AnChainSoulboundNFT.createEmptyCollection()
      signer.save(<-collection, to: AnChainSoulboundNFT.CollectionStoragePath)
    }

    signer.unlink(AnChainSoulboundNFT.CollectionPublicPath)
    signer.link<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(
      AnChainSoulboundNFT.CollectionPublicPath,
      target: AnChainSoulboundNFT.CollectionStoragePath
    )
  }
}