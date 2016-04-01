// includes path module
var path = require('path');

// includes webpack module
var webpack = require('webpack');

// exports module according to specifications inside
module.exports = {
  // entry -- entry point for module bundle
  entry: {
    // when an object is passed into entry, multiple entry bundles are created
    app : [
      // specifies location of app module
      './lib/index.js'],
  },
  // output -- options affecting compilation output (tells Webpack how to write files to disk)
  output: {
    // location files are written to
    path: path.join(__dirname, './public/js/'),

    // specifies output name
    filename: `app.js`,

    // specifies public URL address of output files when referenced in browser
    publicPath: '/js/'
  },
  // plugins -- custom build steps
  plugins: [
    // creates a new dependency injection
    new webpack.DefinePlugin({
        'process.env': {
          // React is in development mode by default, so this allows React to be used
          // in production modes
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    // compresses JavaScript chunk output, removes extra unnecessary development code
    new webpack.optimize.UglifyJsPlugin({
    }),
  ],
  // includes polyfills for different node packages
  // polyfill -- additional code that provides facilities not built into browsers
  node: {
    // empties file system
    fs: "empty"
  },
  // resolve -- options affecting resolving of modules 
  resolve: {
    // replaces modules with other modules (in this case react)
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    // extensions used to resolve modules
    extensions: ['', '.js']
  },
  // resolveLoader -- options affecting resolving of loaders
  resolveLoader: {
    // directory that webpack should look for modules not found
    'fallback': path.join(__dirname, 'node_modules')
  },
  // module -- options affecting normal modules
  module: {
    // automatically applied loaders
    loaders: [
    {
      // must meet this test condition
      test: /\.js$/,

      // uses loader modules react-hot & babel
      loaders: ['react-hot', 'babel'],

      // excludes directory
      exclude: /node_modules/,

      // match file extension
      include: [path.join(__dirname,'./lib')]
    },
    // the rest are pretty self-explanatory based on the comments above
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
