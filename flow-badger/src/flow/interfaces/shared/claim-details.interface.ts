export interface ClaimDetails {
  readonly receiverAddress: string
  readonly senderAddress: string
  readonly isFulfilled: boolean
  readonly ipfsCID: string
  readonly fileExt: string
  readonly metadata: Record<string, string>
}
