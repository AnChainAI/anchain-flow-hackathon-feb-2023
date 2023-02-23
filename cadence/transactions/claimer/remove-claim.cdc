import SoulboundClaimer from "../../contracts/custom/SoulboundClaimer.cdc"

// flow transactions send ./cadence/transactions/claimer/remove-claim.cdc 133234973 --signer=testnet-account --network=testnet
transaction(claimResourceID: UInt64) {
  let claimer: &{SoulboundClaimer.ClaimerAdmin}

  prepare(adminAccount: AuthAccount) {
    self.claimer = adminAccount.borrow<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerAdmin}>(from: SoulboundClaimer.SoulboundClaimerStoragePath)
      ?? panic("Could not borrow admin claimer")
  }

  execute {
    self.claimer.removeClaim(id: claimResourceID)
  }
}