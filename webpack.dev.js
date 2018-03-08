'use strict';
const application = require('./build/webpack.base');
const { config } = require('lemonitor-service');

application.devtool = 'inline-source-map';

const servicePort = config.get('server.protocol.http.port');

// Dev server options
application.devServer = {
	proxy: {
		'/api': `http://localhost:${servicePort}`,
		'/favicon.ico': `http://localhost:${servicePort}`
	}
};

module.exports = application;