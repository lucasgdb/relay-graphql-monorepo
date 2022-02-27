/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
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
    compress: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
        exclude: [/node_modules/],
      },
    ],
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

    new ReactRefreshWebpackPlugin(),
  ],
});
