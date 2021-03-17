const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const webpack = require('webpack');
const path = require('path');
const execa = require('execa');
const DotEnv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT';
const isProduction = process.env.NODE_ENV.toUpperCase() === 'PRODUCTION';

const getEnvFromCurrentEnvironment = () => {
  if (isDevelopment) {
    return '.env.development';
  }

  if (isProduction) {
    return '.env.production';
  }

  return '.env.homolog';
};

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  context: path.resolve(__dirname, '.'),
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.svg$/,
        use: 'svg-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      path: path.resolve(__dirname, 'public'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pt-br/),
    new DotEnv({
      path: path.resolve(__dirname, getEnvFromCurrentEnvironment()),
      safe: true,
      silent: true,
    }),
    isDevelopment &&
      new WebpackBeforeBuildPlugin(async (_stats, stop) => {
        try {
          await execa('yarn', ['update']);
        } finally {
          stop();
        }
      }),
  ].filter(Boolean),
};
