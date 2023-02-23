import { useGetBadges, useGetFlowUser } from 'hooks'
import { BadgeTile } from 'components'
import type { NextPage } from 'next'
import { PageLayout } from 'layouts'
import { useEffect } from 'react'
import { constants } from 'utils'

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
      console.log(badge)
      return (
        <BadgeTile
          title={`${badge?.name ?? ''} #${badge?.id}`}
          imgURL={constants.IPFS_URL.concat(badge?.asset.file.cid)}
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
