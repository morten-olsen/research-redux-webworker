const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'demo/index.js'),
  resolve: {
    modules: [
      path.join(__dirname, 'demo'),
      'node_modules',
    ],
    alias: {
      'redux-webworker': path.join(__dirname, 'lib/index.js'),
    },
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-1', 'react'],
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }],
  },
}
