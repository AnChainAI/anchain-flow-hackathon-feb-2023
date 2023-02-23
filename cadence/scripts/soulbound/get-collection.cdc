import AnChainSoulboundNFT from "../../contracts/custom/AnChainSoulboundNFT.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"

pub struct Metadata {
  pub let id: UInt64
  pub let url: String
  init(id: UInt64, url: String) {
    self.id = id
    self.url = url
  }  
}

pub struct ScriptStatus {
  pub let statusCode: UInt64
  pub let message: String
  pub let data: [Metadata]?
  init(statusCode: UInt64, message: String, data: [Metadata]?) {
    self.statusCode = statusCode
    self.message = message
    self.data = data
  }
}

pub fun main(address: Address): ScriptStatus {
  let collection = getAccount(address)
    .getCapability(AnChainSoulboundNFT.CollectionPublicPath)
    .borrow<&{MetadataViews.ResolverCollection}>()

  if collection == nil {
    return ScriptStatus(
      statusCode: 400,
      message: "User does not have a collection installed",
      data: nil
    )
  }

  let soulboundNFTs: [Metadata] = []
  let nftCollection = collection!
  for nftID in nftCollection.getIDs() {
    let resolver = nftCollection.borrowViewResolver(id: nftID)

    let view = resolver.resolveView(Type<MetadataViews.Display>())
    if view == nil {
      return ScriptStatus(
        statusCode: 400,
        message: "NFT collection does not implement MetadataViews.Display",
        data: nil
      )
    }

    let data = view! as! MetadataViews.Display
    soulboundNFTs.append(
      Metadata(
        id: nftID,
        url: data.thumbnail.uri()
      )
    )
  }

  return ScriptStatus(
    statusCode: 200,
    message: "OK",
    data: soulboundNFTs
  )
}