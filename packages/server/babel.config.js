module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-module-resolver', { root: ['./src'] }],
    '@babel/plugin-proposal-export-default-from',
    'babel-plugin-lodash',
  ],
};
