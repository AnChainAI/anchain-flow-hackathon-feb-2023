import { NextApiRequest, NextApiResponse } from 'next'
import { ec as EC } from 'elliptic'
import { CreateClaim } from 'flow'
import { decode } from 'rlp'
import { SHA3 } from 'sha3'

export const config = {
  api: {
    bodyParser: false
  }
}

function normalizeTxCode(code: string) {
  return code.replace(/\s/g, '')
}

function safeDecode(message: string) {
  try {
    return decode(Buffer.from(message.slice(64), 'hex'))
  } catch (err) {
    throw new Error('Could not decode message')
  }
}

function decodeTxCode(message: string, maxDepth = 10) {
  let [cursor, depth] = [safeDecode(message), 0]
  while (depth < maxDepth && Array.isArray(cursor)) {
    if (cursor.length <= 0) {
      throw new Error('Invalid message')
    }
    cursor = cursor[0]
    depth += 1
  }
  if (depth >= maxDepth) {
    throw new Error('Could not extract transaction code')
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

// TODO: refactor + add comments + test
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const privKey = process.env['ADMIN_PRIVATE_KEY']
    if (privKey == null) {
      return res.status(500).json({ error: 'Private key is not configured' })
    }

    const msg = req.body.message

    if (msg == null) {
      return res.status(400).json({
        error: 'Message is required'
      })
    }

    //
    const decodedTxCode = decodeTxCode(msg)

    //
    const createBadgeCode = normalizeTxCode(CreateClaim.template)

    //
    if (decodedTxCode !== createBadgeCode) {
      return res.status(400).json({
        data: 'Suspicious transaction detected - rejecting request'
      })
    }

    //
    return res.status(200).json({
      data: signWithKey(privKey, msg)
    })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
