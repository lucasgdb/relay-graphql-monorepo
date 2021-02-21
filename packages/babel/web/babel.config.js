module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-env',
  ],
  plugins: [
    [
      'relay',
      {
        schema: '../server/schema.graphql',
      },
    ],
    'babel-plugin-module-resolver',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
  ],
  ignore: [
    'node_modules',
    'build',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/*.test.js',
    '**/*.test.jsx',
  ],
};
