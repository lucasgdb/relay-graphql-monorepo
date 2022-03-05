/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import DotEnv from 'dotenv-webpack';

import webpackConfig from './webpack.config';

const config = merge(webpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
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
    // @ts-expect-error webpack types mismatching
    new DotEnv({
      path: '.env.homolog',
      safe: true,
      silent: true,
    }),
  ],
});

export default config;
