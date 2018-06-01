let path = require('path');
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let entrys = {};
let htmlPlugins = [];

let htmlUrl = path.join(__dirname, 'src/html');
let jsBasePath = path.join(__dirname, 'src/js');
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
      entrys[pageName] = path.join(__dirname, 'index.js');
    }
    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: `html/${pageName}.html`,
      template: path.resolve(__dirname, `src/html/${pageName}.html`),
      inject  : 'body',
      minify:{
        collapseWhitespace: true,
      }
    }))
  }
})

module.exports = {
  entry: entrys,
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
    )
  ].concat(htmlPlugins)
}
