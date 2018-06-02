
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
module.exports = webpackConfig