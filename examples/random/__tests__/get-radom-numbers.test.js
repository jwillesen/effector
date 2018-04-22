const {mockCall, effector} = require('effector/test')
const {getRandomNumbers} = require('../index.js')
const axios = require('axios')

effector.useMockCalls()

afterEach(() => {
  effector.resetMockCalls()
})

it('fetches random numbers', async () => {
  // mockCall invokes the passed function when a matching call is made.
  mockCall([axios, 'get'], (url, params) => {
    expect(url).toMatch(/random.org/)
    expect(params).toMatchSnapshot()
    return {data: 'result-data'}
  })
  // mockCall returns its second parameter as a convenience for creating mock functions.
  const mockLog = mockCall(console.log, jest.fn())
  expect(await getRandomNumbers()).toBe('result-data')
  expect(mockLog).toHaveBeenCalledWith('result-data')
})
