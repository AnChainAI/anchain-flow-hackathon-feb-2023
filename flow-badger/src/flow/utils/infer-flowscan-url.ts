import { FlowNetwork } from '../enums/flow-network.enum'
import { inferFlowNetwork } from './infer-flow-network'

export function inferFlowscanURL() {
  return {
    [FlowNetwork.TESTNET]: 'https://testnet.flowscan.org/transaction/',
    [FlowNetwork.MAINNET]: 'https://flowscan.org/transaction/'
  }[inferFlowNetwork()]
}
