import { PageLayout } from 'layouts'

export default function Home() {
  return (
    <PageLayout title="Home" authRequired={false}>
      <div className=" flex flex-grow items-center justify-center bg-gradient-to-b from-green-500 to-green-700">
        <div className="font-raj text-3xl text-white">
          Welcome to Flow Badger, a platform for minting Soul Bound Tokens
          (SBTs) on FLOW
        </div>
      </div>
    </PageLayout>
  )
}
