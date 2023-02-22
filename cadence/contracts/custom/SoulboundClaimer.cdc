import NonFungibleToken from "../standard/NonFungibleToken.cdc"
import AnChainSoulboundNFT from "./AnChainSoulboundNFT.cdc"

pub contract SoulboundClaimer {
  pub event ContractInitialized()
  pub event ClaimerInitialized(owner: Address?, claimerResourceID: UInt64)
  pub event ClaimerDestroyed(owner: Address?, claimerResourceID: UInt64)
  pub event ClaimAvailable(owner: Address?, claimerResourceID: UInt64, claimResourceID: UInt64, details: ClaimDetails)
  pub event ClaimCompleted(owner: Address?, claimerResourceID: UInt64, claimResourceID: UInt64,  details: ClaimDetails)

  pub let NFTClaimerStoragePath: StoragePath
  pub let NFTClaimerPublicPath: PublicPath

  pub struct ClaimDetails {
    pub let receiverAddress: Address
    pub let senderAddress: Address
    pub var isFulfilled: Bool
    pub let ipfsCID: String
    pub let fileExt: String
    pub let metadata: {String:String}
  
    access(contract) fun setToFulfilled() {
      self.isFulfilled = true
    }

    init(
      receiverAddress: Address,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:String}
    ) {
      self.receiverAddress = receiverAddress
      self.senderAddress = senderAddress
      self.isFulfilled = false
      self.ipfsCID = ipfsCID
      self.fileExt = fileExt
      self.metadata = metadata
    }
  }

  pub resource interface ClaimPublic {
    pub fun getDetails(): ClaimDetails
    pub fun claim()
  }

  pub resource Claim : ClaimPublic {
    access(self) let receiver: Capability<&{NonFungibleToken.CollectionPublic}>
    access(self) let details: ClaimDetails

    pub fun getDetails(): ClaimDetails {
      return self.details
    }

    pub fun claim() {
      pre {
        !self.details.isFulfilled: "Already claimed"
        self.receiver.check(): "Invalid recipient capability"
      }

      let sbtMinter = SoulboundClaimer.account.borrow<&AnChainSoulboundNFT.NFTMinter>(
        from: AnChainSoulboundNFT.MinterStoragePath
      ) ?? panic("Minter not found in account")

      self.receiver.borrow()!.deposit(
        token: <- sbtMinter.mintNFT(
          self.details.ipfsCID,
          self.details.fileExt,
          self.details.metadata
        )
      )

      self.details.setToFulfilled()

      emit ClaimCompleted(
        owner: self.owner?.address,
        claimerResourceID: self.uuid,
        claimResourceID: self.uuid,
        details: self.getDetails()
      )
    }

    init(
      receiver: Capability<&{NonFungibleToken.CollectionPublic}>,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:AnyStruct}
    ) {
      // There is no need to validate that the recipient capability is valid at the time
      // of creating the claim. The more important thing is that we're ready to fulfill 
      // the intended recipient's claim once they do have a valid capability available.
      self.receiver = receiver
      self.details = ClaimDetails(
        receiverAddress: receiver.address,
        senderAddress: senderAddress,
        ipfsCID: ipfsCID,
        fileExt: fileExt,
        metadata: metadata
      )
    }

    destroy() {
      emit ClaimCompleted(
        owner: self.owner?.address,
        claimerResourceID: self.uuid,
        claimResourceID: self.uuid,
        details: self.getDetails()
      )
    }
  }

  pub resource interface ClaimerPublic {
    // Read functions
    pub fun claimByNftType(address: Address, nftType: Type)
    pub fun borrowClaim(id: UInt64): &Claim{ClaimPublic}?
    pub fun claimByAddress(address: Address)
    pub fun claimById(id: UInt64)
    pub fun getClaimIDs(): [UInt64]

    // Write functions
    pub fun removeClaim(id: UInt64)
    pub fun createClaim(
      receiver: Capability<&{NonFungibleToken.CollectionPublic}>,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:AnyStruct}
    )
  }

  pub resource Claimer: ClaimerPublic {
    access(self) let claims: @{UInt64:Claim}

    // ADMIN FUNCTIONS

    pub fun createClaim(
      receiver: Capability<&{NonFungibleToken.CollectionPublic}>,
      sender: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:AnyStruct}
    ) {
      let claim <- create Claim(
        provider: provider,
        receiver: receiver,
        nftIDs: nftIDs,
        nftType: nftType,
      )

      emit ClaimAvailable(
        owner: self.owner?.address,
        claimerResourceID: self.uuid,
        claimResourceID: claim.uuid,
        details: claim.getDetails()
      )

      let nothing <- self.claims[claim.uuid] <- claim
      destroy <- nothing
    }

    pub fun removeClaim(id: UInt64) {
      let claim <- self.claims.remove(key: id) 
        ?? panic("No listing with ID ".concat(id.toString()).concat(" exists"))

      emit ClaimCompleted(
        owner: self.owner?.address,
        claimerResourceID: self.uuid,
        claimResourceID: claim.uuid,
        details: claim.getDetails()
      )

      destroy <- claim
    }

    // PUBLIC FUNCTIONS

    pub fun claimByAddress(address: Address) {
      self.claim(fun (details: ClaimDetails): Bool {
        return !details.isFulfilled 
          && details.receiverAddress == address
      })
    }    

    pub fun claimById(id: UInt64) {
      let claim <- self.claims.remove(key: id) 
        ?? panic("No claim with ID ".concat(id.toString()).concat(" exists"))
      
      claim.claim()

      destroy <- claim
    }

    pub fun getClaimIDs(): [UInt64] {
      return self.claims.keys
    }

    // HELPERS

    priv fun claim(_ isClaimable: ((ClaimDetails): Bool)) {
      let ids = self.claims.keys
      for id in ids {
        let claim = self.borrowClaim(id: id)!
        if isClaimable(claim.getDetails()) {
          self.claimById(id: id)
        }      
      }
    }

    // CONSTRUCTOR

    init() {
      self.claims <- {}

      emit ClaimerInitialized(
        owner: self.owner?.address,
        claimerResourceID: self.uuid
      )
    }

    // DESTRUCTOR

    destroy() {
      destroy <- self.claims

      emit ClaimerDestroyed(
        owner: self.owner?.address,
        claimerResourceID: self.uuid
      )
    }
  }

  init() {
    self.NFTClaimerStoragePath = /storage/NFTClaimer
    self.NFTClaimerPublicPath = /public/NFTClaimer

    let claimer <- create Claimer()
    self.account.save(<-claimer, to: self.NFTClaimerStoragePath)

    emit ContractInitialized()
  }
}
 