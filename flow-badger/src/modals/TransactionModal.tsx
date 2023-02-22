import { Transition, Dialog } from '@headlessui/react'
import { DefaultButton } from 'components'
import { ClearIcon } from 'svgs'
import React from 'react'

interface TxModalProps {
  loading: boolean
  success: boolean
  error: string
  open: boolean
  onClose: () => void
}

export const TransactionModal: React.FC<TxModalProps> = ({
  loading,
  success,
  error,
  open,
  onClose
}) => {
  const renderLoading = () => {
    return (
      <div className="relative top-1/2 left-1/2 z-30 h-[450px] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white py-8 shadow-lg">
        <div className="flex flex-col content-center items-center justify-center gap-12">
          <img src="/icons/flow.png" width={220} className="max-h-[250px]" />
          <div className="items-center bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-3xl font-bold text-transparent">
            Transaction in Progress
          </div>
        </div>
      </div>
    )
  }

  const renderSuccess = () => {
    return (
      <div className="relative top-1/2 left-1/2 z-30 h-[500px] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white py-8 shadow-lg">
        <div className="flex h-full flex-col items-center justify-between gap-6">
          <div className="ml-auto mr-8 cursor-pointer" onClick={onClose}>
            <ClearIcon />
          </div>
          <div className="flex h-full flex-col items-center justify-between gap-6">
            <div className="bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-3xl font-bold text-transparent">
              Transaction Successful
            </div>
            <div className="flex items-end">
              <DefaultButton text="View on Flowscan" onClick={() => {}} />
              <DefaultButton text="Close" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderError = () => {
    return (
      <div className="relative top-1/2 left-1/2 z-30 h-[300px] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white py-8 shadow-lg">
        <div className="flex h-full flex-col items-center justify-between gap-6">
          <div className="ml-auto mr-8 cursor-pointer" onClick={onClose}>
            <ClearIcon />
          </div>
          <div className="mt-4 flex h-full flex-col items-center gap-12">
            <div className="bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-3xl font-bold text-transparent">
              {error}
            </div>
            <div className="flex items-end">
              <DefaultButton text="Close" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTxState = () => {
    if (success) {
      return renderSuccess()
    }
    if (error) {
      return renderError()
    }
    if (loading) {
      return renderLoading()
    }
  }

  return (
    <Transition
      appear
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={open}
    >
      <Dialog
        className="fixed inset-0 z-20 block h-[100vh] w-[100vw] backdrop-blur"
        onClose={onClose}
        open={open}
      >
        <div className="relative top-1/2 left-1/2 z-30 h-[600px] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white px-11 py-10 shadow-lg">
          <div className="flex h-full flex-col items-center justify-between">
            {renderTxState()}
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
