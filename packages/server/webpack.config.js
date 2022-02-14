/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/server.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFormat: 'commonjs',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  externals: {
    knex: 'commonjs knex',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
