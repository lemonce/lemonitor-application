'use strict';
const webpack = require('webpack');
const debug = require('debug')('lemonitor-application:');
const service = require('lemonitor-service');
const path = require('path');
const express = require('express');

service.extend(app => {
	const htdocPath = service.config.getPath('htdocs');
	const publicPath = path.resolve(htdocPath, './public');

	app.use('/', express.static(publicPath));
});

if (process.env.NODE_ENV === 'production') {
	service.onInit(promiseList => {
		debug('Compiling bundles.');
		
		const webpackProd = require('./build/webpack.prod');

		promiseList.push(new Promise((resolve, reject) => {
			webpack(webpackProd, (err, stats) => {
				if (err) {
					return reject(err);
				}
			
				debug(stats.toString('minimal'));
				debug('Compiling successfully.');
		
				resolve();
			});
		}));
	});
}

const aliasStore = {
	app: path.resolve(__dirname, './app'),
	axios: 'axios/dist/axios.min.js',
	vue: 'vue/dist/vue.runtime.esm.js',
	'vue-i18n': 'vue-i18n/dist/vue-i18n.min.js',
	'vue-router': 'vue-router/dist/vue-router.min.js',
	vuex: 'vuex/dist/vuex.min.js'
};

const entryStore = {
	bundle: [
		'bootstrap/dist/css/bootstrap.min.css',
		'element-ui/lib/theme-chalk/index.css',
		'font-awesome/css/font-awesome.min.css',
		'babel-polyfill/dist/polyfill.min.js',
		path.resolve(__dirname, './app')
	]
};

exports.appendAlias = function (name, pathname) {
	debug('Append an entry name: %o, path: %o', name, pathname);

	return aliasStore[name] = pathname;
};

exports.appendEntry = function (name, pathname) {
	if (!entryStore[name]) {
		debug('Create new entry name: %o.', name);

		entryStore[name] = [];
	}

	entryStore[name].push(pathname);

	debug('Append  Path:%o to Entry:%o', pathname, name);

	return pathname;
};

exports.getAlias = function () {
	return aliasStore;
};

exports.getEntry = function () {
	return entryStore;
};