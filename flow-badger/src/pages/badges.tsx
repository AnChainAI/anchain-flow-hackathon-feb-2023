import { PageLayout } from 'layouts'
import type { NextPage } from 'next'

const BadgesPage: NextPage = () => {
  return (
    <PageLayout title="Badges" authRequired={true}>
      <div>badges content</div>
    </PageLayout>
  )
}

export default BadgesPage
