module.exports = {
  testEnvironment: 'node',
  bail: true,
  verbose: true,
  testTimeout: 30000,
  collectCoverageFrom: [
    'app/**/*.{js}',
    '!**/node_modules/**'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '<rootDir>/test/**/?(*.)+(spec|test).js?(x)',
    '<rootDir>/**/__tests__/?(*.)+(spec|test).js?(x)'
  ]
};
