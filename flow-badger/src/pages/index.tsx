import { PageLayout } from 'layouts'

export default function Home() {
  return (
    <PageLayout title="Home" authRequired={false}>
      <div>Landing Page content</div>
    </PageLayout>
  )
}
