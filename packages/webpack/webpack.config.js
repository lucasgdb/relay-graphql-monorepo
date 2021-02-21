import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBeforeBuildPlugin from 'before-build-webpack';
import webpack from 'webpack';
import path from 'path';
import execa from 'execa';
import DotEnv from 'dotenv-webpack';

const cwd = process.cwd();

const isDevelopment = process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT';
const isProduction = process.env.NODE_ENV.toUpperCase() === 'PRODUCTION';

const getEnvFromCurrentEnvironment = () => {
  if (isDevelopment) {
    return './.env.development';
  }

  if (isProduction) {
    return './.env.production';
  }

  return './.env.homolog';
};

export default {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/index.js'],
  context: path.join(cwd, '.'),
  devtool: 'source-map',
  resolve: {
    modules: [path.join(cwd, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(cwd, 'build'),
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
    contentBase: path.join(cwd, 'public'),
    filename: 'bundle.js',
    host: '0.0.0.0',
    port: 8081,
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      path: path.join(cwd, 'public'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pt-br/),
    new DotEnv({
      path: path.join(cwd, getEnvFromCurrentEnvironment()),
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
