const axios = require('axios')
const {call} = require('effector')

async function getRandomNumbers () {
  const result = await call([axios, 'get'], 'https://random.org/integers', {
    params: {
      num: 100,
      min: 1,
      max: 100,
      col: 10,
      base: 10,
      format: 'plain',
      rnd: 'new',
    },
  })
  call(console.log, result.data)
  return result.data
}

module.exports = getRandomNumbers
