import { useGetBadges, useSetupAccount, useGetFlowUser } from 'hooks'
import { DefaultButton } from 'components'
import { PageLayout } from 'layouts'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const BadgesPage: NextPage = () => {
  const {
    runScript: getBadges,
    hasCollection,
    loading,
    error,
    data
  } = useGetBadges()

  const { runTransaction: installCollection } = useSetupAccount()
  const { flowUser } = useGetFlowUser()

  useEffect(() => {
    const address = flowUser?.addr
    if (address != null) {
      getBadges({ address })
    }
  }, [flowUser])

  const renderbadges = () => {
    return data?.map((badge, i) => {
      return <div key={i}>{JSON.stringify(badge)}</div>
    })
  }

  return (
    <PageLayout title="Badges" authRequired={true}>
      {hasCollection ? (
        renderbadges()
      ) : (
        <DefaultButton text="Install" onClick={installCollection} />
      )}
    </PageLayout>
  )
}

export default BadgesPage
