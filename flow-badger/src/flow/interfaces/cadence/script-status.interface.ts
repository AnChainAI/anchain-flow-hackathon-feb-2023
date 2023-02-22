export interface ScriptStatus<T> {
  readonly statusCode: number
  readonly message: string
  readonly data: T
}
