'use strict';
const { bootstrap } = require('lemonitor-service');

require('./');

bootstrap(function (options) {
	options.forceSync = false;
});