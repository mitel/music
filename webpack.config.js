var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
    target: 'web',  // Compile for usage in a browser-like environment (default)
    cache: false, // Cache generated modules and chunks to improve performance for multiple incremental builds.
    context: __dirname, // The base directory (absolute path!) for resolving the entry option (below)
    devtool: 'eval', // Each module is executed with eval and //@ sourceURL
    entry: [
        'webpack-dev-server/client?http://localhost:8080', //inlocuieste linia din index.html??
        'webpack/hot/dev-server',
        //path.resolve(appPath, 'main.js')
        path.resolve(__dirname, 'app/main.js')
    ],

    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
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
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.NoErrorsPlugin() // tells the reloader to not reload if there is a syntax error in your code

      // makes a module (JQuery here) available as variable in every module
      // needed for UIkit
      //new Webpack.ProvidePlugin({ // http://webpack.github.io/docs/shimming-modules.html
      //    $: "jquery",
      //    jQuery: "jquery",
      //    "window.jQuery": "jquery"
      //})
  ],

  resolve: {
        extensions: ["", ".json", ".jsx", ".js"],
        modulesDirectories: [
            "app", "node_modules", "bower_components"
        ]
    }
};

module.exports = config;