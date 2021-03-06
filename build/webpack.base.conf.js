const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");


let basePath = path.join(__dirname, '../');

// 根据html遍历入口
let entrys = {};
let htmlPlugins = [];
let htmlUrl = path.join(basePath, 'src/html');
let jsBasePath = path.join(basePath, 'src/js');
let result = fs.readdirSync(htmlUrl);
result = (result instanceof Array) ? result : [];
result.forEach((item) => {
  if (/^([\S]+).html/.test(item)) {
    let pageName = RegExp.$1;
    let jsPath = path.join(jsBasePath, `${pageName}.js`);
    try{
      fs.statSync(jsPath);
      entrys[pageName] = `./src/js/${pageName}.js`;
    } catch (ex) {
      entrys[pageName] = path.join(basePath, 'index.js');
    }
    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: `html/${pageName}.html`,
      template: path.resolve(basePath, `src/html/${pageName}.html`),
      inject  : 'body',
      minify:{
        collapseWhitespace: true,
      }
    }))
  }
})

module.exports = {
  mode: 'none',
  entry: entrys,
  output: {
    path: path.resolve(basePath, 'dist'),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({use: [{loader: "css-loader"}, {loader: "sass-loader"}]})
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader?limit=8000&name=../static/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("css/[name].[hash].css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ].concat(htmlPlugins)
}
