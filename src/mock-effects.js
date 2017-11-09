import effects, {destructureToInvoke} from './effects'
import _ from 'lodash'

const originalCall = effects.call

let callMock

function assertEqual (actual, expected) {
  if (!_.isEqual(actual, expected)) {
    throw new Error(`expected
      ${JSON.stringify(expected)}
      but got
      ${JSON.stringify(actual)}`)
  }
}

function callDescriptor (toInvoke, ...args) {
  const [obj, fn] = destructureToInvoke(toInvoke)
  return {type: 'CALL', obj, fn, args}
}
export {callDescriptor as call}

class ExpectedCalls {
  expectedCalls = []
  actualCalls = []

  constructor (assertion) {
    callMock = this
    effects.call = this.mockedCall
    this.assertion = assertion || assertEqual
  }

  uninstall () {
    // order is important: uninstall should happen even if assertion fails so other tests aren't
    // affected by a failed uninstall
    callMock = null
    effects.call = originalCall
    this.assertion(this.actualCalls, this.expectedCalls.map(e => e[0]))
    // also make sure objects in calls are identical
    this.actualCalls.forEach((actual, index) => {
      this.assertIdentical(actual.obj, this.expectedCalls[index][0].obj)
    })
  }

  setCalls (calls) {
    this.expectedCalls = calls
  }

  mockedCall = (toInvoke, ...args) => {
    const actualEffect = callDescriptor(toInvoke, ...args)
    this.actualCalls.push(actualEffect)
    if (this.actualCalls.length > this.expectedCalls.length) {
      throw new Error(`unexpected call: ${JSON.stringify(actualEffect)}`)
    }

    const [expectedEffect, effectResult] = this.expectedCalls[this.actualCalls.length - 1]
    this.assertion(actualEffect, expectedEffect)
    // objects should be identical, not just equivalent
    this.assertIdentical(actualEffect.obj, expectedEffect.obj)
    return effectResult
  }

  assertIdentical (actual, expected) {
    if (actual !== expected) {
      this.assertion('actual object is not identical to expected object', true)
    }
  }
}

export function installMockEffects (assertion) {
  return new ExpectedCalls(assertion)
}

export function uninstallMockEffects () {
  if (callMock) callMock.uninstall()
}

export function expectCalls (expectedCalls) {
  if (!callMock) throw new Error('installMockEffects must be called before expectCalls')
  callMock.setCalls(expectedCalls)
}
