import { ScriptStatus, Script } from '../flow'
import { useState } from 'react'

export function useScript<T, U>(script: Script<T, ScriptStatus<U>>) {
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<U | null>(null)
  const [loading, setLoading] = useState(false)

  const runScript = async (args: T) => {
    setLoading(true)
    const resp = await script.send(args)
    if (resp instanceof Error) {
      // Blockchain is down error
      setData(null)
      setError(new Error('Unknown Blockchain related Error with Script'))
    } else if (resp?.data == null) {
      // Validation error
      setData(null)
      setError(new Error(resp.message))
    } else {
      setData(resp.data)
      setError(null)
    }
    setLoading(false)
  }

  return { data, loading, error, runScript }
}
