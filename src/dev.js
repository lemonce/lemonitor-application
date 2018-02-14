'use strict';
const {spawn} = require('child_process');
const path = require('path');

const WEBPACK_DEV = {
	path: path.resolve(__dirname, '../build/webpack.dev.js'),
	server: require.resolve('webpack-dev-server/bin/webpack-dev-server')
};

module.exports = function startWebpackDevServer() {
	return spawn('node', [
		WEBPACK_DEV.server,
		'--config',
		WEBPACK_DEV.path,
		'--hot',
		'--host',
		'0.0.0.0',
		'--port',
		'8200'
	], { stdio: 'inherit' });
};