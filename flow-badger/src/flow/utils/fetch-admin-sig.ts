import { flowConfig } from '../flow.config'
import * as fcl from '@onflow/fcl'

async function fetchAdminSig(msg: string) {
  try {
    return await fetch('/api/flow/sign', {
      method: 'GET',
      body: JSON.stringify({
        message: msg
      })
    })
  } catch (err) {
    console.error(err)
  }
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
        const signature = await fetchAdminSig(signable.message)
        return {
          addr: fcl.withPrefix(addr),
          keyId: Number(keyIndex),
          signature: signature
        }
      }
    }
  }
}
