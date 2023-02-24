import { flowConfig, inferFlowscanURL } from 'flow'
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
          Our mission is to expand the Flow Blockchain ecosystem by leveraging
          its advanced features and capabilities to create soulbound tokens
          (SBTs) that help ensure the authenticity and integrity of
          certificates, licenses, awards, badges, and other credentials.
        </div>
      </div>
    )
  }

  const renderUseCases = () => {
    return (
      <div className="flex h-fit w-full flex-col items-center justify-center gap-8 p-3">
        <div className="mb-6 border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-3xl font-bold text-transparent">
          Use Cases
        </div>
        <div className="flex flex-wrap gap-16">
          <CaseTile
            description="Badges can be given to individuals in online communities to recognize contributions and achievements. By securing these badges to a Soul Bound token, it can be ensured that they are genuine and cannot be duplicated or traded for profit."
            title="Badges"
            icon="/icons/badge.png"
          />
          <CaseTile
            description="Universities can issue digital certificates to their students that are tied to Soul Bound tokens. These tokens can then be used to verify the authenticity of the certificate and prevent any attempts to copy or forge it."
            title="Certification"
            icon="/icons/cert.png"
          />
          <CaseTile
            description="Professional licenses, such as those obtained by doctors, lawyers, and accountants, can also be secured using Soul Bound tokens on blockchain that can be verified as authentic and cannot be transferred or sold to other individuals."
            title="Licenses"
            icon="/icons/license.png"
          />
          <CaseTile
            description="Organizations like a sport organization that hand out awards to their athletes can use the authenticity of a Soul Bound token to provide a secure and tamper-proof system for recognizing and rewarding achievements."
            title="Awards"
            icon="/icons/awards.png"
          />
        </div>
      </div>
    )
  }

  const renderSmartContract = () => {
    return (
      <div className="flex h-fit w-full flex-col items-center justify-center gap-8 bg-green-500/50 p-3">
        <div className="mb-6 border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-3xl font-bold text-transparent">
          Smart Contract
        </div>
        <p className="w-[800px] text-center font-raj text-lg text-black/50">
          A soulbound smart contract is a type of smart contract that is
          designed to be permanently and irrevocably attached to a specific
          digital asset, such as a cryptocurrency or a non-fungible token (NFT).
          Once a soulbound smart contract is attached to an asset, it becomes an
          integral part of that asset's identity and cannot be separated from
          it. In other words, transferring or burning a soulbound NFT is not
          possible.
        </p>
        <p className="w-[800px] text-center font-raj text-lg text-black/50">
          Our design consists of two smart contracts: an NFT-based soulbound
          smart contract
          <span
            className="mx-1 underline hover:cursor-pointer hover:brightness-75"
            onClick={() => {
              window.open(
                `${inferFlowscanURL()}/account/${
                  flowConfig['0xAnChainSoulboundNFT']
                }`,
                '_blank'
              )
            }}
          >
            here
          </span>
          and a lazy minting contract that allows users to issue soulbound NFTs
          to other users on Flow and claim soulbound NFTs
          <span
            className="ml-1 underline hover:cursor-pointer hover:brightness-75"
            onClick={() => {
              window.open(
                `${inferFlowscanURL()}/account/${
                  flowConfig['0xSoulboundClaimer']
                }`,
                '_blank'
              )
            }}
          >
            here
          </span>
          . To ensure our soulbound contract integrates easily with the Flow
          ecosystem, we based the contract implementation off the existing
          NonFungibleToken standard.
        </p>
        <p className="w-[800px] text-center font-raj text-lg text-black/50">
          We also designed the contracts such that soulbound tokens can be
          minted on demand, which helps us avoid storage error issues and allows
          us to more easily handle situations where users may not have a
          collection installed beforehand.
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
