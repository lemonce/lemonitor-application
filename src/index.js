'use strict';
const webpack = require('webpack');
const debug = require('debug')('lemonitor-application:');
const lemonitor = require('lemonitor-service');
const path = require('path');
const express = require('express');
const devServer = require('./dev');

lemonitor.config.register('application', require('./config/application.json'));

lemonitor.extend(app => {
	const htdocPath = lemonitor.config.getPath('htdocs');
	const publicPath = path.resolve(htdocPath, './public');

	app.use('/', express.static(publicPath));
});

if (process.env.NODE_ENV === 'production') {
	lemonitor.onInit(promiseList => {
		debug('Compiling bundles.');
		
		const webpackProd = require('../build/webpack.prod');

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
} else if (process.env.NODE_ENV === 'development') {
	lemonitor.onLaunch(() => {
		debug('Starting webpack dev server. Wating...');
	
		devServer();
	});
}