import { NftMedia } from './nft-media.interface'

export interface NftMetadata {
  readonly uuid: string
  readonly id: string
  readonly name: string
  readonly mintBlockHeight: string
  readonly asset: NftMedia
  readonly metadata: Record<string, string>
}
