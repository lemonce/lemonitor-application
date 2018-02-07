'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const application = require('./webpack.base');

application.plugins.push(new webpack.EnvironmentPlugin([
	'NODE_ENV'
]));

// Dev server options
application.devServer = {
	proxy: {
		'/api': `http://localhost:8080`
	}
};

// Inject to a index.html template
application.plugins.push(new HtmlWebpackPlugin({
	template: `html-loader!${path.resolve(__dirname, './template/index.html')}`,
	inject: 'head'
}));

process.env.NODE_ENV = 'development';

module.exports = application;