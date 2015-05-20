var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {

  // We change to normal source mapping, if you need them
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {include: /\.json$/, loaders: ['json-loader']},

        // react-hot-loader: It handles HMR updates for any JSX file automatically as long as your
        // JSX files export a valid component.
        {include: /\.jsx$/, loaders: ['react-hot', 'babel-loader?stage=1&optional=runtime']},
        {include: /\.js$/, loaders: ['react-hot', 'babel-loader?stage=1&optional=runtime'], exclude: [/node_modules/, /bower_components/]},

        // similar to a unix pipe from right to left. X!Y!Z is Z->Y->Z
        // the css file is loaded into css loader and then piped into style-loader which adds a <style/> tag to index.html
        {include: /\.css$/, loader: "style-loader!css-loader"},

        // less -> css -> style tag in index.html
        {include: /\.less$/, loader: "style-loader!css-loader!less-loader"},
        {include: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
        //{include: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        {include: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        {include: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        //{include: /\.jpe?g$|\.gif$|\.png$/i, loader: "file-loader" }
    ]
  },
  plugins: [
    // makes a module (JQuery here) available as variable in every module
    // needed for UIkit
    //new Webpack.ProvidePlugin({ // http://webpack.github.io/docs/shimming-modules.html
    //  $: "jquery",
    //  jQuery: "jquery",
    //  "window.jQuery": "jquery"
    //}),

    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  resolve: {
    extensions: ["", ".json", ".jsx", ".js"],
    modulesDirectories: [
      "app", "node_modules", "bower_components"
    ]
  }
};

module.exports = config;
