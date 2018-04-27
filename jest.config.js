module.exports = {
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js'],
  coverageReporters: [
    'html',
    'text',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
  ],
}
