module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-function-bind',
    'babel-plugin-module-resolver',
  ],
  ignore: ['node_modules', 'build', '**/*.spec.js', '**/*.test.js'],
};
