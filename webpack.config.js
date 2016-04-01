var path = require('path');
var webpack = require('webpack');

//exports the configuration object
module.exports = {
  //a developer tool to improve the debugging
  devtool: 'eval', 
  //This is the entry point for the bundle
  entry: {
    //Each value in this array will be loaded as a module at startup
    app : [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './lib/index.js'],
  },
  //This will decide how the compiled files are written to the disk
  output: {
    //Absolute path of the output directory
    path: path.join(__dirname, './public/js/'),
    //Name of the output file
    filename: `app.js`,
    //Specifies the publuc URL address which can be accessed in a browser
    publicPath: '/js/'
  },
  //Additional plugins to be included
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  //
  node: {
    fs: "empty"
  },
  //Options which affect the way modules are resolved
  resolve: {
    //Modules can be replaced with other modules using this option
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    //The list of extensions that help in resolving the modules
    extensions: ['', '.js']
  },
  //
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  //Options affecting the modules
  module: {    
    //Loaders that are applied automatically
    loaders: [
    {
      //Files should have the extension .js
      test: /\.js$/,
      //List of all the loaders
      loaders: ['react-hot', 'babel'],
      //Exclude the specified folder
      exclude: /node_modules/,
      //Include the specified folder in the path
      include: [path.join(__dirname,'./lib')]
    },
    {
      test: /\.xml$/,
      loader: "raw"
    },
    {
      test: /\.json$/,
      loaders: ['json-loader']
    },
    {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};