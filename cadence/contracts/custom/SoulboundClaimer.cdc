import NonFungibleToken from "../standard/NonFungibleToken.cdc"
import AnChainSoulboundNFT from "./AnChainSoulboundNFT.cdc"

pub contract SoulboundClaimer {
  pub event ContractInitialized()
  pub event ClaimerInitialized(owner: Address?, claimerResourceID: UInt64)
  pub event ClaimerDestroyed(owner: Address?, claimerResourceID: UInt64)
  pub event ClaimAvailable(owner: Address?, claimerResourceID: UInt64, claimResourceID: UInt64, details: ClaimDetails)
  pub event ClaimCompleted(owner: Address?, claimerResourceID: UInt64, claimResourceID: UInt64,  details: ClaimDetails)

  pub let SoulboundClaimerStoragePath: StoragePath
  pub let SoulboundClaimerPublicPath: PublicPath

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

  pub resource Claim: ClaimPublic {
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
      receiverCap: Capability<&{NonFungibleToken.CollectionPublic}>,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:String}
    ) {
      // There is no need to validate that the recipient capability is valid at the time
      // of creating the claim. The more important thing is that we're ready to fulfill 
      // the intended recipient's claim once they do have a valid capability available.
      self.receiver = receiverCap
      self.details = ClaimDetails(
        receiverAddress: receiverCap.address,
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
    pub fun borrowClaim(id: UInt64): &Claim{ClaimPublic}?
    pub fun claimByAddress(address: Address)
    pub fun claimById(id: UInt64)
    pub fun getClaimIDs(): [UInt64]
  }

  pub resource interface ClaimerAdmin {
    pub fun removeClaim(id: UInt64)
    pub fun createClaim(
      receiverCap: Capability<&{NonFungibleToken.CollectionPublic}>,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:String}
    )
  }

  pub resource Claimer: ClaimerPublic, ClaimerAdmin {
    access(self) let claims: @{UInt64:Claim}

    pub fun createClaim(
      receiverCap: Capability<&{NonFungibleToken.CollectionPublic}>,
      senderAddress: Address,
      ipfsCID: String,
      fileExt: String,
      metadata: {String:String}
    ) {
      let claim <- create Claim(
        receiverCap: receiverCap,
        senderAddress: senderAddress,
        ipfsCID: ipfsCID,
        fileExt: fileExt,
        metadata: metadata
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

    pub fun borrowClaim(id: UInt64): &Claim{ClaimPublic}? {
      return &self.claims[id] as &Claim{ClaimPublic}?
    }        

    pub fun claimByAddress(address: Address) {
      let ids = self.claims.keys
      for id in ids {
        let details = self.borrowClaim(id: id)!.getDetails()
        if !details.isFulfilled && details.receiverAddress == address {
          self.claimById(id: id)
        }      
      }
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

    init() {
      self.claims <- {}

      emit ClaimerInitialized(
        owner: self.owner?.address,
        claimerResourceID: self.uuid
      )
    }

    destroy() {
      destroy <- self.claims

      emit ClaimerDestroyed(
        owner: self.owner?.address,
        claimerResourceID: self.uuid
      )
    }
  }

  init() {
    self.SoulboundClaimerStoragePath = /storage/SoulboundClaimer
    self.SoulboundClaimerPublicPath = /public/SoulboundClaimer

    // Save a claimer resource to the deployer account
    let claimer <- create Claimer()
    self.account.save(<-claimer, to: self.SoulboundClaimerStoragePath)

    // Create a public capability for the claimer
    self.account.link<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerPublic}>(
      self.SoulboundClaimerPublicPath, 
      target: self.SoulboundClaimerStoragePath
    )

    emit ContractInitialized()
  }
}
 