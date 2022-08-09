export type HttpMethods = 'get' | 'post' | 'put' | 'delete' | 'patch'

// 柯里化
function getRequestDecorator(type: HttpMethods) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = getRequestDecorator('get')

export const Post = getRequestDecorator('post')

export const put = getRequestDecorator('put')
