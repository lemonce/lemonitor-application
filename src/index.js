'use strict';
const webpack = require('webpack');
const debug = require('debug')('lemonitor-application:');
const lemonitor = require('lemonitor-service');
const path = require('path');
const express = require('express');
const devServer = require('./dev');

const { application, config } = lemonitor;
const htdocPath = config.getPath('htdocs');
const publicPath = path.resolve(htdocPath, './public');

config.register('application', require('./config/application.json'));

if (process.env.NODE_ENV === 'production') {
	lemonitor.on('bootstrap', promiseList => {
		debug('Compiling bundles.');
		
		const webpackProd = require('../build/webpack.prod');

		const compiling = new Promise((resolve, reject) => {
			webpack(webpackProd, (err, stats) => {
				if (err) {
					return reject(err);
				}
			
				debug(stats.toString('minimal'));
		
				resolve();
			});
		}).then(() => {
			application.use('/', express.static(publicPath));

			debug('Compiling successfully.');
		});

		promiseList.push(compiling);
	});
} else {
	lemonitor.on('launch', () => {
		debug('Starting webpack dev server. Wating...');
	
		devServer();
	});
}