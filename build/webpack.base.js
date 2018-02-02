'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const EXCLUDE_PARTTERN = /(node_modules|bower_components)/;
// Rewrite output path
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
	entry: {
		app: [
			'bootstrap/dist/css/bootstrap.min.css',
			'font-awesome/css/font-awesome.min.css',
			'bootstrap-slider/dist/css/bootstrap-slider.min.css',
			path.resolve(__dirname, '../app')
		]
	},
	output: {
		path: DIST_PATH,
		publicPath: '/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [EXCLUDE_PARTTERN]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader'
					}
				}
			},
			{
				// transform own css
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
				exclude: [/tea\.svg/]
				//TODO this is not a good way to exclude tea.svg when loading.
			},
			{
				test: /\.yaml$/,
				loader: 'json-loader!yaml-loader',
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'app': path.resolve(__dirname, '../app'),
			jquery: path.resolve(__dirname, './jquery-stub.js'),
			axios: 'axios/dist/axios.min.js',
			moment: 'moment/min/moment.min.js',
			vue: 'vue/dist/vue.runtime.esm.js',
			'vee-validate': 'vee-validate/dist/vee-validate.minimal.min.js',
			'vue-i18n': 'vue-i18n/dist/vue-i18n.min.js',
			'vue-router': 'vue-router/dist/vue-router.min.js',
			vuex: 'vuex/dist/vuex.min.js'
		}
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	],
	node: false
};