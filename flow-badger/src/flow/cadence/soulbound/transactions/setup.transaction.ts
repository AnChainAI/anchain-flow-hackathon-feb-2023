import { NoArgTransaction } from 'flow/cadence/utils/transactions/no-arg.transaction'

export const SetupSoulboundCollection = new NoArgTransaction(`
import AnChainSoulboundNFT from 0xAnChainSoulboundNFT
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews

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
`)
