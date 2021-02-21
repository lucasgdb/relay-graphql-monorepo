module.exports = {
  clearMocks: true,
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'node',
  testMatch: ['*.spec.js', '*.spec.jsx', '*.test.js', '*.test.jsx'],
};
