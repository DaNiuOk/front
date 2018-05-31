var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var entrys = {};

var htmlUrl = path.join(__dirname, 'src/html');
var jsUrl = path.join(__dirname, 'src/js');
var result = fs.readdirSync(htmlUrl);
result = (result instanceof Array) ? result : [];
console.log(result)


module.exports = {
  entry: {
    demo: './src/js/demo.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    index: 'html/demo.html'
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(
      ['dist/js/*','dist/css/*'],
      {
        root: __dirname,
        verbose: true,
        dry: false
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'html/demo.html',
      template: path.resolve(__dirname, 'src/html/demo.html'),
      inject  : 'body',
      minify:{
        collapseWhitespace: true,
      }
    })
  ]
}
