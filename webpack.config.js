const path = require('path');
const { MODE } = process.env;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: MODE,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'file-loader'
      }
    ]
  }
};
