import { Transaction } from 'flow/cadence/utils/transactions/base.transaction'
import { wrapAddress } from 'flow/wrappers/address.wrapper'
import { wrapBoolean } from 'flow/wrappers/boolean.wrapper'
import { wrapObject } from 'flow/wrappers/object.wrapper'
import { wrapString } from 'flow/wrappers/string.wrapper'

const CODE = `
import AnChainSoulboundNFT from 0xAnChainSoulboundNFT
import NonFungibleToken from 0xNonFungibleToken
import SoulboundClaimer from 0xSoulboundClaimer

transaction(
  receiverAddress: Address,
  senderAddress: Address,
  ipfsCID: String,
  fileExt: String,
  metadata: {String:String}
) {
  let claimer: &{SoulboundClaimer.ClaimerAdmin}

  prepare(adminAccount: AuthAccount) {
    self.claimer = adminAccount.borrow<&SoulboundClaimer.Claimer{SoulboundClaimer.ClaimerAdmin}>(
      from: SoulboundClaimer.SoulboundClaimerStoragePath
    ) ?? panic("Could not borrow admin claimer")
  }

  execute {
    self.claimer.createClaim(
      receiverAddress: receiverAddress, 
      senderAddress: senderAddress, 
      ipfsCID: ipfsCID, 
      fileExt: fileExt,
      metadata: metadata
    )
  }
}
`

export interface CreateClaimArgs {
  readonly receiverAddress: string
  readonly senderAddress: string
  readonly isFulfilled: boolean
  readonly ipfsCID: string
  readonly fileExt: string
  readonly metadata: Record<string, string>
}

export const CreateClaim =
  new (class CreateClaimTransaction extends Transaction<CreateClaimArgs> {
    constructor() {
      super(CODE)
    }

    protected resolveArgs(args: CreateClaimArgs): unknown[] {
      return [
        wrapAddress(args.receiverAddress),
        wrapAddress(args.senderAddress),
        wrapBoolean(args.isFulfilled),
        wrapString(args.ipfsCID),
        wrapString(args.fileExt),
        wrapObject(args.metadata)
      ]
    }
  })()
