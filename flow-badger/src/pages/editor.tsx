import { DefaultButton, FileDropzone, ErrorLabel } from 'components'
import { ErrorMessage } from '@hookform/error-message'
import { getAdminAuthz, loginToWallet } from 'flow'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TransactionModal } from 'modals'
import { useCreateBadge } from 'hooks'
import { uploadToIPFS } from 'utils'
import type { NextPage } from 'next'
import { PageLayout } from 'layouts'
import * as fcl from '@onflow/fcl'
import { DeleteIcon } from 'svgs'

type FileType = File | null | undefined

interface MetadataDict {
  value: string
  key: string
}

const EditorPage: NextPage = () => {
  const [displayTxModal, setDisplayTxModal] = useState(false)
  const [metadata, setMetadata] = useState<MetadataDict[]>([
    { key: '', value: '' }
  ])
  const [ipfsLoading, setIpfsLoading] = useState(false)
  const [ipfsError, setIpfsError] = useState(false)
  const [file, setFile] = useState<FileType>()

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
    data: createBadgeData,
    resetTransferState
  } = useCreateBadge()

  useEffect(() => {
    if (createBadgeLoading || ipfsLoading) {
      setDisplayTxModal(true)
    }
  }, [createBadgeLoading, ipfsLoading])

  const renderTxModal = () => {
    return (
      <TransactionModal
        loading={ipfsLoading || createBadgeLoading}
        success={createBadgeData}
        open={displayTxModal}
        error={createBadgeError || ipfsError}
        onClose={() => {
          setDisplayTxModal(false)
          resetTransferState()
          setIpfsLoading(false)
          setIpfsError(false)
        }}
      />
    )
  }

  const renderMetadataList = () => {
    return metadata.map((value, i) => {
      return (
        <div className="flex flex-col" key={i}>
          <div className="font-raj">Field #{i + 1}</div>
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-2">
              <div className=" flex w-full items-center gap-2">
                <input
                  key={String(i)}
                  className="h-[44px] w-full border-2 p-2"
                  {...register(String(i), {
                    required: 'This field is required.',
                    minLength: {
                      value: 1,
                      message: 'This input must exceed 1 character'
                    },
                    maxLength: {
                      value: 64,
                      message: 'Input cannot exceed 64 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Invalid Field Name'
                    }
                  })}
                />
                <input
                  key={String(i)}
                  className="h-[44px] w-full border-2 p-2"
                  {...register(String(i), {
                    required: 'This field is required.',
                    minLength: {
                      value: 1,
                      message: 'This input must exceed 1 character'
                    },
                    maxLength: {
                      value: 64,
                      message: 'Input cannot exceed 64 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Invalid Field Name'
                    }
                  })}
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => removeMetadataField(i)}
                >
                  <DeleteIcon />
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name={String(i)}
                render={({ message }) => {
                  return <ErrorLabel message={message} />
                }}
              />
            </div>
          </div>
        </div>
      )
    })
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
    setIpfsLoading(true)
    loginToWallet(async (user) => {
      const address = user?.addr
      if (address == null) {
        return
      }

      try {
        const result = await uploadToIPFS(file)
        const path = result?.data?.path
        if (path != null) {
          const adminAuthz = await getAdminAuthz()
          await createBadge(
            {
              receiverAddress: getValues('walletAddr'),
              senderAddress: address,
              ipfsCID: path,
              fileExt: '',
              metadata: { key: 'Key', value: 'Val' }
            },
            {
              authorizations: [adminAuthz],
              payer: fcl.authz,
              proposer: fcl.authz
            }
          )
        } else {
          console.error('Error uploading to IPFS')
          setIpfsError(true)
        }
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <PageLayout title="Editor">
      {renderTxModal()}
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
            <input
              className="h-[44px] w-full border-2 p-2"
              {...register('badgeName', {
                required: 'This field is required.',
                minLength: {
                  value: 1,
                  message: 'This input must exceed 1 character'
                },
                maxLength: {
                  value: 64,
                  message: 'Input cannot exceed 64 characters'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Invalid Field Name'
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="badgeName"
              render={({ message }) => {
                return <ErrorLabel message={message} />
              }}
            />
            <p>Receiver Wallet Address: </p>
            <input
              className="h-[44px] w-full border-2 p-2"
              {...register('walletAddr', {
                required: 'This field is required.',
                minLength: {
                  value: 20,
                  message:
                    'This input must be 20 characters in the 0x... format'
                },
                maxLength: {
                  value: 20,
                  message:
                    'This input must be 20 characters in the 0x... format'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Invalid Field Name'
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="walletAddr"
              render={({ message }) => {
                return <ErrorLabel message={message} />
              }}
            />
            <p>Badge Metadata:</p>
            <div>
              {renderMetadataList()}
              {metadata?.length >= 15 ? null : (
                <div
                  className="mt-4 w-fit font-raj font-semibold text-green-700  hover:cursor-pointer"
                  onClick={addMetadataField}
                >
                  + Add More
                </div>
              )}
            </div>
          </div>
        </div>

        <DefaultButton text="Mint" onClick={handleSubmit(issueBadge)} />
      </div>
    </PageLayout>
  )
}

export default EditorPage
