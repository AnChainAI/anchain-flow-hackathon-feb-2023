import { DefaultButton, RedeemRow } from 'components'
import { useEffect, useState } from 'react'
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
    data: claimBadgeData,
    resetTransferState: resetClaimBadgeState
  } = useClaimBadge()

  const {
    runTransaction: cleanUpClaim,
    loading: cleanUpClaimLoading,
    error: cleanUpClaimError,
    data: cleanUpClaimData,
    resetTransferState: resetCleanUpState
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
        onClose={() => {
          setDisplayTxModal(false)
          resetClaimBadgeState()
          resetCleanUpState()
        }}
      />
    )
  }

  const renderClaimableBadges = () => {
    if (getClaimableBadgesData?.length === 0) {
      return (
        <div className="font-raj text-2xl text-green-700">
          You currently don't have any badges to claim
        </div>
      )
    }

    return getClaimableBadgesData?.map((badge, i) => {
      return (
        <RedeemRow
          alternate={i % 2 == 1}
          data={badge}
          key={i}
          onMintClick={() => {
            loginToWallet(async () => {
              await claimBadge({
                claimResourceID: badge?.claimResourceID
              })
            })
          }}
        />
      )
    })
  }

  return (
    <PageLayout title="Mint" authRequired={true}>
      {renderTxModal()}
      <div className="flex flex-col gap-4 py-12 px-20">
        <div className="flex justify-between gap-5">
          <div className="flex min-w-[300px] font-raj text-2xl">State</div>
          <div className="flex min-w-[300px] font-raj text-2xl">Badge Name</div>
          <div className="flex min-w-[300px] font-raj text-2xl">Issued By</div>
          <div className="flex min-w-[300px] font-raj text-2xl">
            Date Issued
          </div>
        </div>
        {renderClaimableBadges()}
      </div>
    </PageLayout>
  )
}

export default MintPage
