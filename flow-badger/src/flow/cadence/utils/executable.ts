export abstract class Executable<T, U> {
  protected abstract resolveArgs(args: T): unknown[]
  public abstract send(args: T): (U | Error) | Promise<U | Error>
  public async sendOrThrow(args: T) {
    const result = await this.send(args)
    if (result instanceof Error) {
      throw result
    }
    return result
  }
}
