export interface ClaimDetails {
  readonly claimResourceID: string
  readonly receiverAddress: string
  readonly senderAddress: string
  readonly isFulfilled: boolean
  readonly issuedAt: string
  readonly name: string
  readonly ipfsCID: string
  readonly fileExt: string
  readonly metadata: Record<string, string>
}
