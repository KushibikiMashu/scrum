export interface MiddlewareInterface {
  run(): Promise<any>
}

class Middleware implements MiddlewareInterface {
  middlewares: MiddlewareInterface[] = [

  ]

  async run() {
    for (const middleware of this.middlewares) {
      await middleware.run()
    }
  }
}
