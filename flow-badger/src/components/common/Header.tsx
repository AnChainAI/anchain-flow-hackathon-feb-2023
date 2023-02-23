import { useRouter } from 'next/dist/client/router'
import { DefaultButton } from 'components'
import { useGetFlowUser } from 'hooks'
import * as fcl from '@onflow/fcl'
import React from 'react'

export const Header = () => {
  const { flowUser } = useGetFlowUser()
  const router = useRouter()

  const cleanUpAddr = (addr: string) => {
    return addr.substring(0, 6) + '...' + addr.substring(14)
  }

  const renderAuth = () => {
    if (flowUser?.addr) {
      return (
        <div className="hidden items-center border-2 border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-xl font-bold text-transparent sm:flex">
          {cleanUpAddr(flowUser.addr)}
        </div>
      )
    }
    return <DefaultButton text="Connect Wallet" onClick={fcl.authenticate} />
  }

  const renderHeaderOptions = () => {
    return (
      <div className="flex gap-[80px]">
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/badges')}
        >
          My Badges
        </div>
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/mint')}
        >
          Redeem
        </div>
        <div
          className="hidden items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer sm:flex"
          onClick={() => router.push('/editor')}
        >
          Create
        </div>
      </div>
    )
  }

  return (
    <header className="flex h-20 items-center justify-between px-[35px] shadow-[0_4px_2px_-2px_rgba(0,0,0,0.5)]">
      <div
        className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-2xl font-bold text-transparent hover:cursor-pointer"
        onClick={() => router.push('/')}
      >
        <img className="h-[55px]" src="/icons/flow.png" alt="Flow Logo" />
        Flow Badger
      </div>
      <div className="flex items-center gap-12 ">
        {renderHeaderOptions()}
        {renderAuth()}
      </div>
    </header>
  )
}
