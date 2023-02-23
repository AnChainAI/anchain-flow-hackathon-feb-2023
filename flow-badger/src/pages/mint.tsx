import { useClaimBadge, useGetClaimableBadges, useGetFlowUser } from 'hooks'
import { DefaultButton } from 'components'
import { PageLayout } from 'layouts'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { CleanUpClaim, flowConfig, loginToWallet } from 'flow'
import { useCleanUpClaim } from 'hooks/use-cleanup-claim'

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

  const {
    runTransaction: cleanUpClaim,
    loading: cleanUpClaimLoading,
    error: cleanUpClaimError,
    data: cleanUpClaimData
  } = useCleanUpClaim()

  const { flowUser } = useGetFlowUser()

  useEffect(() => {
    const address = flowUser?.addr
    if (address != null) {
      getClaimableBadges({ address })
    }
  }, [flowUser])

  const renderClaimableBadges = () => {
    return getClaimableBadgesData?.map((badge, i) => {
      // TODO: if "isFulfilled" is true, render a trash can icon and
      // on click, run the cleanUpClaim transaction to remove it from
      // the list
      return (
        <div className="" key={i}>
          <DefaultButton
            text="Mint Me"
            onClick={() => {
              loginToWallet(async () => {
                await claimBadge({
                  claimResourceID: badge?.claimResourceID
                })
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
