'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const application = require('./webpack.base');
	
// Development environment
const ORIGIN_HTTP_PORT = process.env.HTTP_PORT;
// process.env.INJECT = true;
process.env.HTTP_PORT = 8200;
process.env.HTTPS_PORT = 443;
process.env.HOSTNAME = 'localhost';

application.plugins.push(new webpack.EnvironmentPlugin([
	'NODE_ENV'
]));

// Dev server options
application.devServer = {
	proxy: {
		'/api': `http://localhost:${ORIGIN_HTTP_PORT}`
	}
};

// Inject to a index.html template
application.plugins.push(new HtmlWebpackPlugin({
	template: `html-loader!${path.resolve(__dirname, './template/index.html')}`,
	inject: 'head'
}));

process.env.NODE_ENV = 'development';

module.exports = application;