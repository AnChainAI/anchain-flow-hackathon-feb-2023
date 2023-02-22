import { ScriptStatus } from '../../../interfaces/cadence/script-status.interface'
import { ClaimDetails } from 'flow/interfaces/shared/claim-details.interface'
import { Script } from 'flow/cadence/utils/scripts/base.script'
import { wrapAddress } from '../../../wrappers/address.wrapper'

const CODE = `
import SoulboundClaimer from 0xSoulboundClaimer

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

pub fun main(address: Address, adminAddress: Address): ScriptStatus {
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
    let details = claimerPublic.borrowClaim(id: id)!.getDetails()
    if details.receiverAddress == address {
      claims.append(details)
    }
  }

  return ScriptStatus(
    statusCode: 200,
    message: "OK",
    data: claims
  )
}
`

export interface GetClaimsArgs {
  readonly address: string
  readonly adminAddress: string
}

export const GetClaims = new (class GetClaimsScript extends Script<
  GetClaimsArgs,
  ScriptStatus<ClaimDetails[] | null>
> {
  constructor() {
    super(CODE)
  }

  protected resolveArgs(args: GetClaimsArgs): unknown[] {
    return [wrapAddress(args.address), wrapAddress(args.adminAddress)]
  }
})()
