import { Executable } from '../executable'
import * as fcl from '@onflow/fcl'

export abstract class Script<T, U> extends Executable<T, U> {
  constructor(public readonly template: string) {
    super()
  }

  async send(args: T) {
    try {
      return (await fcl.query({
        cadence: this.template,
        args: () => this.resolveArgs(args)
      })) as U
    } catch (err) {
      console.error(this.template)
      console.error(err)
      if (err instanceof Error) {
        return err
      }
      return new Error(`${err}`)
    }
  }
}
