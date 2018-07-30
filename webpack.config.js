const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

const src = path.resolve(__dirname, 'src')
const htdocs = path.resolve(__dirname, 'htdocs')
const modules = path.resolve(__dirname, 'node_modules')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: {
    index: path.resolve(src, 'index.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
  },
  resolve: {
    alias: {
      'oddd.io': src,
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    contentBase: src,
    historyApiFallback: true,
    host: process.env.HOST || 'localhost',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(htdocs, 'index.ejs'),
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(modules, 'font-awesome'),
      to: path.resolve(dist, 'fonts/font-awesome'),
    }, {
      from: path.resolve(htdocs, 'oddd.png'),
      to: dist,
    }]),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      { test: /\.scss$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   },
  // },
}
