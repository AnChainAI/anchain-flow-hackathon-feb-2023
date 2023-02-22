import { FlowNetwork } from '../enums/flow-network.enum'

export function isValidFlowNetwork(s: string | undefined): s is FlowNetwork {
  return s != null && Object.values(FlowNetwork).includes(s as FlowNetwork)
}
