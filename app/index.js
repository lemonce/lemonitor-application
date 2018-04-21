'use strict';

import './style/global.less';
import './component/global/index';

import Vue from 'vue';
import Element from 'element-ui';

import menu from './menu.js';
import Data from './plugin/data.js';

Vue.use(Element);
Vue.use(Data, {
	afterUpdate(updated) {
		updated.catch(() => $app.updateSession())
			.then((accountId) => {
				if (!accountId) {
					router.push('/account/signin');
				}
			}, $app.catchConnectionError);
	}
});

import App from './component/App.vue';

import router from './routes';
import store from './store/index.js';
import i18n from './i18n/index.js';

const $app = new Vue(Object.assign({ i18n, router, store }, App));

export default { router, store, i18n, menu };

window.addEventListener('load', () => {
	$app.updateSession().then((accountId) => {
		if (!accountId) {
			router.push('/account/signin');
		}

		$app.$mount('#app');
	}, $app.catchConnectionError);
});