import { FlowUser } from '../interfaces/accounts/user.interface'
import { FlowWalletName } from '../enums/flow-wallet-name.enum'
import { FlowConfigKey } from '../enums/flow-config-key.enum'
import { inferFlowNetwork } from './infer-flow-network'
import { flowWallets } from './flow-wallets'
import * as fcl from '@onflow/fcl'

export function loginToWallet(
  cb: (user: FlowUser | null) => Promise<void> | void = () => {}
) {
  const config = flowWallets[FlowWalletName.BLOCTO][inferFlowNetwork()]
  const method = FlowConfigKey['discovery.wallet.method']
  const wallet = FlowConfigKey['discovery.wallet']

  fcl.config().put(wallet, config.url).put(method, config.method)

  fcl
    .authenticate()
    .then(cb)
}
