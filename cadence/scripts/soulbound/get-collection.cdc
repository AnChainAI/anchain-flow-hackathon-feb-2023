import AnChainSoulboundNFT from "../../contracts/custom/AnChainSoulboundNFT.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"

pub struct ScriptStatus {
  pub let statusCode: UInt64
  pub let message: String
  pub let data: [&NonFungibleToken.NFT]?
  init(statusCode: UInt64, message: String, data: [&NonFungibleToken.NFT]?) {
    self.statusCode = statusCode
    self.message = message
    self.data = data
  }
}

pub fun main(address: Address): ScriptStatus {
  let collection = getAccount(address)
    .getCapability(AnChainSoulboundNFT.CollectionPublicPath)
    .borrow<&{NonFungibleToken.CollectionPublic}>()

  if collection == nil {
    return ScriptStatus(
      statusCode: 400,
      message: "User does not have a collection installed",
      data: nil
    )
  }

  let soulboundNFTs: [&NonFungibleToken.NFT] = []
  let nftCollection = collection!
  for nftID in nftCollection.getIDs() {
    soulboundNFTs.append(nftCollection.borrowNFT(id: nftID))
  }

  return ScriptStatus(
    statusCode: 200,
    message: "OK",
    data: soulboundNFTs
  )
}