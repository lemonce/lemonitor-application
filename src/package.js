'use strict';
const path = require('path');
const debug = require('debug')('lemonitor-application:');

require(process.cwd());

const aliasStore = {
	app: path.resolve(__dirname, '../app'),
	axios: 'axios/dist/axios.min.js',
	vue: 'vue/dist/vue.runtime.esm.js',
	'vee-validate': 'vee-validate/dist/vee-validate.minimal.min.js',
	'vue-i18n': 'vue-i18n/dist/vue-i18n.min.js',
	'vue-router': 'vue-router/dist/vue-router.min.js',
	vuex: 'vuex/dist/vuex.min.js'
};

const entryStore = {
	bundle: [
		'bootstrap/dist/css/bootstrap.min.css',
		'font-awesome/css/font-awesome.min.css',
		'bootstrap-slider/dist/css/bootstrap-slider.min.css',
		'babel-polyfill/dist/polyfill.min.js',
		path.resolve(__dirname, '../app')
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