'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { getAlias, getEntry } = require('../src/package');

const babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: [['env', {
			targets: {
				browsers: 'ie 8'
			}
		}]],
		plugins: ['transform-runtime']
	}
};

module.exports = {
	entry: getEntry(),
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: babelLoader,
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: babelLoader
					}
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(['css-loader'])
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 8192 }
					}
				]
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: ''
						}
					}
				],
				exclude: __dirname
			},
			{
				test: /\.yaml$/,
				loader: 'json-loader!yaml-loader',
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: getAlias()
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		new HtmlWebpackPlugin({
			template: `html-loader!${path.resolve(__dirname, './template/index.html')}`,
			inject: 'head'
		})
	],
	externals: {
		jquery: 'null'
	},
	node: false
};