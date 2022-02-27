/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const DotEnv = require('dotenv-webpack');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new DotEnv({
      path: '.env.production',
      safe: true,
      silent: true,
    }),
  ],
});
