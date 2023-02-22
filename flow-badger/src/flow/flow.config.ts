import { getConfig } from './utils/get-config'
import { send } from '@onflow/transport-grpc'
import * as fcl from '@onflow/fcl'

// Export a strongly typed FCL config object
export const flowConfig = getConfig()

// Configure FCL
const conf = fcl.config(flowConfig)
conf.put('sdk.transport', send)
conf.put('service.OpenID.scopes', 'email email_verified name')
