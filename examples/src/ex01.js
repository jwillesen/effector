const axios = require('axios')
const call = require('../../dist/effects').call

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
  console.log(result.data)
}

module.exports = getRandomNumbers
