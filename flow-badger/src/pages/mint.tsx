import { PageLayout } from 'layouts'
import type { NextPage } from 'next'

const MintPage: NextPage = () => {
  return (
    <PageLayout title="Mint" authRequired={true}>
      <div>Minting PAge content</div>
    </PageLayout>
  )
}

export default MintPage
