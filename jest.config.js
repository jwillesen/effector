module.exports = {
  testMatch: ['<rootDir>/(src|examples)/**/__tests__/**/*.test.js'],
  coverageReporters: [
    'html',
    'text',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
  ],
}
