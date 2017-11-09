import Effects from './effects'

function composeMiddleware (nextMiddleware, currentMiddleware) {
  return (effect) => currentMiddleware(effect, nextMiddleware)
}

function composeMiddlewares (middlewares) {
  return middlewares.reduceRight(composeMiddleware, terminalMiddleware)
}

function terminalMiddleware (effect, next) {}

function executeCallMiddleware (effectDescriptor, next) {
  const {type, obj, fn, args} = effectDescriptor
  if (type === 'CALL') return fn.call(obj, ...args)
  return next(effectDescriptor)
}

export class Effector {
  constructor (middlewares = []) {
    const defaultMiddleware = [
      executeCallMiddleware,
    ]
    this.setMiddleware(middlewares.concat(defaultMiddleware))
    this.createEffectHelpers(Effects)
  }

  createEffectHelpers () {
    Object.entries(Effects).forEach(([effectName, effectFn]) => {
      this[effectName] = (...args) => this.dispatch(effectFn(...args))
    })
  }

  dispatch (effect) {
    return this.composedMiddleware(effect)
  }

  getMiddleware () { return this.middlewares.slice() }
  setMiddleware (middlewares) {
    this.middlewares = middlewares.slice()
    this.composedMiddleware = composeMiddlewares(this.middlewares)
  }
}
