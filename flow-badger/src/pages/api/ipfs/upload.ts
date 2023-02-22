import { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'ipfs-http-client'
import formidable from 'formidable'
import * as fs from 'fs'

const ipfs = create({ url: process.env.NEXT_PUBLIC_IPFS_URL })

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const files = await new Promise<formidable.Files>((resolve, reject) => {
      const form = new formidable.IncomingForm({ multiples: false })
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })

    const f = files?.file
    if (f == null) {
      return res.status(400).json({ msg: 'Could not extract file' })
    }

    const filepath = Array.isArray(f) ? f?.[0]?.filepath : f.filepath
    if (filepath == null) {
      return res.status(400).json({ msg: 'Could not extract file path' })
    }


    const buffer = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filepath, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })


    const result = await ipfs.add({
      content: buffer
    })

    return res.status(200).json({
      data: result
    })
  } catch (err) {
    return res.status(500).json({ msg: String(err) })
  }
}
