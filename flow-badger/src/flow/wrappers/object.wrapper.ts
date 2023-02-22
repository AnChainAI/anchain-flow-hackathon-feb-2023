import { KeyValue } from './interfaces/key-value.interface'
import * as cdc from '@onflow/types'
import * as fcl from '@onflow/fcl'

export function parseObject(
  obj: Record<string, string | null>
): [KeyValue<string | unknown>[], unknown] {
  const flowMeta: KeyValue<string | unknown>[] = []
  const typeMeta: KeyValue<string | unknown>[] = []
  for (const prop in obj) {
    const val = obj[prop] ?? ''
    flowMeta.push({ key: prop, value: val.toString() })
    typeMeta.push({ key: cdc.String, value: cdc.String })
  }
  return [flowMeta, cdc.Dictionary(typeMeta)]
}

export function wrapObject(obj: Record<string, string | null>) {
  const [flowMeta, typeMeta] = parseObject(obj)
  return fcl.arg(flowMeta, typeMeta)
}
