import { useGetBadges, useGetFlowUser } from 'hooks'
import { BadgeTile } from 'components'
import type { NextPage } from 'next'
import { PageLayout } from 'layouts'
import { useEffect } from 'react'

const BadgesPage: NextPage = () => {
  const { runScript: getBadges, data } = useGetBadges()
  const { flowUser } = useGetFlowUser()

  useEffect(() => {
    const address = flowUser?.addr
    if (address != null) {
      getBadges({ address })
    }
  }, [flowUser])

  const renderbadges = () => {
    return data?.map((badge, i) => {
      return (
        <BadgeTile
          title={`${badge?.nftType ?? ''} #${badge?.id}`}
          imgURL={badge?.url}
          key={i}
        />
      )
    })
  }

  return (
    <PageLayout title="Badges" authRequired={true}>
      <div className="flex flex-col gap-4 py-12 px-20">
        <div className="flex flex-wrap gap-12">{renderbadges()}</div>
      </div>
    </PageLayout>
  )
}

export default BadgesPage
