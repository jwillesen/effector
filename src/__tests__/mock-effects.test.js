// import {call, installMockEffects, uninstallMockEffects, expectCalls} from '../mock-effects'
// import {call as mockedCall} from '../effects'
//
// const originalCall = mockedCall
//
// function formatResult (arg) {
//   return `result: ${arg}`
// }
//
// function someFn (arg) {
//   return mockedCall(formatResult, arg)
// }
//
// describe('mocked effects are not installed', () => {
//   it('does not replace the original call method', async () => {
//     // before mocking, so mocked call is the original call method that just calls the function
//     expect(mockedCall(someFn, 42)).toBe('result: 42')
//   })
//
//   it('expectCalls throws', () => {
//     expect(() => expectCalls([])).toThrow()
//   })
// })
//
// describe('with mocked effects installed', () => {
//   beforeEach(() => installMockEffects((actual, expected) => expect(actual).toEqual(expected)))
//   afterEach(() => uninstallMockEffects())
//
//   it('passes successful calls', () => {
//     const mockFn = jest.fn()
//     expectCalls([
//       [call(mockFn, 42), 'test result'],
//     ])
//     const result = mockedCall(mockFn, 42)
//     expect(mockFn).not.toHaveBeenCalled()
//     expect(result).toBe('test result')
//   })
//
//   it('accepts this + function parameter', () => {
//     const mockFn = jest.fn()
//     const mockObj = {}
//     expectCalls([
//       [call([mockObj, mockFn], 42), 'test result'],
//     ])
//     const result = mockedCall([mockObj, mockFn], 42)
//     expect(mockFn).not.toHaveBeenCalled()
//     expect(result).toBe('test result')
//   })
//
//   it('accepts this + string parameter', () => {
//     const mockObj = {
//       mockFn: jest.fn(),
//     }
//     expectCalls([
//       [call([mockObj, 'mockFn'], 42), 'test result'],
//     ])
//     const result = mockedCall([mockObj, 'mockFn'], 42)
//     expect(mockObj.mockFn).not.toHaveBeenCalled()
//     expect(result).toBe('test result')
//   })
//
//   it('fails even if the assertion is caught', () => {
//     const mockFn = jest.fn()
//     // should fail because there are no expected calls
//     function catcher () {
//       try {
//         mockedCall(mockFn, 42)
//       } catch (err) {}
//     }
//     // can't help it if it's going to catch the assertion
//     expect(() => catcher()).not.toThrow()
//     // best we can do is assert that the expected calls was exactly what was actually called when we uninstall
//     expect(() => uninstallMockEffects()).toThrow()
//     // make sure uninstall still happens, otherwise other tests could be affected by a failed uninstall
//     expect(mockedCall).toEqual(originalCall)
//   })
//
//   it('fails on unexpected calls', () => {
//     const mockFn = jest.fn()
//     expectCalls([
//       [call(mockFn, 42), 'test result'],
//     ])
//     const result = mockedCall(mockFn, 42)
//     expect(result).toBe('test result')
//     expect(() => mockedCall(mockFn, 42)).toThrow()
//     expect(() => uninstallMockEffects()).toThrow()
//     expect(mockFn).not.toHaveBeenCalled()
//   })
//
//   it('fails on parameter mismatch', () => {
//     const mockFn = jest.fn()
//     expectCalls([
//       [call(mockFn, 42), 'test result'],
//     ])
//     expect(() => mockedCall(mockFn, 43)).toThrow()
//     expect(() => uninstallMockEffects()).toThrow()
//   })
//
//   it('fails on function mismatch', () => {
//     const fn = () => {}
//     const otherFn = () => {}
//     expectCalls([
//       [call(fn, 42), 'test result'],
//     ])
//     expect(() => mockedCall(otherFn, 42)).toThrow()
//     expect(() => uninstallMockEffects()).toThrow()
//   })
//
//   it('fails when objects are equivalent but not identical', () => {
//     const fn = () => {}
//     const obj = {}
//     const otherObj = {}
//     expectCalls([
//       [call([obj, fn], 42), 'test result'],
//     ])
//     expect(() => mockedCall([otherObj, fn], 42)).toThrow()
//     expect(() => uninstallMockEffects()).toThrow()
//   })
//
//   it('fails if string function indicator does not indicate a function', () => {
//     const obj = {}
//     expect(() => expectCalls([
//       [call([obj, 'doesNotExist'], 42), 'test result'],
//     ])).toThrow()
//   })
// })
