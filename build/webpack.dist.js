'use strict';

const Ajv = require('ajv');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const application = require('./webpack.base');

const ajv = new Ajv({ useDefaults: true });

const validate = ajv.compile({
	properties: {
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
		},
		output: {
			type: 'object',
			default: {},
			properties: {
				// Set entry libraryTarget
				libraryTarget: {
					type: 'string',
					const: 'umd',
					default: 'umd'
				}
			}
		},
		plugins: {
			type: 'array',
			default: []
		},
		externals: {
			type: 'array',
			default: []
		}
	}
});

validate(application);

// Use uglify
application.plugins.push(new UglifyJSPlugin({
	parallel: true
}), new webpack.ProgressPlugin());

module.exports = application;