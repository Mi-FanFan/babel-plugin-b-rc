const webpack = require('webpack'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      path = require('path')

exports.default = {
  entry: './examples/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  }
    ,
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin()
  ]
}