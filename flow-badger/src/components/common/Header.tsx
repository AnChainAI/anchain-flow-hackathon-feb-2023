import React from 'react'
import { useRouter } from 'next/dist/client/router'

export const Header = () => {
  const router = useRouter()

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
    <header className="flex h-20 items-center justify-between px-[35px] shadow-[0_4px_2px_-2px_rgba(165,55,253,0.5)]">
      <img
        className="h-[55px] hover:cursor-pointer"
        src="/icons/flow.png"
        alt="Flow Logo"
        onClick={() => router.push('/')}
      />
      <div>{renderHeaderOptions()}</div>
    </header>
  )
}
