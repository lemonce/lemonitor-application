'use strict';
const path = require('path');
const webpack = require('webpack');
const { config } = require('lemonitor-service');
const publicPath = path.resolve(config.getPath('htdocs'), './public');

const application = require('./webpack.base');

application.output.path = publicPath;
application.output.filename = '[name].min.js';
application.plugins.push(
	new webpack.ProgressPlugin()
);
application.mode = 'production';

module.exports = application;