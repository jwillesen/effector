const {installMockEffects, uninstallMockEffects, expectCalls, call} = require('../../../dist/mock-effects')
const axios = require('axios')
const getRandomNumbers = require('../ex01')

beforeEach(() => installMockEffects())
afterEach(() => uninstallMockEffects())

it('calls axios', () => {
  expectCalls([
    [call(axios.get, 'https://random.org/integers'), {data: 'some result'}],
  ])
  getRandomNumbers()
})
