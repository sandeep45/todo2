var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({prettyPrint: true});
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: "eval-source-map",
  context: path.join(__dirname, "src"), //The base directory (absolute path!) for resolving the entry option.
  entry: {
    app: "js/app.js"
  },
  output: {
    path: path.join(__dirname, "dist", "[hash]"), //path to where webpack will build your stuff
    filename: "[name]_[hash].bundle.js",
    chunkFilename: "[id]_[hash].chunk.js",
    publicPath: "/dist/[hash]/" //specifies the public URL address of the output files when referenced in a browser
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "commons",
      filename: "commons_[hash].js",
      minChunks: 2
    }),
    assetsPluginInstance,
    new HtmlWebpackPlugin({
      title: "App.html",
      filename: "app.html",
      template: "templates/app.html",
      inject: 'body',
      chunks: ['commons', 'app'],
      showErrors: true
    })
  ],
  module: {
    loaders: [
      {
        test: /.css$/,
        loader: "style!css"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["react-hot"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query:{
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy'
          ],
          presets: ["es2015", "react", "stage-1"]
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
        exclude: /templates/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: require.resolve("jquery"),
        loader: 'expose?$'
      },
      {
        test: require.resolve("jquery"),
        loader: "expose?jQuery"
      },
      {
        test: require.resolve("underscore"),
        loader: "expose?_"
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}

    ]
  },
  resolve: {
    /* Calling require('modulename') without prepending ./ to the module name will attempt
    to load the module from one of the third party module folders, node_modules or web_modules. */
    modulesDirectories: ['node_modules', 'bower_components', 'web_modules'],
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee'],
    root: [
      path.resolve(__dirname, './src'),
    ]
  }

}