import { isValidFlowNetwork } from './is-valid-flow-network'
import { constants } from '../../utils/constants'

export function inferFlowNetwork() {
  const accessNode = constants.FLOW_NETWORK
  if (isValidFlowNetwork(accessNode)) {
    return accessNode
  }
  throw new Error(`${accessNode} is not a valid flow network`)
}
