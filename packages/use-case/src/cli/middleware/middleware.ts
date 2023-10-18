export interface MiddlewareInterface {
  run(): Promise<any>
}
