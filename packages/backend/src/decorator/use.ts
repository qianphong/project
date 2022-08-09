import { RequestHandler } from 'express'

export function Use(...middlewares: RequestHandler[]) {
  return function (target: any, key: string) {
    let originMiddlewares: RequestHandler[] =
      Reflect.getMetadata('middlewares', target, key) || []
    originMiddlewares = [...originMiddlewares, ...middlewares]
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}
