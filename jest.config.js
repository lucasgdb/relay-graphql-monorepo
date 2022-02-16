module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)', 'build'],
  testPathIgnorePatterns: ['node_modules', 'build'],
};