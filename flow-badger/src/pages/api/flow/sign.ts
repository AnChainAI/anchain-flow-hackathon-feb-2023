import { NextApiRequest, NextApiResponse } from 'next'
import { AdminSignature, CreateClaim } from 'flow'
import { decode, NestedUint8Array } from 'rlp'
import { ec as EC } from 'elliptic'
import { SHA3 } from 'sha3'

class SigningError extends Error {
  constructor(msg: string) {
    super(msg)
  }
}

function normalizeTxCode(code: string) {
  return code.replace(/\s/g, '')
}

function safeDecode(message: string) {
  try {
    return decode(Buffer.from(message.slice(64), 'hex'))
  } catch (err) {
    throw new SigningError(String(err))
  }
}

function decodeTxCode(message: string, maxDepth = 10) {
  let [cursor, depth] = [safeDecode(message), 0]
  while (depth < maxDepth && Array.isArray(cursor)) {
    if (cursor.length <= 0) {
      throw new SigningError('Invalid message')
    }
    cursor = cursor[0]
    depth += 1
  }
  if (depth >= maxDepth) {
    throw new SigningError('Could not extract transaction code')
  }
  return normalizeTxCode(String(cursor))
}

export const signWithKey = (privateKey: string, msg: string) => {
  const ec = new EC('p256')
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'))
  const sig = key.sign(hashMsg(msg))
  const n = 32
  const r = sig.r.toArrayLike(Buffer, 'be', n)
  const s = sig.s.toArrayLike(Buffer, 'be', n)
  return Buffer.concat([r, s]).toString('hex')
}

export const hashMsg = (msg: string) => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msg, 'hex'))
  return sha.digest()
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get private key from process env
    const privKey = process.env['ADMIN_PRIVATE_KEY']
    if (privKey == null) {
      throw new Error('Private key is not configured')
    }

    // Get transaction message from request body
    const msg: string = JSON.parse(req.body)['message']
    if (msg == null) {
      throw new SigningError('Message is required')
    }

    // Decode the input transaction
    const decodedTxCode = decodeTxCode(msg)

    // Check if the decoded transaction code is a whitelisted transaction
    const whitelistedTransactions = [normalizeTxCode(CreateClaim.template)]
    for (const whitelistedTransaction of whitelistedTransactions) {
      if (decodedTxCode !== whitelistedTransaction) {
        throw new SigningError(
          'Suspicious transaction detected - rejecting request'
        )
      }
    }

    // Return the signed message
    const sig: AdminSignature = { data: signWithKey(privKey, msg) }
    return res.status(200).json(sig)
  } catch (err) {
    if (err instanceof SigningError) {
      return res.status(400).json({ error: String(err) })
    } else {
      return res.status(500).json({ error: String(err) })
    }
  }
}
