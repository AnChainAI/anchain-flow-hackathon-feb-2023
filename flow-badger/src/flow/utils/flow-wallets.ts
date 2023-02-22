import { FlowWalletName } from '../enums/flow-wallet-name.enum'
import { FlowNetwork } from '../enums/flow-network.enum'

interface FlowWalletConfig {
  readonly url: string
  readonly method: string
}

export const flowWallets: Record<
  FlowWalletName,
  Record<FlowNetwork, FlowWalletConfig>
> = {
  [FlowWalletName.BLOCTO]: {
    [FlowNetwork.TESTNET]: {
      url: 'https://flow-wallet-testnet.blocto.app/authn',
      method: 'POP/RPC'
    },
    [FlowNetwork.MAINNET]: {
      url: 'https://flow-wallet.blocto.app/authn',
      method: 'IFRAME/RPC'
    }
  },
  [FlowWalletName.DAPPER]: {
    [FlowNetwork.TESTNET]: {
      url: 'https://staging.accounts.meetdapper.com/fcl/authn-restricted',
      method: 'POP/RPC'
    },
    [FlowNetwork.MAINNET]: {
      url: 'https://accounts.meetdapper.com/fcl/authn-restricted',
      method: 'POP/RPC'
    }
  }
}
