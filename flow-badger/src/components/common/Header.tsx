import { useRouter } from 'next/dist/client/router'
import { DefaultButton } from 'components'
import { useGetFlowUser } from 'hooks'
import * as fcl from '@onflow/fcl'
import React from 'react'

export const Header = () => {
  const { flowUser } = useGetFlowUser()
  const router = useRouter()

  const renderAuth = () => {
    if (flowUser?.addr) {
      return <div className="flex font-raj">{flowUser.addr}</div>
    }
    return <DefaultButton text="Connect Wallet" onClick={fcl.authenticate} />
  }

  const renderHeaderOptions = () => {
    return (
      <div className="flex gap-[80px]">
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/badges')}
        >
          Badges
        </div>
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/mint')}
        >
          Mint
        </div>
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-purple-200 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/editor')}
        >
          Editor
        </div>
      </div>
    )
  }

  return (
    <header className="flex h-20 items-center justify-between px-[35px] shadow-[0_4px_2px_-2px_rgba(0,0,0,0.5)]">
      <div
        className="flex items-center gap-2 font-raj text-xl font-bold hover:cursor-pointer"
        onClick={() => router.push('/')}
      >
        <img className="h-[55px]" src="/icons/flow.png" alt="Flow Logo" />
        Flow Badger
      </div>
      <div className="flex items-stretch gap-4">
        {renderHeaderOptions()}
        {renderAuth()}
      </div>
    </header>
  )
}
