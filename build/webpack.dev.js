'use strict';
const application = require('./webpack.base');

// Dev server options
application.devServer = {
	proxy: {
		'/api': 'http://localhost:8080',
		'/favicon.ico': 'http://localhost:8080'
	}
};

module.exports = application;