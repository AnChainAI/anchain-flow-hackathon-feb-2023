import { DefaultButton, FileDropzone } from 'components'
import { useCreateBadge, useGetFlowUser } from 'hooks'
import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { PageLayout } from 'layouts'
import { uploadToIPFS } from 'utils'
import type { NextPage } from 'next'
import { getAdminAuthz, loginToWallet } from 'flow'
import * as fcl from '@onflow/fcl'
import { DeleteIcon } from 'svgs'

type FileType = File | null | undefined

interface MetadataDict {
  value: string
  key: string
}

const EditorPage: NextPage = () => {
  const [metadata, setMetadata] = useState<MetadataDict[]>([
    { key: '', value: '' }
  ])

  const [file, setFile] = useState<FileType>()
  const [addr, setAddr] = useState('')
  const [name, setName] = useState('')

  const {
    handleSubmit,
    unregister,
    getValues,
    register,
    formState: { errors }
  } = useForm({ criteriaMode: 'all' })

  const {
    runTransaction: createBadge,
    loading: createBadgeLoading,
    error: createBadgeError,
    data: createBadgeData
  } = useCreateBadge()

  const renderMetadataList = () => {
    return null
  }

  const addMetadataField = () => {
    setMetadata([...metadata, { key: '', value: '' }])
  }

  const removeMetadataField = (i: number) => {
    const tempList = structuredClone(metadata)
    tempList.splice(i, 1)
    unregister(String(i), { keepDirtyValues: false })
    setMetadata(tempList)
  }

  const issueBadge = () => {
    loginToWallet(async (user) => {
      const address = user?.addr
      if (address == null) {
        console.error('error logging in')
        return
      }

      try {
        const result = await uploadToIPFS(file)
        const path = result?.data?.path
        if (path != null) {
          const adminAuthz = await getAdminAuthz()
          await createBadge(
            {
              receiverAddress: addr,
              senderAddress: address,
              ipfsCID: path,
              fileExt: '',
              metadata: { key: 'Thanh', value: 'Ha' }
            },
            {
              authorizations: [adminAuthz],
              payer: fcl.authz,
              proposer: fcl.authz
            }
          )
        } else {
          console.error('Error uploading to IPFS')
        }
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <PageLayout title="Editor">
      <div className="flex flex-col gap-4 py-12 px-20">
        <div className="font-raj text-2xl font-semibold">Create New Badge</div>
        <div className="flex gap-2">
          <FileDropzone
            onSuccess={(File) => {
              setFile(File)
            }}
            resetFile={() => {
              setFile(null)
            }}
            fullWidth={false}
          />
          <div className="flex flex-col gap-2">
            <p>Badge Name: </p>
            <input placeholder="Name" />
            <p>Receiver Wallet Address: </p>
            <input placeholder="Receiver" value={addr} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAddr(e.target.value)
          }} />
            <p>Badge Metadata:</p>
            <div>{renderMetadataList()}</div>
          </div>
        </div>

        <DefaultButton text="Mint" onClick={issueBadge} />
      </div>
    </PageLayout>
  )
}

export default EditorPage
