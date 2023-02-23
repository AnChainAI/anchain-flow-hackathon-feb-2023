import { useClaimBadge, useGetClaimableBadges, useGetFlowUser } from 'hooks'
import { DefaultButton } from 'components'
import { PageLayout } from 'layouts'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { flowConfig } from 'flow'

const MintPage: NextPage = () => {
  const {
    runScript: getClaimableBadges,
    loading: getClaimableBadgesLoading,
    error: getClaimableBadgesError,
    data: getClaimableBadgesData
  } = useGetClaimableBadges()

  const {
    runTransaction: claimBadge,
    loading: claimBadgeLoading,
    error: claimBadgeError,
    data: claimBadgeData
  } = useClaimBadge()

  const { flowUser } = useGetFlowUser()

  useEffect(() => {
    const address = flowUser?.addr
    if (address != null) {
      getClaimableBadges({
        adminAddress: flowConfig['0xAnChainSoulboundNFT'],
        address
      })
    }
  }, [flowUser])

  const renderClaimableBadges = () => {
    return getClaimableBadgesData?.map((badge, i) => {
      return <div key={i}>{JSON.stringify(badge)}</div>
    })
  }

  return (
    <PageLayout title="Mint" authRequired={true}>
      <div>Minting page</div>
    </PageLayout>
  )
}

export default MintPage
