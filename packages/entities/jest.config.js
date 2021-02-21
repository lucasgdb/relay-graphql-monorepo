// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  // globalSetup: '<rootDir>/src/utils/test/globalSetup.js',
  // globalTeardown: '<rootDir>/src/utils/test/globalTeardown.js',
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  watchman: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  // setupFiles: ['<rootDir>/src/setupTests.js'],
};
