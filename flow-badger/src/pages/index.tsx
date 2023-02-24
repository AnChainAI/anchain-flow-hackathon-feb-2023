import { CaseTile } from 'components'
import { PageLayout } from 'layouts'

export default function Home() {
  const renderMission = () => {
    return (
      <div className="flex h-[450px] w-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-green-500 to-green-700">
        <div className="font-raj text-3xl font-semibold text-white">
          Mission
        </div>
        <div className="w-[500px] text-center font-raj text-xl text-white">
          Welcome to Flow Badger, a platform for minting Soul Bound Tokens
          (SBTs) on FLOW
        </div>
      </div>
    )
  }

  const renderUseCases = () => {
    return (
      <div className="flex h-[450px] w-full flex-col items-center justify-center gap-8">
        <div className="mb-6 border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-3xl font-bold text-transparent">
          Use Cases
        </div>
        <div className="flex flex-wrap gap-16">
          <CaseTile
            description="Gorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Badges"
            icon="/icons/badge.png"
          />
          <CaseTile
            description="Gorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Certifications"
            icon="/icons/cert.png"
          />
          <CaseTile
            description="Gorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Licenses"
            icon="/icons/license.png"
          />
          <CaseTile
            description="Gorem ipsum dolor sit amet, consectetur adipiscing elit."
            title="Awards"
            icon="/icons/awards.png"
          />
        </div>
      </div>
    )
  }

  const renderSmartContract = () => {
    return (
      <div className="flex h-[450px] w-full flex-col items-center justify-center gap-8 bg-green-500/50">
        <div className="mb-6 border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-3xl font-bold text-transparent">
          Smart Contract
        </div>
        <p className='w-[800px] text-center font-raj text-xl text-black/50'>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Corem ipsum dolor sit amet, consectetur adipiscing
          elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
          dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
          ut interdum tellus elit sed risus.
        </p>
      </div>
    )
  }

  return (
    <PageLayout title="Home" authRequired={false}>
      {renderMission()}
      {renderUseCases()}
      {renderSmartContract()}
    </PageLayout>
  )
}
