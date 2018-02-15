'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './module/menu';
import range from './module/range';
import account from './module/account';

const UPDATE_NOW_INTERVAL = 30 * 1000;

const store = new Vuex.Store({
	modules: { menu, range, account },
	state: {
		lang: 'English'
	}
});

setInterval(() => {
	store.dispatch('range/updateNow');
}, UPDATE_NOW_INTERVAL);

export default store;
