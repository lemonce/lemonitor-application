'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const application = require('./webpack.base');

// Use uglify
application.plugins.push(new UglifyJSPlugin({
	parallel: true
}), new webpack.ProgressPlugin());

module.exports = application;