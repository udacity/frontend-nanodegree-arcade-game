const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './js/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
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
          preset: ['env'],
        },
      },
    ],
  },
};
