import { PageLayout } from 'layouts'
import type { NextPage } from 'next'

const EditorPage: NextPage = () => {
  return (
    <PageLayout title="Editor" authRequired={true}>
      <div>Editor content</div>
    </PageLayout>
  )
}

export default EditorPage
