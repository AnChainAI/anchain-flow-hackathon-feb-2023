import { flowConfig } from '../flow.config'
import * as fcl from '@onflow/fcl'

async function fetchAdminSig(msg: string) {
  const result = await fetch('/api/flow/sign', {
    method: 'POST',
    body: JSON.stringify({
      message: msg
    })
  })
  return (await result.json()) as { data: string }
}

export async function getAdminAuthz(keyIndex = 0) {
  return (account: Record<string, unknown> = {}) => {
    const addr = flowConfig['0xAnChainSoulboundNFT']
    return {
      ...account,
      tempId: `${addr}-${keyIndex}`,
      addr: fcl.sansPrefix(addr),
      keyId: Number(keyIndex),
      signingFunction: async (signable: { message: string }) => {
        const { data } = await fetchAdminSig(signable.message)
        console.log(data)
        return {
          addr: fcl.withPrefix(addr),
          keyId: Number(keyIndex),
          signature: data
        }
      }
    }
  }
}
