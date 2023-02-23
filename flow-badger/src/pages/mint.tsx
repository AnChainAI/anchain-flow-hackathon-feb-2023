import { useEffect, useState } from 'react'
import { DefaultButton } from 'components'
import { TransactionModal } from 'modals'
import { PageLayout } from 'layouts'
import type { NextPage } from 'next'
import { loginToWallet } from 'flow'
import {
  useGetClaimableBadges,
  useCleanUpClaim,
  useGetFlowUser,
  useClaimBadge
} from 'hooks'

const MintPage: NextPage = () => {
  const [displayTxModal, setDisplayTxModal] = useState(false)
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

  useEffect(() => {
    if (claimBadgeLoading || (cleanUpClaimLoading && !displayTxModal)) {
      setDisplayTxModal(true)
    }
  }, [claimBadgeLoading, cleanUpClaimLoading])

  const renderTxModal = () => {
    return (
      <TransactionModal
        loading={claimBadgeLoading || cleanUpClaimLoading}
        success={claimBadgeData || cleanUpClaimData}
        open={displayTxModal}
        error={claimBadgeError || cleanUpClaimError}
        onClose={() => setDisplayTxModal(false)}
      />
    )
  }

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
      {renderTxModal()}
      <div className="flex flex-col gap-4 py-12 px-20">
        {renderClaimableBadges()}
      </div>
    </PageLayout>
  )
}

export default MintPage
