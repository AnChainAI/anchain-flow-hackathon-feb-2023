import SoulboundClaimer from "../../contracts/custom/SoulboundClaimer.cdc"

// flow scripts execute ./cadence/scripts/claimer/find-all.cdc 0xe76c3718887d6fa1 --network=testnet
pub struct ScriptStatus {
  pub let statusCode: UInt64
  pub let message: String
  pub let data: [SoulboundClaimer.ClaimDetails]?
  init(statusCode: UInt64, message: String, data: [SoulboundClaimer.ClaimDetails]?) {
    self.statusCode = statusCode
    self.message = message
    self.data = data
  }
}

pub fun main(adminAddress: Address): ScriptStatus {
  let claimerPublicCap = getAccount(adminAddress)
    .getCapability(SoulboundClaimer.SoulboundClaimerPublicPath)
    .borrow<&{SoulboundClaimer.ClaimerPublic}>()

  if claimerPublicCap == nil {
    return ScriptStatus(
      statusCode: 400,
      message: "Could not borrow claimer public",
      data: nil
    )
  }

  let claims: [SoulboundClaimer.ClaimDetails] = []
  let claimerPublic = claimerPublicCap!
  for id in claimerPublic.getClaimIDs() {
    claims.append(claimerPublic.borrowClaim(id: id)!.getDetails())
  }

  return ScriptStatus(
    statusCode: 200,
    message: "OK",
    data: claims
  )
}