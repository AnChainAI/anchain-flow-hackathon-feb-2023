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
      getClaimableBadges({ address })
    }
  }, [flowUser])

  const renderClaimableBadges = () => {
    return getClaimableBadgesData?.map((badge, i) => {
      return (
        <div className="" key={i}>
          <DefaultButton
            text="Mint Me"
            onClick={() => {
              claimBadge({
                adminAddress: flowConfig['0xAnChainSoulboundNFT'],
                claimResourceID: badge?.claimResourceID
              })
            }}
          />
          <div key={i}>{JSON.stringify(badge)}</div>
        </div>
      )
    })
  }

  return (
    <PageLayout title="Mint" authRequired={true}>
      <div>Minting page</div>
      {renderClaimableBadges()}
    </PageLayout>
  )
}

export default MintPage
