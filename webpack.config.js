/* jshint globalstrict: true, esnext: true */
/* global __dirname, module */

'use strict';

module.exports = {
  context: __dirname + '/',
  entry: './src/app',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  watch:true,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};

