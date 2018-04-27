import {Effector} from './effector'
import {createCallEffect} from './utils'

export class TestEffectRegistry {
  static theInstance = null

  static get instance () {
    if (this.theInstance == null) this.theInstance = new TestEffectRegistry()
    return this.theInstance
  }

  static set instance (newInstance) {
    this.theInstance = newInstance
  }

  mockedCalls = [] // array of objects: {effect: <a call effect>, mockFn: <provided mock fn>}
  mockCall (toInvoke, mockFn) {
    const effect = createCallEffect(toInvoke)
    this.mockedCalls.push({effect, mockFn})
    return mockFn
  }

  call (effect) {
    const mockedCall = this.findMockCallForEffect(effect)
    if (mockedCall == null) throw new Error('Tried to invoke an unmocked call')
    if (typeof mockedCall.mockFn === 'function') {
      return mockedCall.mockFn(...effect.args)
    } else {
      return mockedCall.mockFn
    }
  }

  reset () {
    this.mockedCalls = []
  }

  findMockCallForEffect (effect) {
    return this.mockedCalls.find(mockedCall => this.equalEffects(effect, mockedCall.effect))
  }

  equalEffects (first, second) {
    return first.obj === second.obj && first.fn === second.fn
  }
}

export function createTestMiddleware (testEffectRegistry) {
  return function (effect, next) {
    return testEffectRegistry.call(effect)
    // purposefully not calling next because we don't want to actually invoke
    // these calls while testing. The provided mock function can invoke it if
    // desired.
  }
}

export function mockCall (invoked, fn) {
  return TestEffectRegistry.instance.mockCall(invoked, fn)
}

export function useMockCalls () {
  Effector.instance = new Effector([
    createTestMiddleware(TestEffectRegistry.instance),
  ])
}

export function resetMockCalls () {
  TestEffectRegistry.instance.reset()
}

export const effector = {
  mockCall,
  useMockCalls,
  resetMockCalls,
}

export default effector
