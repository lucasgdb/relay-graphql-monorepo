/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const DotEnv = require('dotenv-webpack');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DotEnv({
      path: '.env.homolog',
      safe: true,
      silent: true,
    }),
  ],
});
