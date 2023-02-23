import { flowConfig } from '../flow.config'
import { AdminSignature } from 'flow'
import * as fcl from '@onflow/fcl'

async function fetchAdminSig(message: string) {
  const result = await fetch('/api/flow/sign', {
    method: 'POST',
    body: JSON.stringify({ message })
  })

  if (result.status !== 200) {
    throw new Error(await result.text())
  }

  return (await result.json()) as AdminSignature
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
        return {
          addr: fcl.withPrefix(addr),
          keyId: Number(keyIndex),
          signature: data
        }
      }
    }
  }
}
