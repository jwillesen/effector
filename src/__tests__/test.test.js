import {TestEffectRegistry, createTestMiddleware} from '../test'
import {createCallEffect} from '../utils'

function someFn () {}

describe('TestEffectRegistry', () => {
  describe('mockCall', () => {
    it('mockCall returns its second parameter', () => {
      const ter = new TestEffectRegistry()
      const result = ter.mockCall(someFn, 'param')
      expect(result).toBe('param')
    })

    it('throws if the invocation specifier is incorrect', () => {
      const ter = new TestEffectRegistry()
      expect(() => ter.mockCall(['a', 'b'])).toThrow()
    })
  })

  describe('call', () => {
    it('invokes the specified function with call parameters when registered mock is called', () => {
      const ter = new TestEffectRegistry()
      const mock = ter.mockCall(someFn, jest.fn())
      ter.call(createCallEffect(someFn, 'param'))
      expect(mock).toHaveBeenCalledWith('param')
    })

    it('finds a mock call registered with an object', () => {
      const obj = { foo: jest.fn() }
      const ter = new TestEffectRegistry()
      const mock = ter.mockCall([obj, 'foo'], jest.fn())
      ter.call(createCallEffect([obj, obj.foo], 'param'))
      expect(mock).toHaveBeenLastCalledWith('param')
    })

    it('returns the mocks return value when registered mock is called', () => {
      const ter = new TestEffectRegistry()
      ter.mockCall(someFn, jest.fn().mockReturnValue('mock result'))
      expect(ter.call(createCallEffect(someFn))).toBe('mock result')
    })

    it('returns the mock value when registered mock is called', () => {
      const ter = new TestEffectRegistry()
      ter.mockCall(someFn, 'result value')
      expect(ter.call(createCallEffect(someFn))).toBe('result value')
    })

    it('throws if there is a call that has not been registered', () => {
      const ter = new TestEffectRegistry()
      expect(() => ter.call(createCallEffect(someFn))).toThrow()
    })

    it('forgets mocked calls when reset', () => {
      const ter = new TestEffectRegistry()
      const mock = ter.mockCall(someFn, jest.fn())
      ter.reset()
      expect(() => ter.call(createCallEffect(someFn))).toThrow()
      expect(mock).not.toHaveBeenCalled()
    })
  })
})

describe('middleware', () => {
  it('creates middleware for Effector', () => {
    const ter = new TestEffectRegistry()
    const mock = ter.mockCall(someFn, jest.fn())
    const next = jest.fn()
    const middleware = createTestMiddleware(ter)
    middleware(createCallEffect(someFn), next)
    expect(mock).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })
})
