const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//Webpack is configured correctly but it still is giving undefined error with allEnemies.forEach

module.exports = {
  entry: ['babel-polyfill', './js/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
