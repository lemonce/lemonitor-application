'use strict';
const Ajv = require('ajv');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const application = require('./webpack.base').application;

const ajv = new Ajv({ useDefaults: true });

const validate = ajv.compile({
	properties: {
		devtool: {
			type: 'string',
			default: 'inline-source-map'
		},
		resolve: {
			type: 'object',
			default: {},
			properties: {
				alias: {
					type: 'object',
					default: {}
				}
			}
		},
		// Disable node mock
		node: {
			type: 'boolean',
			const: false,
			default: false
		}
	}
});
	
// Development environment
const ORIGIN_HTTP_PORT = process.env.HTTP_PORT;
process.env.INJECT = true;
process.env.HTTP_PORT = 8200;
process.env.HTTPS_PORT = 443;
process.env.HOSTNAME = 'localhost';

validate(application);

application.plugins.push(new webpack.EnvironmentPlugin([
	'INJECT', 'NODE_ENV'
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