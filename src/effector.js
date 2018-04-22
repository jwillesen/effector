import {createCallEffect} from './utils'

function chainMiddleware (nextMiddleware, currentMiddleware) {
  return (effect) => currentMiddleware(effect, nextMiddleware)
}

function composeMiddleware (middleware) {
  return middleware.reduceRight(chainMiddleware, terminalMiddleware)
}

function terminalMiddleware (effect, next) {}

function executeCallEffect (effect, next) {
  const {obj, fn, args} = effect
  return fn.call(obj, ...args)
}

export function call (toInvoke, ...args) {
  return Effector.instance.call(toInvoke, ...args)
}

export function apply (obj, fn, ...args) {
  return Effector.instance.apply(obj, fn, ...args)
}

export class Effector {
  static theInstance = null;

  static get instance () {
    if (this.theInstance == null) this.theInstance = new Effector()
    return this.theInstance
  }

  static set instance (newInstance) {
    this.theInstance = newInstance
  }

  constructor (middleware = []) {
    this.middleware = composeMiddleware([...middleware, executeCallEffect])
  }

  call (toInvoke, ...args) {
    const effect = createCallEffect(toInvoke, args)
    return this.middleware(effect)
  }

  apply (obj, fn, ...args) {
    return this.call([obj, fn], ...args)
  }
}
