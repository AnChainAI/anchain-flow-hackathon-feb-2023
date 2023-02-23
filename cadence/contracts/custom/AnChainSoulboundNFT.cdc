import NonFungibleToken from "../standard/NonFungibleToken.cdc"
import MetadataViews from "../standard/MetadataViews.cdc"

pub contract AnChainSoulboundNFT: NonFungibleToken {
  pub let deployBlockHeight: UInt64
  pub let contractName: String
  pub var totalSupply: UInt64

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)
  pub event Minted(id: UInt64, address: Address?)
  pub event Burned(id: UInt64, address: Address?)

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let MinterStoragePath: StoragePath

  pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
    pub let id: UInt64
    pub let name: String
    pub let mintBlockHeight: UInt64    
    pub let asset: MetadataViews.Media
    access(self) let metadata: {String:String}

    init(
      name: String,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:String}
    ) {
      self.id = AnChainSoulboundNFT.totalSupply
      self.name = name
      self.mintBlockHeight = getCurrentBlock().height
      self.metadata = metadata
      self.asset = MetadataViews.Media(
        file: MetadataViews.IPFSFile(cid: ipfsCID, path: nil),
        mediaType: fileExt
      )

      emit Minted(id: self.id, address: self.owner?.address)

      AnChainSoulboundNFT.totalSupply = AnChainSoulboundNFT.totalSupply + 1
    }
  
    pub fun getViews(): [Type] {
      return [
        Type<MetadataViews.Display>(),
        Type<MetadataViews.Editions>(),
        Type<MetadataViews.NFTCollectionData>(),
        Type<MetadataViews.NFTView>(),
        Type<MetadataViews.Media>(),
        Type<MetadataViews.NFTCollectionDisplay>(),
        Type<MetadataViews.ExternalURL>(),
        Type<MetadataViews.Royalties>(),
        Type<MetadataViews.Traits>(),
        Type<MetadataViews.Serial>(),
        Type<Block?>()
      ]
    }

    priv fun getEmptyNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay {
      let emptyMedia = MetadataViews.Media(
        file: MetadataViews.HTTPFile(url: ""),
        mediaType: ""
      )
      return MetadataViews.NFTCollectionDisplay(
        name: "",
        description: "",
        externalURL: MetadataViews.ExternalURL(""),
        squareImage: emptyMedia,
        bannerImage: emptyMedia,
        socials: {}
      )
    }

    pub fun resolveView(_ view: Type): AnyStruct? {
      switch view {
        case Type<MetadataViews.Display>():
          let maybeView1 = self.resolveView(Type<MetadataViews.NFTCollectionDisplay>())
          let view1 = maybeView1 == nil
            ? self.getEmptyNFTCollectionDisplay()
            : (maybeView1! as! MetadataViews.NFTCollectionDisplay)

          let maybeView2 = self.resolveView(Type<MetadataViews.ExternalURL>())
          let view2 = maybeView2 == nil
            ? MetadataViews.ExternalURL(self.asset.file.uri())
            : (maybeView2! as! MetadataViews.ExternalURL)

          return MetadataViews.Display(
            name: view1.name,
            description: view1.description,
            thumbnail: MetadataViews.HTTPFile(url: view2.url)
          )

        case Type<MetadataViews.Editions>():
          // There is no max number of NFTs that can be minted from this contract
          // so the max edition field value is set to nil
          let maybeView = self.resolveView(Type<MetadataViews.NFTCollectionDisplay>())
          let view = maybeView == nil
            ? self.getEmptyNFTCollectionDisplay()
            : maybeView! as! MetadataViews.NFTCollectionDisplay
          
          return MetadataViews.Editions([
            MetadataViews.Edition(
              name: view.name,
              number: self.id, 
              max: nil
            )
          ])

        case Type<MetadataViews.NFTCollectionData>():
          return MetadataViews.NFTCollectionData(
            storagePath: AnChainSoulboundNFT.CollectionStoragePath,
            publicPath: AnChainSoulboundNFT.CollectionPublicPath,
            providerPath: /private/AnChainoulboundNFT,
            publicCollection: Type<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(),
            publicLinkedType: Type<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
            providerLinkedType: Type<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
            createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
              return <-AnChainSoulboundNFT.createEmptyCollection()
            })
          )

        case Type<MetadataViews.NFTView>():
          return MetadataViews.NFTView(
            id: self.id,
            uuid: self.uuid,
            display: self.resolveView(Type<MetadataViews.Display>()) as! MetadataViews.Display?,
            externalURL: self.resolveView(Type<MetadataViews.ExternalURL>()) as! MetadataViews.ExternalURL?,
            collectionData: self.resolveView(Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?,
            collectionDisplay: self.resolveView(Type<MetadataViews.NFTCollectionDisplay>()) as! MetadataViews.NFTCollectionDisplay?,
            royalties: self.resolveView(Type<MetadataViews.Royalties>()) as! MetadataViews.Royalties?,
            traits: self.resolveView(Type<MetadataViews.Traits>()) as! MetadataViews.Traits?,
          )

        case Type<MetadataViews.Media>():
          let maybeView = self.resolveView(Type<MetadataViews.ExternalURL>())
          let view = maybeView == nil
            ? MetadataViews.ExternalURL(self.asset.file.uri())
            : maybeView! as! MetadataViews.ExternalURL

          return MetadataViews.Media(
            file: MetadataViews.HTTPFile(url: view.url),
            mediaType: self.asset.mediaType
          )

        case Type<MetadataViews.NFTCollectionDisplay>():
          let emptyMedia = MetadataViews.Media(
            file: MetadataViews.HTTPFile(url: ""),
            mediaType: ""
          )
          return MetadataViews.NFTCollectionDisplay(
            name: AnChainSoulboundNFT.contractName,
            description: "AnChain's Soulbound NFT collection",
            externalURL: MetadataViews.ExternalURL("flowbadger.tenzingai.com"),
            squareImage: emptyMedia,
            bannerImage: emptyMedia,
            socials: {}
          )

        case Type<MetadataViews.ExternalURL>():
          return MetadataViews.ExternalURL("https://ipfs.tenzingai.com/ipfs/".concat((self.asset.file as! MetadataViews.IPFSFile).cid))

        case Type<MetadataViews.Royalties>():
          return MetadataViews.Royalties([])

        case Type<MetadataViews.Traits>():
          return MetadataViews.dictToTraits(dict: self.metadata, excludedNames: [])

        case Type<MetadataViews.Serial>():
          return MetadataViews.Serial(self.id)

        case Type<Block?>():
          return getBlock(at: self.mintBlockHeight)
      }
      return nil
    }

    destroy() {
      emit Burned(id: self.id, address: self.owner?.address)
    }
  }

  pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

    init () {
      self.ownedNFTs <- {}
    }

    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
      panic("Cannot withdraw a soulbound NFT")
    }

    pub fun deposit(token: @NonFungibleToken.NFT) {
      let token <- token as! @AnChainSoulboundNFT.NFT

      let id: UInt64 = token.id

      // add the new token to the dictionary which removes the old one
      let oldToken <- self.ownedNFTs[id] <- token

      emit Deposit(id: id, to: self.owner?.address)

      destroy oldToken
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedNFTs.keys
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      if let nft = &self.ownedNFTs[id] as &NonFungibleToken.NFT? {
        return nft
      }
      panic("NFT not found in collection.")
    }

    pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
      if let nft = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT? {
        return nft as! &AnChainSoulboundNFT.NFT
      }
      panic("NFT not found in collection.")
    }

    destroy() {
      destroy self.ownedNFTs
    }
  }

  pub fun createEmptyCollection(): @NonFungibleToken.Collection {
    return <- create Collection()
  }

  pub resource NFTMinter {
    pub fun mintNFT(_ name: String, _ ipfsCID: String, _ fileExt: String, _ metadata: {String:String}): @NFT {
      return <- create NFT(name: name, ipfsCID: ipfsCID, fileExt: fileExt, metadata: metadata)
    }
  }

  init() {
    // Initialize contract fields
    self.deployBlockHeight = getCurrentBlock().height
    self.contractName = "AnChainSoulboundNFT"
    self.totalSupply = 0

    // Set the named paths
    self.CollectionStoragePath = /storage/AnChainSoulboundNFTCollection
    self.CollectionPublicPath = /public/AnChainSoulboundNFTCollection
    self.MinterStoragePath = /storage/AnChainSoulboundNFTMinter

    // Create a Collection resource and save it to storage
    let collection <- create Collection()
    self.account.save(<-collection, to: self.CollectionStoragePath)

    // Create a public capability for the collection
    self.account.link<&AnChainSoulboundNFT.Collection{NonFungibleToken.CollectionPublic,MetadataViews.ResolverCollection}>(
      self.CollectionPublicPath, 
      target: self.CollectionStoragePath
    )

    // Create a Minter resource and save it to storage
    let minter <- create NFTMinter()
    self.account.save(<-minter, to: self.MinterStoragePath)

    emit ContractInitialized()
  }
}
 