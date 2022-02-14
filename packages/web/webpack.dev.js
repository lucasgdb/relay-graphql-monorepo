/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const DotEnv = require('dotenv-webpack');
const path = require('path');
const execa = require('execa');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval',
  cache: true,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    client: {
      overlay: true,
      progress: false,
    },
    host: '0.0.0.0',
    compress: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    port: 8081,
    open: false,
  },
  plugins: [
    new DotEnv({
      path: '.env.development',
      safe: true,
      silent: true,
    }),

    new WebpackBeforeBuildPlugin(async (_stats, stop) => {
      try {
        const { stdout } = await execa('yarn', ['relay']);
        console.info(stdout, '\n');
      } finally {
        stop();
      }
    }),
  ].filter(Boolean),
});
