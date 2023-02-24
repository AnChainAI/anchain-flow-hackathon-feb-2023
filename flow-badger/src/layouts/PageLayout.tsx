import { useGetFlowUser } from 'hooks'
import { loginToWallet } from 'flow'
import { DefaultButton, Header } from 'components'
import Head from 'next/head'
import React from 'react'
interface PLProps {
  authRequired?: boolean
  children?: React.ReactNode
  title: string
}

export const PageLayout: React.FC<PLProps> = ({
  authRequired,
  children,
  title
}) => {
  const { flowUser } = useGetFlowUser()

  const renderStatus = () => {
    if ((authRequired && flowUser?.addr) || !authRequired) {
      return (
        <div className="flex min-h-[calc(100vh-80px)] flex-col">{children}</div>
      )
    }
    return (
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6">
        <div className="font-raj text-2xl font-semibold text-black/50">
          Connect Wallet to View this Page
        </div>
        <DefaultButton text="Connect Wallet" onClick={loginToWallet} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {renderStatus()}
    </>
  )
}
