import {Effector} from '../effector'

describe('call effect', () => {
  it('calls the method with the specified parameters', () => {
    const fn = jest.fn()
    new Effector().call(fn, 'arg1', 42)
    expect(fn).toHaveBeenCalledWith('arg1', 42)
  })

  it('calls the method with the specified object', () => {
    const target = {}
    const fn = jest.fn()
    new Effector().call([target, fn], 42)
    expect(fn.mock.instances[0]).toBe(target)
  })

  it('calls the method with an undefined object if an object is not specified', () => {
    const fn = jest.fn()
    new Effector().call(fn)
    expect(fn.mock.instances[0]).not.toBeDefined()
  })

  it('calls the method with the specified name', () => {
    expect.hasAssertions()
    class Foo {
      method (arg) { expect(arg).toBe(42) }
    }
    const foo = new Foo()
    new Effector().call([foo, 'method'], 42)
  })
})

describe('call effect errors', () => {
  it('fails if the first arg is not a function or array', () => {
    expect(() => new Effector().call({})).toThrow()
  })

  // not sure if I actually care
  // it('fails if the first array element is not an object', () => {
  //   expect(() => new Effector().call([42, () => {}])).toThrow()
  // })

  it('fails if the second array element is not a method or string', () => {
    expect(() => new Effector().call([{}, 42])).toThrow()
  })

  it('fails when the method name does not exist', () => {
    const obj = {}
    expect(() => new Effector().call([obj, 'method'])).toThrow()
  })
})

describe('middleware', () => {
  it('accepts middleware in constructor and preserves default middleware', () => {
    const middleware = jest.fn((effect, next) => next(effect))
    const fn = jest.fn()
    const effector = new Effector([middleware])
    effector.call(fn)
    expect(middleware).toHaveBeenCalled()
    expect(fn).toHaveBeenCalled()
  })

  it('invokes middleware in order', () => {
    const calls = []
    const makeMockMiddleware = id => (effect, next) => {
      calls.push(id)
      return next(effect)
    }
    const effector = new Effector([makeMockMiddleware('first'), makeMockMiddleware('second')])
    const fn = jest.fn()
    effector.call(fn, 'arg')
    expect(calls).toEqual(['first', 'second'])
    expect(fn).toHaveBeenCalledWith('arg')
  })
})
