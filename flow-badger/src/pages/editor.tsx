import { DefaultButton, FileDropzone } from 'components'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import { PageLayout } from 'layouts'
import { uploadToIPFS } from 'utils'
import type { NextPage } from 'next'
import { DeleteIcon } from 'svgs'
import { useState } from 'react'

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
            <input placeholder="Receiver" />
            <p>Badge Metadata:</p>
            <div>{renderMetadataList()}</div>
          </div>
        </div>

        <DefaultButton text="Mint" />
      </div>
    </PageLayout>
  )
}

export default EditorPage
