module.exports = {
  mode: "production",
  entry: {
    app: ["./js/app.js"]
  },
  output: {
    filename: 'bundle-app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};