import { FlowConfigKey } from '../enums/flow-config-key.enum'
import { FlowNetwork } from '../enums/flow-network.enum'
import { inferFlowNetwork } from './infer-flow-network'
import { constants } from '../../utils/constants'

/**
 * https://developers.flow.com/tools/fcl-js/reference/configure-fcl
 *
 */
export function getConfig(): Record<FlowConfigKey, string> {
  return {
    [FlowNetwork.TESTNET]: {
      [FlowConfigKey['flow.network']]: FlowNetwork.TESTNET,
      [FlowConfigKey['app.detail.title']]: constants.APP.TITLE ?? '',
      [FlowConfigKey['app.detail.icon']]: constants.APP.ICON ?? '',
      [FlowConfigKey['accessNode.api']]: 'https://access-testnet.onflow.org',
      [FlowConfigKey['discovery.wallet']]:
        'https://fcl-discovery.onflow.org/testnet/authn',
      [FlowConfigKey['discovery.wallet.method']]: 'POP/RPC',
      [FlowConfigKey['0xAnchainUtils']]: '0x26e7006d6734ba69',
      [FlowConfigKey['0xMetaPanda']]: '0x26e7006d6734ba69',
      [FlowConfigKey['0xMetaPandaAirdropNFT']]: '0x26e7006d6734ba69',
      [FlowConfigKey['0xXvsX']]: '0x26e7006d6734ba69',
      [FlowConfigKey['0xNonFungibleToken']]: '0x631e88ae7f1d7c20',
      [FlowConfigKey['0xMetadataViews']]: '0x631e88ae7f1d7c20',
      [FlowConfigKey['0xFlowToken']]: '0x7e60df042a9c0868',
      [FlowConfigKey['0xFungibleToken']]: '0x9a0766d93b6608b7',
      [FlowConfigKey['0xDapperUtilityCoin']]: '0x82ec283f88a62e65',
      [FlowConfigKey['0xFlowUtilityToken']]: '0x82ec283f88a62e65',
      [FlowConfigKey['0xNFTStorefront']]: '0x2d55b98eb200daef',
      [FlowConfigKey['0xMerchantAccount']]: '0x26e7006d6734ba69',
      [FlowConfigKey['0xAnChainSoulboundNFT']]: '0xe84569d5c98aa48f',
      [FlowConfigKey['0xSoulboundClaimer']]: '0xe84569d5c98aa48f'
    },
    [FlowNetwork.MAINNET]: {
      [FlowConfigKey['flow.network']]: FlowNetwork.MAINNET,
      [FlowConfigKey['app.detail.title']]: constants.APP.TITLE ?? '',
      [FlowConfigKey['app.detail.icon']]: constants.APP.ICON ?? '',
      [FlowConfigKey['accessNode.api']]:
        'https://access-mainnet-beta.onflow.org',
      [FlowConfigKey['discovery.wallet']]:
        'https://fcl-discovery.onflow.org/authn',
      [FlowConfigKey['discovery.wallet.method']]: 'POP/RPC',
      [FlowConfigKey['0xAnchainUtils']]: '0x7ba45bdcac17806a',
      [FlowConfigKey['0xMetaPanda']]: '0xf2af175e411dfff8',
      [FlowConfigKey['0xMetaPandaAirdropNFT']]: '0xf2af175e411dfff8',
      [FlowConfigKey['0xXvsX']]: '0xf2af175e411dfff8',
      [FlowConfigKey['0xNonFungibleToken']]: '0x1d7e57aa55817448',
      [FlowConfigKey['0xMetadataViews']]: '0x1d7e57aa55817448',
      [FlowConfigKey['0xFlowToken']]: '0x1654653399040a61',
      [FlowConfigKey['0xFungibleToken']]: '0xf233dcee88fe0abe',
      [FlowConfigKey['0xDapperUtilityCoin']]: '0xead892083b3e2c6c',
      [FlowConfigKey['0xFlowUtilityToken']]: '0xead892083b3e2c6c',
      [FlowConfigKey['0xNFTStorefront']]: '0x4eb8a10cb9f87357',
      [FlowConfigKey['0xMerchantAccount']]: '0xf2af175e411dfff8',
      [FlowConfigKey['0xAnChainSoulboundNFT']]: '',
      [FlowConfigKey['0xSoulboundClaimer']]: ''
    }
  }[inferFlowNetwork()]
}
