'use strict';
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = (...args) => path.resolve(__dirname, ...args);

const ROOT_PATH = resolve('./');
const OUTPUT_PATH = resolve('dist');
const PORT = 9999;

module.exports = {
  context: ROOT_PATH,
  mode: 'development',
  target: 'web',
  entry: {
    'rx-test': resolve('src/index.js'),
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', 'css'],
    alias: {
      '@react': resolve('src/react'),
      '@vue': resolve('src/vue'),
      '@rx': resolve('src/rx'),
      '@xact': resolve('src/xact'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
    ],
  },
  plugins: [
      new HtmlWebPackPlugin({
      filename: `index.html`,
      template: 'src/index.html',
      // inject: 'head',
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: PORT, // default port is 9999
    hot: true,
    inline: true,
    // open: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/index.html',
    },
  },
};
