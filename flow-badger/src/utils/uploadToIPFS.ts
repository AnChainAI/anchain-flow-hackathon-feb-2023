import type { IPFSHTTPClient } from 'ipfs-http-client'

export const uploadToIPFS = async (file: File | null | undefined) => {
  if (file != null) {
    const data = new FormData()
    data.append('file', file)
    const result = await fetch('/api/ipfs/upload', {
      method: 'POST',
      body: data
    })
    return (await result.json()) as {
      readonly data: Awaited<ReturnType<IPFSHTTPClient['add']>>
    }
  }
  return null
}
